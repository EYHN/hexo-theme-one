import { AppState } from '../../stateI';
import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { Router, Route } from 'react-router';
import Home from '../home/home'
var style = require('./app.less')

interface AppProps {
  muiTheme?: __MaterialUI.Styles.MuiTheme
}

export default class App extends React.Component<AppProps, undefined>{
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={this.props.muiTheme}>
        <main>
          <Router>
            <Route path="/" component={Home} />
          </Router>
        </main>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state:AppState) => {
  return {
    muiTheme: state.theme.muiTheme
  }
}