import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import classNames from 'classnames'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BuildIcon from '@material-ui/icons/Build';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import SendIcon from '@material-ui/icons/Send';
import NetworkWifiIcon from '@material-ui/icons/NetworkWifi';
import SettingsIcon from '@material-ui/icons/Settings';
import InfoIcon from '@material-ui/icons/Info';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { Link } from "react-router-dom";
import { fade } from '@material-ui/core/styles/colorManipulator';
import Grid from '@material-ui/core/Grid';
import io from 'socket.io-client';
import Footer from './Footer.js';
import Paper from '@material-ui/core/Paper';
import SimpleBar from './SimpleBar';



const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 1,

    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    [theme.breakpoints.down('sm')]: {
      height: '10vh',
    },
  },
  navIconHide: {
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  toolbar: {
    [theme.breakpoints.down('sm')]: {
      minHeight: '5vh',
    },
    [theme.breakpoints.up('md')]: {
      minHeight: 64,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('lg')]: {
      position: 'relative',
    },
  },
    content: {
      flexGrow: 1,
      backgroundColor: 'lightgrey',
      padding: theme.spacing.unit,
      [theme.breakpoints.up('md')]: {
        height: 'calc(85vh - 68px)',
      },
    },
  selected: {
    backgroundColor: "lightskyblue"
  },
  search: {
    margin: 'auto',
    backgroundColor: 'silver',
    borderRadius: '5px',
    color: 'black',
  },
  br: {
    padding: '5px',
  },
    footer: {
      [theme.breakpoints.up('md')]: {
        width:'100%',
        position: 'absolute',
        left: 0,
        bottom: 0,
        height:'15vh'
      },
      [theme.breakpoints.down('sm')]: {
        width:'100%',
        left: 0,
        position: 'fixed',
        bottom: 0,
        height: '15vh',
        resize: 'vertical',
        overflow: 'auto',
      },
},
paper: {
  width: 100,
  minHeight: '80%',
  maxHeight: '80%',
  padding: '5px',
  color: 'black',
},
paper1: {
  width: 100,
  minHeight: '80%',
  maxHeight: '80%',
  color: 'black',
  backgroundColor: 'red',
},
typo: {
  overflow: 'initial',
  [theme.breakpoints.down('sm')]: {
    height: '6vh',
  },
},
tool: {
  [theme.breakpoints.down('sm')]: {
    height: '8vh',
  },
},
val: {
  fontSize: '12px',
},
val1: {
  fontSize: '10px',
},
keyy: {
  fontSize: '15px',
},
});


class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false,
    start: true,
    messages:[],
    xbeeMessages: [],
    buttonObject: {
      "id": "zone1",
      "location": "19.8,20.8 Chennai",
      "rainfall": 0.0,
      "windspeed": 0.0,
      "rainfallT": 0.0,
      "windspeedT": 0.0,
      "swversion": "0.0.9",
      "color": "",
      "trackerID": "",
    }
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  hostname = window.location.hostname + ':1111';

  componentDidMount() {
    var func = this;
    var socket = io(`http://${this.hostname}`);
    console.log(socket);
    socket.on("connect", () => {
        console.log("Connected to server!!!");
        socket.emit("subscribeToMessages",{});
    });

    socket.on("disconnect", () => {
        console.log("Disconnect!!!");
    });

    socket.on('message', function (data) {
        console.log(data);
        var res = [];
        var datae = func.state.messages;
        var xbeeDatae = func.state.xbeeMessages;
        
        for(var i=0;i<data.logs.length;i++){
          res = data.logs[i].message.split(" ");
          if(data.logs[i].message.includes("rainFall"))
          {
            
            func.setState({...func.state, buttonObject: {
              ...func.state.buttonObject,
              rainfall: Number(res[2]).toFixed(2)
            }});
            func.setState({...func.state, buttonObject: {
              ...func.state.buttonObject,
              rainfallT: Number(res[4]).toFixed(2)
            }});
          }
          if(data.logs[i].message.includes("windSpeed"))
          {
            func.setState({...func.state, buttonObject: {
              ...func.state.buttonObject,
              windspeed: Number(res[2]).toFixed(2)
            }});
            func.setState({...func.state, buttonObject: {
              ...func.state.buttonObject,
              windspeedT: Number(res[4]).toFixed(2)
            }});
          }
          if(data.logs[i].message.includes("CMD") && data.logs[i].message.includes("DID"))
          {
            console.log(data.logs[i]);
            xbeeDatae.push(data.logs[i]);
          }
          else{
            datae.push(data.logs[i]);
          }

        }
        func.setState({messages: datae});
        func.setState({xbeeMessages: xbeeDatae});
    });

    func.setState({start: true});
}

  buttonObject = {
    "id": "zone1",
    "location": "19.8,20.8 Chennai",
    "rainfall": 110.0,
    "windspeed": 23.0,
    "rainfallT": 2.0,
    "windspeedT": 12.0,
    "swversion": "0.0.9",
  }


  render() {
    const { classes, theme, children } = this.props;
    const drawer = (
      <div>
        <div className={classNames(classes.toolbar, "ftclogo")} />
        <Divider />
        <Link to="/Commissioning">
        <ListItem button className={this.props.selected === 'Commissioning' || !this.props.selected ? classes.selected : ""}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        </Link>
        <Link to="/Commands">
        <ListItem button className={this.props.selected === 'Commands' ? classes.selected : ""}>
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText primary="Control" />
        </ListItem>
        </Link>
        <Link to="/Trends">
        <ListItem button className={this.props.selected === 'Trends' ? classes.selected : ""}>
          <ListItemIcon>
            <TrendingUpIcon />
          </ListItemIcon>
          <ListItemText primary="Trends" />
        </ListItem>
        </Link>
        <Link to="/Wifi">
        <ListItem button className={this.props.selected === 'Wifi' ? classes.selected : ""}>
          <ListItemIcon>
            <NetworkWifiIcon />
          </ListItemIcon>
          <ListItemText primary="Commissioning" />
        </ListItem>
        </Link>
        <Link to="/Settings">
        <ListItem button className={this.props.selected === 'Settings' ? classes.selected : ""}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        </Link>
        <Link to="/About">
        <ListItem button className={this.props.selected === 'About' ? classes.selected : ""}>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>
        </Link>
        <Divider />
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} >
          <Toolbar style={{overflow:"auto"}} className={classes.tool}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap className={classes.typo}>
              Zone Controller Interface
            </Typography>
            
            <Hidden smDown>
                        <Grid container className={classes.root1} spacing={16}>
                <Grid item xs={12} className={classes.pad}>
                    <Grid container className={classes.demo} justify="flex-end" spacing={Number(16)}>
                    <Grid key={0} item >
                    <Paper className={classes.paper} >
                    <center><div className={classes.keyy}><b>ID</b></div> <div className={classes.val}>{this.buttonObject["id"]}</div></center>
                  </Paper>
                  </Grid>
                  <Grid key={1} item >
                  <Paper className={classes.paper} >
                  <center><div className={classes.keyy}>
                    <b>Location</b></div> <div className={classes.val}>{this.state.buttonObject["location"]}</div> </center>
                  </Paper>

                  </Grid>
                  <Grid key={2} item >
                  {this.state.buttonObject['rainfall'] > this.state.buttonObject["rainfallT"] &&
                    <Paper className={classNames(classes.paper, "blink")} >
                    <center><div className={classes.keyy}>
                      <b>RainFall</b></div> <div className={classes.val1}>{this.state.buttonObject["rainfall"]} mm, putting all panels to stow</div></center>
                    </Paper>
                  }
                  {this.state.buttonObject['rainfall'] <= this.state.buttonObject["rainfallT"] &&
                    <Paper className={classes.paper} >
                    <center><div className={classes.keyy}>
                      <b>RainFall</b></div> <div className={classes.val}>{this.state.buttonObject["rainfall"]} mm</div></center>
                    </Paper>
                  }

                  </Grid>
                  <Grid key={3} item >
                  {this.state.buttonObject['windspeed'] > this.state.buttonObject["windspeedT"] &&
                    <Paper className={classNames(classes.paper, "blink")} >
                    <center><div className={classes.keyy}>
                      <b>WindSpeed</b></div> <div className={classes.val1}>{this.state.buttonObject["windspeed"]} km/hr, putting all panels to stow</div></center>
                    </Paper>
                  }
                  {this.state.buttonObject['windspeed'] <= this.state.buttonObject["windspeedT"] &&
                    <Paper className={classes.paper} >
                    <center><div className={classes.keyy}>
                      <b>WindSpeed</b></div> <div className={classes.val}>{this.state.buttonObject["windspeed"]} km/hr</div></center>
                    </Paper>
                  }
                  </Grid>
                  <Grid key={3} item>
                  <Paper className={classes.paper} >
                  <center><div className={classes.keyy}>
                    <b>ZC Version</b> </div><div className={classes.val}><b>S/W</b>{this.state.buttonObject["version"]}</div></center>
                  </Paper>

                  </Grid>
                    </Grid>
                </Grid>
            </Grid>
            </Hidden>
          </Toolbar>
        </AppBar>
        
        <Hidden lgUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>



        <Hidden mdDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Hidden mdUp>
            <SimpleBar button={this.state.buttonObject}/>
          </Hidden>
            {children}
        </main>
        <div className={classes.footer}><Footer mess={this.state.messages} xbee={this.state.xbeeMessages}/></div>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);
