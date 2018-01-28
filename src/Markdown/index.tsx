import * as React from 'react';
import withStyles, { WithStyles, StyleRulesCallback } from 'material-ui/styles/withStyles';
import { Theme } from 'material-ui/styles/createMuiTheme';
import * as ReactMarkdown from 'react-markdown';
import Typography from 'material-ui/Typography';
import Highligh from 'react-highlight.js';
import ProgressBar from '../ProgressBar';

interface Props {
  file: string;
}

interface State {
  markdown: string;
}

const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    padding: theme.spacing.unit * 4,
    fontSize: theme.typography.pxToRem(15),
  },
  code: {},
});

class Markdown extends React.Component<WithStyles<'root'> & Props, State> {
  state = {
    markdown: '',
  };
  componentWillMount() {
    this.fetchFile(this.props.file);
  }
  componentWillReceiveProps(nextProps: Props) {
    this.fetchFile(nextProps.file);
  }

  async fetchFile(file: string) {
    const response = await fetch(file);
    const markdown = await response.text();
    this.setState(() => ({
      markdown,
    }));
  }
  render() {
    return this.state.markdown ? (
      <Typography
        component="div"
        classes={{
          root: this.props.classes.root,
        }}
        headlineMapping={{
          display4: 'h4',
          display3: 'h3',
          display2: 'h2',
          display1: 'h1',
          headline: 'h1',
          title: 'h2',
          subheading: 'h3',
          body2: 'aside',
          body1: 'p',
          caption: 'h3',
        }}
      >
        <ReactMarkdown
          source={this.state.markdown}
          renderers={{
            code: ({ language, value }) => <Highligh language={language}>{value}</Highligh>,
          }}
        />
      </Typography>
    ) : (
      <ProgressBar isLoading={true} pastDelay={false} timedOut={false} error={null} />
    );
  }
}

export default withStyles(styles)<Props>(Markdown);
