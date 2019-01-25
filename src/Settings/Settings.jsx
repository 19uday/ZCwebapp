 import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import classNames from 'classnames';
import { wifiActions } from '../_actions'
import { Typography, FormControl } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
 
const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    height: '350px'
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflowY: 'scroll',
    height: '100%',
  },
});

class Settings extends Component {

    state = {
        ssid: '',
        password: '',
        submitted: false,
        panID: '',
    };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ submitted: true });
    const { ssid, password } = this.state;
    if (ssid && password) {
        this.props.setWifiInfo(ssid, password);
    }
  }

  handleClick = () => {
    this.props.setPanID(this.state.panID);
  }

    render(){
        const { classes } = this.props;
        
        return (
            <div className={classes.root}>
            <Grid  spacing={24} container>
              <Grid item md={4} lg={3} xs={6} >
                <Paper className={classes.paper}>
                    <Typography variant="h5" component="h3">
                        Set Mode:
                    </Typography>
                    <form onSubmit={this.handleSubmit}>
                    <FormControl fullWidth margin='none'>
                    <InputLabel htmlFor="set-mode">Set Mode</InputLabel>
                        <Select
                            native
                            fullWidth
                            value={this.state.mode}
                            onChange={this.setMode}
                            inputProps={{
                                name: 'mode',
                                id: 'set-mode'
                            }}
                        >
                            <option value="" />
                            {['AUTO', 'MANUAL', 'WIND', 'SNOW', 'CLEAN', 'NIGHT', 'EMERGENCY'].map(parameter => (
                            <option key={parameter} value={parameter}>
                                {parameter}
                            </option>
                            ))}
                        </Select>
                        </FormControl>
                        <br />
                        <br />
                        <center><Button type="submit" className="submit-button">
                            Submit
                        </Button></center>
                    </form>
                </Paper>
              </Grid>
              <Grid item md={4} lg={3} xs={6}>
              <Paper className={classes.paper}>
                    <Typography variant="h5" component="h3">
                        Set PWM Value:
                    </Typography>
                <form onSubmit={this.handleSubmit}>
                <FormControl fullWidth>
                <InputLabel htmlFor="set-pwm">Set PWM Value</InputLabel>
                        <Select
                            native
                            value={this.state.PWM}
                            onChange={this.setPWM}
                            inputProps={{
                                name: 'PWM',
                                id: 'set-pwm'
                            }}
                        >
                            <option value="" />
                            {['AUTO', 'MANUAL', 'EMERGENCY'].map(parameter => (
                            <option key={parameter} value={parameter}>
                                {parameter}
                            </option>
                            ))}
                        </Select>
                        </FormControl>

                        <br />
                        <TextField
                            name="startTime"
                            label="Start time"
                            placeholder="Enter the start time"
                            margin="none"
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <br />
                        <TextField
                            name="stopTime"
                            label="Stop time"
                            placeholder="Enter the stop time"
                            margin="none"
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <br />
                        <TextField
                            name="percentageDutyCycle"
                            label="Percentage Duty Cycle"
                            placeholder="Enter the %duty cycle"
                            margin="none"
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <br />
                        <center><Button type="submit" className="submit-button">
                            Submit
                        </Button></center>
                </form>
                </Paper>
              </Grid>
              <Grid item md={4} lg={3} xs={6}>
                <Paper className={classes.paper}>
                    <Typography variant="h5" component="h3">
                        Manual movement:
                    </Typography>
                    <form onSubmit={this.handleSubmit}>
                    <FormControl fullWidth>
                    <InputLabel htmlFor="manualMovement">Manual movement</InputLabel>
                        <Select
                            native
                            fullWidth
                            value={this.state.mode}
                            onChange={this.setMode}
                            inputProps={{
                                name: 'manualMovement',
                                id: 'manualMovement'
                            }}
                        >
                            <option value="" />
                            {['ANGLE', 'POSITIVE', 'NEGATIVE', 'STOP' ].map(parameter => (
                            <option key={parameter} value={parameter}>
                                {parameter}
                            </option>
                            ))}
                        </Select>
                        </FormControl>
                        <br />
                        <br />
                        <center><Button type="submit" className="submit-button">
                            Submit
                        </Button></center>
                    </form>
                </Paper>
              </Grid>
              <Grid item md={4} lg={3} xs={6} >
              <Paper className={classes.paper}>
                    <Typography variant="h5" component="h3">
                        Set Stow Angles:
                    </Typography>
                <form onSubmit={this.handleSubmit}>
                        <TextField
                            name="wind"
                            label="Wind angle"
                            placeholder="Enter the wind angle"
                            margin="none"
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <br />
                        <TextField
                            name="stow"
                            label="Stow angle"
                            placeholder="Enter the stow angle"
                            margin="none"
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <br />
                        <TextField
                            name="clean"
                            label="Clean angle"
                            placeholder="Enter the clean angle"
                            margin="none"
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <br />
                        <TextField
                            name="night"
                            label="Night angle"
                            placeholder="Enter the night angle"
                            margin="none"
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <br />
                        <TextField
                            name="emergency"
                            label="Emergency angle"
                            placeholder="Enter the emergency angle"
                            margin="none"
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <br />
                        <center><Button type="submit" className="submit-button">
                            Submit
                        </Button></center>
                </form>
                </Paper>
              </Grid>
              <Grid item md={4} lg={3} xs={6}>
              <Paper className={classes.paper}>
                    <Typography variant="h5" component="h3">
                        Set Tracking angle range:
                    </Typography>
                <form onSubmit={this.handleSubmit}>
                        <TextField
                            name="minAngle"
                            label="Min angle"
                            placeholder="Enter the min angle"
                            margin="none"
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <br />
                        <TextField
                            name="maxAngle"
                            label="Max angle"
                            placeholder="Enter the max angle"
                            margin="none"
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <br />
                        <TextField
                            name="appBand"
                            label="App band"
                            placeholder="Enter the app band"
                            margin="none"
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <br />
                        <TextField
                            name="inclinometerOffset"
                            label="Inclinometer offset"
                            placeholder="Enter the inclinometer offset"
                            margin="none"
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <br />
                        <center><Button type="submit" className="submit-button">
                            Submit
                        </Button></center>
                </form>
                </Paper>
              </Grid>
              <Grid item md={4} lg={3} xs={6}>
              <Paper className={classes.paper}>
                    <Typography variant="h5" component="h3">
                        Set NREL SPA:
                    </Typography>
                <form onSubmit={this.handleSubmit}>
                        <TextField
                            name="lat"
                            label="Latitude"
                            placeholder="Enter the latitude"
                            margin="none"
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <br />
                        <TextField
                            name="long"
                            label="Longitude"
                            placeholder="Enter the longitude"
                            margin="none"
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <br />
                        <TextField
                            name="altitude"
                            label="Altitude"
                            placeholder="Enter the altitude"
                            margin="none"
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <br />
                        <TextField
                            name="distanceBetweenTwoRows"
                            label="Distance b/n two rows"
                            placeholder="Enter the distance between two rows"
                            margin="none"
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <br />
                        <TextField
                            name="widthOfPanelArray"
                            label="Width of panel array"
                            placeholder="Enter the width of panel array"
                            margin="none"
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <br />
                        <TextField
                            name="numberOfSteps"
                            label="Number of steps"
                            placeholder="Enter the number of steps"
                            margin="none"
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <br />
                        <center><Button type="submit" className="submit-button">
                            Submit
                        </Button></center>
                </form>
                </Paper>
              </Grid>
              <Grid item md={4} lg={3} xs={6}>
              <Paper className={classes.paper}>
                    <Typography variant="h5" component="h3">
                        Set solar panel parameters:
                    </Typography>
                <form onSubmit={this.handleSubmit}>
                        <TextField
                            name="overCurrent"
                            label="Over current"
                            placeholder="Enter the over current"
                            margin="none"
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <br />
                        <TextField
                            name="overVoltage"
                            label="Over voltage"
                            placeholder="Enter the over voltage"
                            margin="none"
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <br />
                        <center><Button type="submit" className="submit-button">
                            Submit
                        </Button></center>
                </form>
                </Paper>
              </Grid>
              <Grid item md={4} lg={3} xs={6}>
              <Paper className={classes.paper}>
                    <Typography variant="h5" component="h3">
                        Set RTCC value:
                    </Typography>
                <form onSubmit={this.handleSubmit}>
                        <TextField
                            name="unixTime"
                            label="Unix time"
                            placeholder="Enter the unix time"
                            margin="none"
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <br />
                        <TextField
                            name="heartbeatInterval"
                            label="Heartbeat interval"
                            placeholder="Enter the heartbeat interval"
                            margin="none"
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <br />
                        <TextField
                            name="numberOfMessages"
                            label="Number of messages"
                            placeholder="Enter the number of messages"
                            margin="none"
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <br />
                        <TextField
                            name="stow"
                            label="Stow"
                            placeholder="Enter the stow"
                            margin="none"
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <br />
                        <center><Button type="submit" className="submit-button">
                            Submit
                        </Button></center>
                </form>
                </Paper>
              </Grid>
              <Grid item md={4} lg={3} xs={6}>
              <Paper className={classes.paper}>
                    <Typography variant="h5" component="h3">
                        Set max board temperature:
                    </Typography>
                <form onSubmit={this.handleSubmit}>
                        <TextField
                            name="sensor1MaxTemp"
                            label="sensor1 max temperature"
                            placeholder="Enter the sensor1 max temperature"
                            margin="none"
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <br />
                        <TextField
                            name="sensor2MaxTemp"
                            label="sensor2 max temperature"
                            placeholder="Enter the sensor2 max temperature"
                            margin="none"
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <br />
                        <center><Button type="submit" className="submit-button">
                            Submit
                        </Button></center>
                </form>
                </Paper>
              </Grid>
              <Grid item md={4} lg={3} xs={6}>
              <Paper className={classes.paper}>
                    <Typography variant="h5" component="h3">
                        Set motor run conditions:
                    </Typography>
                <form onSubmit={this.handleSubmit}>
                        <TextField
                            name="maxBatteryVoltage"
                            label="max battery voltage"
                            placeholder="Enter the max battery voltage"
                            margin="none"
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <br />
                        <TextField
                            name="minBatteryVoltage"
                            label="min battery voltage"
                            placeholder="Enter the min battery voltage"
                            margin="none"
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <br />
                        <TextField
                            name="maxMotorCurrent"
                            label="Max motor current"
                            placeholder="Enter the max motor current"
                            margin="none"
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <br />
                        <center><Button type="submit" className="submit-button">
                            Submit
                        </Button></center>
                </form>
                </Paper>
              </Grid>
              <Grid item md={4} lg={3} xs={6}>
              <Paper className={classes.paper}>
                    <Typography variant="h5" component="h3">
                        Set battery parameters:
                    </Typography>
                <form onSubmit={this.handleSubmit}>
                        <TextField
                            name="minVoltageToEnableCharging"
                            label="Min voltage to charge"
                            placeholder="Enter the min voltage"
                            margin="none"
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <br />
                        <TextField
                            name="maxVoltageToDisableCharging"
                            label="Max voltage to disable"
                            placeholder="Enter the max voltage"
                            margin="none"
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <br />
                        <TextField
                            name="overCurrentLimit"
                            label="Over current limit"
                            placeholder="Enter the over current limit"
                            margin="none"
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <br />
                        <TextField
                            name="overVoltageLimit"
                            label="Over voltage limit"
                            placeholder="Enter the over voltage limit"
                            margin="none"
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <br />
                        <center><Button type="submit" className="submit-button">
                            Submit
                        </Button></center>
                </form>
                </Paper>
              </Grid>
              
              
              <Grid item md={4} lg={3} xs={6}>
              <Paper className={classes.paper}>
                    <Typography variant="h5" component="h3">
                        Set XBEE config:
                    </Typography>
                <form onSubmit={this.handleSubmit}>
                        <TextField
                            name="panID"
                            label="Pan id"
                            placeholder="Enter the pan id"
                            margin="none"
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <br />
                        <center><Button type="submit" className="submit-button" onClick={this.handleClick}>
                            Submit
                        </Button></center>
                </form>
                </Paper>
              </Grid>
            </Grid>
            </div>
        );
    }
}

Settings.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapDispatchToProps = (dispatch) => ({
    setWifiInfo: (ssid, pass) => {
        dispatch(wifiActions.setWifiInfo(ssid, pass)) 
    },
    setPanID: (panID) => {
        dispatch(wifiActions.setPanID(panID))
    },
  })

const connectedSettings = connect(null, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Settings));
export { connectedSettings as Settings };