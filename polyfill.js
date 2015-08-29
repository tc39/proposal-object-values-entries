const keys = Object.keys;
const map = Function.bind.call(Function.call, Array.prototype.map);

if (!Object.values) {
	Object.values = function values(O) {
		return map(keys(O), k => O[k]);
	};
}

if (!Object.entries) {
	Object.entries = function entries(O) {
		return map(keys(O), k => [k, O[k]]);
	};
}
