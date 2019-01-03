export const trendsService = {
    getTrends,
};

const hostName = window.location.hostname

function getTrends( trackers, parameter ) {
    const requestOptions = {
        method: "POST",
        mode: 'cors',
        body: JSON.stringify({
            "trackerId": trackers,
            "parameter": parameter
        })
    };

    console.log(requestOptions)



    return fetch(`http://192.168.4.1:5000/trends`, requestOptions)
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