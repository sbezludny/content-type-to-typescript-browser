import * as React from 'react';
import withStyles, { WithStyles, StyleRulesCallback } from 'material-ui/styles/withStyles';
import { Theme } from 'material-ui/styles/createMuiTheme';

import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanelActions,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';

const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
    paddingBottom: theme.spacing.unit,
  },
  panel: {
    backgroundColor: theme.palette.background.appBar,
  },
  caption: {
    flex: 1,
  },
  column: {
    flexBasis: '33.3%',
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

interface Props {
  onSubmit: (d: { accessToken: string; spaceId: string }) => void;
}

interface State {
  accessToken?: string;
  spaceId?: string;
}

class Form extends React.Component<
  WithStyles<'root'> &
    WithStyles<'column'> &
    WithStyles<'heading'> &
    WithStyles<'secondaryHeading'> &
    WithStyles<'details'> &
    WithStyles<'link'> &
    WithStyles<'panel'> &
    WithStyles<'caption'> &
    Props &
    State
> {
  state = {
    accessToken: '',
    spaceId: '',
  };
  handleAccessToken(value: string) {
    this.setState(() => ({
      accessToken: value,
    }));
  }
  handleSpaceId(value: string) {
    this.setState(() => ({
      spaceId: value,
    }));
  }
  handleSubmit() {
    this.props.onSubmit({
      accessToken: this.state.accessToken,
      spaceId: this.state.spaceId,
    });
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <ExpansionPanel defaultExpanded={false} className={classes.panel}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading} type="title">
              Generate type definitions for Space
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <Grid container={true} spacing={8} justify="flex-start">
              <Grid item={true} xs={12} sm={4}>
                <TextField
                  label="Space ID"
                  value={this.state.spaceId}
                  onChange={e => this.handleSpaceId(e.currentTarget.value)}
                />
              </Grid>
              <Grid item={true} xs={12} sm={6}>
                <TextField
                  label="Access token"
                  fullWidth={true}
                  helperText={
                    <span>
                      You can get access token and spaceId in the Contentful web app.&nbsp;
                      <a
                        href="https://www.contentful.com/developers/docs/references/authentication/"
                        className={classes.link}
                      >
                        Learn more
                      </a>
                    </span>
                  }
                  value={this.state.accessToken}
                  onChange={e => this.handleAccessToken(e.currentTarget.value)}
                />
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
          <Divider />
          <ExpansionPanelActions>
            <Typography type="caption" className={classes.caption}>
              Not sure what the heck is going on?&nbsp;
              <a
                href="https://github.com/sbezludny/content-type-to-typescript"
                className={classes.link}
              >
                Learn more
              </a>
            </Typography>
            <Button onClick={() => this.handleSubmit()}>Generate</Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
      </div>
    );
  }
}

export default withStyles(styles)<Props>(Form);
