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
import { Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: '50%',
    margin: 'auto',
  }, 
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  button: {
    display: 'block',
    marginTop: theme.spacing.unit * 2,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflowY: 'scroll',
    height: '100%',
  },
  paper1: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: '50%',
    margin: 'auto',
    height: '120px',
    paddingBottom: "10px",
  }, 
});

class Wifi extends Component {

    state = {
        ssid: '',
        password: '',
        submitted: false,
        selectedFile: null,
        age:'',
        open: false,
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

  handleselectedFile = event => {
    console.log(event.target.files[0])
    this.setState({
      selectedFile: event.target.files[0]
    })
  }

  handleUpload = event => {
    this.props.upload(this.state.selectedFile)
  }

  handleChange1 = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

    render(){
        const { classes } = this.props;
        
        return (
            <div className={classes.root} >
            <Grid container spacing={24} className="flex" alignItems="stretch" direction="row" justify="space-evenly">
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Typography variant="h5" component="h3">
                        Wifi Settings
                    </Typography>
                    <form onSubmit={this.handleSubmit}>
                        <TextField
                            name="ssid"
                            id="outlined-name"
                            label="SSID"
                            placeholder="Enter the ssid"
                            className="ssid-field"
                            margin="normal"
                            className={classes.textField}
                            variant="outlined"
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <br />
                        <TextField
                            name="password"
                            id="outlined-name"
                            label="Password"
                            className="password-field"
                            placeholder="Enter the password"
                            type="password"
                            className={classes.textField}
                            autoComplete="current-password"
                            margin="normal"
                            variant="outlined"
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <br />
                        <br />
                        <center><Button type="submit" className="submit-button">
                            Connect
                        </Button></center>
                    </form>
                </Paper>
              </Grid>
              <Grid item xs={12}>
              <Paper className={classes.paper}>
                    <Typography variant="h5" component="h3">
                        Upload Zone tracker Info:
                    </Typography>
                    <Typography component="p">
                        Upload the JSON document that contains the static initialization data.
                    </Typography>
                <form>
                <center>
                    <input
                        accept="*.json"
                        className={classes.input}
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={this.handleselectedFile}
                    />
                    <label htmlFor="contained-button-file">
                        <Button style={{marginRight: '5%'}} variant="contained" component="span" className={classes.button}>
                            Select File
                        </Button>
                    </label>
                    <Button onClick={this.handleUpload} variant="contained" component="span" className={classes.button}>
                        Upload
                    </Button>
                </center>
                </form>
                </Paper>
              </Grid>
              <Grid item xs={12}>
              <Paper className={classes.paper1}>
              <center>
              <form autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="demo-controlled-open-select">Select Sensor</InputLabel>
          <Select
            open={this.state.open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            value={this.state.age}
            onChange={this.handleChange1}
            inputProps={{
              name: 'sensor',
              id: 'demo-controlled-open-select',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Wind">Wind Sensor</MenuItem>
            <MenuItem value="Temp">Temp Sensor</MenuItem>
            <MenuItem value="Other">Other Sensor</MenuItem>
          </Select>
        </FormControl>
      </form>
      </center>
                </Paper>
              </Grid>
            </Grid>
            </div>
        );
    }
}

Wifi.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapDispatchToProps = (dispatch) => ({
    setWifiInfo: (ssid, pass) => {
        dispatch(wifiActions.setWifiInfo(ssid, pass)) 
    },
    upload: file => {
        dispatch(wifiActions.upload(file))
    }
  })

const connectedWifi = connect(null, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Wifi));
export { connectedWifi as Wifi };