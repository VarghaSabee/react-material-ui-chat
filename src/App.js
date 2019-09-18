import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

// AppBar height 48px
const heigthWithoutAppBar = window.innerHeight - 48

const styles = theme => ({
  paper: {
    // background: "rgb(63,17,64)",
  },

  fab: {
    position: 'absolute',
    bottom: '15px',
    right: '15px',
  },
  cardStyle: {
    borderRadius: '0',
    height: '100%',
  },

  cardHeaderReStyle: {
    padding: '0'
  },

  inline: {
    display: 'inline',
  },
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  roodGrid: {
    height: `${heigthWithoutAppBar}px`
  },
  editorGrid: {
    height: `${heigthWithoutAppBar * 0.75}px`,
    borderBottom: '4px solid #888'
  },
  consoleGrid: {
    height: `${heigthWithoutAppBar * 0.25}px`,
  },
  projectSelector: {
    position: 'absolute',
    zIndex: 1,
    left: '50%',
    transform: 'translate(-50%, 0)',
    top: 12,
  }
});




class App extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              News
          </Typography>

            <div className={classes.projectSelector}>
              <span>Project: Hello World XML</span>
            </div>

            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>


        <Grid celled="true" padded="true" className={classes.roodGrid}>
          <Grid item xs container direction="row" className={classes.roodGrid} >
            <Grid
              item xs={3}
              container
              direction="column"
              className={classes.roodGrid}
              style={{ borderRight: '4px solid #888' }}
            >
              Hello File Three Grid
            </Grid>
            <Grid item xs={9} container direction="column" className={classes.roodGrid} >
              <Grid item container direction="row" className={classes.editorGrid} >
                Hello Editor Grid
              </Grid>

              <Grid item container direction="row" className={classes.consoleGrid} >
                Hello Console Grid
              </Grid>

            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default withStyles(styles)(App);
