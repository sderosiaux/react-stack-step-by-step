[back to 4-react-es6](https://github.com/chtefi/react-stack-step-by-step/tree/4-react-es6/)

# 5. Let's add Webpack

## Why should I use Webpack ?

Because right now, we are using plain old `<script>` in our `index.html` and that's :

- not maintenable
- error prone (because the order matters)
- some scripts can be forgotten and can become useless
- can create many HTTP requests and create slow page render (for 3 files it's okay, for 100 it's not. With HTTP2 maybe it will be, but that's another story)

With `webpack` (and `browserify`, and many other bundlers), you can create a fat js containing everything that is needed, every dependencies inside, which will find each others when needed.

This bundle will be built by looking at an entry point (a single .js) which references some scripts you'll use, that themselves reference others and so on (through ES5 `require()` and ES6 `import`). At the end, it's building the dependency tree of the scripts and inject them all in the bundle.

That's definitely the biggest step early on due to all the things to install.

At the same time, we will install `babel` which will allow us to convert our React+ES6 code to ES5 (for browser compatibility), and remove our `<script>` from `index.html` that we won't need anymore.

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
  "react": "^0.14.3",
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

- Create a `.babelrc` on the project root folder to add (ES6 (aka ES2015) + React) to ES5 transform into babel

```json
{
  "presets": ["es2015", "react"]
}
```

- Create a [`webpack.config.js`](https://github.com/chtefi/react-boilerplates/tree/5-react-webpack#whats-inside-webpackconfigjs) on the project root folder for webpack to know how to build the bundle

- Start webpack to build the bundle
  - using `./node_modules/.bin/webpack` or `.\node_modules\.bin\webpack` according to your OS. (Note: we assume `webpack` is not installed globally, we are using the local version here)
  - our sample config will create `bundle.js` in `src/` for now, for the sake of simplicity

We didn't change our app logic, just the pipes !

## What's inside webpack.config.js

Our simple config : 

```js
module.exports = {
  entry: path.join(__dirname, 'src', 'App.js'),
  output: {
    path: path.join(__dirname, 'src'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      include: path.join(__dirname, 'src'),
    }]
  }
};
```

- Our entry point (from where to look for dependencies) is `App.js`.
- We want to create a bundle named `bundle.js` in `src/`.
- For every `.js` you find, convert them to ES5 using `babel`

Note the `include` path in `loaders` : it's telling webpack you don't want to compile the source in `node_modules` but only your own in `src/`. You assume your dependencies are already providing the ES5 version (not true for every projects).

## How to create the fat bundle and shrink it down

Just by typing :

```
$ webpack
```

That will create a big js file of 677 kB with around 19666 lines for our simple app, argh. But that's because we are in developer mode by default, so a lot more is included from the React code into our bundle (for debugging/error finding purpose).

To shrink this down, we can use the `-p` (`p` for `production`) flag of webpack first :

```
$ webpack -p
```

This reduces our `bundle.js` to 10 lines and 190 kB by post-processing it (using `webpack.optimize.UglifyJsPlugin()` and `webpack.optimize.OccurenceOrderPlugin()`).

But looking into the generated bundle, we can still see some obvious conditions :

```js
if("production"!==t.env.NODE_ENV)...
```

Generally, you build a bundle for the developer environment (more debug info, not uglified), and one specific for the production (cryptic and tiny), so you know in advance what's the value of env.NODE_ENV, therefore you know in advance if the test pass, hence you can tell that to webpack to delete useless code !

You can do the link with the environment variable `NODE_ENV` by adding that to your `webpack.config.js` :

```js
plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        // same as : 'NODE_ENV': "'" + process.env.NODE_ENV + "'"
        // eg: 'NODE_ENV': "'production'"
      }
    })
  ]
```

Then we use it like that :

```perl
# unix
NODE_ENV=production ./node_modules/.bin/webpack -p
# windows :( (the lack of space is important)
set NODE_ENV=production&& .\node_modules\.bin\webpack -p
```

Et voilà, 131kB. That's the best we can do for now.

## Cookbook

You can find a tremendous amount of information, how to use it, the various features, here : [http://christianalfoni.github.io/react-webpack-cookbook/](http://christianalfoni.github.io/react-webpack-cookbook/).

## Next step

[6-react-npm-scripts](https://github.com/chtefi/react-stack-step-by-step/tree/6-react-npm-scripts)
