# 6. +NPM scripts

## Why should I use NPM scripts ?

Because right now, we are using plain old command line in our process :

```
$ webpack
$ node src/server.js
```

At the end, we will have several commands available, you don't want to type them each time (some will be more verbose).

NPM allows some command to be executed simply by adding some `"key": "command"` in our `package.json` that allows us to run it using :

```
npm run key
```

Advantages :

- centralization
- you'll never make typo anymore
- you'll never forget they exist or wonder what are the parameters
- you can just type `npm run` in a shell to see every available commands
- you can still call them and add some parameters on the fly
- they can run executables in `node_modules/.bin` without specifying it
- you can change what the command does transparently 
- you don't need anything else (such as `gulp`)
- it's pure OS command line

Caveats :

- it's pure OS command line
- don't reference global programs you think are installed, always use locally installed packages (in our case, webpack)
- environment/OS specific (environment variables are not declared the same way in Unix/Windows)
  - they are some way to uniformize that, we'll see later

## What to do

Update the `"scripts"` part of `package.json` :

```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "start": "node src/server.js",
  "compile": "webpack",
  "compile:prod": "set NODE_ENV=production&& webpack -p"
},
```

## Details

- `"test": "echo \"Error: no test specified\" && exit 1"` is automatically created when you ran `npm init`.
- `"compile": "webpack"` references `node_modules/.bin/webpack`.

We can use those scripts this way :

```shell
# "run" is actually "run-script" but it's.. shorter!
$ npm run start
$ npm run test
# start and test do not need "run"
$ npm start
$ npm test 
$ npm start compile
# way to pass arg to our command (`--` to avoid to pass the arg to npm itself)
$ npm start compile -- -w
```

More infos on the `npm run` command at [https://docs.npmjs.com/misc/scripts](https://docs.npmjs.com/misc/scripts).

### webpack -w

With `-w` (aka: `--watch`), each time you change your `App.js`, webpack will automatically re-bundles, you will just need to refresh manually your page in your browser to see the changes. That's not a good DX (Developer Experience), so we will soon see how to refresh automatically without intervention (Hot Reloading).

```shell
$ npm run compile -- -w

> src@1.0.0 compile C:\wip\react-boilerplates
> webpack "-w"

Hash: 660d55efcda74dfba6ba
Version: webpack 1.12.9
Time: 1290ms
    Asset    Size  Chunks             Chunk Names
bundle.js  664 kB       0  [emitted]  main
    + 158 hidden modules
Hash: b238d3a837d37877fa61
Version: webpack 1.12.9
Time: 181ms
    Asset    Size  Chunks             Chunk Names
bundle.js  665 kB       0  [emitted]  main
    + 158 hidden modules
```

### Available commands

To remember what command is available, without checking out the content of `package.json`, you can just type `npm run`:

```shell
$ npm run
Lifecycle scripts included in src:
  test
    echo "Error: no test specified" && exit 1
  start
    node src/server.js

available via `npm run-script`:
  compile
    webpack
```
