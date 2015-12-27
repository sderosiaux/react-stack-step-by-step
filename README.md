# 2. +Javascript ES6

## Why should I use ES6 syntax ?

Because the ES5 syntax is :

- uglier
- more verbose
- more error prone
- less descriptive at the first sight

## What to do

Learn ES6 and convert our main source `App.js` to Javascript ES6 using classes, arrow functions, a better variable scoping, destructuring and so on).

## Details

From :

```js
var App = React.createClass({
  render: function() {
    var items = this.props.subjects.map(function(subject) {
    return <li>{subject}</li>;
  });
  return <ul>You like {items}</ul>;
});
```

To :

```js
class App extends React.Component {
  render() {
    const items = this.props.subjects.map(subject => <li>{subject}</li>)
    return <ul>You like {items}</ul>;
  }
}
```

Or to :

```js
const App = (props) => {
  const items = props.subjects.map(subject => <li>{subject}</li>)
  return <ul>You like {items}</ul>;
}
```

Or to (!) :

```js
const App = ({ subjects }) => <ul>You like {subjects.map(s => <li>{s}</li>)}</ul>;
```


