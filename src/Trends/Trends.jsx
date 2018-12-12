import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import classNames from 'classnames'
import { Grid, Button, Checkbox, ListItemText } from '@material-ui/core';
import { connect } from 'react-redux'
import { trendsActions } from '../_actions'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import moment from 'moment'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};



const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      height: '90.5%'
    },
    formControl: {
      margin: theme.spacing.unit * 3,
      width: '100%',
      marginLeft: '0px',
      marginRight: '0px'
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: theme.spacing.unit / 4,
    },
    paper: {
        margin: theme.spacing.unit * 2,
        boxShadow: '0px 0px 1px 0px grey',
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    input: {
        margin: '20px'
    },
    button: {
        margin: 'auto',
        width: '100%'
    },
    width: {
        width: '70%'
    }
  });

class Trends extends React.Component {

    state = {
        parameter: "",
        trackers: []
      };

    setTrackers = event => {
        this.setState({ trackers: event.target.value });
    };

    setParameter = event => {
        this.setState({ parameter: event.target.value });
    };

    plot = event => {
        this.props.getTrends(this.state.trackers, this.state.parameter)
    }

    render() {
        const { classes, theme, commissioningData, loaded, loadedTrends, trends } = this.props
        const parameters = [
            'computed angle',
            'battery voltage',
            'battery current',
            'pv voltage',
            'pv current',
            'actual angle'
        ]

        return(
            loaded ? 
            <Grid container className={classNames("flex", classes.root)} justify="space-evenly" direction="row" alignItems="stretch">
                <Grid item xs={3} className={classNames("flex", classes.paper)}>
                  <Grid container direction="column" justify="space-evenly" alignItems="center">
                    <Grid item className={classes.width}>
                    <FormControl className={classes.formControl} >
                    <InputLabel htmlFor="select-trackers">Select trackers</InputLabel>
                        <Select
                            multiple
                            value={this.state.trackers}
                            onChange={this.setTrackers}
                            input={<Input id="select-trackers" />}
                            renderValue={selected => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            {commissioningData ? this.props.commissioningData.map(tracker => (
                            <MenuItem key={tracker.trackerID} value={tracker.trackerID}>
                                <Checkbox checked={this.state.trackers.indexOf(tracker.trackerID) > -1} />
                                <ListItemText primary={tracker.trackerID} />
                            </MenuItem>
                            )) : ""}
                        </Select>
                    </FormControl> 
                    </Grid>
                    <Grid item className={classes.width}>
                    <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="select-parameter">Select parameter</InputLabel>
                        <Select
                            native
                            value={this.state.parameter}
                            onChange={this.setParameter}
                            inputProps={{
                                name: 'parameter',
                                id: 'select-parameter'
                            }}
                        >
                            <option value="" />
                            {parameters.map(parameter => (
                            <option key={parameter} value={parameter}>
                                {parameter}
                            </option>
                            ))}
                        </Select>
                    </FormControl> 
                    </Grid>
                    <Grid item className={classes.width}>
                    <Button variant="outlined" disabled={this.state.trackers === [] || this.state.parameter === "" ? true : false} component="span" className={classes.button} onClick={this.plot}>
                        Plot
                    </Button>
                    </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6} className={classNames("flex", classes.paper)} >
                <div style={{ width:'100%', height:'100%' }} 
                    ref={ref => {
                        this.contentDiv = ref;
                    }}>
                {loadedTrends ? 
                
                    <LineChart width={this.contentDiv.getBoundingClientRect().width} height={this.contentDiv.getBoundingClientRect().height} data={trends.coordinates}
                            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                        <XAxis tickFormatter = {(unixTime) => moment(unixTime).format('HH:mm MMM Do YY')} dataKey="timeStamp"/>
                        <YAxis/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip />
                        <Legend />
                        {this.state.trackers.map(t => {
                            return <Line type="monotone" dataKey={t} stroke="#8884d8" activeDot={{r: 8}}/>
                        })}
                    </LineChart>
                : "select data to plot"}
                </div>
                </Grid>
            </Grid>
            : "LOADING"
        )
    }
}

function mapStateToProps(state) {
    const { loaded, commissioningData } = state.commissioning;
    const { trends } = state.trends
    const loadedTrends = state.trends.loaded
    return {
      commissioningData,
      loaded,
      trends,
      loadedTrends
    };
}

const mapDispatchToProps = (dispatch) => ({
    getTrends: (trackers, parameters) => {
        dispatch(trendsActions.getTrends(trackers, parameters))
    }
})

const connectedTrends = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Trends));
export { connectedTrends as Trends };