import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { commissioningConstants } from '../_constants';
import { commissioningService } from '../_services';


export const commissioningActions = {
    getCommissioningData,
    getCurrentTrackerInfo,
    setTrackerColor,
    triggerDiscovery,
    setWindParams,
    setLogs,
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

function setTrackerColor(trackerID, color) {
    return dispatch => {
        dispatch(success(trackerID, color));
    };
    function success(trackerID, color) { return { type: commissioningConstants.SET_COLOR_SUCCESS, trackerID, color} }
}

function setWindParams(windSpeed, windSpeedT) {
    return dispatch => {
        dispatch(success(windSpeed, windSpeedT));
    };
    function success(windSpeed, windSpeedT) { return { type: commissioningConstants.SET_WINDSPEED_SUCCESS, windSpeed, windSpeedT} }
}

function setLogs(logs) {
    return dispatch => {
        var res = [];
        var xbeeDatae = [];
        var datae = [];
        var logsObj = {};
        logs['logs'].map(l => {
            if(l.message.includes("rainFall"))
            {
                const rainFall = Number(Number(res[2]).toFixed(2));
                const rainFallT = Number(Number(res[4]).toFixed(2));
                dispatch({type: 'setRainfall', rainFall, rainFallT});
            }
            else if(l.message.includes("windSpeed"))
            {
                const windSpeed = Number(Number(res[2]).toFixed(2));
                const windSpeedT = Number(Number(res[4]).toFixed(2));
                dispatch({type: 'setWindSpeed', windSpeed, windSpeedT});
            }
            else if(l.message.includes("colorChange"))
            {
              const color = res[1];
              const trackerId = res[2];
              dispatch({type: 'setTrackerColor', color, trackerId});
            }
            else if(l.message.includes("DID"))
            {
              logsObj = {
                  date: new Date().toLocaleDateString('en-US', {timeZone: 'America/Denver'}),
                  time: new Date().toLocaleTimeString('en-US', {timeZone: 'America/Denver'}),
                  log: l.message,
              }
              xbeeDatae.push(logsObj);
            }
            else{
              logsObj = {
                  date: new Date().toLocaleDateString('en-US', {timeZone: 'America/Denver'}),
                  time: new Date().toLocaleTimeString('en-US', {timeZone: 'America/Denver'}),
                  log: l.message,
              }
              datae.push(logsObj);
            }
        });
        dispatch({type: 'messages', datae, xbeeDatae});
    }
}

function triggerDiscovery() {
    return dispatch => {
        dispatch(request());

        commissioningService.triggerDiscovery()
            .then(
                discoveryDetails => { 
                    dispatch(success(discoveryDetails))
                    toast("Successfully started discovery!")
                },
                error => {
                    dispatch(failure(error.toString()));
                    toast("Error in starting discovering!");
                }
            );
    };

    function request() { return { type: commissioningConstants.TRIGGER_DISCOVERY_REQUEST} }
    function success(discoveryDetails) { return { type: commissioningConstants.TRIGGER_DISCOVERY_SUCCESS, discoveryDetails } }
    function failure(error) { return { type: commissioningConstants.TRIGGER_DISCOVERY_FAILURE, error } }
}