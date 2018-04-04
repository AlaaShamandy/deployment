import React, { Component } from 'react';

import style from './stylesheets/SearchBar';

import FontIcon from 'material-ui/FontIcon';
import AutoComplete from 'material-ui/AutoComplete';


export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  onKeyPress(event) {
    if (event.key === 'Enter' && event.target.value) {
      this.props.handleRequest(event.target.value);
      event.target.value = "";
    }
  }

  render() {
    return (
      <input
        style={style.input}
        placeholder="Search for keywords here..."
        type="text"
        autoComplete="off"
        onKeyPress={this.onKeyPress}
      />
    );
  }
}
