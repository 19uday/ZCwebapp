import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import classNames from 'classnames'
import DeviceList from './DeviceList';
import TrackerDetails from './TrackerDetails';
import { commissioningActions } from '../_actions';
import { Loading } from '../_components';
import TrackerAngle from './TrackerAngle';

const styles = theme => ({
    root: {
        height: '90.5%',
        width: '100%',
        display: 'flex'
    },  
    padTop: {
        paddingTop: '5px'
    },
    padBottom: {
        paddingBottom: '5px'
    },
    padRight: {
        paddingRight: '10px'
    }
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

    getTrackerDetails = (trackerID) => {
        this.props.getCurrentTrackerInfo(trackerID)
        const deviceID = this.props.commissioningData.find(e => e.trackerID === trackerID).controllerInfo.macID
        this.setState({
            trackerID,
            deviceID
        })
    }

    render(){
        const { classes, loaded, commissioningData, selectedTrackerDetails, loadedTrackerInfo, selectedTrackerID } = this.props;
        
        return (
            <div className={classes.root} >
                <Grid container spacing={24} className="flex" alignItems="stretch" direction="row" justify="space-around">
                    <Grid item xs={12} md={6} className={classNames("flex", classes.padRight)}>
                        { loaded ? <DeviceList permitJoin={this.permitJoin} permitJoinClicked={this.state.permitJoinClicked} selectedTrackerID={selectedTrackerID} devices={commissioningData} getTrackerDetails={this.getTrackerDetails}/> : <Loading /> }
                    </Grid>
                    <br />
                    <Grid item xs={12} md={6}  className={classNames("flex")}>
                        <Grid container spacing={24} className="flex" alignItems="stretch" direction="column" justify="space-around">
                        <Grid item sm className={classNames("flex", classes.padBottom)}>
                        {
                            loadedTrackerInfo ? <TrackerAngle angle={selectedTrackerDetails.currentAngle}/> : <Loading />
                        }
                        </Grid>
                        <Grid item sm className={classNames("flex", classes.padTop)}>
                        { loadedTrackerInfo ? <TrackerDetails 
                                                deviceID={commissioningData.find(e => e.trackerID === selectedTrackerID).controllerInfo.macID}
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
    }
})

const connectedCommissioning = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Commissioning));
export { connectedCommissioning as Commissioning };