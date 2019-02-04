import { settingsConstants } from '../_constants';
import { settingsService } from '../_services';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const settingsActions = {
    sendSetting,
    setPanID,
    threshold,
    heartBeat,
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
                    toast('successfully set Pan ID!')
                },
                error => {
                    dispatch(failure(error.toString()));
                    toast('error in setting Pan ID!')
                }
            );
    };

    

    function request() { return { type: settingsConstants.SET_PANID_REQUEST } }
    function success(success) { return { type: settingsConstants.SET_PANID_SUCCESS, success } }
    function failure(error) { return { type: settingsConstants.SET_PANID_FAILURE, error } }
}

function threshold(maxWindSpeed, maxRainFall, meanWindSpeed, windSpeedTimer) {
    return dispatch => {
        dispatch(request());

        settingsService.threshold(maxWindSpeed, maxRainFall, meanWindSpeed, windSpeedTimer)
            .then(
                ok => { 
                    dispatch(success(ok.toString()));
                    toast('successfully set Threshold!')
                },
                error => {
                    dispatch(failure(error.toString()));
                    toast('error in setting Threshold!')
                }
            );
    };

    

    function request() { return { type: settingsConstants.SET_THRESHOLD_REQUEST } }
    function success(success) { return { type: settingsConstants.SET_THRESHOLD_SUCCESS, success } }
    function failure(error) { return { type: settingsConstants.SET_THRESHOLD_FAILURE, error } }
}

function heartBeat(enabled, hbinterval, maxMsgs) {
    return dispatch => {
        dispatch(request());
        settingsService.heartBeat(enabled, hbinterval, maxMsgs)
            .then(
                ok => { 
                    dispatch(success(ok.toString()));
                    toast('successfully set Heart Beat')
                },
                error => {
                    dispatch(failure(error.toString()));
                    toast('error in setting HeartBeat!')
                }
            );
    };

    

    function request() { return { type: settingsConstants.SET_HEARTBEAT_REQUEST } }
    function success(success) { return { type: settingsConstants.SET_HEARTBEAT_SUCCESS, success } }
    function failure(error) { return { type: settingsConstants.SET_HEARTBEAT_FAILURE, error } }
}