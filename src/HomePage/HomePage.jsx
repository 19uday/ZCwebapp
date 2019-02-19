import React from 'react';
import { connect } from 'react-redux';
import Layout from './Layout'
import { } from '../_actions';
import { Commissioning } from '../Commissioning';
import { Commands } from '../Commands';
import { Wifi } from '../Wifi';
import { commissioningActions } from '../_actions';
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

    componentDidMount() {
        var func = this;
        this.socket = io(`http://${this.hostname}`);

        this.socket.on("connect", () => {
            console.log("Connected to server!!!");
            this.socket.emit("subscribeToMessages",{});
        });
    
        this.socket.on("disconnect", () => {
            console.log("Disconnect!!!");
            this.socket.disconnect();
        });
    
        this.socket.on('message', function (data) {
            console.log(data);
            func.props.setLogs(data);
        });

        this.socket.on('closeApp', function (data){
            console.log(data);
            
        })
    }

    componentWillUnmount(){
        this.state.sock.disconnect();
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
    setLogs: (logs) => {
        dispatch(commissioningActions.setLogs(logs))
    },
})

const connectedHomePage = connect(null, mapDispatchToProps)(HomePage);
export { connectedHomePage as HomePage };
