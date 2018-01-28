import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { unregister } from './registerServiceWorker';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/addon/fold/foldgutter.css';

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
unregister();
