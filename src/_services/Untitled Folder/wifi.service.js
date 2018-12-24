export const wifiService = {
    setWifiInfo,
    upload
};

const hostName = '0.0.0.0:5000';

function setWifiInfo(ssid, pass) {
    const requestOptions = {
        method: "POST",
        mode: 'cors',
        body: JSON.stringify({
            "ssid": ssid,
            "password": pass
        })
    };

    return fetch(`http://0.0.0.0:5000/setWifiInfo`, requestOptions)
        .then(handleResponse)
}

function upload(file) {
    var data = new FormData()
    data.append('file', file)
    const requestOptions = {
        method: "POST",
        mode: 'cors',
        body: data
    };

    return fetch(`http://0.0.0.0:5000/loadStaticData`, requestOptions)
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