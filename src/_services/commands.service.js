export const commandsService = {
    sendCommand
};

const hostName = window.location.hostname

function sendCommand(trackers, command) {
    const requestOptions = {
        method: "POST",
        mode: 'cors',
        body: JSON.stringify({
            trackerID: "tracker001",
            command: command
        })
    };

    return fetch(`http://192.168.4.1:5000/sendCommand`, requestOptions)
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