import React, { Component } from 'react';

import style from './stylesheets/SignInDialog';

/* Material UI Components */
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import Img from 'react-image';


/* Intro greeting subcomponent */
function IntroGreeting(props) {
  return (
    <div className="intro-greeting">
      <h1> Welcome back! </h1>
      <h3> Sign in to your account</h3>
    </div>
  );
}


/* Profile image subomponent */
function ProfileImage(props) {
  return (
    <div style={style.profilesImage}>
      <Img src={props.img} />
    </div>
  );
}


/* Image for signin */
function Intro(props) {
  return (
    <div style={style.intro}>
      <IntroGreeting />
    </div>
  );
}


/* Signin form component */
function Form(props) {
  return (
    <div className="input-fields">
      <form>
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
          label="Sign in"
          primary
          style={style.signinStyle}
          onClick={props.signinHandler}
          disabled={!props.state.email,
                                !props.state.password}
        />
      </form>
    </div>
  );
}


export default function SignInDialog(props) {
  const actions = [
    <div style={style.appContainer}>
      <div style={style.container}>
        <Intro />
        <Form
          signinHandler={props.signinHandler}
          state={props.state}
          handleChange={props.handleChange}
        />
      </div>
    </div>,
  ];

  return (
    <Dialog
      actions={actions}
      modal={false}
      open={props.open}
      onRequestClose={props.onRequestClose}
      titleStyle={{ textAlign: 'center' }}
      style={{ backgroundColor: 'transparent', overflow: 'scroll' }}
      contentStyle={{ width: '40%', maxWidth: 'none' }}
    />
  );
}
