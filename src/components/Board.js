import React from 'react';
import BoardToolbar from './BoardToolbar.js';
import Unit from './Unit.js';

const STYLE_BOARD = {
  background: 'white',
  width: '100%'
};

const STYLE_LIST = {
  display: 'flex',
  justifyContent: 'space-around',
  flexWrap: 'wrap',
  margin: 0,
  padding: 10,
};

const STYLE_UNIT = {
  listStyleType: 'none'
};

export default class extends React.Component {
  render() {
    const { name, units } = this.props;
    return (
      <div style={STYLE_BOARD}>
        <BoardToolbar name={name} />
        <ul style={STYLE_LIST}>
          {units.map(p => <li style={STYLE_UNIT}><Unit {...p} /></li>)}
        </ul>
      </div>
    );
  }
}
