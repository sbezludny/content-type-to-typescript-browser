import * as React from 'react';
import withStyles, { WithStyles } from 'material-ui/styles/withStyles';
import { LinearProgress } from 'material-ui/Progress';

interface Props {
  isLoading: boolean;
  pastDelay: boolean;
  timedOut: boolean;
  // tslint:disable-next-line:no-any
  error: any;
}

const styles = {
  root: {
    width: '100%',
  },
};

class Loading extends React.Component<Props & WithStyles<'root'>, {}> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <LinearProgress color="secondary" />
      </div>
    );
  }
}

export default withStyles(styles)<Props>(Loading);
