### Experiments/Research on Closure Compiler's Advanced Optimizations

### Directory Structure

```
.
├── Gruntfile.js
├── README.md
├── closure
│   ├── COPYING
│   ├── README.md
│   ├── compiler-ambiguate.jar
│   ├── compiler-disambiguate.jar
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
│   │   ├── dash.js
│   │   ├── lib.js
│   │   ├── lib2.js
│   │   ├── person.closure.js
│   │   ├── person.js
│   │   └── underscore.js
│   ├── test.js
│   └── typings
│       └── underscore.d.ts
└── package.json

```

#### closure
The Google Closure compiler. Included for convenience. 

In addition to the default build, there are two custom builds of the closure compiler, `closure/compiler-ambiguate.jar` and `closure/compiler-disambiguate.jar`. These two custom builds specifically enable `ambiguate_properties` and `disambiguate_properties` respectively when `--use_types_for_optimization` is used. By default, both ambiguate and disambiguate are enabled with the `--use_types_for_optimization` flag. While these two are meant to be used together, for exploratory purposes, the goal is to observe the effects of each on their own. 

Flags of interest:

- `--variable_renaming_report`: A map of original variable names to new names.
- `--property_renaming_report`: A map of original property names to new names.
- `--use_types_for_optimization`: enables both ambiguate and disambiguate
	- `ambiguate properties`
	- `disambiguate properties`

#### 256
256 is a simple clone of the popular 2048 game. The original was written in TypeScript, `game.ts`. `game.js` is "transpiled" from `game.ts` by the TypeScript compiler `tsc`. 

#### Dependencies to 256

**Underscore.js**

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

Unfortunately, this does not fix `bundle.closure.js` from breaking. Closure compiler cannot recognize that `_` in `underscore.js` and in `game.js` are referring to the same "context." Because of this, `_` in the context of `game.js` is not re-named, even though it is re-named in the context of `underscore.js`. A workaround to this is to export `_` by doing so in `underscore.js`:

```js
window['_'] = _;
```

This allows `_` to correctly refer to the underscore object. 

The current theory for this discrepency in re-naming the `_` object correctly is because in `game.js`, functions such as `map` are being called, which are part of the `window` object. They are included in default extern files that ship with Closure compiler. [Externs](https://developers.google.com/closure/compiler/docs/api-tutorial3) are used to communicate what names should not be touched to the Closure Compiler. As such, names such as `map` and `filter` are left untouched even in `ADVANCED_OPTIMIZATIONS`.

#### Grunt & Uglify
A Gruntfile is included to compare minification using Uglify vs the Closure compiler's `ADVANCED_OPTIMIZATIONS` flag. Grunt will produce `js/256/bundle.min.js`, a minified bundle using Uglify.

#### Other Notes
`js/libs/lib.js` is a small "library" function that implements a `dash` class, which has basic implementations of `map`, `filter`, and `flip`. This smaller file is used to aid in investigating what's happening when code is run through Closure.