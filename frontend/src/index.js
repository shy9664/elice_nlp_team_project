import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom';
//import * as serviceWorker from './serviceWorker';
//import RootReducer from 'rootreducer'; 

  

 ReactDOM.render( 
    <App />, 
    document.getElementById('root')     
);

//serviceWorker.register();
/*
ReactDOM.render(
    <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </React.StrictMode>,
    document.querySelector('#root'),
)
*/