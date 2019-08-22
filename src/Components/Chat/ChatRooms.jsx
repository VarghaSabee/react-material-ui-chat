import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import ChatsIcon from '@material-ui/icons/QuestionAnswer';
import { Avatar, Badge } from '@material-ui/core';

import { withStyles } from '@material-ui/styles';

const useStyles = theme => ({
    userAvatar: {
        width: 30,
        height: 30,
        fontSize: '1em'
    },
});

class DirectMessages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chatRooms: this.props.chatRooms
        }
    }

    getRandom = () => {
        return Math.floor(Math.random() * (13 - 1) + 1);
    }

    render() {
        const { classes, handleChatRoomClick } = this.props
        const { chatRooms } = this.state
        return (
            <List className="listReStyle">
                <ListItem className="listItemReStyle">
                    <ListItemIcon>
                        <IconButton edge="end" aria-label="comments">
                            <AddIcon />
                        </IconButton>
                    </ListItemIcon>
                    <ListItemText>
                        Direct Message
                </ListItemText>
                </ListItem>
                <Divider />
                <div className="chatRoomsContainer">
                    <ListItem button onClick={() => { handleChatRoomClick(chatRooms.project.id, "project") }}>
                        <ListItemIcon>
                            <Badge color="secondary" badgeContent={chatRooms.project.unreaded} max={9}>
                                <ChatsIcon />
                            </Badge>
                        </ListItemIcon>
                        <ListItemText primary="Project chat" />
                    </ListItem>
                    {chatRooms.users.map((user, index) => (
                        <ListItem button key={index} onClick={() => { handleChatRoomClick(user.id, "user") }}>
                            <ListItemIcon>
                                <Badge color="secondary" badgeContent={user.unreaded} max={9}>
                                    <Avatar className={classes.userAvatar}>
                                        {user.name.charAt(0)}
                                    </Avatar>
                                </Badge>
                            </ListItemIcon>
                            <ListItemText primary={`${user.name} ${index}`} />
                        </ListItem>
                    ))}
                </div>
            </List>
        )
    }
}

export default withStyles(useStyles)(DirectMessages);