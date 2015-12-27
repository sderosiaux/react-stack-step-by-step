# 2. +expressjs

## Why a webserver ?

In `1.` we simply used the `file:///` protocol to open our `index.html`, no webserver was necessary.
But we will need it very soon (for browser security issues, `file:///` is very restrictive)
and just because you will need one, one day.

This step is optional, you can use any other mean to serve the files if you know how-to (nginx, httpd, iis, express, node projects that starts an express on the fly etc.)

## What to do

In the project folder, initialize `package.json` and install [`express`](http://expressjs.com/).
```
$ npm init
$ npm install --save express
$ node src/server.js
```

Then go to `http://localhost:3000/`.

## server.js

```js
// the simplest http server ever
var express = require('express');
var app = express();

// just serve the `src` folder as it is
app.use(express.static('src'));
app.listen(3000);
```
