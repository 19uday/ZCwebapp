import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  }
  
});

export class About extends Component {


    render(){
        const { classes } = this.props;
        
        return (
            <div className={classes.root} >
            <Grid container className="flex" alignItems="stretch" direction="row" justify="space-evenly">
              <Grid item xs={11} sm={10} md={8} lg={5}>
                <Paper className={classes.paper}>
                    <Typography variant="h5" component="h3">
                        Firmware version
                    </Typography>
                </Paper>
              </Grid>
            </Grid>
            </div>
        );
    }
}

About.propTypes = {
  classes: PropTypes.object.isRequired,
};