class Dash  {

	constructor() {

	}

	map<T>(fxn, arr: Array<T>): Array<T> {

		var len = arr.length;
		var new_arr = [];

		for (var i = 0; i < len; i++) {
			new_arr.push(fxn(arr[i]));
		}

		return new_arr;
	}
}