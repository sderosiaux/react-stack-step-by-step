# 9. Let's add some content

Thanks to our previous step, we already have a simple but functional boilerplate, we could add thousands of components, structured, with HR, ES5 compilation for in-browser usage. No problemo. Let's add some content to play a bit, and introduce new tools to respond to our growing needs.

## Why should I add some content ?

Because you want to share your new cool idea to the world.

## What to do

I just added some new components in `src/components` to make some kind of pictures application.

I did everything using HR only. I _never_ refreshed once my browser. Even when you create a new file and import it somewhere, it will be taken into account.

Checkout the [source](https://cdn.rawgit.com/chtefi/react-boilerplates/9-react-content/src/components) if you just want to see some basic ES6 React components code.

![Pixapixa](https://cdn.rawgit.com/chtefi/react-boilerplates/9-react-content/pixapixa.png)

## Furthermore

While doing that, I've added new babel preset to handle ES6 spread notation : [http://babeljs.io/docs/plugins/preset-stage-2/](http://babeljs.io/docs/plugins/preset-stage-2/). It should be part of every boilerplates.

```
$ npm install --save-dev babel-preset-stage-2
```
```
// .babelrc
"presets": ["react", "es2015", "stage-2"]
```

I've created several files, had some syntax errors and compilation issues.
I did that alone so the "same" style is applied everywhere in my code. I didn't use any js trick (only God knows how many exist), the code was pretty simple.

What if you're not alone ? What if you have thousands of lines ?

- Code style should be uniform, in order to be easily catched up by anyone working on the project, or yourself
- Code should not use any hack, or be
- Code should be checked to detect incertitudes, typos, side-effects, dangerous syntax etc.

This is our next step : code linting.
