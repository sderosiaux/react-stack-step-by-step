# 5. +Webpack

## Why should I use Webpack ?

Because right now, we are using plain old `<script>` in our `index.html` and that's :

- not maintenable
- error prone (order matters)
- some scripts can be forgotten and can become useless
- can create many HTTP requests and create slow page render (for 3 files it's okay, for 100 it's not. With HTTP2 maybe it will be, but that's another story)

With `webpack` (and `browserify`, and many other bundlers), you can create a fat js containing everything that is needed, every dependencies inside, which will find each other when needed.

This bundle will be built by looking at an entry point (a single .js) which references some scripts you'll use, that themselves reference others and so on (through ES5 `require()` and ES6 `import`). At the end, it's building the dependency tree of the scripts and inject them all in the bundle.

That's definitely the biggest step early on due to all the things to install.

## What to do

- Install locally, in dev dependencies (`--save-dev`, because they are used only on the developer computer) :

  - `webpack`
  - `babel-core` (`babel-loader` depends on it)
  - `babel-loader` (for `webpack`)
  - `babel-preset-react` (for `babel` to understand JSX)
  - `babel-preset-es2015` (for `babel` to translate ES6 to ES5 automatically, because all browsers are not yet up to date with ES6 and because you want compatibility)

```json
"devDependencies": {
  "babel-core": "^6.3.26",
  "babel-loader": "^6.2.0",
  "babel-preset-es2015": "^6.3.13",
  "babel-preset-react": "^6.3.13",
  "webpack": "^1.12.9"
}
```

- Install locally, in dependencies (`--save`, because they are used by the app itself) :

  - `react`
  - `react-dom`

```json
"dependencies": {
  "express": "^4.13.3",
  react": "^0.14.3",
  "react-dom": "^0.14.3"
},
```

- Use `import` in our `App.js` to use the dependency system of NodeJS (for webpack to find them and bundle them).
  - This step is optional if you still provide `react.js` and `react-dom.js` as `<script>` in your `index.html`.
```js
import React from 'react';
import ReactDOM from 'react-dom';
````

- Remove our `<script>` from `index.html` and replace them with a single reference to `bundle.js`.
```html
<script src="bundle.js"></script>
```

- Create a `.babelrc` on the project root folder to add ES6->ES5 conversion and React understanding to Babel

```json
{
  "presets": ["es2015", "react"]
}
```

- Create a `webpack.config.js` on the project root folder for webpack to use it to know how to build the bundle.

- Build `bundle.js`
  - using `./node_modules/.bin/webpack` or `.\node_modules\.bin\webpack` according to your OS. (Note: we assume `webpack` is not installed globally, we are using the local version here)

We didn't change our app logic, just the pipes !

## Details

### webpack.config.js

Short course on webpack loaders. Note the `include` path here :
```
loaders: [{
  test: /\.js$/,
  loader: 'babel',
  include: path.join(__dirname, 'src'),
}]
```

It's telling webpack you don't want to compile the source in `node_modules` but only your own. You assume they are already providing the ES5 version (not true for every projects).

### Fat bundle size

Just using :

```
$ webpack
```

That creates a big js file of 677 kB with around 19666 lines for our simple app, arg. But that's because we are in developer mode by default, so a lot more is included into React (for debugging/error finding purpose).

To shrink this down, we can use the `--production` flag of webpack first :

```
$ webpack -p
```

This reduces our `bundle.js` to 10 lines and 190 kB.

But looking into it, we can see some obvious conditions :

```
if("production"!==t.env.NODE_ENV)...
```

Generally, you build a bundle for the developer env, and one specific for the prod, so you know in advance what's the value of env.NODE_ENV, thus you know in advance if the test pass, thus you can tell that to webpack to delete useless code !

You can do the link with the environment variable `NODE_ENV` by adding that to your `webpack.config.js` :

```js
plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
```

Then we use it like that :

```
# unix
NODE_ENV=production ./node_modules/.bin/webpack -p
# windows :( (the lack of space is important)
set NODE_ENV=production&& .\node_modules\.bin\webpack -p
```

Et voilà, 131kB. That's the best we can do for now.
