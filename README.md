# Experiments/Research on Closure Compiler's Advanced Optimization

### Directory Structure

```
.
├── Gruntfile.js
├── README.md
├── closure
│   ├── COPYING
│   ├── README.md
│   └── compiler.jar
├── closure.sh
├── index.html
├── js
│   ├── 256
│   │   ├── bundle.closure.js
│   │   ├── game.js
│   │   └── game.ts
│   ├── externs
│   │   ├── lib.js
│   │   └── underscore.js
│   ├── libs
│   │   ├── lib.js
│   │   └── underscore.js
│   ├── test.js
│   └── typings
│       └── underscore.d.ts
└── package.json
```

#### 256
256 is a simple clone of the popular 1048 game. The original was written in TypeScript, `game.ts`. `game.js` is "transpiled" from `game.ts` by the TypeScript compiler `tsc`. 

#### Underscore.js

[Underscore.js](http://underscorejs.org/) is a dependency to running `game.js`. It can be included in the header of the `index.html` if you wish to run the game without bundling `underscore.js` and `game.js` into `bundle.closure.js`. 

#### Bundling

`Underscore.js` and `game.js` are bundled together using the Google Closure Compiler with the flag `--compilation_level ADVANCED_OPTIMIZATIONS`. 

Running `./closure.sh` will result in `js/256/bundle.closure.js`, an aggressively minified file. 

The current version of `underscore.js` cannot survive `ADVANCED_OPTIMZATIONS` (doing this will result in breakage). This is due to some metaprogramming that `underscore.js` uses:

```js
// Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });
```

Specifically, Closure cannot recognize `_.isArguments` as a function, breaking the code. 

To ensure `ADVANCED_OPTIMIZATIONS` succeeds, a workaround is to re-declare the function in this manner:

```js
_.isArguments = function(obj) {
    return toString.call(obj) === '[object ' + name + ']';
  }
```

Unfortunately, this does not fix `bundle.closure.js` from breaking.
