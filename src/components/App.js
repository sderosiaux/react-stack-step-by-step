import React from 'react';
import ReactDOM from 'react-dom';

export default class App extends React.Component {
  render() {
    const items = this.props.items;
    return <ul>You like: {items.map(s => <li>{s}</li>)}</ul>;
  }
}
