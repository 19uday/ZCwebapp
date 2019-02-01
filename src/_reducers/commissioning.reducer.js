import { commissioningConstants } from '../_constants';

const initialState = {
  requesting: false,
  commissioningData: null,
  loaded:  false,
  requestingTrackerInfo: false,
  loadedTrackerInfo: false,
  selectedTrackerDetails: null,
  selectedTrackerID: "tracker001"
}

export function commissioning(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }
  switch (action.type) {
    case commissioningConstants.GET_COMMISSIONING_DATA_REQUEST:
      return {
        ...state,
        requesting: true,
        loaded: false
      };
    case commissioningConstants.GET_COMMISSIONING_DATA_SUCCESS:
      return {
        ...state,
        requesting: false,  
        commissioningData: action.commissioningData.staticData,
        loaded: true
      };
    case commissioningConstants.GET_COMMISSIONING_DATA_FAILURE:
      return {
        ...state,
        requesting: false,
        error: action.error,
        loaded: false
      };
    case commissioningConstants.GET_CURRENT_TRACKER_INFO_REQUEST:
      return {
        ...state,
        requestingTrackerInfo: true,
        loadedTrackerInfo: false,
        selectedTrackerID: action.trackerID
      };
    case commissioningConstants.GET_CURRENT_TRACKER_INFO_SUCCESS:
      return {
        ...state,
        requestingTrackerInfo: false,  
        selectedTrackerDetails: action.trackerDetails,
        loadedTrackerInfo: true
      };
    case commissioningConstants.GET_CURRENT_TRACKER_INFO_FAILURE:
      return {
        ...state,
        requestingTrackerInfo: false,
        error: action.error,
        loadedTrackerInfo: false
      };
    default:
      return state
  }
}