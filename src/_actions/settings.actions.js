import { settingsConstants } from '../_constants';
import { settingsService } from '../_services';

export const settingsActions = {
    sendSetting,
    setPanID,
    threshold,
};

function sendSetting(setting) {
    return dispatch => {
        dispatch(request(setting));

        settingsService.sendSetting(setting)
            .then(
                ok => { 
                    dispatch(success());
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(setting) { return { type: settingsConstants.SEND_SETTING, setting } }
    function success() { return { type: settingsConstants.SEND_SETTING_SUCCESS } }
    function failure(error) { return { type: settingsConstants.SEND_SETTING_FAILURE, error } }
}

function setPanID(panID) {
    console.log(panID);
    return dispatch => {
        dispatch(request());

        settingsService.setPanID(panID)
            .then(
                ok => { 
                    dispatch(success(ok.toString()));
                    alert('successfully set Pan ID!')
                },
                error => {
                    dispatch(failure(error.toString()));
                    alert('error in setting Pan ID!')
                }
            );
    };

    

    function request() { return { type: settingsConstants.SET_PANID_REQUEST } }
    function success(success) { return { type: settingsConstants.SET_PANID_SUCCESS, success } }
    function failure(error) { return { type: settingsConstants.SET_PANID_FAILURE, error } }
}

function threshold(maxWindSpeed, maxRainFall) {
    return dispatch => {
        dispatch(request());

        settingsService.threshold(maxWindSpeed, maxRainFall)
            .then(
                ok => { 
                    dispatch(success(ok.toString()));
                    alert('successfully set Threshold!')
                },
                error => {
                    dispatch(failure(error.toString()));
                    alert('error in setting Threshold!')
                }
            );
    };

    

    function request() { return { type: settingsConstants.SET_THRESHOLD_REQUEST } }
    function success(success) { return { type: settingsConstants.SET_THRESHOLD_SUCCESS, success } }
    function failure(error) { return { type: settingsConstants.SET_THRESHOLD_FAILURE, error } }
}