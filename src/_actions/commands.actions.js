import { commandsConstants } from '../_constants';
import { commandsService } from '../_services';

export const commandsActions = {
    sendCommand
};

function sendCommand(deviceID, command, macID) {
    return dispatch => {
        dispatch(request());

        commandsService.sendCommand(deviceID, command, macID)
            .then(
                ok => { 
                    dispatch(success(ok.toString()));
                    alert('successfully sent message!')
                },
                error => {
                    dispatch(failure(error.toString()));
                    alert('error in sending message!')
                }
            );
    };

    function request() { return { type: commandsConstants.SEND_COMMAND_REQUEST } }
    function success(success) { return { type: commandsConstants.SEND_COMMAND_SUCCESS, success } }
    function failure(error) { return { type: commandsConstants.SEND_COMMAND_FAILURE, error } }
}