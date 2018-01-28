import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as Raven from 'raven-js';
import { ravenOptions } from './options';
import { getContext } from 'recompose';

export const childContextTypes = {
  raven: PropTypes.object,
};

class RavenProvider extends React.Component {
  static childContextTypes = childContextTypes;
  raven = Raven.config(
    'https://9d81c9f8b41f44fab37ab34896dcdc06@sentry.io/273947',
    ravenOptions,
  ).install();

  getChildContext() {
    return {
      raven: this.raven,
    };
  }

  // tslint:disable-next-line:no-any
  componentDidCatch(error: any, errorInfo: any) {
    this.raven.captureException(error, { extra: errorInfo });
  }

  render() {
    return this.props.children;
  }
}

export interface WithRaven {
  raven: Raven.RavenStatic;
}

export const withRaven = () => getContext(childContextTypes);

export default RavenProvider;
