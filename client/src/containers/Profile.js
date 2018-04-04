import React from 'react';
import { Redirect } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';

import UserInfoSection from '../components/UserInfoSection';
import NavBar from '../components/NavBar';
import PostBar from '../components/PostBar';

import style from './stylesheets/Profile';
import cookies from '../utils/cookies';


export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.handleFollow = this.handleFollow.bind(this);
        this.handleReport = this.handleReport.bind(this);
        this.state = {
            userNotFound: false,
            requestedUserName: null,
            userInfo: {
                username: !this.props.self? this.props.username:
                          'tanveer_gill_',
                userInitials: !this.props.self?
                              this.props.username[0].toUpperCase():
                              'TG',
                totalPosts: 1,
                totalFollowers: 199,
                totalFollowing: 102,
                isFollowing: false,
            },
            postsInfo: [{
                videoUrl: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
                message: "The songs we join in are beeswax candles burning" +
                         "with no smoke a clean fire licking at the evening" +
                         "our voices small flames quivering. The songs string" +
                         " us like beads on the hour. The ritual is its own" +
                         " melody that leads us."
                }
            ],
        }
    }

    componentWillMount() {
        if (!cookies.readCookie('Token')) {
            window.location.replace('/');
        }
    }

    componentDidMount() {
        document.title = 'UNews | Profile';

    }

    handleProfileRequest = (username) => {
        if (username) {
            window.location.replace('/profile/' + username.trim())

        } else {
            this.setState({
                userNotFound: true,
                requestedUserName: username.trim().replace('@', ""),
            });
        }
    }

    handleProfileClose = () => {
        this.setState({
            userNotFound: false,
            requestedUserName: null,
        });
    }

    handleFollow() {
        this.setState({
            userNotFound: false,
            requestedUserName: null,
            userInfo: {
                username: this.state.userInfo.username,
                userInitials: this.state.userInfo.userInitials,
                totalPosts: this.state.userInfo.totalPosts,
                totalFollowers: !this.state.userInfo.isFollowing?
                                this.state.userInfo.totalFollowers + 1:
                                this.state.userInfo.totalFollowers - 1,
                totalFollowing: this.state.userInfo.totalFollowing,
                isFollowing: !this.state.userInfo.isFollowing,
            }
        });
    }

    handleReport() {
        alert("Uploding the report...");
    }

    render() {
        if (cookies.readCookie('Token')) {
            return (
                <MuiThemeProvider>
                    <div>
                        <NavBar handleRequest={this.handleProfileRequest}/>
                        <UserInfoSection
                            self={this.props.self}
                            username={this.state.userInfo.username}
                            userInitials={this.state.userInfo.userInitials}
                            totalPosts={this.state.userInfo.totalPosts}
                            totalFollowers={this.state.userInfo.totalFollowers}
                            totalFollowing={this.state.userInfo.totalFollowing}
                            isFollowing={this.state.userInfo.isFollowing}
                            handleFollow={this.handleFollow}
                            handleReport={this.handleReport}/>

                        <PostBar posts={this.state.postsInfo}/>
                    </div>
                </MuiThemeProvider>
            );
        }
    }
}
