import React from 'react';

import Toolbar from './Toolbar.js';
import ProductList from './ProductList.js';

const STYLE_APP = {
  background: 'linear-gradient(to left, #EFEFBB , #D4D3DD);',
  backgroundAttachment: 'fixed',
  color: 'black',
  fontFamily: 'Roboto'
};

const PRODUCTS = [
  { name: 'Good', imagePath: 'http://lorempixel.com/400/200/', description: 'Ball tip short loin venison, kielbasa pork beef leberkas turducken swine filet mignon. Spare ribs corned beef frankfurter picanha alcatra. Fatback chicken pig, kielbasa biltong pork belly bresaola. Cupim boudin brisket porchetta, doner ham pork belly tri-tip turkey pork chop tail. Boudin shoulder bacon tail, pork belly chuck filet mignon jowl andouille sirloin. Jerky pork chop cow swine landjaeger strip steak.' },
  { name: 'Awesome!', imagePath: 'http://lorempixel.com/400/200/', description: 'Porchetta kevin shoulder tail alcatra turkey, pastrami short ribs pig. Filet mignon drumstick venison short loin, jowl pig tri-tip jerky sausage flank shankle strip steak shoulder alcatra porchetta. Ham hock t-bone short ribs cupim jowl shank bresaola. Porchetta pork belly corned beef filet mignon andouille, tail bacon meatball fatback ham hock capicola kielbasa pork chop kevin t-bone. Porchetta shank biltong chuck landjaeger picanha kielbasa chicken. Tri-tip bacon fatback, sirloin shankle meatball pancetta venison cow.' },
  { name: 'I lov it', imagePath: 'http://lorempixel.com/400/200/', description: 'Sirloin pancetta ball tip chuck kevin kielbasa. Short ribs spare ribs swine tongue biltong, porchetta drumstick chicken ball tip frankfurter. Shankle andouille salami shank. Ground round meatloaf landjaeger spare ribs.' },
  { name: '<3', imagePath: 'http://lorempixel.com/400/200/', description: 'Jerky t-bone rump, brisket pork chop andouille landjaeger chuck ball tip chicken pork belly shoulder. Ham hock pancetta spare ribs, venison cow chuck prosciutto t-bone andouille pork belly alcatra. T-bone porchetta bacon kevin cupim fatback, turducken andouille picanha tenderloin sausage turkey.' },
  { name: 'Very nice', imagePath: 'http://lorempixel.com/400/200/', description: 'Ball tip short loin venison, kielbasa pork beef leberkas turducken swine filet mignon. Spare ribs corned beef frankfurter picanha alcatra. Fatback chicken pig, kielbasa biltong pork belly bresaola. Cupim boudin brisket porchetta, doner ham pork belly tri-tip turkey pork chop tail. Boudin shoulder bacon tail, pork belly chuck filet mignon jowl andouille sirloin. Jerky pork chop cow swine landjaeger strip steak.' },
  { name: 'Yummy', imagePath: 'http://lorempixel.com/400/200/', description: 'Jerky t-bone rump, brisket pork chop andouille landjaeger chuck ball tip chicken pork belly shoulder. Ham hock pancetta spare ribs, venison cow chuck prosciutto t-bone andouille pork belly alcatra. T-bone porchetta bacon kevin cupim fatback, turducken andouille picanha tenderloin sausage turkey.' },
];

export default class App extends React.Component {
  render() {
    return (
      <div style={STYLE_APP}>
        <Toolbar />
        <ProductList products={PRODUCTS} />
      </div>
    );
  }
}
