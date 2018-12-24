export const settingsService = {
    sendSetting,
};

const hostName = 'localhost:5000';

function sendSetting(setting) {
    const requestOptions = {
        method: "GET",
        mode: 'cors',
        body: null
    };
/*
    return fetch(`https://099239c0-c7c8-488d-b965-7b1073b0c389.mock.pstmn.io/getCurrentTrackerInfo?id=${trackerID}`, requestOptions)
        .then(handleResponse)*/
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