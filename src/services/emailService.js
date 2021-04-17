import axios from "axios";

export async function sendEmailApi(emailTo, subject, htmlContent) {
    var method = "https://api-externa.inteegra.com.br/email/api/emails";
    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6Ik9iS1RnYWxWaEUzWnUrYzJKeHZQV2J6Z2RZb0ZDMUdEIiwiY29udHJhY3RDb2RlIjoicmJmK3BQamJONG89IiwiYWdlbmN5Q29kZSI6IkwreUgweThwOFlnPSIsInVzZXJJZCI6IjZmMCtCd3J2OWJVPSIsInByb2ZpbGUiOiJSZVZ4ekF0YkY3RT0iLCJqdGkiOiI5MTQwOTQ3OS0xY2MwLTRjMjUtYTk1Zi00MGI3MDdhNTQwZTEiLCJleHAiOjE2MTQ2MzYwMjMsImlzcyI6IkludGVlZ3JhIiwiYXVkIjoiYXBpLWNsaWVudCJ9.EcQWea_Z0rQFnShUCgcyuNXS42dcxrStlE3Dz7d3JPY`

    const _params = {
        to: [emailTo],
        from: "naoresponder@inteegra.com.br",
        subject: subject,
        htmlContent: htmlContent
    }

    return new Promise((resolve, reject) => {
        const options = {
            url: method,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "bearer " + token,
            },
            data: _params,
        };
        axios(options)
            .then((res) => {
                resolve(true);
            })
            .catch((err) => {
                console.log("Erro sendEmailApi", err, options);
                reject(err);
            });
    });
}

export function getHtmlString(linkCadastro='cadastro') {
    return `<table border="0" cellpadding="0" cellspacing="0" style="max-width: 997px; margin: 0 auto; border: 1px solid #EEEEEE;" width="997px"> <tbody> <tr> <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top"> <p style="text-align: center;"><img src="https://eventos.inteegra.com.br/LandingPageView/Foto?IDE=72810&amp;IDTipoEventoFoto=4"></p> <p style="margin-left: 80px; margin-right: 80px; font-size: 15px; font-family: Calibri, sans-serif;"> <br> </p> <p style="margin-left: 80px;margin-right: 80px;"><span style="font-size: 18px;">Seja bem-vindo(a)!</span></p> <p style="margin-left: 80px;margin-right: 80px;"><span style="font-size: 18px;"><br></span></p> <p style="margin-left: 80px;margin-right: 80px;"><span style="font-size: 18px;">Seu cadastro para a VI F&Oacute;RUM NACIONAL DE INTEGRA&Ccedil;&Atilde;O VAREJO &amp; IND&Uacute;STRIA ONLINE &nbsp;foi realizado com sucesso.</span></p> <p style="margin-left: 80px;margin-right: 80px;"><span style="font-size: 18px;"><br></span></p> <p style="margin-left: 80px;margin-right: 80px;"><span style="font-size: 18px;">Estamos preparando tudo para tornar esse dia ainda mais produtivo e especial.</span></p> <p style="margin-left: 80px;margin-right: 80px;"><span style="font-size: 18px;"><br></span></p> <p style="margin-left: 80px;margin-right: 80px;"><span style="font-size: 18px;">Para que lembre da data e n&atilde;o se atrase para o nosso evento, clique nos bot&otilde;es abaixo e salve no seu calend&aacute;rio.</span></p> <div style="padding-bottom: 10px; margin-left: 80px;margin-right: 80px;"><a href="https://s3.us-east-1.amazonaws.com/bucket.aws.public/hall_72810/VI%20F%C3%B3rum%20Nacional%20de%20Integra%C3%A7%C3%A3o%20Varejo%20e%20Ind%C3%BAstria%20Online.ics" rel="noopener noreferrer" style="display: inline-block; color: #ffffff; background-color: #001024; border: solid 1px #001024; border-radius: 5px; box-sizing: border-box; cursor: pointer; text-decoration: none; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-transform: capitalize; border-color: #001024;" target="_blank">ICALENDAR</a>&nbsp; <a href="https://s3.us-east-1.amazonaws.com/bucket.aws.public/hall_72810/VI%20F%C3%B3rum%20Nacional%20de%20Integra%C3%A7%C3%A3o%20Varejo%20e%20Ind%C3%BAstria%20Online.ics" rel="noopener noreferrer" style="display: inline-block; color: #ffffff; background-color: #001024; border: solid 1px #001024; border-radius: 5px; box-sizing: border-box; cursor: pointer; text-decoration: none; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-transform: capitalize; border-color: #001024;" target="_blank">OUTLOOK</a>&nbsp; <a href="https://www.google.com/calendar/render?action=TEMPLATE&text=VI+Fórum+Nacional+de+Integração+Varejo+e+Indústria+Online&dates=20210330T120000Z/20210330T150000Z&details=Clique+aqui+para+acessar+o+evento:+https://hall.inteegra.com.br/72810&sf=true&output=xml" rel="noopener noreferrer" style="display: inline-block; color: #ffffff; background-color: #001024; border: solid 1px #001024; border-radius: 5px; box-sizing: border-box; cursor: pointer; text-decoration: none; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-transform: capitalize; border-color: #001024;" target="_blank">GOOGLE</a></div> <p style="margin-left: 80px;margin-right: 80px;"> <br> </p> <p style="margin-left: 80px;margin-right: 80px;"><span style="font-size: 18px;">Voc&ecirc; receber&aacute; mais informa&ccedil;&otilde;es atrav&eacute;s do e-mail cadastrado.</span></p> <p style="margin-left: 80px;margin-right: 80px;"><span style="font-size: 18px;"><br></span></p> <p style="margin-left: 80px;margin-right: 80px;"><span style="font-size: 18px;">Nos vemos em breve!</span></p> <p style="margin-left: 80px;margin-right: 80px;"> <br> </p> <p style="text-align: center;"><img src="https://eventos.inteegra.com.br/LandingPageView/Foto?IDE=72810&amp;IDTipoEventoFoto=5"></p> </td> </tr> </tbody> </table>`
}
