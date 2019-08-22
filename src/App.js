import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import ChatIcon from '@material-ui/icons/Chat';

import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ChatList from './Components/Chat/Chat';
import { withStyles } from '@material-ui/styles';



const useStyles = theme => ({
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
  }
});

const theme_dark = createMuiTheme({
  palette: {
    type: 'dark', // Switching the dark mode on is a single property value change.
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      right: false,
      allUnreaded: 200
    }
  }


  toggleDrawer = (open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    this.setState({ 'right': open });
  };

  render() {
    const { classes } = this.props;
    const { allUnreaded } = this.state;

    return (
      <MuiThemeProvider theme={theme_dark}>
        <>
          <Drawer
            anchor="right"
            className="chatGrid"
            classes={{ paper: classes.paper }}
            open={this.state.right}
            onClose={this.toggleDrawer(false)}
            variant='persistent'
          >
            <Grid
              container
              direction="column"
              justify="flex-end"
              alignItems="center"
              spacing={0}
            >
              <ChatList
                ref={instance => { this.child = instance; }}
                handleToggleDrawer={this.toggleDrawer}
              />
            </Grid>
          </Drawer>
          {/* Fab chat */}
          <Zoom
            unmountOnExit
            in={!this.state.right}
            className={classes.fab}
          >
            <Badge color="primary" badgeContent={allUnreaded} invisible={!Boolean(allUnreaded)} >
              <Fab
                aria-label="Open chat"

                onClick={this.toggleDrawer(true)}
              >
                <ChatIcon />
              </Fab>
            </Badge>
          </Zoom>
        </>
      </MuiThemeProvider>
    );
  }
}
export default withStyles(useStyles)(App);
