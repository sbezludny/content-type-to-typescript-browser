import * as React from 'react';
import withStyles, { WithStyles, StyleRulesCallback } from 'material-ui/styles/withStyles';
import { Theme } from 'material-ui/styles/createMuiTheme';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/display/placeholder.js';

import * as classNames from 'classnames';

require('./index.css');

interface Props {
  value?: string;
  readOnly?: boolean;
  onChange?: (code: string) => void;
}

const styles: StyleRulesCallback = (theme: Theme) => ({
  editor: {
    flex: 1,
    position: 'relative',
    height: '100%',
  },
});
interface State {
  value: string;
}
class Editor extends React.Component<WithStyles<'editor'> & Props, State> {
  state = {
    value: '',
  };
  shouldComponentUpdate(nextProps: Props) {
    return nextProps.value !== this.state.value;
  }
  handleChange(value: string) {
    this.setState(() => ({
      value,
    }));
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }
  render() {
    return (
      <CodeMirror
        className={classNames(this.props.classes.editor)}
        value={this.props.value}
        onChange={(editor, data, value) => this.handleChange(value)}
        options={{
          theme: 'material',
          readOnly: this.props.readOnly,
          mode: 'javascript',
          foldGutter: true,
          lineNumbers: true,
          lineWrapping: true,
          gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
        }}
      />
    );
  }
}

export default withStyles(styles)<Props>(Editor);
