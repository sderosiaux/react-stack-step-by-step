import React from 'react';

const STYLE_HEADER = {
  fontSize: 30,
  textAlign: 'left',
  padding: 10,
  textTransform: 'uppercase',
  borderBottom: '1px solid rgba(0,0,0,.1)',
};

const STYLE_BUTTON = {
  border: '1px solid #ccc',
  borderRadius: 5,
  background: 'linear-gradient(to bottom, #eee , #DDD)',
  padding: 5,
  margin: 10,
  minWidth: 30,
  float: 'right',
  textTransform: 'uppercase',
};

export default class BoardToolbar extends React.Component {
  static propTypes = {
    name: React.PropTypes.string.isRequired,
    dispatch: React.PropTypes.func.isRequired
  };

  onAddButtonClick() {
    this.props.dispatch({ type: 'ADD' })
  }

  onSortButtonClick() {
    this.props.dispatch({ type: 'SORT' })
  }

  render() {
    const { name } = this.props;

    return (
      <header style={STYLE_HEADER}>
        Board : {name}
        <button style={STYLE_BUTTON} onClick={() => this.onSortButtonClick()}>Sort</button>
        <button style={STYLE_BUTTON} onClick={() => this.onAddButtonClick()}>Add</button>
      </header>
    );
  }
}

