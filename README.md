# 1. From scratch, old school : react in browser, no npm, no jsx

## Why ?

Because React rocks.

## What to do

- Create a folder (!)
- Create an `index.html` with some `<script>` to reference React scripts : `react.js` and `react-dom.js` (in that order, the latter depends on the former)
- You can find those scripts either by downloading the [starter kit](https://facebook.github.io/react/downloads/react-0.14.3.zip) from Facebook and unzip it inside your folder, or by using the facebook cdn :
```html
<script src="https://fb.me/react-0.14.3.min.js"></script>
<script src="https://fb.me/react-dom-0.14.3.min.js"></script>
```
- Create an `App.js` with some basic React code (for now, using ES5, no need of anything else) and add it into `index.html`
- Open `index.html` in a browser, tada

## Details

Here is a simple React program using old Javascript ES5 syntax :

```js
"use strict";

var App = React.createClass({
  render: function() {
    var items = this.props.subjects.map(function(subject) {
      return React.createElement("li", null, subject);
    });
    return React.createElement("ul", null, "You like ", items);
  }
});

var mountNode = document.getElementById("app");
ReactDOM.render(React.createElement(App, { subjects: [ "Javascript", "Java" ] }), mountNode);
```


