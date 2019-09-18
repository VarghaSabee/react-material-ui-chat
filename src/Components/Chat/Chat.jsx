import React from 'react';

import ProjectRooms from './MessageContainer'
import DirectMessages from './ChatRooms'
import Avatar from '@material-ui/core/Avatar';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';

import SockJS from 'sockjs-client'
import Stomp from 'stomp-websocket'

import { IconButton, Divider } from '@material-ui/core';
import { ListItemAvatar, ListItemSecondaryAction, ListItemText } from '@material-ui/core';

import { withStyles } from '@material-ui/styles';

const drawerWidth = 300;

const useStyles = theme => ({
    list: {
        width: drawerWidth,
    },
    dot: {
        height: '8px',
        width: '8px',
        backgroundColor: '#00FF00',
        borderRadius: '50%',
        display: 'inline-block'
    }
});

var stompClient = Stomp.over( new SockJS('http://devapi.kotlab.io/ws'))

class ChatList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            connected: false,

            user: {
                name: "User User",
            },
            chatRooms: {
                project: {
                    id: 4521, // Some id like project
                    name: "Project chat",
                    members: 8,
                    unreaded: 7
                },
                users: [
                    { id: 15, name: "User 0", unreaded: 0, members: 2 },
                    { id: 18, name: "User 1", unreaded: 1, members: 2 },
                    { id: 14, name: "User 2", unreaded: 5, members: 2 },
                    { id: 11, name: "User 3", unreaded: 3, members: 2 },
                ]
            },
            // Count of unreaded messages
            allUnreaded: 16,
            // By deafault open project room 
            openedRoom: {
                id: 4521, // Some id like project
                name: "Project chat",
                members: 8,
                unreaded: 15
            },
            messages: [],
            endOfChatMessages: false,
            loading: false
        }
        this.sendMessage = this.sendMessage.bind(this)
        this.loadMessages = this.loadMessages.bind(this)
        this.handleChatRoomChange = this.handleChatRoomChange.bind(this)


        stompClient.connect({ uuid: 'uuid2' }, (frame) => {
            console.log('Connected: ' + frame);
            var userName = frame.headers['user-name'];
            console.log(userName);

            stompClient.subscribe('/app/chat.project.1', (content) => {
                console.log(content);
            });

            stompClient.debug = (ok) =>{
                console.log(ok)
            }

        });

    }

    /*********************************** */
    componentDidMount() {
        this.loadMessages()



    }

    componentWillUnmount() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
    }
    /**************************************** */
    handleChatRoomChange = (roomId, type) => {

        /**
         * Remove on real world app
         */
        this.setState({ endOfChatMessages: false })

        // get chat room by id from server 
        let room = this.state.chatRooms.project
        // example
        if (type !== "project") {
            room = this.state.chatRooms.users.find((obj) => {
                return roomId === obj.id
            })
        }
        // select same room
        if (room.id === this.state.openedRoom.id) return

        this.setState({ openedRoom: room })
        this.setState({ messages: [] })
        this.loadMessages(true)
    }


    loadMessages(firstLoad) {

        /***
         * Remove on real world app
         */
        if (this.state.endOfChatMessages) {
            return
        }


        this.setState({ loading: true })
        // replace with axios call
        setTimeout(() => {
            const messages = []
            for (let i = 0; i < 5; i++) {
                messages.push({
                    name: "User",
                    date: new Date().toLocaleString().split(',')[1],
                    text: Math.random().toString(36).substring(2, 30) + Math.random().toString(36).substring(2, 15),
                })
            }

            // push messages to state
            const m = this.state.messages


            /**
             * Only on exxample
             * if load messages from server detect the messages end
             */
            if (m.length > 24) {
                this.setState({ endOfChatMessages: true })
            }

            this.setState({
                messages: messages.concat(m)
            })
            // loading false
            this.setState({ loading: false })

            if (firstLoad) {
                this.child.scrollToBottom()
                return
            }
            if (this.child) {
                this.child.messagesEnd.scrollTop = 10
            }

        }, 1000)

    }

    sendMessage = message => {
        const m = this.state.messages
        const date = new Date().toLocaleString().split(',')[1]
        this.setState({
            messages: [...m, {
                name: "User",
                date: date,
                text: message,
            }]
        })


        /*************************************** */
        stompClient.send('/user/topic/chat.project.1', {}, JSON.stringify({ 'message': message }));
        /*************************************** */

        this.child.scrollToBottom()
    }

    render() {
        const { classes, handleToggleDrawer } = this.props;
        const { user, chatRooms, openedRoom, messages, loading } = this.state
        return (
            <div
                className={classes.list}
                role="presentation"

            >
                <List className="listReStyle">
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp"
                                ref={instance => { this.avatarRef = instance; }}
                            >
                                U
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={user.name}
                            secondary={
                                <>
                                    <span className={classes.dot}></span>&nbsp; online
                                </>
                            }
                        />
                        <ListItemSecondaryAction>
                            <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={handleToggleDrawer(false)}
                            >
                                <Tooltip title="Hide chat" aria-label="Hide chat">
                                    <ChevronRightIcon />
                                </Tooltip>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
                <Divider />
                <DirectMessages
                    chatRooms={chatRooms}
                    handleChatRoomClick={this.handleChatRoomChange}
                />
                <Divider />
                <ProjectRooms
                    ref={instance => { this.child = instance; }}
                    chatRoom={openedRoom}
                    messages={messages}
                    loadMessages={this.loadMessages}
                    loading={loading}
                    sendMessage={this.sendMessage}
                />
            </div>
        )
    }
}

export default withStyles(useStyles)(ChatList);
