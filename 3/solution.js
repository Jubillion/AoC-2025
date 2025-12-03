let input = await Bun.file("./input.txt").text();

// Part 1
let banks = input
		.split("\n")
		.slice(0, -1)
		.map((a) => a.split("").map((b) => parseInt(b))),
	total = 0;
for (let bank of banks) {
	let max1 = 0,
		max1i = 0,
		max2 = 0;
	for (let i = 0; i < bank.length - 1; i++) {
		if (bank[i] > max1) {
			max1 = bank[i];
			max1i = i;
		}
	}
	for (let i = max1i + 1; i < bank.length; i++) {
		if (bank[i] > max2) {
			max2 = bank[i];
		}
	}
	total += max1 * 10 + max2;
}
console.log(`2-Digit Total: ${total}`);

// Part 2
total = 0;
for (let bank of banks) {
	let max = Array(12).fill(0),
		maxI = Array(12).fill(-1);
	for (let digit = 0; digit < 12; digit++) {
		for (let i = maxI[digit] + 1; i < bank.length + digit - 11; i++) {
			if (bank[i] > max[digit]) {
				max[digit] = bank[i];
				maxI[digit + 1] = i;
			}
		}
    }
    max.reverse();
	total += max.reduce((sum, cur, i) => sum + cur * 10 ** i, 0);
}
console.log(`12-Digit Total: ${total}`);
