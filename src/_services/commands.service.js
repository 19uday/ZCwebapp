export const commandsService = {
    sendCommand
};

const hostName = window.location.hostname+ ':5001';
//const hostName = 'https://ancient-catfish-90.localtunnel.me';

function sendCommand(deviceID, command, macID) {

    const requestOptions = {
        method: "POST",
        mode: 'cors'
    };

    if(command === "WE"){
            requestOptions["body"] = JSON.stringify({
                "CMD" : "HMNM",
                "DID": deviceID,
                "VALUES": "NEGATIVE",
                "macID": macID,
            });
        }

    if(command === "SMTALStow"){
        requestOptions["body"] = JSON.stringify({
                "CMD" : "HMOD",
                "DID": deviceID,
                "MODE": "NIGHT",
                "macID": macID,
            });
    }

    if(command === "SMTALStop"){
        requestOptions["body"] = JSON.stringify({
                "CMD" : "HMNM",
                "DID": deviceID,
                "VALUES": "STOP",
                "macID": macID,
            });
    }

    if(command === "ES"){
        requestOptions["body"] = JSON.stringify({
                "CMD" : "HMNM",
                "DID": deviceID,
                "VALUES": "POSITIVE",
                "macID": macID,
            });
    }


    return fetch(`http://${hostName}/sendCommand`, requestOptions)
        .then(handleResponse)
}

function handleResponse(response) {
    return response.json().then(json => {
        if (!response.ok) {
            if (response.status === 403) {
                console.log("403")
                localStorage.removeItem('user')
                window.location.reload(true);
            }

            const error = (json && json.message) || response.statusText;
            return Promise.reject(error);
        }
        return json;
    });
}
