import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import classNames from 'classnames';
import DeviceList from './DeviceList';
import TrackerDetails from './TrackerDetails';
import { commissioningActions } from '../_actions';
import { Loading } from '../_components';
import TrackerAngle from './TrackerAngle';
import { Link } from "react-router-dom";
import { history } from '../_helpers';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        height: '93%',
        width: '100%',
      }, 

    padRight: {
        paddingRight: '10px'
    },
    padBottom: {
        paddingBottom: '3px',
        maxHeight:'23vh',
    },
    details: {
        [theme.breakpoints.down('md')]: {
            height: '500px',
          },
    },
    detail: {
        [theme.breakpoints.down('960')]: {
            height: '500px',
          },
    },
});

class Commissioning extends Component {

    constructor(props){
        super(props);
    }

    state = {
        trackerID: "",
        deviceID: "",
        permitJoinClicked: false
    }

    permitJoin = () => {
        this.setState({
            permitJoinClicked: true
        })
    }

    componentDidMount() {
        this.props.getCommissioningData()
    }

    getTrackerDetails = (trackerID) => {
        this.props.getCurrentTrackerInfo(trackerID)
        console.log(trackerID)
        const deviceID = this.props.commissioningData.find(e => e.trackerID === trackerID).controllerInfo.macID
        this.setState({
            trackerID,
            deviceID
        })
        console.log(this.state.deviceID);
        
    }

    handleApp = () => {
        console.log("clicked");
        history.push("/openApp");
    } 

    render(){
        const { classes, loaded, commissioningData, selectedTrackerDetails, loadedTrackerInfo, selectedTrackerID } = this.props;
        
        return (
            <div className={classes.root} >
                <Grid container  className="flex" alignItems="stretch" direction="row" justify="space-around">
                    <Grid item xs={12} sm={6} className={classNames("flex", classes.padRight, classes.detail)}>
                        { loaded ? <DeviceList permitJoin={this.permitJoin} permitJoinClicked={this.state.permitJoinClicked} selectedTrackerID={selectedTrackerID} devices={commissioningData} getTrackerDetails={this.getTrackerDetails}/> : <Loading /> }
                    </Grid>
                    <br />
                    <Grid item xs={12} sm={6}  className={classNames("flex")}>
                        <Grid container  className="flex" direction="column"  justify="space-around">
                        
                        <Grid item sm onClick={this.handleApp} className={classNames("flex","flex1", classes.padBottom, classes.details)}>
                        {
                            loadedTrackerInfo ? <TrackerAngle angle={selectedTrackerDetails.currentAngle}/> : <Loading />
                        }
                        </Grid>
                        <Grid item sm className={classNames("flex", classes.padTop, classes.details)}>
                        { loadedTrackerInfo ? <TrackerDetails 
                                                deviceID={this.state.deviceID}
                                                trackerID={selectedTrackerID} 
                                                trackerDetails={selectedTrackerDetails}/> : <Loading /> }
                        </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

Commissioning.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    const { loaded, commissioningData, selectedTrackerDetails, loadedTrackerInfo, selectedTrackerID } = state.commissioning;
    return {
        commissioningData,
        loaded,
        loadedTrackerInfo,
        selectedTrackerDetails,
        selectedTrackerID
    };
}

const mapDispatchToProps = (dispatch) => ({
    getCurrentTrackerInfo: (trackerID) => {
        dispatch(commissioningActions.getCurrentTrackerInfo(trackerID)) 
    },
    getCommissioningData: () => {
        dispatch(commissioningActions.getCommissioningData()) 
    }
})

const connectedCommissioning = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Commissioning));
export { connectedCommissioning as Commissioning };