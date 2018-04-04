import React, { Component } from 'react';

import style from './stylesheets/SignUpDialog';

/* Material UI Components */
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';


/* Sign up form */
function SignupForm(props) {
  return (
    <div>
      <form>
        <TextField
          name="firstName"
          floatingLabelText="First Name"
          errorText=""
          onChange={props.handleChange}
        />
        <br />
        <TextField
          name="lastName"
          floatingLabelText="Last Name"
          errorText=""
          onChange={props.handleChange}
        />
        <br />
        <TextField
          type="email"
          name="email"
          floatingLabelText="Email"
          errorText=""
          onChange={props.handleChange}
        />
        <br />
        <TextField
          type="password"
          name="password"
          floatingLabelText="Password"
          errorText=""
          onChange={props.handleChange}
        />
        <br />
        <RaisedButton
          label="Sign Up"
          primary
          style={style.signin}
          onClick={props.signupHandler}
          disabled={!props.state.firstName,
                    !props.state.lastName,
                    !props.state.email,
                    !props.state.password}
        />
      </form>
    </div>
  );
}


export default function SignUpDialog(props) {
  const signupActions = [
    <div style={style.appContainer}>
      <div style={style.container}>
        <h1 style={style.intro}>SignUp Form</h1>
        <SignupForm
          signUp={props.signInOrUp}
          state={props.state}
          handleChange={props.handleChange}
          signupHandler={props.signupHandler}
        />
      </div>
    </div>,
  ];

  return (
    <Dialog
      actions={signupActions}
      modal={false}
      open={props.open}
      onRequestClose={props.onRequestClose}
      titleStyle={{ textAlign: 'center' }}
      style={{ backgroundColor: 'transparent', overflow: 'scroll' }}
      contentStyle={{ width: '40%', maxWidth: 'none' }}
    />
  );
}
