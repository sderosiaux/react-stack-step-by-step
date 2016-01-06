# 10. Let's add some code Linting

Code linting is simply a set of rules to apply, to enforce some styles and norms in the code, and even check if you're writing bugs (due to typos mostly).

By applying the same rules on the whole source code, you can, for instance, make sure that everywhere there is no missing semicolons (or that there is not semicolons at all if you don't like them), that the variables are properly named, that the order of methods to override is fixed, that the constructor is the first method, that the depth of the functions is not more than 4 etc. etc.

There are a LOT of rules to control.

Hopefully, we can use some presets created by big tech companies to avoid to set them all manually.
Moreover, if they follow those styles, it's a good opportunity to follow the same ones.!

## What packages to install to do linting ?

We have multiple choices.

- JSLint : original project
- JSHint : fork of JSLint
- ESLint : new recent alternative (2013), pluggable

We are going to stick with ESLint because it supports React special linting rules through a plugin `eslint-plugin-react`.

And because the linting is only necessary for the developers, the npm dependency is installed with `--save-dev` (= `-D`).

```shell
$ npm i -D eslint
```

## How to use it

`eslint` gives us the command of the same name in `./node_modules/.bin/eslint`.
It just takes the folder to lint in parameter such as :

```shell
$ ./node_modules/.bin/eslint src
```

For now, doing that leads to some errors :

```
src\components\App.js
  1:2  error  Parsing error: Illegal import declaration

src\components\Product.js
  1:2  error  Parsing error: Illegal import declaration
```

It's because by default, ESLint does not understand ES6.

Before fixing that, let's simplify our life, and create a npm script command to run this command quickly.

## Add a npm script

To avoid to type the eslint command each time, let's add a simple npm script :

```json
"scripts": {
  "lint": "eslint src"
```

Remember: when `npm` executes the scripts, it has access to the `./node_modules/.bin` folder automatically `eslint` refers to. No need to add this path in the script.

Now, let's fix our ESLint.

## ESLint + ES6 + JSX

As the [documentation](http://eslint.org/docs/user-guide/configuring#specifying-parser) states, we need to create a file `.eslintrc` at the root of the project to set the configuration.

First of all, let's make it understand `import`s.

```json
{
  "ecmaFeatures": {
    "modules": true
  }
}
```
```
6:2  error  Parsing error: Unexpected token const
```

Now, it does not understand `const`. Let's make it understand ES6.

```json
{
  "ecmaFeatures": {
    "modules": true
  },
+ "env": {
+   "es6": true
+ }
}
```
```
25:8  error  Parsing error: Unexpected token <
```

Now, it does not understand JSX it seems. Let's make it understand JSX.

```json
{
  "ecmaFeatures": {
+   "jsx": true,
    "modules": true
  },
  "env": {
    "es6": true
  }
}
```


Boom, it passes without error !
That means it could parse it properly at least.

There is no error, not because the code is already perfect, but because, by default : *All rules are disabled by default*.

But there are a ton of rules, let's see how to extend some existing defaults. We are not the first person who want to use it right ?

## Extends some default ESLint configuration

It's recommanded to extend the [eslint:recommanded](http://eslint.org/docs/rules/) set of rules, to begin with.

But we can also extend some other known ones, such as :

- [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb) : want to work at airbnb ? Learn their styles.
- [eslint-config-rackt](https://github.com/rackt/eslint-config-rackt) : a nice style overriding some properties of `eslint:recommanded`. I'm not fan because it forbids semicolons, commas on the last array item, all those useless things I like to write.

To extends those rules, `npm i` them or use the `eslint:recommanded` one directly :

```json
{
+ "extends": "eslint:recommended",
  "ecmaFeatures": {
    "jsx": true,
    "modules": true
  },
  "env": {
    "es6": true
  }
}
```

```
3:8     error  "Toolbar" is defined but never used      no-unused-vars
19:378  error  Unexpected trailing comma                comma-dangle
```

Now we have some linting issues.
But it seems ESLint does not understand yet this kind of program :

```javascript
import Toolbar from './Toolbar.js';
...
<Toolbar />
```

The variable `Toolbar` is used by `<Toolbar />` (translated to `React.createElement(Toolbar)`), so the `no-unused-vars` error is not a true error.

To make it understand that the imported components are used in JSX, we need to install the plugin [`eslint-plugin-react`](https://github.com/yannickcr/eslint-plugin-react) and add a special rule [jsx-uses-react](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-uses-vars.md) from this plugin, that will remove this ESLint false error.

```shell
$ npm i -D eslint-plugin-react
```

```json
{
  "extends": "eslint:recommended",
  "ecmaFeatures": {
    "jsx": true,
    "modules": true
  },
  "env": {
    "es6": true
  },
+ "plugins": [
+   "react"
+ ],
+ "rules": {
+   "react/jsx-uses-react": 1
+ }
}
```


Tada, we are left with some true linting errors such as :

```
19:378  error  Unexpected trailing comma  comma-dangle
```

This one states that you have a line finishing by a [trailing comma in object literal](http://eslint.org/docs/rules/comma-dangle.html) and that you should not (because you have a rule that forbids it).

You can also see this kind of error :

```
6:19  error  "document" is not defined  no-undef
```

## Javascript environments

ESLint doesn't know what is `document`, it didn't found it in the scope. By default, it does not assume the environment is a browser (because it can be a pure nodejs program, where `document` does not exist). Therefore, we have to specify we are dealing with javascript that's going to be used in the browser, and that will have access to `document`, `window`, `console.log` and so on.

```json
{
  "extends": "eslint:recommended",
  "ecmaFeatures": {
    "jsx": true,
    "modules": true
  },
  "env": {
    "es6": true,
+   "browser": true
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "react/jsx-uses-react": 1,
  }
}
```

There are a lot of different environments, you can find them here [http://eslint.org/docs/user-guide/configuring.html](http://eslint.org/docs/user-guide/configuring.html).

Examples :

- node
- worker
- mocha
- jquery

Each of them exposes certain globals (that ESLint will assume they exist) that you don't need to specify. You can find the list here [https://github.com/sindresorhus/globals/blob/master/globals.json](https://github.com/sindresorhus/globals/blob/master/globals.json).

## Overriding rules

If I want to allow trailing commas, I can override the rule :

```json
"rules": {
  "react/jsx-uses-react": 1,
+ "comma-dangle": 0
}
```

For `comma-dangle` rule :

- `0` means : you don't care (disabled).
- `1` means : you get a warning if that happens, it's tolerated (ESLint will still succeed)
- `2` means : ESLint is going to fail if that happens

Some rules accept some options to change their behavior.

For instance, if I want to *force* trailing commas for multilines, it's possible :

```json
"rules": {
  "react/jsx-uses-react": 1,
+ "comma-dangle": [ 2, "always-multiline" ]
}
```

This will generate errors if there is a missing trailing comma on arrays or objects that span multiple lines.

The option has no effect if the code is `0` (disabled).
The available options (if there is) depend on the rule, check [http://eslint.org/docs/rules/comma-dangle](http://eslint.org/docs/rules/comma-dangle) for instance.

Personally, I like those dangle-commas because that means I can switch the lines order without playing with the end-of-lines.

Anyway, as you saw, it's very configurable and anybody can match its code style and force it everywhere in it source code. But that's not useful only for that, but can help to find bugs before runtime.

## Bug finding

The biggest issues when typing Javascript are the typos. Because we often lack a good auto-completion, or we are used to type everything, we do typos. And we find them at runtime, not funny eh?

Linting your code to find those typos is a big win :

```
38:34  error  "decription" is not defined              no-undef
```

Typo !

It's never a good idea to disable the rule [`no-undef`](http://eslint.org/docs/rules/no-undef.html), you can understand why.

## More Babel syntax available thanks to [`babel-eslint`](https://github.com/babel/babel-eslint)

ESLint uses [`espree`](http://eslint.org/docs/user-guide/configuring#specifying-parser) to parse ES6.
But we are using Babel, and Babel handles some features such as the spread notation that are not handled by `espree` :

```js
const obj = { a: 1, ...{ b: 2, c: 3 } };
```

ESLint won't be able to parse that :

```
19:18  error  Parsing error: Unexpected token ..
```

Meaning we need to plug the Babel parser to make it understand.
Hopefully, it's planned and pretty straightforward, just install this package :

```shell
$ npm i -D babel-eslint@5.0.0-beta6
```

> We install the latest beta because it is using Babel 6

And define Babel as the parser of ESLint (that will be our last update to `.eslintrc`) :

```json
{
  "extends": "eslint:recommended",
  "ecmaFeatures": {
    "jsx": true,
    "modules": true
  },
  "parser": "babel-eslint",
  "env": {
    "es6": true,
    "browser": true
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "react/jsx-uses-react": 1,
    "comma-dangle": 0
  }
}

```

No more syntax error.

It's quite standard to use this plugin nowadays, because most Javascript projects are using Babel, thus, you always want to parse your code source with Babel, for any third-party app working with it.

Now, you have a proper ESLint configuration, you can code properly and invite people to code with you. You are sure they will follow the style and conventions you enforced.

It's often a good opportunity to check the linting when building or publishing your package, for instance, in `package.json`'s `"scripts"`:

```json
  "compile": "npm run lint && webpack",
```

If an error occurs, webpack won't be executed.

## Some common errors

Let's quickly go through some classic linting errors :

- `"Toolbar" is defined but never used       | no-unused-vars` : if you're using <Toolbar /> it won't find it unless you are using react plugin in ESLint.
- `"items" is defined but never used         | no-unused-vars` : a plain js variable you are not using, remove it
- `Unexpected var, use let or const instead  | no-var` : `var` is evil
- `Strings must use singlequote              | quotes` : prefer `'` over `"`
- `Unexpected trailing comma                 | comma-dangle` : the famous trailing comma at the end of multilines
- `Extra semicolon                           | semi` : if you want or don't want semicolon at the end of statements

As you understood, the keyword on the right is the code you want to look for to understand what it means or to override it as you wish.

## In-code ESLint hints

We only deal with a single file `.eslintrc` for now, meaning it's global to all our source code.

But sometimes, you want to make some exception, mostly because you added a hack somewhere. That generates you a linting warning or error and you just want ESLint to ignore it.

You can add special comment in your code to talk to ESLint :

```js
// eslint-disable-line

/*eslint-disable */
... ugly code ...
/*eslint-enable */
```

## Your text editor / IDE supports linting on-the-fly

Last but not least, every good text-editors or IDEs have a plugin to automatically lint your code when typing, and display a marker next to the line if something is wrong : because you don't want to check back your console and re-execute the full linting each time you write some lines.

Check your IDE doc for more info.

- Sublime Text plugin
- Atom
- WebStorm
- Visual Studio
- ...

In my case, I'm using the best text editor aka Sublime Text, you need to install :

- [SublimeLinter](http://www.sublimelinter.com/)
- [SublimeLinter-contrib-eslint](https://github.com/roadhump/SublimeLinter-eslint)

## Next step

Incoming. Stay tuned..!
