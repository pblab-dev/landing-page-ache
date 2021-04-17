import axios from "axios";

export async function getTokenUserApi(email, eventId) {
    var method = "https://hall-gateway.inteegra.com.br/hall/api/event/security/users/temporary";
    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6Ik9iS1RnYWxWaEUzWnUrYzJKeHZQV2J6Z2RZb0ZDMUdEIiwiY29udHJhY3RDb2RlIjoicmJmK3BQamJONG89IiwiYWdlbmN5Q29kZSI6IkwreUgweThwOFlnPSIsInVzZXJJZCI6IjZmMCtCd3J2OWJVPSIsInByb2ZpbGUiOiJSZVZ4ekF0YkY3RT0iLCJqdGkiOiI5MTQwOTQ3OS0xY2MwLTRjMjUtYTk1Zi00MGI3MDdhNTQwZTEiLCJleHAiOjE2MTQ2MzYwMjMsImlzcyI6IkludGVlZ3JhIiwiYXVkIjoiYXBpLWNsaWVudCJ9.EcQWea_Z0rQFnShUCgcyuNXS42dcxrStlE3Dz7d3JPY`

    const _params = {
        EventId: eventId,
        Email: email,
        Password: null
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
                if (res.data && res.data.success) {
                    resolve(res.data.data);
                }
                else {
                    reject(res);
                }
            })
            .catch((err) => {
                console.log("Erro getTokenUserApi", err, options);
                reject(err);
            });
    });
}
