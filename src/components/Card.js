import React from 'react';
import { connect } from 'react-redux';

import { getCardClick } from '../actions/all.js';

const STYLE_CONTAINER = { width: 300, padding: 10, border: '1px solid rgba(0,0,0,.2)', borderRadius: 5, background: 'rgba(0,0,0,.05)', boxShadow: '3px 3px 10px rgba(0,0,0,.1)' };
const STYLE_NAME = { height: 40, padding: '5 0', textAlign: 'center', fontWeight: 'bold', fontSize: 20 };
const STYLE_IMAGE = (imagePath, opacity, cacheBuster) => ({ width: 300, height: 220, opacity, backgroundImage: `url(${imagePath}?${cacheBuster})`, backgroundSize: 'cover', borderRadius: 10, boxShadow: '3px 3px 5px rgba(0,0,0,.2)' });

const repeat = (char, count) => new Array(count).fill(char);

//
// Pure component
// 
export class Card extends React.Component {
  constructor() {
    super();
    this.cacheBuster = Math.random();
  }
  static propTypes = {
    id: React.PropTypes.number.isRequired,
    count: React.PropTypes.number.isRequired,
    imagePath: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired
  };
  shouldComponentUpdate(newProps) {
    return newProps.count !== this.props.count;
  }
  render() {
    const { id, count, imagePath, onClick } = this.props;
    return (
      <div style={STYLE_CONTAINER} onClick={() => onClick(id)}>
        <header style={STYLE_NAME}>{repeat('+', count)}</header>
        <div style={STYLE_IMAGE(imagePath, Math.min(count / 10, 0.8) + 0.2, this.cacheBuster)}></div>
      </div>
    );
  }
}


//
// Connected component
// 

const mapStateToProps = null; // (state) => ({ opacity: state.length / 10.0 });
const dispatchToProps = (dispatch) => ({ onClick: (id) => dispatch(getCardClick(id)) });
export default connect(mapStateToProps, dispatchToProps)(Card);
