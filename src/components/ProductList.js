import React from 'react';
import Product from './Product.js';

const STYLE_UL = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap'
};

const STYLE_LI = {
  listStyleType: 'none',
  margin: 10,
  flex: 1
}

export default class extends React.Component {
  render() {
    var { products } = this.props;
    return (
      <ul style={STYLE_UL}>
        {producs.map(p => <li style={STYLE_LI}><Product {...p} /></li>)}
      </ul>
    )
  }
}
