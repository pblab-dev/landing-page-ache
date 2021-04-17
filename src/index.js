import React from 'react';
import ReactDOM from 'react-dom';
import { Router, BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import './styles/index.css';
import history from "./services/history";
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
   <BrowserRouter>
      <Routes />
   </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
