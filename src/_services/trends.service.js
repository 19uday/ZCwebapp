export const trendsService = {
    getTrends,
};

const hostName = '2cf6aac4.ngrok.io';

function getTrends( trackers, parameter ) {
    const requestOptions = {
        method: "POST",
        mode: 'cors',
        body: JSON.stringify({
            "trackerId": trackers,
            "parameter": parameter
        })
    };




    return fetch(`http://36f707f5.ngrok.io/trends`, requestOptions)
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