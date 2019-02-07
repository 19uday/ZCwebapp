import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Button} from '@material-ui/core';

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
      fontSize: '16px',
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
          <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.white}  align="left">Date</TableCell>
            <TableCell className={classes.white}  align="left">Time</TableCell>
            <TableCell align="right" className={classes.white}>Log</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.mess.map(row => (
            <TableRow key={row.id}>
              <TableCell  className={classes.white}  align="left">{row.date}</TableCell>
              <TableCell className={classes.white}  align="left">{row.time}</TableCell>
              <TableCell component="th" scope="row" align="right" className={classes.white}>
                {row.log}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
          </TabContainer>
          <TabContainer dir={theme.direction} ><p className={classes.white}>Errors</p></TabContainer>
          <TabContainer dir={theme.direction} ><p className={classes.white}>Warnings</p></TabContainer>
          <TabContainer dir={theme.direction}><p className={classes.white}>Info</p></TabContainer>
          <TabContainer dir={theme.direction} className={classes.white}>          
          <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.white} align="left">Date</TableCell>
            <TableCell className={classes.white} align="left">Time</TableCell>
            <TableCell className={classes.white} align="right">Log</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.xbee.map(row => (
            <TableRow key={row.id}>
              <TableCell className={classes.white} align="left">{row.date}</TableCell>
              <TableCell className={classes.white} align="left">{row.time}</TableCell>
              <TableCell component="th" scope="row" align="right" className={classes.white}>
                {row.log}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
          </TabContainer>
        </SwipeableViews>
        <div>
        <Button variant="contained" className={classes.yellow} onClick={this.trigger}>
                          Download Logs
        </Button>
        </div>
      </div>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Footer);