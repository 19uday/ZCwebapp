import { wifiConstants } from '../_constants';
import { wifiService } from '../_services';

export const wifiActions = {
    setWifiInfo,
    upload,
};

function setWifiInfo(ssid, pass) {
    return dispatch => {
        dispatch(request());

        wifiService.setWifiInfo(ssid, pass)
            .then(
                ok => { 
                    dispatch(success(ok.toString()));
                    alert('error in setting wifi info!')
                },
                error => {
                    dispatch(failure(error.toString()));
                    alert('successfully set wifi info!')
                }
            );
    };

    function request() { return { type: wifiConstants.SET_WIFI_INFO_REQUEST } }
    function success(success) { return { type: wifiConstants.SET_WIFI_INFO_SUCCESS, success } }
    function failure(error) { return { type: wifiConstants.SET_WIFI_INFO_FAILURE, error } }
}



function upload(file) {
    return dispatch => {
        dispatch(request());

        wifiService.upload(file)
            .then(
                ok => { 
                    dispatch(success(ok.toString()));
                    alert('successfully uploaded!')
                },
                error => {
                    dispatch(failure(error.toString()));
                    alert('error in uploading!')
                }
            );
    };

    function request() { return { type: wifiConstants.UPLOAD_REQUEST } }
    function success(success) { return { type: wifiConstants.UPLOAD_SUCCESS, success } }
    function failure(error) { return { type: wifiConstants.UPLOAD_FAILURE, error } }
}