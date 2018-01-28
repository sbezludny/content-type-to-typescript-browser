import * as React from 'react';
import withStyles, { WithStyles, StyleRulesCallback } from 'material-ui/styles/withStyles';
import { Theme } from 'material-ui/styles/createMuiTheme';
import Spinner from 'material-ui/Progress/CircularProgress';

const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    backgroundColor: '#263238',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    justifyItems: 'center',
  },
});

interface State {
  contentTypeCode: string;
  typeScriptCode: string;
}

class Playground extends React.Component<WithStyles<'root'>, State> {
  render() {
    return (
      <div className={this.props.classes.root}>
        <Spinner color="secondary" size={50} />
      </div>
    );
  }
}

export default withStyles(styles)<{}>(Playground);
