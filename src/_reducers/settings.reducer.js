import { settingsConstants } from '../_constants';

const initialState = {
  sending1: false,
  sent1:  false,
  sending1: false,
  sent1:  false
}

export function settings(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }
  switch (action.type) {
    case settingsConstants.SET_PANID_REQUEST:
      return {
        ...state,
        sending: true,
        sent: false
      };
    case settingsConstants.SET_PANID_SUCCESS:
      return {
        ...state,
        sending: false,
        sent: true
      };
    case settingsConstants.SET_PANID_FAILURE:
      return {
        ...state,
        sending: false,
        error: action.error,
        sent: false
      };
      case settingsConstants.SET_THRESHOLD_REQUEST:
      return {
        ...state,
        sending1: true,
        sent1: false
      };
    case settingsConstants.SET_THRESHOLD_SUCCESS:
      return {
        ...state,
        sending1: false,
        sent1: true
      };
    case settingsConstants.SET_THRESHOLD_FAILURE:
      return {
        ...state,
        sending1: false,
        error: action.error,
        sent1: false
      };
    default:
      return state
  }
}