# 3. +jsx

## Why jsx ?

Because the non-jsx syntax is :

- uglier
- more verbose
- more error prone
- less descriptive at the first sight

## What to do

- Add a reference to `babel-core` : `browser.js` in our `index.html` (from a cdn) : `https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.min.js`.
> Note: we are not using the last version of Babel (>= 6) because `browser.js` is not working yet with it. We are using the last of the 5.x branch, `5.8.34`.

- Update `App.js` to use jsx syntax
- go to `http://localhost:3000/`.

## What was done

Instead of using `React.createElement("li", null, subject);`, we use `<li>{subject}</li>;`.
