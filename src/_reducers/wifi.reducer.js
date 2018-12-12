import { wifiConstants } from '../_constants';

const initialState = {
  sending: false,
  sent:  false,
  sendingFile: false,
  sentFile:  false
}

export function wifi(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }
  switch (action.type) {
    case wifiConstants.SET_WIFI_INFO_REQUEST:
      return {
        ...state,
        sending: true,
        sent: false
      };
    case wifiConstants.SET_WIFI_INFO_SUCCESS:
      return {
        ...state,
        sending: false,
        sent: true
      };
    case wifiConstants.SET_WIFI_INFO_FAILURE:
      return {
        ...state,
        sending: false,
        error: action.error,
        sent: false
      };
    case wifiConstants.UPLOAD_REQUEST:
      return {
        ...state,
        sendingFile: true,
        sentFile: false
      };
    case wifiConstants.UPLOAD_SUCCESS:
      return {
        ...state,
        sendingFile: false,
        sentFile: true
      };
    case wifiConstants.UPLOAD_FAILURE:
      return {
        ...state,
        sendingFile: false,
        error: action.error,
        sentFile: false
      };
    default:
      return state
  }
}