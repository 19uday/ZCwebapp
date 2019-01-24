import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Button, Grid } from '@material-ui/core';
import classNames from 'classnames'

const styles = theme => ({
  root: {
    width: '100%',
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  heading: {
    paddingLeft: '24px',
    height: 'calc(15%-48px)'
  },
  zoneImage: {
    height: '15%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  table: {
    overflowX: 'auto',
    height: '50%'
  },
  image: {
    width: '35%',
    height: '140%',
    backgroundImage: 'url(/img/map.png)',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat'
  },
  dummy: {
    width: '35%',
    height: '100%',
  },
  tracker: {
    maxHeight: '30px',
    minWidth: '120px',
    maxWidth: '130px',
    border: '1px solid black',
    boxShadow: '1px 1px 5px black',
    cursor: 'pointer',
    textAlignLast: 'end',
    lineHeight: '0.5em'
  },
  clicked: {
    maxHeight: '30px',
    minWidth: '120px',
    maxWidth: '130px',
    border: '1px solid black',
    boxShadow: 'inset 1px 1px 5px black',
    cursor: 'pointer',
    textAlignLast: 'end',
    lineHeight: '0.5em'

  },
  head: {
    marginBottom: '4px',
  },
  
});

function DeviceList(props) {
  const { classes, devices, selectedTrackerID } = props;

  const data = devices

  return (
    <Paper className={classes.root}>
        <Typography className={classes.heading} variant="headline" component="h3">
          <p className={classes.head}>Trackers Discovered</p>
        </Typography>
        <Grid className={classes.table} container spacing={24} direction='row' justify='space-evenly' alignItems='center'>
          {data.map(n => {
                  return (
                    <Grid item xs 
                    className={classNames('trackerIcon', n.trackerID === selectedTrackerID ? classes.clicked : classes.tracker)}
                    onClick={() => props.getTrackerDetails(n.trackerID)}
                    key={n.trackerID}>{n.trackerID}</Grid>
                  )
          })}
        </Grid>
        <div className={classes.zoneImage}>
            <div className={classes.image}></div>
           
            <div className={classes.dummy}></div>
        </div>
    </Paper>
  );
}

DeviceList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DeviceList);