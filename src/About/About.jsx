import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    textAlign: 'center',
  }
});

 class About extends Component {


    render(){
        const { classes } = this.props;
        
        return (
            <div >
            <Grid container className="flex" alignItems="stretch" direction="row" justify="space-evenly">
              <Grid item xs={11} sm={10} md={8} lg={5}>
                <Paper className={classes.paper}>
                    <Typography variant="h5" component="h3">
                    ZC Version S/W:
                    </Typography>
                    <p>
                    0.0.9
                    </p>
                    <br />
                    <Typography variant="h5" component="h3">
                        Release Date: 
                    </Typography>
                   <p>
                    20-12-2018
                    </p>
                </Paper>
              </Grid>
            </Grid>
        <br />
            <center>
                <img src={require('./openApp.png')} />
            </center>
            </div>
        );
    }
}

About.propTypes = {
  classes: PropTypes.object.isRequired,
};


const connectedAbout = withStyles(styles, { withTheme: true })(About);
export { connectedAbout as About };
