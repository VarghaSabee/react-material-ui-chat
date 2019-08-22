import React from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Send from '@material-ui/icons/Send';
import { withStyles } from '@material-ui/styles';


const useStyles = theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    margin: '0 0 4px 0',
    borderRadius: 0,
    border: '1px solid #888',

  },
  input: {
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
});

class Sender extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    }

    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
  }

  handleOnChange = (event) => {
    this.setState({
      message: event.target.value
    })
  }

  handleKeyPress = e => {
    if (e.keyCode === 13) {
      e.preventDefault()
      // New line Ctrl + Enter
      if (e.ctrlKey) {
        const m = this.state.message
        this.setState({
          message: `${m}\n`
        })
        return
      }
      // Send message Enter
      this.sendMessage()
    }
  }

  sendMessage = () => {
    if (this.state.message.trim() === '') return
    this.props.handleSendMessage(this.state.message)
    this.setState({
      message: ''
    })
  }

  render() {

    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <InputBase
          className={classes.input}
          multiline={true}
          value={this.state.message}
          placeholder="Entrer message .."
          onChange={this.handleOnChange}
          onKeyDown={this.handleKeyPress}
          inputProps={{ 'aria-label': 'search google maps' }}
        />
        <IconButton
          className={classes.iconButton}
          aria-label="search"
          onClick={this.sendMessage}
        >
          <Send />
        </IconButton>
      </Paper>
    );
  }
}
export default withStyles(useStyles)(Sender);