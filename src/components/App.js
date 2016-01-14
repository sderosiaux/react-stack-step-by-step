import React from 'react';

import Board from './Board.js';

const STYLE_APP = {
  color: 'black',
  fontFamily: 'Roboto',
  padding: 100
};

const UNITS = [
  { name: 'A', imagePath: 'http://lorempixel.com/400/200/' },
  { name: 'B', imagePath: 'http://lorempixel.com/400/200/' },
  { name: 'C', imagePath: 'http://lorempixel.com/400/200/' },
  { name: 'D', imagePath: 'http://lorempixel.com/400/200/' }
];

export default class App extends React.Component {
  render() {
    return (
      <div style={STYLE_APP}>
        <Board units={UNITS} name={"Mine"} />
      </div>
    );
  }
}
