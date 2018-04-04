import React, { Component } from 'react';
import { Link, Redirect} from 'react-router-dom';

import SearchBar from './SearchBar';
import SignInDialog from './SignInDialog';
import SignUpDialog from './SignUpDialog';

import style from './stylesheets/NavBar';

/* Material UI components */
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import Snackbar from 'material-ui/Snackbar';

import cookies from '../utils/cookies';


export default class NavBar extends Component {
	constructor(props) {
		super(props);
		this.signupHandler = this.signupHandler.bind(this);
		this.signinHandler = this.signinHandler.bind(this);
		this.homeButtonHandler = this.homeButtonHandler.bind(this);
		this.profileButtonHandler = this.profileButtonHandler.bind(this);

		this.state = {
			open: false,
			isLoggedin: cookies.readCookie('Token')? true: false,
			email: null,
			password: null,
			firstName: null,
			lastName: null,
			profile: null,
		};

		this.signUpState = {
			open: false,
		};
	}

	handleOpen = () => {
	    this.setState({open: true});
	    this.signUpState = {open: false};
	};

	handleClose = () => {
	    this.setState({open: false});
	    this.signUpState = {open: false};
	};

	signUphandleOpen = () => {
	    this.signUpState = {open: true};
	    this.setState({open: false});
	};

	handleSignout = () => {
		cookies.eraseCookie('Token');
		window.location.replace('/');
		this.setState({
			open: this.state.open,
			isLoggedin: false
		});
	}
	signInOrUp = () => {
		this.setState({
			open: this.state.open,
			isLoggedin: true,
		});
		this.handleClose();
		this.handleProfile();
	}

	handleProfile = () => {
		this.setState({profile: !this.state.profile});
	}

	handleChange = (e) => {
		let newState = {
			open: this.state.open,
			email: this.state.email,
			isLoggedin: this.state.isLoggedin,
			password: this.state.password,
			firstName: this.state.firstName,
			lastName: this.state.lastName
		};

		let target = e.target;
		if (target.name == 'email'){
			newState.email = target.value;
			this.setState(newState);

		} else if (target.name == 'password'){
			newState.password = target.value;
			this.setState(newState);

		} else if (target.name == 'firstName'){
			newState.firstName = target.value;
			this.setState(newState);

		} else if (target.name == 'lastName'){
			newState.lastName = target.value;
			this.setState(newState)
		}
	}

	signupHandler(e) {
		var bodyData = {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			username: this.state.email,
			password: this.state.password
		}

		fetch('/api/signup', {
			method: 'POST',
			body: JSON.stringify(bodyData),
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		})
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			cookies.createCookie('Token', data.token, 1);
			this.signInOrUp();
		})
		.catch((error) => {
			console.log(error);
		});

	}

	signinHandler(e) {
		var bodyData = {
			username: this.state.email,
			password: this.state.password,
			firstName: this.state.firstName,
			lastName: this.state.lastName
		}

		fetch('/api/signin', {
			method: 'POST',
			body: JSON.stringify(bodyData),
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		})
		.then((response) => {;
			return response.json();
		})
		.then((data) => {
			if (data.ok) {
				cookies.createCookie('Token', data.token, 1)

				let newState = {
					open: this.state.open,
					email: this.state.email,
					isLoggedin: this.state.isLoggedin,
					password: this.state.password,
					firstName: this.state.firstName,
					lastName: this.state.lastName
				};

				newState.firstName = data.journalist.firstName;
				newState.lastName = data.journalist.lastName;
				this.setState(newState);
				this.signInOrUp();

			} else {
				alert('Invalid username or password');
			}
		})
		.catch((error) => {
			console.log(error);
		});
	}
	 

	homeButtonHandler() {
		window.location.replace('/');
	}

	profileButtonHandler() {
		console.log(this.state.firstName);
		window.location.replace('/profile/'+this.state.firstName+ ' '+this.state.lastName);
	}

	snackBarCloseHandler = () => {
		this.state.validation = {
			showMessage: false,
			message: ""
		};
	}

	render() {
		return  (
			<header style={style.header}>
		    <center>
		    <div style={style.outerDiv}>
				<div style={style.innerDivLeft} />
				<SearchBar handleRequest={this.props.handleRequest}/>
					<div style={style.innerDivRight}>
					<div style={style.iconMenu}>
						<NavbarElements isLoggedin={this.state.isLoggedin}
                                        signUphandleOpen={this.signUphandleOpen}
                                        signInhandleOpen={this.handleOpen}
                                        handleSignout={this.handleSignout}
                                        state={this.state}
                                        handleProfile={this.handleProfile}
										homeButtonHandler={this.homeButtonHandler}
										profileButtonHandler={this.profileButtonHandler}/>

						<SignInDialog signInOrUp={this.signInOrUp}
									  state={this.state}
									  handleChange={this.handleChange}
									  open={this.state.open}
									  signinHandler={this.signinHandler}
									  onRequestClose={this.handleClose}/>

						<SignUpDialog signInOrUp={this.signInOrUp}
									  state={this.state}
									  handleChange={this.handleChange}
									  open={this.signUpState.open}
									  signupHandler={this.signupHandler}
									  onRequestClose={this.handleClose}/>
					</div>
					</div>
			</div>
			</center>
			</header>
		);
	}
}

/* Return the components depending on if the user is logged in or logged out. */
function NavbarElements(props) {
	if(props.isLoggedin == true) {
		return (
			<div style={style.onLoggedin}>
				{/* Go to the home page by clicking this button. */}
					<FlatButton onClick={props.homeButtonHandler}
					            label="Home"
								style={style.profileButton}/>
				{/* Go to the profile page by clicking this button. */}
					<FlatButton onClick={props.profileButtonHandler}
					            label="Profile"
								style={style.profileButton}/>
	            <IconMenu iconButtonElement={
					<IconButton style={style.navigationExpandMoreIcon}>
						<NavigationExpandMoreIcon/>
					</IconButton>}>
					<MenuItem primaryText="Sign out"
					          onClick={props.handleSignout}/>
	             </IconMenu>
             </div>
        );
	} else {
		return (
			<IconMenu iconButtonElement={
				<IconButton style={style.navigationExpandMoreIcon}>
					  <NavigationExpandMoreIcon/>
				</IconButton>}>
			   <MenuItem primaryText="Sign up"
						 onClick={props.signUphandleOpen}/>
				<MenuItem onClick={props.signInhandleOpen}
						  primaryText="Sign in"/>
			</IconMenu>
		);
	}
}
