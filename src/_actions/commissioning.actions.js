import { commissioningConstants } from '../_constants';
import { commissioningService } from '../_services';

export const commissioningActions = {
    getCommissioningData,
    getCurrentTrackerInfo
};

function getCommissioningData() {
    return dispatch => {
        dispatch(request());

        commissioningService.getCommissioningData()
            .then(
                commissioning => { 
                    dispatch(success(commissioning, dispatch));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request() { return { type: commissioningConstants.GET_COMMISSIONING_DATA_REQUEST } }
    function success(commissioningData, dispatch) {
        dispatch(getCurrentTrackerInfo(commissioningData.staticData[0].trackerID)) 
        return { type: commissioningConstants.GET_COMMISSIONING_DATA_SUCCESS, commissioningData } 
    }
    function failure(error) { return { type: commissioningConstants.GET_COMMISSIONING_DATA_FAILURE, error } }
}

function getCurrentTrackerInfo(trackerID) {
    return dispatch => {
        dispatch(request(trackerID));

        commissioningService.getCurrentTrackerInfo(trackerID)
            .then(
                trackerDetails => { 
                    dispatch(success(trackerDetails));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(trackerID) { return { type: commissioningConstants.GET_CURRENT_TRACKER_INFO_REQUEST, trackerID } }
    function success(trackerDetails) { return { type: commissioningConstants.GET_CURRENT_TRACKER_INFO_SUCCESS, trackerDetails } }
    function failure(error) { return { type: commissioningConstants.GET_CURRENT_TRACKER_INFO_FAILURE, error } }
}