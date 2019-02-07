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
  },
  black: {
      backgroundColor: 'black',
      color: 'silver',
  },
  white: {
      color: 'white',
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
    const { classes, theme, mess } = this.props;

    console.log(this.props.mess);
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default" className={classes.appBar}>
        
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            centered
          >
            <Tab label="Log" />
            <Tab label="Errors" />
            <Tab label="Warnings" />
            <Tab label="Info" />
            <Tab label="Xbee" />
          </Tabs>
          
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
          className={classes.black}
        >
          <TabContainer dir={theme.direction} className={classes.white}>
          {this.props.mess.map(n => {
                  return (
<p className={classes.white}>{n.message} &nbsp; &nbsp;  <i>{new Date().toLocaleDateString()}</i> &nbsp; <i>{new Date().toLocaleTimeString()}</i> </p>
                  )
          })}
          </TabContainer>
          <TabContainer dir={theme.direction} className={classes.white}><p className={classes.white}>Errors</p></TabContainer>
          <TabContainer dir={theme.direction} className={classes.white}><p className={classes.white}>Warnings</p></TabContainer>
          <TabContainer dir={theme.direction} className={classes.white}><p className={classes.white}>Info</p></TabContainer>
          <TabContainer dir={theme.direction} className={classes.white}>          
          {this.props.xbee.map(m => {
                  return (
            <p className={classes.white}>{m.message} &nbsp;  &nbsp; <i>{new Date().toLocaleDateString()}</i> &nbsp; <i>{new Date().toLocaleTimeString()}</i></p>
                  )
          })}
          </TabContainer>
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