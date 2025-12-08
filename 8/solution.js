let input = await Bun.file("./input.txt").text();
input = input
	.split("\n")
	.slice(0, -1)
	.map((a) => a.split(",").map((b) => parseInt(b)));

// Part 1
let pairs = [];
for (let i = 0; i < input.length; i++) {
	for (let j = i + 1; j < input.length; j++) {
		let diff = input[i].map((a, k) => a - input[j][k]);
		pairs.push({ dist: Math.hypot(...diff), i, j });
	}
}
pairs.sort((a, b) => a.dist - b.dist);
let graphs = Array(input.length)
	.fill(0)
	.map((_, i) => [i]);
for (let pair of pairs.slice(0, 1000)) {
	let { i, j } = pair;
	if (graphs[i] === graphs[j]) continue;
	let next = graphs[i].concat(graphs[j]);
	next.forEach((a) => (graphs[a] = next));
}
let product = Array.from(new Set(graphs).keys())
	.sort((a, b) => b.length - a.length)
	.slice(0, 3)
	.reduce((prod, a) => a.length * prod, 1);
console.log(`Circuit Product: ${product}`);

// Part 2
for (let pair of pairs.slice(1000)) {
	let { i, j } = pair;
	if (graphs[i] === graphs[j]) continue;
	let next = graphs[i].concat(graphs[j]);
	next.forEach((a) => (graphs[a] = next));
	product = input[i][0] * input[j][0];
	if (graphs[0].length === input.length) break;
}
console.log(`Final X Product: ${product}`);
