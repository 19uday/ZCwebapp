export const commandsService = {
    sendCommand
};

const hostName = window.location.hostname+':5001';

function sendCommand(trackerID, command) {

    const requestOptions = {
        method: "POST",
        mode: 'cors'
    };

    if(command === "WE"){
            requestOptions["body"] = JSON.stringify({
                "CMD" : "HMNM",
                "DID": "00000000",
                "VALUES": "NEGATIVE"
            });
        }

    if(command === "SMTALStow'"){
        requestOptions["body"] = JSON.stringify({
                "CMD" : "HMOD",
                "DID": "00000000",
                "VALUES": "NIGHT"
            });
    }

    if(command === "SMTALStop"){
        requestOptions["body"] = JSON.stringify({
                "CMD" : "HMNM",
                "DID": "00000000",
                "VALUES": "STOP"
            });
    }

    if(command === "ES"){
        requestOptions["body"] = JSON.stringify({
                "CMD" : "HMNM",
                "DID": "00000000",
                "VALUES": "POSITIVE"
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
