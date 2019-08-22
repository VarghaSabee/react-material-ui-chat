import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import VertIcon from '@material-ui/icons/MoreVert';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Sender from './ChatTextBox'
import ChatIcon from '@material-ui/icons/Chat';
import CircularProgress from '@material-ui/core/CircularProgress';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


import { Divider } from '@material-ui/core';
import { ListItemAvatar, ListItemSecondaryAction, IconButton, Typography, ListItemText } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const useStyles = theme => ({
    chatCaption: {
        display: "inline-block"
    },
    progress: {
        maxHeight: 25,
        maxWidth: 25,
        color: '#aaa'
    },
    progressContainer: {
        paddingTop: 10,
        textAlign: 'center',
    },
    textWrap: {
        maxWidth: 204,
        overflowWrap: 'break-word'
    }
});

class ProjectRooms extends React.Component {

    constructor(props) {
        super(props);
        this.messagesEnd = null

        this.state = {
            menuAnchorEl: null
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    componentDidMount() {
        this.scrollToBottom()
        this.messagesEnd.addEventListener(
            'scroll',
            function () {
                // scroller on top load messages
                if (this.messagesEnd.scrollTop === 0 && !this.props.loading) {
                    this.props.loadMessages()
                }
            }.bind(this),
            false
        )
    }


    scrollToBottom = () => {
        setTimeout(() => {
            this.messagesEnd.scrollTop = this.messagesEnd.scrollHeight;
        }, 200)
    }

    componentWillUnmount() {
        this.messagesEnd.removeEventListener('scroll', false)
    }


    handleClick(event) {
        this.setState({ menuAnchorEl: event.currentTarget })
    }

    handleClose() {
        this.setState({ menuAnchorEl: null })
    }

    render() {
        const { classes, chatRoom, messages, loading, sendMessage } = this.props;
        const { menuAnchorEl } = this.state;

        return (
            <>
                <Divider />
                <List className="listReStyle">
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar>
                                <ChatIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={chatRoom.name}
                            secondary={`${chatRoom.members} members`}

                        />
                        <ListItemSecondaryAction>
                            <IconButton
                                edge="end"
                                aria-label="menu"
                                aria-controls="simple-menu"
                                aria-haspopup="true"
                                onClick={this.handleClick}
                            >
                                <VertIcon />
                            </IconButton>
                            <Menu
                                id="simple-menu"
                                anchorEl={menuAnchorEl}
                                keepMounted
                                open={Boolean(menuAnchorEl)}
                                onClose={this.handleClose}
                            >
                                <MenuItem onClick={this.handleClose}>Mute</MenuItem>
                            </Menu>

                        </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                </List>
                <List className={["messageList", "listReStyle"].join(" ")}
                    ref={(el) => { this.messagesEnd = el; }}
                >
                    {/* Loader */}
                    {
                        loading ?
                            <div className={classes.progressContainer}>
                                <CircularProgress className={classes.progress} />
                            </div>
                            : ''
                    }

                    {messages.map((m, index) => (
                        <ListItem alignItems="flex-start" key={index}>
                            <ListItemAvatar>
                                <Avatar>
                                    <PersonIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={
                                <> <b>{m.name} {index}</b> &nbsp;
                                  <Typography
                                        variant="caption"
                                        className={classes.chatCaption}
                                        color="textSecondary"
                                    >
                                        {m.date}
                                    </Typography>
                                </>
                            }
                                secondary={
                                    <Typography
                                        variant="body2"
                                        className={classes.textWrap}
                                        color="textSecondary"
                                        noWrap={false}
                                    >
                                        {m.text}
                                    </Typography>
                                }

                            />
                        </ListItem>
                    ))}
                </List>

                <Sender
                    handleSendMessage={sendMessage}
                />

            </>
        )
    }
}
export default withStyles(useStyles)(ProjectRooms);
