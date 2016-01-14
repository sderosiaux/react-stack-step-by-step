import React from 'react';

const STYLE_HEADER = {
  fontSize: 30,
  textAlign: 'left',
  padding: 10,
  textTransform: 'uppercase',
  borderBottom: '1px solid rgba(0,0,0,.1)'
};

export default class extends React.Component {
  render() {
    const { name } = this.props;
    return <header style={STYLE_HEADER}>Board : {name}</header>;
  }
}
