import React from 'react';

import { createStore } from 'redux'
import { Provider } from 'react-redux'

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

const boardState = (state = UNITS, action) =>
    action.type === 'ADD' ? state.concat({ name: Math.random().toString(), imagePath: 'http://lorempixel.com/400/200/' }) :
    action.type === 'SORT' ? state.slice().sort(() => Math.random() - 0.5) :
    state;

const store = createStore(boardState)

export default class App extends React.Component {
  render() {
    return (
      <div style={STYLE_APP}>
        <Provider store={store}>
          <Board />
        </Provider>
      </div>
    );
  }
}
