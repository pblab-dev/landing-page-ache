import * as userModel from "../models/userModel";
import axios from "axios";


export async function addNewUserApi(attributesValueList, isDeveloper, grupoId, eventId) {
  var method = "https://hall-gateway.inteegra.com.br/hall/api/event/guest/register";
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6Ik9iS1RnYWxWaEUzWnUrYzJKeHZQV2J6Z2RZb0ZDMUdEIiwiY29udHJhY3RDb2RlIjoicmJmK3BQamJONG89IiwiYWdlbmN5Q29kZSI6IkwreUgweThwOFlnPSIsInVzZXJJZCI6IjZmMCtCd3J2OWJVPSIsInByb2ZpbGUiOiJSZVZ4ekF0YkY3RT0iLCJqdGkiOiI5MTQwOTQ3OS0xY2MwLTRjMjUtYTk1Zi00MGI3MDdhNTQwZTEiLCJleHAiOjE2MTQ2MzYwMjMsImlzcyI6IkludGVlZ3JhIiwiYXVkIjoiYXBpLWNsaWVudCJ9.EcQWea_Z0rQFnShUCgcyuNXS42dcxrStlE3Dz7d3JPY`
  // const event = store.getState().event;
  const event = '';

  //Monta lista de atributos para sistema
  const attributesApi = [];
  var name = "";
  var email = "";
  attributesValueList.forEach((item) => {
    const attribute = {
      attributeId: item.id,
      value: item.value.toString(),
    };
    attributesApi.push(attribute);
  });

  return new Promise((resolve, reject) => {
    const options = {
      url: method,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
      data: [
        {
          contractId: 2042,
          eventId: eventId,
          attributes: attributesApi,
          groupId: grupoId,
          ConfirmationStatus: "CN"
        },
      ],
    };
    axios(options)
      .then((res) => {
        if (res.data.success && res.data.data.guest && res.data.data.guest.id) {
          //Verifica atributo por atributo se os valores foram cadastrados
          //Caso não retorne id, mostrar mensagem de erro

          attributesValueList.forEach((atr) => {
            var register = res.data.data.atributesValue.find((regist) => {
              return atr.id === regist.attributeId;
            });

            if (
              !register ||
              /*register.value !== atr.value ||*/
              register.value === null
            ) {
              reject("Atributo não cadastrado", res, attributesValueList);
            }
          });

          // O retorno deve ser igual ao getUser
          const guest = res.data.data.guest;

          //Caso não retorne o nome, mostrar mensagem de erro
          if (!guest.name || guest.name === "") {
            console.log("Atributo não cadastrado");
            reject("Atributo não cadastrado");
          }

          var user = userModel.createUserModel(
            guest.id,
            event.id,
            name !== "" ? name : guest.name ? guest.name : "",
            email !== "" ? email : guest.email ? guest.email : "",
            guest.institution ? guest.institution : "",
            guest.avatarProfileLink ? guest.avatarProfileLink : "",
            guest.hallFirstTerm,
            guest.hallSecondTerm,
            null,
            isDeveloper,
            null,
            null,
            guest.registration,
            guest.password,
            guest.company,
            guest.visibleToChat,
            guest.ranking && guest.ranking.levelId ? guest.ranking.levelId : null,
            guest.ranking && guest.ranking.level &&
              guest.ranking.level.name ? guest.ranking.level.name : null,
            guest.ranking && guest.ranking.points ? guest.ranking.points : null,
            guest.specialty,
            guest.ranking && guest.ranking.position ? guest.ranking.position : null,
          );

          if (user.name === "" || !user.name) {
            user.name = guest.id.toString();
          }
          if (user.email === "" || !user.email) {
            user.email = guest.id.toString();
          }

          resolve(user);
        } else {
          reject(res.data);
        }
      })
      .catch((err) => {
        console.log("Erro addNewUserApi", err, options);
        reject(err);
      });
  });
}
