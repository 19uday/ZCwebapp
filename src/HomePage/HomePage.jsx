import React from 'react';
import { connect } from 'react-redux';
import Layout from './Layout'
import { } from '../_actions';
import { Commissioning } from '../Commissioning';
import { Commands } from '../Commands';
import { Wifi } from '../Wifi';
import { commissioningActions, settingsActions } from '../_actions';
import { Settings } from '../Settings';
import { About } from '../About';
import Footer from './Footer.js';
import io from 'socket.io-client';

class HomePage extends React.Component {

    state = {
        mobileOpen: false,
        start: true,
        messages:[],
        xbeeMessages: [],
        color: "",
        sock: {},
        buttonObject: {
          "id": "zone1",
          "location": "19.8,20.8 Chennai",
          "rainfall": 0.0,
          "windspeed": 0.0,
          "rainfallT": 0.0,
          "windspeedT": 0.0,
          "swversion": "1.0.CT",
          "hwversion": "1.0.0",
          "trackerID": "",
        }
      };

    hostname = window.location.hostname +':1111';

    logObj ={}

    socket = null;

    interr = {} 

    everyThirty = () => {
        var func = this;
        this.interr = setInterval(() => {
            func.props.getLogs();
            console.log();
        }, 30000)
    }

    componentDidMount() {
        this.props.getPanId();
        this.everyThirty();
    }

    render() {
        return(
            <Layout selected={this.props.match.params.id}>
                {
                    this.props.match.params.id ?
                        this.props.match.params.id === 'Commissioning' ? <Commissioning /> :
                            this.props.match.params.id === 'Commands' ? <Commands /> :
                                this.props.match.params.id === 'Logs' ? <Footer />:
                                    this.props.match.params.id === 'Wifi' ? <Wifi /> :
                                        this.props.match.params.id === 'Settings' ? <Settings /> : <About />
                    : <Commissioning />
                }
            </Layout>
        )
    }
    
}

const mapDispatchToProps = (dispatch) => ({
    getCommissioningData: () => {
        dispatch(commissioningActions.getCommissioningData()) 
    },
    setWindParams: (windSpeed, windSpeedT) =>{
        dispatch(commissioningActions.setWindParams(windSpeed, windSpeedT))
    },
    getLogs: () => {
        dispatch(commissioningActions.getLogs())
    },
    getPanId: () =>{
        dispatch(settingsActions.getPanId())
    },
})

const connectedHomePage = connect(null, mapDispatchToProps)(HomePage);
export { connectedHomePage as HomePage };
