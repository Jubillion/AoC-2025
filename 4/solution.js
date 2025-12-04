let input = await Bun.file("./input.txt").text();
input = input
	.split("\n")
	.map((a) => a.split(""))
	.slice(0, -1);

// Part 1
let count = 0;
for (let y = 0; y < input.length; y++) {
	for (let x = 0; x < input[y].length; x++) {
		if (input[y][x] === ".") continue;
		let neighbors = 0;
		for (let square = 0; square < 9; square++) {
			if (square === 4) continue;
			if (input[y + Math.floor(square / 3) - 1])
				if (input[y + Math.floor(square / 3) - 1][x + (square % 3) - 1] === "@")
					neighbors++;
		}
		if (neighbors < 4) count++;
	}
}
console.log(`Immediately Accessible: ${count}`);

// Part 2
count = 0;
let next = input.map((a) => a.flat()),
	delta = 1;
while (delta > 0) {
	delta = 0;
	for (let y = 0; y < input.length; y++) {
		for (let x = 0; x < input[y].length; x++) {
			if (input[y][x] === ".") continue;
			let neighbors = 0;
			for (let square = 0; square < 9; square++) {
				if (square === 4) continue;
				if (input[y + Math.floor(square / 3) - 1])
					if (
						input[y + Math.floor(square / 3) - 1][x + (square % 3) - 1] === "@"
					)
						neighbors++;
			}
			if (neighbors < 4) {
				delta++;
				next[y][x] = ".";
			}
		}
	}
	count += delta;
	input = next.map((a) => a.flat());
}
console.log(`All Accessible: ${count}`);
