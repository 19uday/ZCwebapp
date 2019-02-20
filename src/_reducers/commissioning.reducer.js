import { commissioningConstants } from '../_constants';

const initialState = {
  requesting: false,
  commissioningData: null,
  loaded:  false,
  requestingTrackerInfo: false,
  loadedTrackerInfo: false,
  selectedTrackerDetails: null,
  selectedTrackerID: "tracker001",
  trackerColor: {
    trackerID: "",
    color: "",
  },
  triggeringDiscovery: false,
  discoveryDetails: null,
  rainFall: 0.0,
  rainFallT: 0.0,
  windSpeed: 0.0,
  windSpeedT: 0.0,
  logs: [],
  xbeeLogs : [],
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

      case 'messages':
      { console.log(action.datae, action.xbeeDatae)
      return {
        ...state,
        logs: [
          ...state.logs, action.datae
        ],
        xbeeLogs: [
          ...state.xbeeLogs, action.xbeeDatae
        ]
      };
    }

      case 'rainFall':
      return {
        ...state,
        rainFall: action.rainFall,
        rainFallT: action.rainFallT,
      }

      case 'windSpeed':
      return {
        ...state,
        windSpeed: action.windSpeed,
        windSpeedT: action.windSpeedT,
      }

      case 'setTrackerColor':
      return {
        ...state,
        trackerColor:{
          ...state.trackerColor,
          trackerID: action.trackerId,
          color: action.color,
        }
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
    case commissioningConstants.SET_WINDSPEED_SUCCESS:
    {
      return {
        ...state,
        windSpeed: action.windSpeed, windSpeedT: action.windSpeedT
      };
    }
    case commissioningConstants.TRIGGER_DISCOVERY_REQUEST:
    return {
      ...state,
      triggeringDiscovery: true,
      discoveryDetails: false,
      loaded: true
    };
  case commissioningConstants.TRIGGER_DISCOVERY_SUCCESS:
    return {
      ...state,
      triggeringDiscovery: false,  
      discoveryDetails: action.discoveryDetails,
      loaded: true
    };
  case commissioningConstants.TRIGGER_DISCOVERY_FAILURE:
    return {
      ...state,
      triggeringDiscovery: false,
      error: action.error,
      loaded: true
    };
    default:
      return state
  }
}