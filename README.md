[back to 10-react-linting](https://github.com/chtefi/react-stack-step-by-step/tree/10-react-linting/)

WIP, don't read please. ;-)

# 10. Let's add some Redux to manage our data

We are going to add some simple code (without Redux) to handle our components state.
Then, we'll make use of Redux to simplify and enhance it.

We won't use any Flux framework.

We'll see why Redux has become a de-facto framework for React projects.

## Let's add some state in our components


Cons :

- we pass props over the components that don't need them
- if we want to restructure a bit our code, rename or merge stuff, we'll have many place to change. With Redux, it would be easier and less bug prone.

## What packages to install for Redux ?

```shell
$ npm i -S redux
```



## How to use it

I suggest you start with teaching videos from the creator of Redux, Dan Abramov : https://egghead.io/series/getting-started-with-redux, then the main documentation for in-depth details : http://rackt.org/redux/docs/introduction/index.html


later ...
```
$ npm i -S redux-thunk
```

## Plugins

redux-*** (not devTools, next part)

## Next step

Incoming. Stay tuned..!
