# 2. Let's add expressjs

## Why a webserver ?

In the first step, we simply used the `file:///` protocol to open our `index.html`, no webserver was necessary.
But we will need it very soon (for browser security issues, `file:///` is very restrictive, and for several cases, such as Hot Reloading).

We are just using express to serve the files over the `http://` protocol, being less restrictive for our next step.
You can use alternative such as `koa`, `connect`, `http-server`, or using directly `http` nodejs package.

## What to do

In the project folder, initialize `package.json` and install [`expressjs`](http://expressjs.com/).
```
$ npm init
$ npm install --save express
$ node src/server.js
```

Then go to `http://localhost:3000/`.

## server.js

We created a simple `server.js` that start an expressjs server listening on `localhost:3000` and serving files from the `src/` folder.

```js
// the simplest http server ever
var express = require('express');
var app = express();

// just serve the `src` folder as it is
app.use(express.static('src'));
app.listen(3000);
```

## Next step

[3-react-jsx](https://github.com/chtefi/react-stack-step-by-step/tree/3-react-jsx)
