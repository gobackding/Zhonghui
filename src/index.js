import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux"
import App from './App';
import {HashRouter as Router ,Route} from "react-router-dom"
import store from "@store"


ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route path="/" component={App} />
        </Router>
    </Provider>
    , 
    document.getElementById('root')
);


