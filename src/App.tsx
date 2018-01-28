import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as Loadable from 'react-loadable';
import Theme from './Theme';
import AppLayout from './AppLayout';
import ProgressBar from './ProgressBar';
import Raven from './Raven';

import aboutMd from './Pages/About.md';
import installationMd from './Pages/Install.md';
import usageMd from './Pages/Usage.md';

const Playground = Loadable({
  loading: ProgressBar,
  loader: () => import(/* webpackChunkName: 'playground' */ './Playground'),
});

const Markdown = Loadable({
  loading: ProgressBar,
  loader: () => import(/* webpackChunkName: 'markdown' */ './Markdown'),
});

class App extends React.Component {
  render() {
    return (
      <Raven>
        <Theme>
          <Router>
            <AppLayout>
              <Route exact={true} path="/" component={Playground} />
              <Route path="/about" render={() => <Markdown file={aboutMd} />} />
              <Route path="/guides/install" render={() => <Markdown file={installationMd} />} />
              <Route path="/guides/usage" render={() => <Markdown file={usageMd} />} />
            </AppLayout>
          </Router>
        </Theme>
      </Raven>
    );
  }
}

export default App;
