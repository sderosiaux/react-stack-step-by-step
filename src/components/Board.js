import React from 'react';
import { connect } from 'react-redux'

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

export default connect(state => ({ units: state }))(class extends React.Component {
  render() {
    const { units, dispatch } = this.props;

    return (
      <div style={STYLE_BOARD}>
        <BoardToolbar name={units.length} dispatch={dispatch} />
        <ul style={STYLE_LIST}>
          {units.map(p => <li key={p.name} style={STYLE_UNIT}><Unit {...p} /></li>)}
        </ul>
      </div>
    );
  }
});
