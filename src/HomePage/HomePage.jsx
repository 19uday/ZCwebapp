import React from 'react';
import { connect } from 'react-redux';
import Layout from './Layout'
import { } from '../_actions';
import { Commissioning } from '../Commissioning';
import { Commands } from '../Commands';
import { Trends } from '../Trends';
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
        buttonObject: {
          "id": "zone1",
          "location": "19.8,20.8 Chennai",
          "rainfall": 0.0,
          "windspeed": 0.0,
          "rainfallT": 0.0,
          "windspeedT": 0.0,
          "swversion": "1.0.0",
          "hwversion": "1.0.0",
          "trackerID": "",
        }
      };

    hostname = window.location.hostname +':1111';

    logObj ={}

    componentDidMount() {
        var func = this;
        var socket = io(`http://${this.hostname}`);
        console.log(socket);
        socket.on("connect", () => {
            console.log("Connected to server!!!");
            socket.emit("subscribeToMessages",{});
        });
    
        socket.on("disconnect", () => {
            console.log("Disconnect!!!");
        });
    
        socket.on('message', function (data) {
            console.log(data);
            var res = [];
            var datae = func.state.messages;
            var xbeeDatae = func.state.xbeeMessages;
            
            for(var i=0;i<data.logs.length;i++){
              res = data.logs[i].message.split(" ");
              if(data.logs[i].message.includes("rainFall"))
              {
                
                func.setState({...func.state, buttonObject: {
                  ...func.state.buttonObject,
                  rainfall: Number(Number(res[2]).toFixed(2))
                }});
                func.setState({...func.state, buttonObject: {
                  ...func.state.buttonObject,
                  rainfallT: Number(Number(res[4]).toFixed(2))
                }});
              }
              if(data.logs[i].message.includes("windSpeed"))
              {
                func.props.setWindParams(Number(Number(res[2]).toFixed(2)), Number(Number(res[4]).toFixed(2)))
              }
              if(data.logs[i].message.includes("colorChange"))
              {
                func.props.setTrackerColor(res[2], res[1]);
              }
              if(data.logs[i].message.includes("CMD") && data.logs[i].message.includes("DID"))
              {
                console.log(typeof data.logs[i].message);
                this.logsObj = {
                    date: new Date().toLocaleDateString('en-US', {timeZone: 'America/Denver'}),
                    time: new Date().toLocaleTimeString('en-US', {timeZone: 'America/Denver'}),
                    log: data.logs[i].message,
                }
                xbeeDatae.push(this.logsObj);
              }
              else{
                this.logsObj = {
                    date: new Date().toLocaleDateString('en-US', {timeZone: 'America/Denver'}),
                    time: new Date().toLocaleTimeString('en-US', {timeZone: 'America/Denver'}),
                    log: data.logs[i].message,
                }
                datae.push(this.logsObj);
              }
            }
            func.setState({messages: datae});
            func.setState({xbeeMessages: xbeeDatae});
        });
    
        func.setState({start: true});
    }

    render() {
        return(
            <Layout selected={this.props.match.params.id}>
                {
                    this.props.match.params.id ?
                        this.props.match.params.id === 'Commissioning' ? <Commissioning /> :
                            this.props.match.params.id === 'Commands' ? <Commands /> :
                                this.props.match.params.id === 'Logs' ? <Footer mess={this.state.messages} xbee={this.state.xbeeMessages}/>:
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
})

const connectedHomePage = connect(null, mapDispatchToProps)(HomePage);
export { connectedHomePage as HomePage };