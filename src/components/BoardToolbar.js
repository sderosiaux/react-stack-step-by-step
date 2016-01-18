import React from 'react';
import { connect } from 'react-redux';

import { getAddAction, getSortAction, getRenamingAction, getRenamedAction } from '../actions/all.js';

//
// Pure component
// 

const STYLE_HEADER = { fontSize: 30, textAlign: 'left', padding: 10, textTransform: 'uppercase', borderBottom: '1px solid rgba(0,0,0,.1)' };
const STYLE_BUTTON = { border: '1px solid #ccc', borderRadius: 5, background: 'linear-gradient(to bottom, #eee , #DDD)', padding: 5, margin: 10, minWidth: 30, float: 'right', textTransform: 'uppercase' };

export class BoardToolbar extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { renamingName: props.name };
  }

  static propTypes = {
    name: React.PropTypes.string.isRequired,
    count: React.PropTypes.number.isRequired,
    onSortButtonClick: React.PropTypes.func.isRequired,
    onAddButtonClick: React.PropTypes.func.isRequired,
    isRenaming: React.PropTypes.bool.isRequired,
    onRenaming: React.PropTypes.func.isRequired,
    onRenamed: React.PropTypes.func.isRequired
  };

  handleChange(event) {
    this.setState({ renamingName: event.target.value });
  }

  render() {
    const { name, count, onSortButtonClick, onAddButtonClick, isRenaming, onRenaming, onRenamed } = this.props;
    const { renamingName } = this.state;

    return (
      <header style={STYLE_HEADER}>
        { isRenaming
          ? <input onBlur={() => onRenamed(renamingName)} autoFocus={true} onChange={this.handleChange.bind(this)} value={renamingName} />
          : <span onClick={onRenaming}>{name} ({count})</span> }
        <button style={STYLE_BUTTON} onClick={onSortButtonClick}>Sort</button>
        <button style={STYLE_BUTTON} onClick={onAddButtonClick}>Add</button>
      </header>
    );
  }
}

//
// Connected component
// 

// Wrap the component into connect()
const mapReduxStateToProps = (state) => ({
  name: state.board.name,
  count: state.cards.length.toString(),
  isRenaming: state.board.isRenaming
});
const dispatchToProps = (dispatch) => ({
  onSortButtonClick: () => dispatch(getSortAction()),
  onAddButtonClick: () => dispatch(getAddAction()),
  onRenaming: () => dispatch(getRenamingAction()),
  onRenamed: (newName) => dispatch(getRenamedAction(newName)),
});

export default connect(mapReduxStateToProps, dispatchToProps)(BoardToolbar);
