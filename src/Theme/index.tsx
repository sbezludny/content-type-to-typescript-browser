import * as React from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme({});

class Theme extends React.Component {
  render() {
    return <MuiThemeProvider theme={theme}>{this.props.children}</MuiThemeProvider>;
  }
}

export default Theme;
