[back to 2-react-express](https://github.com/chtefi/react-stack-step-by-step/blob/2-react-express/README.md)

# 3. Let's add JSX

## Why JSX ?

Because the non-JSX syntax is :

- uglier
- more verbose
- more error prone
- less descriptive at the first sight

It was created for a reason, right ?

## What to do

- Add a reference to `browser.js` (from the `babel-core` project) in our `index.html`, using a cdn such as `https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.min.js`.
> Note: we are not using the last version of Babel (>= 6) because `browser.js` is not working yet with it. We are using the last of the 5.x branch, `5.8.34`.

- Update `App.js` to use JSX syntax
- Start the server and check `http://localhost:3000/`

## Switch to JSX

Instead of using :
```js
React.createElement("li", null, subject);
```

We use : 
```js
<li>{subject}</li>;
```

## Next step

[4-react-es6](https://github.com/chtefi/react-stack-step-by-step/tree/4-react-es6)
