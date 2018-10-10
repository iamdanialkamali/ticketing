import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import configureStore from '../src/store/configureStore';
import Approuter from './router/appRouter';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css'
const store = configureStore()
const jsx = (
    <Provider store={store}>
        <Approuter/>
    </Provider>
)
ReactDOM.render(jsx, document.getElementById('root'));
registerServiceWorker();
