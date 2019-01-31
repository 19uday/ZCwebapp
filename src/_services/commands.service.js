export const commandsService = {
    sendCommand
};

const hostName = '192.168.1.101:5001';
//const hostName = 'https://ancient-catfish-90.localtunnel.me';

function sendCommand(trackerID, command) {

    const requestOptions = {
        method: "POST",
        mode: 'cors'
    };

    if(command === "WE"){
            requestOptions["body"] = JSON.stringify({
                "CMD" : "HMNM",
                "DID": "00000",
                "VALUES": "NEGATIVE"
            });
        }

    if(command === "SMTALStow"){
        requestOptions["body"] = JSON.stringify({
                "CMD" : "HMOD",
                "DID": "00000",
                "MODE": "NIGHT"
            });
    }

    if(command === "SMTALStop"){
        requestOptions["body"] = JSON.stringify({
                "CMD" : "HMNM",
                "DID": "00000",
                "VALUES": "STOP"
            });
    }

    if(command === "ES"){
        requestOptions["body"] = JSON.stringify({
                "CMD" : "HMNM",
                "DID": "00000",
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
