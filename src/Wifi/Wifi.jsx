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
  
});

class Wifi extends Component {

    state = {
        ssid: '',
        password: '',
        submitted: false,
        selectedFile: null
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