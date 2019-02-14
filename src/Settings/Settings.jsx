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
import { settingsActions } from '../_actions'
import { Typography, FormControl } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

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
        maxWindSpeed: 5,
        maxRainFall: 5,
        meanWindSpeed: 2,
        windSpeedTimer: 30,
        timeZone: "",
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

  handleThreshold = () => {
      this.props.threshold(this.state.maxWindSpeed, this.state.maxRainFall, this.state.meanWindSpeed, this.state.windSpeedTimer);
  }

  handleHeartBeat = () => {
      this.props.heartBeat(this.state.enabled, this.state.hbinterval, this.state.maxMsgs);
  }

  handleTimeZone = () => {
      this.props.timeZone(this.state.timeZone);
  }

    render(){
        const { classes } = this.props;
        
        return (
            <div className={classes.root}>
            <Grid  spacing={24} container>
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

                            <Grid item md={4} lg={3} xs={6}>
              <Paper className={classes.paper}>
                    <Typography variant="h5" component="h3">
                        Threshold:
                    </Typography>
                <form onSubmit={this.handleSubmit}>
                        <TextField
                            name="maxWindSpeed"
                            label="Maximum Wind Speed"
                            placeholder="Maximum Wind Speed"
                            margin="none"
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <br />
                        <TextField
                            name="meanWindSpeed"
                            label="Mean Wind Speed"
                            placeholder="Mean Wind Speed"
                            margin="none"
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <br />
                        <TextField
                            name="windSpeedTimer"
                            label="Wind Speed Timer"
                            placeholder="Wind Speed Timer"
                            margin="none"
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <br />
                        <TextField
                            name="maxRainFall"
                            label="Maximum Rain Fall"
                            placeholder="Maximum Rain Fall"
                            margin="none"
                            onChange={this.handleChange}
                            fullWidth
                        />

                        <br />
                        <center><Button type="submit" className="submit-button" onClick={this.handleThreshold}>
                            Submit
                        </Button></center>
                </form>
                </Paper>
              </Grid>

        <Grid item md={4} lg={3} xs={6}>
              <Paper className={classes.paper}>
                    <Typography variant="h5" component="h3">
                        Heart Beat Settings:
                    </Typography>
                    <br />
                <form onSubmit={this.handleSubmit}>
          <InputLabel htmlFor="enabled-simple">Enabled &nbsp; </InputLabel>
          <Select
            value={this.state.enabled}
            onChange={this.handleChange}
            inputProps={{
              name: 'enabled',
              id: 'enabled-simple',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="enabled">Enabled</MenuItem>
            <MenuItem value="disabled">Disabled</MenuItem>
          </Select>
          <TextField
                            name="hbinterval"
                            label="Heart Beat Interval"
                            placeholder="Heart Beat Interval"
                            margin="none"
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <br />
                        <TextField
                            name="maxMsgs"
                            label="Max msgs before stow"
                            placeholder="Max msgs before stow"
                            margin="none"
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <br />
                        <center>
                            <Button type="submit" className="submit-button" onClick={this.handleHeartBeat}>
                                Submit
                            </Button>
                        </center>
                </form>
                </Paper>
              </Grid>

              <Grid item md={4} lg={3} xs={6}>
              <Paper className={classes.paper}>
                    <Typography variant="h5" component="h3">
                       Select Time Zone:
                    </Typography>
                    <br />
                <form onSubmit={this.handleSubmit}>
          <Select
            value={this.state.timeZone}
            onChange={this.handleChange}
            inputProps={{
              name: 'timeZone',
              id: 'timeZone-simple',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="IST - +5:30">+ &nbsp; 5:30</MenuItem>
            <MenuItem value="MST - -7:00">- &nbsp; 7:00</MenuItem>
          </Select>
                        <br />
                        <center>
                            <Button type="submit" className="submit-button" onClick={this.handleTimeZone}>
                                Submit
                            </Button>
                        </center>
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
    setPanID: (panID) => {
        dispatch(settingsActions.setPanID(panID))
    },
    threshold: (maxWindSpeed, maxRainFall, meanWindSpeed, windSpeedTimer) => {
        dispatch(settingsActions.threshold(maxWindSpeed, maxRainFall, meanWindSpeed, windSpeedTimer))
    },
    heartBeat: (enabled, hbinterval, maxMsgs) => {
        dispatch(settingsActions.heartBeat(enabled, hbinterval, maxMsgs))
    },
    timeZone: (time) => {
        dispatch(settingsActions.timeZone(time))
    },
  })

const connectedSettings = connect(null, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Settings));
export { connectedSettings as Settings };
