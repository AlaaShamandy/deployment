import React from 'react';

import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import {
    BottomNavigation,
    BottomNavigationItem
} from 'material-ui/BottomNavigation';

import style from './stylesheets/UserInfoSection';


export default function UserInfoSection(props) {
    if (!props.self) {
        return (
            <div>
                <Paper style={style.useInfo}
                       zDepth={0}
                       rounded={false}>
                       <Avatar size={100} style={style.avatar}>{props.userInitials}</Avatar>
                       <div style={style.username}>
                           {props.username}
                           <Chip onClick={props.handleFollow}
                                 style={style.follow}
                                 labelStyle={style.labelStyle}>
                                 {props.isFollowing? "Following": "Follow"}
                           </Chip>
                       </div>
                       <Info totalPosts={props.totalPosts}
                             totalFollowers={props.totalFollowers}
                             totalFollowing={props.totalFollowing}/>
                </Paper>
            </div>
        );

    } else {
        return (
            <div>
                <Paper style={style.useInfo}
                       zDepth={0}
                       rounded={false}>
                       <Avatar size={100} style={style.avatar}>{props.userInitials}</Avatar>
                       <div style={style.username}>
                           {props.username}
                           <Chip onClick={props.handleReport}
                                 style={style.follow}
                                 labelStyle={style.labelStyle}>
                                 {"Upload"}
                           </Chip>
                       </div>
                       <div style={style.reportText}>
                           <textarea placeholder="Enter a report message..."
                                     style={style.textArea}
                                     id={"report-text"}
                                     rows="4" cols="50">
                           </textarea>
                       </div>
                       <Info totalPosts={props.totalPosts}
                             totalFollowers={props.totalFollowers}
                             totalFollowing={props.totalFollowing}/>
                </Paper>
            </div>
        );
    }
}


function Info(props) {
    var postsIcon = <FontIcon className="material-icons">{props.totalPosts}</FontIcon>;
    var followersIcon = <FontIcon className="material-icons">{props.totalFollowers}</FontIcon>;
    var followingIcon = <FontIcon className="material-icons">{props.totalFollowing}</FontIcon>;
    return (
        <BottomNavigation style= {style.infoComponents}>
            <BottomNavigationItem label={props.totalPosts > 1? "posts": "post"} icon={postsIcon}/>
            <BottomNavigationItem label="followers" icon={followersIcon}/>
            <BottomNavigationItem label="following" icon={followingIcon}/>
        </BottomNavigation>
    );
}

function Follow(props) {
    if (!props.self) {
        return (
            <Chip onClick={props.handleFollow}
                  style={style.follow}
                  labelStyle={style.labelStyle}>
                  {props.isFollowing? "Following": "Follow"}
            </Chip>
        );
    }
}
