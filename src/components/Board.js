import React from 'react';
import { connect } from 'react-redux'

import BoardToolbar from './BoardToolbar.js';
import Card from './Card.js';

//
// Pure component
//

const STYLE_BOARD = { background: 'white', width: '100%' };
const STYLE_LIST = { display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', margin: 0, padding: 0 };
const STYLE_UNIT = { listStyleType: 'none', margin: 10 };

// helper fn
const createUnit = props => <li key={props.id} style={STYLE_UNIT}><Card {...props} /></li>

export class Board extends React.Component {
  static propTypes = {
    cards: React.PropTypes.array.isRequired
  };

  render() {
    const { cards } = this.props;

    return (
      <div style={STYLE_BOARD}>
        <BoardToolbar />
        <ul style={STYLE_LIST}>
          {cards.map(createUnit)}
        </ul>
      </div>
    );
  }
}

//
// Connected component
// 

const mapStateToProps = (state) => ({ cards: state.cards });
export default connect(mapStateToProps)(Board);
