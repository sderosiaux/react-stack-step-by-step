import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App.js';

var mountNode = document.getElementById("app");
const items = [ "Javascript", "Java" ];
ReactDOM.render(<App items={items} />, mountNode);
