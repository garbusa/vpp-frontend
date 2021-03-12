import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Router} from 'react-router-dom';

import history from './history'
import RootStore from './store/RootStore';
import {SnackbarProvider} from 'notistack';


ReactDOM.render(
    <React.StrictMode>
        <RootStore>
            <Router history={history}>
                <SnackbarProvider maxSnack={3} anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}>
                    <App/>
                </SnackbarProvider>
            </Router>
        </RootStore>

    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
