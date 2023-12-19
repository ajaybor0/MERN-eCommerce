import React from 'react';
import ReactDOM from 'react-dom/client';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import reportWebVitals from './reportWebVitals';
import Routes from './routes/Routes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Routes />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
