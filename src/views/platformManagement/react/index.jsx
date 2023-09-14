import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './public/style/index.scss'
export let  reactFn= ()=>{

  console.log('system',document.getElementById('system'))
  console.log('App',App)
  ReactDOM.render(<App />, document.getElementById('system'));
  // debugger
}

