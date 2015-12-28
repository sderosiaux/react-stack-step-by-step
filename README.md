# 7. Let's add Hot Reloading

## Why should I use Hot Reloading ?

In one word : productivity.

- you broke your F5 key since many years
- we are not in 2000 anymore
- you don't want to lose your app state if you just fixed a typo or a color
- you don't want to develop blindly, then refresh, then try again. It's a backend thing.
- that can display your compilation and runtime errors directly inside the browser
  - you can do hot reloading with Javascript, CSS, anything
- no caveat

As soon as you put it in place, it will work forever without any modifications, for any of the future files you're going to add.
It's just some pipes to plug together to make it work and last forever.

> 2015-12-28: there is only one caveat : current React HR plugins do not handle stateless functional components created with the simpler syntax (`(props) => { <Foo>{props.name}</Foo> }`).

## What to do

### Packages to install

One part of the HR is handled by webpack itself.
We just add some logic to manage the specific React components state (you don't want to lose existing state of your component when you edit something)

We are going to add 4 packages :

- [`webpack-dev-middleware`](https://github.com/webpack/webpack-dev-middleware)
 - a classic expressjs middleware, where requests are passed on
 - watch the sources to recompile the bundle if they are changed
 - always serve the bundle up to date
- [`webpack-hot-middleware`](https://github.com/glenjamin/webpack-hot-middleware)
  - a classic expressjs middleware, where requests are passed on
  - subscribes to bundle recompilation events, to notify the frontend that something has changed
  - uses [SSE](http://www.html5rocks.com/en/tutorials/eventsource/basic) to communicate with it 
- [`babel-plugin-react-transform`](https://github.com/gaearon/babel-plugin-react-transform) + [`react-transform-hmr`](https://github.com/gaearon/react-transform-hmr)
  - [`babel-plugin-react-transform`](https://github.com/gaearon/babel-plugin-react-transform) can add any code in/around React component through Babel compilation
  - [`react-transform-hmr`](https://github.com/gaearon/react-transform-hmr) is used by the former to add code to handle HR for React components

```shell
$ npm install --save-dev webpack-dev-middleware
$ npm install --save-dev webpack-hot-middleware
$ npm install --save-dev babel-plugin-react-transform@beta
$ npm install --save-dev react-transform-hmr
 ```

2015-12-28: we explicitely ask for the beta (>=2.0.0) of `babel-plugin-react-transform` because for now, the latest published version does not work with Babel 6. But work has been done and is just waiting to be merged.

### Configure .babelrc

We need to configure babel to automatically add some code in our React components when it is called by webpack to convert our React ES6/JSX code to ES5.

The most basic configuration is :

```js
{
  "presets": ["react", "es2015"],
  "env": {
    "development": {
      "plugins": [
        ["react-transform", {
          "transforms": [{
            "transform": "react-transform-hmr",
            "imports": ["react"],
            "locals": ["module"]
          }]
        }]
      ]
    }
  }
}
```

Basically, that adds the transform [`babel-plugin-react-transform`](https://github.com/gaearon/babel-plugin-react-transform) which is going to be used for the `development` NODE_ENV only. This transform will retrieve all React components and then loop through its `"transforms"` property to pass them each React component to let them add some custom code. In our case, [`react-transform-hmr`](https://github.com/gaearon/react-transform-hmr) will add some HR code inside the React components.

[`babel-plugin-react-transform`](https://github.com/gaearon/babel-plugin-react-transform) handles as many transforms as we want, for instance :

```js
{
  "presets": ["react", "es2015"],
  "env": {
    "development": {
      "plugins": [
        ["react-transform", {
          "transforms": [{
            "transform": "react-transform-hmr",
            "imports": ["react"],
            "locals": ["module"]
          }, {
            "transform": "react-transform-catch-errors",
            "imports": ["react", "redbox-react"]
          }]
        }]
      ]
    }
  }
}
```

The React component code will pass through `react-transform-hmr` then through `react-transform-catch-errors`.
Each of them will add its custom code.

FYI, the latter is used to catch errors that are thrown in the `render()` method of the React component.
Then it's using its `"imports"` property to redirect the error to a visual React component. Here `redbox-react` displays a big red screen of the death with the stacktrace for instance. But it could be anything else.

### Handle server/client communication to send/receive HR updates

Now, we need to add some communication pipe between our server that serves the resources and our frontend.

The server will simply plug `webpack-dev-middleware` and `webpack-hot-middleware` into express.
That will handle bundle auto-recompilation and transmission to the browser.

```js
var express = require('express');
var webpack = require('webpack');
var path = require('path');

var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");
var webpackConfig = require('../webpack.config');

var app = express();

var compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler));
app.use(webpackHotMiddleware(compiler));
app.use(express.static('src'));

app.listen(3000);
```

How the browser is going to handle the updates ?
It's where webpack itself comes.

We need to add some plugins to our `webpack.config.js` :

```js
new webpack.optimize.OccurenceOrderPlugin(),
new webpack.HotModuleReplacementPlugin(),
new webpack.NoErrorsPlugin()
```

And a new entrypoint :

```js
entry: [
  'webpack-hot-middleware/client',
  path.join(__dirname, 'src', 'App.js'),
],
```

The plugins will add the generic webpack HR code that can handle module updates in the browser.

The entrypoint `webpack-hot-middleware/client` simply refers to the file `node_modules/webpack-hot-middleware/client.js`.
It is there to be injected in the bundle by webpack. This is the one that handles the SSE with `webpack-hot-middleware` and intercept the updates.

## Make it work

- Compile and run the server to serve the files :

```
$ npm run compile && npm start
```

- Open `localhost:3000`
- Change some React stuff :

```js
<ul>You like: {subjects.map(s => <li>{s}</li>)}</ul>;
```
to
```
<ul style={{padding:5}}>You don't like: {subjects.map(s => <li>{s}</li>)}</ul>;
```

- Checkout the live update in the browser !

## Details

### `webpack-dev-middleware` is optional, but...

The most important, the one that truly makes the HR works is `webpack-hot-middleware`. This is the one taking care of the communication between the server (where the bundle recompilation occurs) and the client.

Without `webpack-dev-middleware`, you just need to launch the webpack watch yourself :

```js
// app.use(webpackDevMiddleware(compiler));
compiler.watch({}, function(){});
app.use(webpackHotMiddleware(compiler));
```
Because `webpackHotMiddleware` subscribes to the bundle compilation events (no matter what started it), it will work.

*But* you'll suffer from some consequences : a bunch of `.js` and `.json` files in your project will appears each time a compilation occurs. They contain the delta sent to the client to update itself (webpack only sends the updated chunks, not the whole bundle each time). The advantage of using `webpack-dev-middleware` is that you won't see those files. They will be handled in-memory by itself. That's why you need to install this particular module too.

![hot-updates](https://cdn.rawgit.com/chtefi/react-boilerplates/7-react-hot-reloading/hot-updates.png)

---

### `babel-plugin-react-transform` + `react-transform-hmr`

Without this transform, webpack won't be able to hot update React components, you'll get this in the browser console :

```
[HMR] bundle rebuilding
[HMR] bundle rebuilt in 160ms
[HMR] Checking for updates on the server...
[HMR] The following modules couldn't be hot updated: (Full reload needed)
[HMR]  - ./src/App.js
```

---

### Hot reloading lifecycle

The frontend initialize a SSE request : (thanks to the code `webpack-hot-middleware/client.js` injected in the bundle)
```
GET localhost:3000/__webpack_hmr (never returns)
```

Then if a Javascript file changes server-side, because `webpack-dev-middleware` started a watch on the source, `webpack-hot-middleware` is notified and notify the frontend via SSE with the new module map, such as : 

```json
data: {"action":"building"}

// few ms later ...

data: {"action":"built","time":260,"hash":"6b625811aa23ea1ec259","warnings":[],"errors":[],"modules":{"0":"multi main","1":"./~/fbjs/lib/invariant.js","2":"./~/react/lib/Object.assign.js","3":"./~/fbjs/lib/warning.js","4":"./~/fbjs/lib/ExecutionEnvironment.js","5":"./~/react/lib/ReactMount.js","6":"./~/react/lib/ReactElement.js", ...
```

Then the frontend asks for the content :

- `GET localhost:3000/0.0119cbdcd4c2cf8d27c2.hot-update.js`

```js
{"h":"6b625811aa23ea1ec259","c":[0]}
```

- `GET localhost:3000/0119cbdcd4c2cf8d27c2.hot-update.json`

```js
webpackHotUpdate(0,{

/***/ 97:
/***/ function(module, exports, __webpack_require__) {

  /* WEBPACK VAR INJECTION */(function(module) {'use strict';

  ...
```

Those particular urls are handled by `webpack-dev-middleware` which is keeping those file in memory and serving them as any classic static file. They are created by the webpack plugin we added in `webpack.config.js` : `webpack.HotModuleReplacementPlugin()`.
