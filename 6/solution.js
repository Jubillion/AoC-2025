let input = await Bun.file("./input.txt").text();
input = input.split("\n");
let ops = input[4].split(" ").filter((a) => a.length > 0);
input = input.slice(0, 4).map((a) =>
	a
		.split(" ")
		.filter((b) => b.length > 0)
		.map((b) => parseInt(b))
);

// Part 1
let cols = [],
	total = 0;
for (let row of input)
	row.forEach((a, i) => {
		if (!Number.isFinite(cols[i])) {
			cols[i] = a;
			return;
		}
		if (ops[i] === "+") cols[i] += a;
		else cols[i] *= a;
	});
total = cols.reduce((sum, a) => sum + a, 0);
console.log(`Read LTR: ${total}`);

// Part 2
input = await Bun.file("./input.txt").text();
input = input.split("\n").slice(0, -1);
total = 0;
let op = "",
	subtotal = 0,
	number = 0;
for (let col = 0; col < input[0].length; col++) {
	for (let row = input.length - 1; row >= 0; row--) {
		const char = input[row][col];
		if (char === " ") continue;
		if (["*", "+"].includes(char)) {
			op = char;
			total += subtotal;
			subtotal = null;
			continue;
		}
		number +=
			parseInt(char) * 10 ** (Math.floor(Math.log10(number || 0.5)) + 1);
	}
	if (subtotal === null) {
		subtotal = number;
		number = 0;
		continue;
	}
	if (number === 0) continue;
	if (op === "+") subtotal += number;
	else subtotal *= number;
	number = 0;
}
total += subtotal;
console.log(`Read TTB: ${total}`);
