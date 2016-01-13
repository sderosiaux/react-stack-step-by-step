[back to summary](https://github.com/chtefi/react-stack-step-by-step/)

# 1. React in browser, no nodejs, no jsx

From scratch, old school style.

## Why ?

Because React rocks.
Because we want to start with the beginning, the simplest case.

## What to do

- Create a project folder with a subfolder `src` by default
- Create `index.html` with some `<script>` to reference React scripts : `react.js` and `react-dom.js` (in that order, the latter depends on the former)
- You can find those scripts either by downloading the [starter kit](https://facebook.github.io/react/downloads/react-0.14.3.zip) from Facebook and unzip it inside your folder, or by using the facebook cdn for instance :
```html
<script src="https://fb.me/react-0.14.3.min.js"></script>
<script src="https://fb.me/react-dom-0.14.3.min.js"></script>
```
- Create `App.js` with some basic React code (for now, using Javascript ES5, to be browser compatible) and add a reference into `index.html`
- Open `index.html` in a browser, tada

## App.js

Here is a simple React program using old Javascript ES5 syntax :

```js
"use strict";

var App = React.createClass({
  render: function() {
    var items = this.props.subjects.map(function(subject) {
      return React.DOM.li(null, subject);
      // same as React.createElement("li", null, subject);
    });
    return React.DOM.ul(null, "You like ", items);
    // or React.createElement("ul", null, subject);
  }
});

var mountNode = document.getElementById("app");
ReactDOM.render(React.createElement(App, { subjects: [ "Javascript", "Java" ] }), mountNode);
/*
<ul>
  You like <!-- here just for the example! -->
  <li>Javascript</li>
  <li>Java</li>
</ul>
*/
```

## Next step

[2-react-express](https://github.com/chtefi/react-stack-step-by-step/tree/2-react-express)
