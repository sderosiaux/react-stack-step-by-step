import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  render() {
    const subjects = this.props.subjects;
    return <ul>You like: {subjects.map(s => <li>{s}</li>)}</ul>;
  }
}


var mountNode = document.getElementById("app");
ReactDOM.render(<App subjects={[ "Javascript", "Java" ]} />, mountNode);
