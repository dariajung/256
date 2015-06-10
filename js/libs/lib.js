// Small "library" that contains two functions, map and flip (reverse)

 var dash = (function() {

	/**
	 * @constructor
	 */
	function dash() {};

	/**
	 * map
	 * @param {!Function} fn
	 * @param {!Array} arr
	 * @return {!Array}
	 */
	dash.prototype.map = function(fn, arr) {

		console.log('myMap');

		var len = arr.length;
		var new_arr = [];
		for (var i = 0; i < len; i++) {
			new_arr.push(fn(arr[i]));
		}

		return new_arr;
	};

	/**
	 * @param {Array} arr
	 * @return {Array}
	 */
	dash.prototype.flip = function(arr) {

		console.log('flip');

		var rev = [];
		for (var i = arr.length - 1; i >= 0; i--) {
			rev.push(arr[i]);
		}

		return rev;
	};

	dash.prototype.filter = function(condition, arr) {

		console.log('myFilter');

		var len = arr.length;
		var ret = [];

		for (var i = 0; i < len; i++) {
			if (condition(arr[i])) {
				ret.push(arr[i])
			}
		}

		return ret;
	}

		/** 
		 * Checks if x exists in arr
		 * @param {!number} x The element we are looking for.
		 * @param {!Array<number>} arr The array we are given to look in.
		 * @return {boolean} 
		 */
		dash.prototype.elem = function(x, arr) {

			console.log('elem');
			console.log(x);
			console.log(arr);
			var len = arr.length;
			console.log(len);

			for (var i = 0; i < len; i++) {
				if (x === arr[i]) {
					return true;
				}
			}

			return false;

		}

	return dash;

})();

/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
function foo(a, b) {
  return a - b + 1;
}

var underscore = new dash();


var x = ['kitkat', 'gingerbread', 'lollipop'];
// this should complain because elem expects two non-nullable parameters
underscore.elem();

// export so they are not removed by Closure
window['underscore'] = underscore;
// window['underscore'].map = dash.prototype.map;
// window['underscore'].flip = dash.prototype.flip;
// window['underscore'].filter = dash.prototype.filter;
// window['underscore'].elem = dash.prototype.elem;

