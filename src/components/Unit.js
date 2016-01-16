import React from 'react';

const STYLE_CONTAINER = {
  width: 300,
  padding: 10,
  border: '1px solid rgba(0,0,0,.2)', borderRadius: 5,
  background: 'rgba(0,0,0,.05)',
  boxShadow: '3px 3px 10px rgba(0,0,0,.1)'
};

const STYLE_NAME = {
  height: 40, padding: '5 0',
  textAlign: 'center',
  fontWeight: 'bold', fontSize: 20
};

const STYLE_IMAGE = (imagePath, cacheBuster) => ({
  width: 300,
  height: 220,
  backgroundImage: `url(${imagePath}?${cacheBuster})`,
  backgroundSize: 'cover',
  borderRadius: 10,
  boxShadow: '3px 3px 5px rgba(0,0,0,.2)'
});

export default class Unit extends React.Component {
  constructor() {
    super();
    this.cacheBuster = Math.random();
  }
  static propTypes = {
    name: React.PropTypes.string.isRequired,
    imagePath: React.PropTypes.string.isRequired
  };

  render() {
    const { name, imagePath } = this.props;
    return (
      <div style={STYLE_CONTAINER}>
        <header style={STYLE_NAME}>{name}</header>
        <div style={STYLE_IMAGE(imagePath, this.cacheBuster)}></div>
      </div>
    );
  }
}
