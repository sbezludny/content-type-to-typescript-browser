import * as React from 'react';
import withStyles, { WithStyles, StyleRulesCallback } from 'material-ui/styles/withStyles';
import { Theme } from 'material-ui/styles/createMuiTheme';
import { createClient } from 'contentful';
import Form from './Form/index';
import TypeScriptCodeGenerator from './TypeScriptCodeGenerator';
import Editor from './Editor';
import Grid from 'material-ui/Grid';
import Spinner from './Spinner';
import exampleContentType from './examples/contentTypes';
import { compose } from 'recompose';
import { withRaven, WithRaven } from '../Raven';

const styles: StyleRulesCallback = (theme: Theme) => ({
  editors: {
    height: '100%',
  },
});

interface State {
  contentTypeCode: string;
  typeScriptCode: string;
  isRequestInProgress: boolean;
  // tslint:disable-next-line:no-any
  requestError: any;
}

interface FormData {
  accessToken: string;
  spaceId: string;
}

class Playground extends React.Component<
  WithStyles<'editors'> & WithStyles<'spinnerWrapper'> & WithRaven,
  State
> {
  state = {
    contentTypeCode: JSON.stringify(exampleContentType, null, 2),
    typeScriptCode: '',
    isRequestInProgress: false,
    requestError: undefined,
  };
  async fetchContentTypes(formData: FormData) {
    try {
      const client = createClient({
        accessToken: formData.accessToken,
        space: formData.spaceId,
      });
      const contentTypes = await client.getContentTypes();

      return contentTypes;
    } catch (error) {
      this.props.raven.captureException(error);

      throw error;
    }
  }
  async handleSubmit(formData: FormData) {
    this.setState(() => ({
      isRequestInProgress: true,
    }));
    try {
      const contentTypes = await this.fetchContentTypes(formData);
      this.setState(() => ({
        isRequestInProgress: false,
        contentTypeCode: JSON.stringify(contentTypes.items, null, 2),
      }));
    } catch (error) {
      this.setState(() => ({
        isRequestInProgress: false,
      }));
    }
  }
  handleContentTypeCodeUpdate(code: string) {
    this.setState(() => ({
      isRequestInProgress: false,
      contentTypeCode: code,
    }));
  }
  render() {
    return [
      <Form key="form" onSubmit={formData => this.handleSubmit(formData)} />,
      // tslint:disable-next-line:jsx-wrap-multiline
      <Grid key="grid" container={true} spacing={0} className={this.props.classes.editors}>
        <Grid item={true} xs={12} sm={6}>
          <Editor
            value={this.state.contentTypeCode}
            onChange={code => this.handleContentTypeCodeUpdate(code)}
          />
        </Grid>
        <Grid item={true} xs={12} sm={6}>
          <TypeScriptCodeGenerator
            code={this.state.contentTypeCode}
            render={({ code: ts, error, isInProgress }) => {
              if (isInProgress || this.state.isRequestInProgress) {
                return <Spinner />;
              }

              return <Editor value={ts || error.message} readOnly={true} />;
            }}
          />
        </Grid>
      </Grid>,
    ];
  }
}

export default compose<{}, {}>(withRaven(), withStyles(styles))(Playground);
