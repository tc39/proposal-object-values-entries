const keys = Object.keys;
const reduce = Function.bind.call(Function.call, Array.prototype.reduce);
const has = Function.bind.call(Function.call, Object.prototype.hasOwnProperty);
const concat = Function.bind.call(Function.call, Array.prototype.concat);

if (!Object.values) {
	Object.values = function values(O) {
		return reduce(keys(O), (v, k) => concat(v, has(O, k) ? [O[k]] : []), []);
	};
}

if (!Object.entries) {
	Object.entries = function entries(O) {
		return reduce(keys(O), (e, k) => concat(e, has(O, k) ? [[k, O[k]] : []), []);
	};
}
