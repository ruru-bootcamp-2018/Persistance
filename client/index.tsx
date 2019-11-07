import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { rootReducer } from './reducers';
import App from './components/App';

import './sass/main.scss';

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  }
  
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, compose(applyMiddleware(thunkMiddleware), composeEnhancers()));

document.addEventListener('DOMContentLoaded', () => {
    render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('app')
    );
});
