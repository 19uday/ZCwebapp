import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
    ...theme.mixins.gutters(),

  },
  heading: {
    padding: '0px',
  },
  innerRow: {
    border: 'none !important'
  },
  outerRow: {
    borderRight: '1px solid #e0e0e0'
  },
  para: {
    marginTop: '0px',
    marginBottom: '0px',
  }
});

function TrackerDetails(props) {
  const { classes, trackerDetails, trackerID, deviceID } = props;
  const data = trackerDetails
  
  return (
    <Paper className={classes.root}>
        <Typography className={classes.heading}>
          <p className={classes.para}>Tracker Details</p>
        </Typography>
        <Table className={classes.table}>
            
            <TableBody>


                      <TableRow>
                      <TableCell className={classes.innerRow} padding="dense">
                      Tracker ID: </TableCell><TableCell>{data.trackerID} 
                      </TableCell>
                      </TableRow>

                                           <TableRow>
                      <TableCell className={classes.innerRow} padding="dense">
                      Calculated Angle: </TableCell><TableCell>{parseFloat(data.calculatedAngle).toFixed(2)}  deg
                      </TableCell>
                      </TableRow>

                      <TableRow>
                      <TableCell className={classes.innerRow} padding="dense">
                      Current Angle: </TableCell><TableCell>{parseFloat(data.currentAngle).toFixed(2)}  deg
                      </TableCell>
                      </TableRow>


                      <TableRow>
                      <TableCell className={classes.innerRow} padding="dense">
                        Temp: </TableCell><TableCell>{parseFloat(data.temp).toFixed(2)}  F
                      </TableCell>
                      </TableRow>

                      <TableRow>
                      <TableCell className={classes.innerRow} padding="dense">
                        Irradiation: </TableCell><TableCell>{parseFloat(data.irradiation).toFixed(2)}  kW/mm2
                      </TableCell>
                      </TableRow>


                      <TableRow>
                      <TableCell className={classes.innerRow} padding="dense">
                        Battery Current: </TableCell><TableCell>{parseFloat(data.batteryCurrent).toFixed(2)}  A
                      </TableCell>
                      </TableRow>

                      <TableRow>
                      <TableCell className={classes.innerRow} padding="dense">
                      Battery Voltage: </TableCell><TableCell>{parseFloat(data.batteryVoltage).toFixed(2)}  V
                      </TableCell>
                      </TableRow>

 

                      <TableRow>
                      <TableCell className={classes.innerRow} padding="dense">
                      Current Mode: </TableCell><TableCell>{data.currentMode}
                      </TableCell>
                      </TableRow>

                      <TableRow>
                      <TableCell className={classes.innerRow} padding="dense">
                      Error Code: </TableCell><TableCell>{data.errorCode}
                      </TableCell>
                      </TableRow>

                      <TableRow>
                      <TableCell className={classes.innerRow} padding="dense">
                      Motor: </TableCell><TableCell>{data.motor}
                      </TableCell>
                      </TableRow>

                      <TableRow>
                      <TableCell className={classes.innerRow} padding="dense">
                      PV Current: </TableCell><TableCell>{parseFloat(data.pvCurrent).toFixed(2)}  A
                      </TableCell>
                      </TableRow>

                      <TableRow>
                      <TableCell className={classes.innerRow} padding="dense">
                      PV Voltage: </TableCell><TableCell>{parseFloat(data.pvVoltage).toFixed(2)}  V
                      </TableCell>
                      </TableRow>

                      <TableRow>
                      <TableCell className={classes.innerRow} padding="dense">
                      Time Stamp: </TableCell><TableCell>{data.timeStamp.slice(6,8)}-{data.timeStamp.slice(4,6)}-{data.timeStamp.slice(0,4)} , {data.timeStamp.slice(8,10)}:{data.timeStamp.slice(10,12)}
                      </TableCell>
                      </TableRow>

            </TableBody>
        </Table>  
    </Paper>
  );
}

TrackerDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TrackerDetails);
