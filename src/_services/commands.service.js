export const commandsService = {
    sendCommand
};

const hostName = '458076b7.ngrok.io';

function sendCommand(trackerID, command) {
    const requestOptions = {
        method: "POST",
        mode: 'cors',
        body: JSON.stringify({
            deviceID: trackerID,
            command: command
        })
    };

    return fetch(`http://458076b7.ngrok.io/sendCommand`, requestOptions)
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