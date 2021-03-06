import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { BrowserRouter, Route } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducers'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunk))
    )

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Route path="/:filter?" component={App} />
        </BrowserRouter>
    </Provider >,
    document.getElementById('root')
);
