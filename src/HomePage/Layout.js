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
  },
  navIconHide: {
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
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
      maxHeight: 'calc(100vh - 180px)',
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
      },
      [theme.breakpoints.down('md')]: {
        width:'100%',
        left: 0,
        position: 'fixed',
        bottom: 0,
      },
},
paper: {
  width: 100,
  minHeight: '80%',
  maxHeight: '80%',
  padding: '5px',
  color: 'black',
},
typo: {
  overflow: 'initial',
},
val: {
  fontSize: '12px',
},
keyy: {
  fontSize: '15px',
}
});


class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false,
    start: true,
    messages:[],
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  hostname = window.location.hostname+':1111';

  componentDidMount() {
    var func = this;
    
    var socket = io(`http://${this.hostName}`);
    socket.on("connect", () => {
        console.log("Connected to server!!!");
        func.socket.emit("subscribeToMessages",{});
    });

    socket.on("disconnect", () => {
        console.log("Disconnect!!!");
    });

    socket.on('message', function (data) {
        console.log(data);
        func.setState({messages: data})
        
    });

    func.setState({start: true});
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
          <Toolbar style={{overflow:"auto"}}>
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

                        <Grid container className={classes.root1} spacing={16}>
                <Grid item xs={12} className={classes.pad}>
                    <Grid container className={classes.demo} justify="flex-end" spacing={Number(16)}>
                    <Grid key={0} item>
                    <Paper className={classes.paper} >
                    <center><div className={classes.keyy}><b>ID</b></div> <div className={classes.val}>Zone1</div></center>
                  </Paper>
                  </Grid>
                  <Grid key={1} item>
                  <Paper className={classes.paper} >
                  <center><div className={classes.keyy}>
                    <b>Location</b></div> <div className={classes.val}>19.8,20.8 Chennai</div> </center>
                  </Paper>

                  </Grid>
                  <Grid key={2} item>
                  <Paper className={classes.paper} >
                  <center><div className={classes.keyy}>
                    <b>RainFall</b></div> <div className={classes.val}>110 mm</div></center>
                  </Paper>

                  </Grid>
                  <Grid key={3} item>
                  <Paper className={classes.paper} >
                  <center><div className={classes.keyy}>
                    <b>WindSpeed</b></div> <div className={classes.val}>23 km/hr</div></center>
                  </Paper>

                  </Grid>
                  <Grid key={3} item>
                  <Paper className={classes.paper} >
                  <center><div className={classes.keyy}>
                    <b>ZC Version</b> </div><div className={classes.val}><b>S/W</b> 0.0.9</div></center>
                  </Paper>

                  </Grid>
                    </Grid>
                </Grid>
            </Grid>
            
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
            {children}
        </main>
        <div className={classes.footer}><Footer /></div>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);