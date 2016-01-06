# 8. Let's add some structure

## Why should I add some structure in my project ?

Because you are organised.
Right now, everything is in `src/` : html, js, bundle, server. Let's split it for the sake of clarity and to do some [SoC](https://en.wikipedia.org/wiki/Separation_of_concerns).

## What to do

- Let's put `server.js` in its own folder `server/`.
- Let's webpack create `bundle.js` in its own folder `dist/`.
- Let's put React components in a `components/` folder
- Let's create `index.js` in `src/` to do the initial job of mounting our root React component (`App` in our case)

That gives us something like :

![structure](https://cdn.rawgit.com/chtefi/react-boilerplates/8-react-structure/structure.png)

Now, we need to fix some paths in our config files :

- in `package.json`
  - the `start` command will now refer to `server/server.js` instead of `src/server.js`
- in `webpack.config.js`
  - the entry is now `src/index.js` instead of `src/App.js`
  - the output is now in `dist/` instead of `src/`

```js
entry: [
  'webpack-hot-middleware/client',
  path.join(__dirname, 'src', 'index.js'),
],
output: {
  path: path.join(__dirname, 'dist'),
  filename: 'bundle.js'
},
```

## Our new entry point for webpack

`src/index.js` is now our entry point, which contains only some `import`s and the mount of our main component :

```js
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App.js';

var mountNode = document.getElementById("app");
const items = [ "Javascript", "Java" ];
ReactDOM.render(<App items={items} />, mountNode);
```

All React components should be put in their own folder `components/`, to know that they aree all components.

> Even if you don't see `React` usage in this source, you _must_ import it, otherwise you'll end up with a error in the browser `React is not defined`. This is because the JSX will be converted to ES6 and therefore make use of `React.createElement`.

## How index.js can still find bundle.js ?

You noticed that our `index.html` still refers to `src="bundle.js"`, but this file is not in `src/` anymore (which content is served by express `app.use(express.static('src'));`) but in `dist/`.

It is found thanks to `webpack-dev-middleware`. This is the one that is serving the file.
We provided it the `webpack.config.js` reference, thus it knows the bundle is in `dist/`, therefore when it intercepts the request, it knows what is it and respond directly to the client.

```js
var webpackConfig = require('../webpack.config.js');
var compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler)); // he knows !
```

## We need to use `publicPath`

To recap :
- `/index.html` is served thanks to `express.static`
- `/bundle.js` is served thanks to `webpack-dev-middleware`

Same root path `/` but different processors. That can lead to some mistakes, this is why, very often, a `publicPath` is declared to serve the bundle :

```js
// webpack.config.js
output: {
  path: path.join(__dirname, 'dist'),
  filename: 'bundle.js',
  publicPath: '/static/'
},
```

```js
// server.js
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
```

Instead of copy/paste the url, we reuse the `publicPath` declared in the config.

> `noInfo: true` removes most logs from `server.js` console.

```html
<!-- index.html -->
<script src="/static/bundle.js"></script>
```

Henceforth, `webpack-dev-middleware` will serve `/static/*` as a synonym for `dist/`.

Note that it won't be possible to access `/bundle.js` anymore.

## Next step

[9-react-content](https://github.com/chtefi/react-stack-step-by-step/tree/9-react-content)
