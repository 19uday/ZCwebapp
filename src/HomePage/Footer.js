import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const draw = 240;

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '5px',
    [theme.breakpoints.down('lg')]: {
      width: '100%',
    },
    [theme.breakpoints.up('lg')]: {
      width: 'calc(100% - 250px)',
      marginLeft: '245px',
    },
  },
  black: {
      backgroundColor: 'black',
      color: 'silver',
  },
  white: {
      color: 'white',
  },
  appBar: {
      maxHeight: '30px',
  },
});

class Footer extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default" className={classes.appBar}>
        
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Log" />
            <Tab label="Errors" />
            <Tab label="Warnings" />
            <Tab label="Info" />
          </Tabs>
          
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
          className={classes.black}
        >
          <TabContainer dir={theme.direction} className={classes.white}><p className={classes.white}>Log</p></TabContainer>
          <TabContainer dir={theme.direction} className={classes.white}><p className={classes.white}>Errors</p></TabContainer>
          <TabContainer dir={theme.direction} className={classes.white}><p className={classes.white}>Warnings</p></TabContainer>
          <TabContainer dir={theme.direction} className={classes.white}><p className={classes.white}>Info</p></TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Footer);