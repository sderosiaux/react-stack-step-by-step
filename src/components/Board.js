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
  padding: 0,
};

const STYLE_UNIT = {
  listStyleType: 'none',
  margin: 10
};

export default connect(state => ({ units: state }))(class Board extends React.Component {
  static propTypes = {
    units: React.PropTypes.array.isRequired,
    dispatch: React.PropTypes.func.isRequired
  };

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
