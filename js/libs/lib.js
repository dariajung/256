// Small "library" that contains two functions, map and flip (reverse)

var dash = (function() {

	function dash() {};

	dash.prototype.map = function(fn, arr) {

		console.log('myMap');

		if (!arr) {
			return null;
		}

		if (!fn) {
			return arr;
		}

		var len = arr.length;
		var new_arr = [];
		for (var i = 0; i < len; i++) {
			new_arr.push(fn(arr[i]));
		}

		return new_arr;
	};

	// reverse the given input, assume immutability
	dash.prototype.flip = function(arr) {
		if (!arr) {
			return null;
		}

		var rev = [];
		for (var i = arr.length - 1; i >= 0; i--) {
			rev.push(arr[i]);
		}

		return rev;
	};

	dash.prototype.filter = function(condition, arr) {

		console.log('myFilter');

		if (!arr) {
			return null;
		}

		if (!condition) {
			return arr;
		}

		var len = arr.length;
		var ret = [];

		for (var i = 0; i < len; i++) {
			if (condition(arr[i])) {
				ret.push(arr[i])
			}
		}

		return ret;
	}

	// does x exist in arr?
	dash.prototype.elem = function(x, arr) {

		if (!arr || x === null) {
			console.log('null?');
			return null;
		}

		var len = arr.length;

		for (var i = 0; i < len; i++) {
			if (x === arr[i]) {
				return true;
			}
		}

		return false;

	}

	return dash;
})();

var underscore = new dash();

// export so they are not removed by Closure
window['underscore'] = underscore;
// window['underscore'].map = dash.prototype.map;
// window['underscore'].flip = dash.prototype.flip;
// window['underscore'].filter = dash.prototype.filter;
// window['underscore'].elem = dash.prototype.elem;

