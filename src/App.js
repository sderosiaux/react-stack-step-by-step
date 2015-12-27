import React from 'react';
import ReactDOM from 'react-dom';

const App = ({ subjects }) => <ul>You like {subjects.map(s => <li>{s}</li>)}</ul>;

var mountNode = document.getElementById("app");
ReactDOM.render(<App subjects={[ "Javascript", "Java" ]} />, mountNode);
