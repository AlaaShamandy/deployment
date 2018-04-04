import React from 'react';
import { Link } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

import style from './stylesheets/NotFound';


export default class NotFound extends React.Component {
    componentDidMount() {
        document.title = 'UNews | Page Not Found';
    }

    render() {
        return (
            <MuiThemeProvider>
            <center>
                <Paper style={style.paper} zDepth={1} rounded={false} >
                    <center>
                        <div style={style.errorCode}>404</div>
                        <div style={style.errorMessage}>
                            Woooops! Looks like the page does not exist.
                        </div>
                        <Divider style={style.divider} />
                        <div style={style.homeLink}>
                            Go back <Link to="/">home</Link>!
                        </div>
                    </center>
                </Paper>
            </center>
          </MuiThemeProvider>
        );
    }
}
