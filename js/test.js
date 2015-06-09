
function even(x) {
	return (x % 2 === 0);
}

function foo() {
	var x = [1, 2, 3, 4, 5, 6, 7, 12, 14, 19, 22];

	return underscore.filter(even, x);
};

function baz() {
	var x = [0, 1, 2, 3, 4, 5];

	return underscore.map(function(x){return x+1;}, x);
}

function bar() {
	var x = [1, 2, 3, 4, 5, 6, 7, 12, 14, 19, 22];
	return underscore.flip(x);
}

function foobar() {
	var x = [1, 2, 3, 4, 5, 6, 7, 12, 14, 19, 22];
	return underscore.elem(0, x);
}

window['foo'] = foo;
window['bar'] = bar;
window['baz'] = baz;
window['foobar'] = foobar;