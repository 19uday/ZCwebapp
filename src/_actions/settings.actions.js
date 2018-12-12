import { settingsConstants } from '../_constants';
import { settingsService } from '../_services';

export const settingsActions = {
    sendSetting
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