export const wifiService = {
    setWifiInfo
};

const hostName = window.location.hostname

function setWifiInfo(ssid, pass) {
    const requestOptions = {
        method: "POST",
        mode: 'cors',
        body: JSON.stringify({
            "ssid": ssid,
            "password": pass
        })
    };

    return fetch(`http://${hostName}:5000/setWifiInfo`, requestOptions)
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