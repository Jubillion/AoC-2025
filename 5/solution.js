let input = await Bun.file("./input.txt").text();
input = input
	.slice(0, -1)
	.split("\n\n")
	.map((a) => a.split("\n"));
input[0] = input[0].map((a) => a.split("-").map((b) => parseInt(b)));
input[1] = input[1].map((a) => parseInt(a));

// Part 1
let fresh = 0;
for (let range of input[0]) {
	let newIds = [];
	for (let id of input[1]) {
		if (range[0] > id || range[1] < id) {
			newIds.push(id);
		} else {
			fresh++;
		}
	}
	input[1] = newIds;
	newIds = [];
}
console.log(`Fresh Available: ${fresh}`);

// Part 2'
fresh = 0;
input[0].sort((a, b) => a[0] - b[0]);
let cur = input[0].shift();
for (let range of input[0]) {
    if (cur[1] < range[0]) {
        fresh += cur[1] - cur[0] + 1;
        cur = range;
    } else {
        cur[1] = Math.max(cur[1], range[1]);
    }
}
fresh += cur[1] - cur[0] + 1;
console.log(`Fresh Total: ${fresh}`);
