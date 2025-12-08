let input = await Bun.file("./input.txt").text();
input = input.split("\n").slice(0, -1);

// Part 1
let splits = 0,
	beams = new Map(),
	next = new Map(),
	timelines = 1; // 2
beams.set(input.shift().indexOf("S"), 1);
for (let row of input) {
	for (let beam of beams.keys()) {
		if (row[beam] === "^") {
			next.set(beam - 1, (next.get(beam - 1) || 0) + beams.get(beam));
			next.set(beam + 1, (next.get(beam + 1) || 0) + beams.get(beam));
			timelines += beams.get(beam); // 2
			splits++;
		} else {
			next.set(beam, (next.get(beam) || 0) + beams.get(beam));
		}
	}
	beams = next;
	next = new Map();
}
console.log(`Beam Splits: ${splits}`);

// Part 2
// See also: lines labelled `//2`
console.log(`Timelines Created: ${timelines}`);
