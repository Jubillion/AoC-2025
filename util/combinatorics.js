// NOTE: I initially created this file for use in inclusion-exclusion
// for day 5 (which I abandoned for performance reasons), but kept it
// anyway because it can be useful eventually.

function choose(n, items) {
	if (!Number.isInteger(n)) throw new TypeError("n must be an integer.");
	if (!Array.isArray(items)) throw new TypeError("items must be an Array.");
	let combinations = [];
	if (n === 1) return items.map((a) => [a]);
	for (let i = 0; i < items.length - n + 1; i++) {
		let a = choose(n - 1, items.slice(i + 1)).map((a) => [items[i]].concat(a));
		combinations = combinations.concat(a);
	}
	return combinations;
}

export { choose };
