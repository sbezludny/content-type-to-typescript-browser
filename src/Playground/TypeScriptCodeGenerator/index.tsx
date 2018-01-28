import * as React from 'react';
import { ContentType } from 'contentful';

interface State {
  code?: string;
  // tslint:disable-next-line:no-any
  error: any;
  isInProgress: boolean;
}

interface Props {
  code: string;
  // tslint:disable-next-line:no-any
  render: (p: State) => any;
}

function parseCode(code: string): ContentType[] {
  return JSON.parse(code);
}

class GenerateTsDefinitions extends React.Component<Props, State> {
  // tslint:disable-next-line:no-any
  contentTypeToTS: any = undefined;
  state = {
    code: undefined,
    error: undefined,
    isInProgress: true,
  };

  componentWillMount() {
    import(/* webpackChunkName: 'content-type-to-typescript' */ 'content-type-to-typescript')
      .then(contentTypeToTS => {
        this.contentTypeToTS = contentTypeToTS;
      })
      .then(() => {
        this.generateTs(this.props);
      });
  }

  componentWillReceiveProps(nextProps: Props) {
    this.generateTs(nextProps);
  }

  async generateTs({ code: jsCode }: Props) {
    this.setState(() => ({ isInProgress: true }));
    try {
      const contentTypes = parseCode(jsCode);
      const code = await this.contentTypeToTS.compileFromContentTypes(contentTypes);
      this.setState(() => ({
        code,
        isInProgress: false,
      }));
    } catch (error) {
      this.setState({
        code: undefined,
        error: error,
        isInProgress: false,
      });
    }
  }
  render() {
    return this.props.render(this.state);
  }
}

export default GenerateTsDefinitions;
