import { primes } from "../util/primes.js";

let input = await Bun.file("./input.txt").text();
input = input
	.slice(0, -1)
	.split(",")
	.map((a) => a.split("-"));

// Part 1
let total = 0;
// Ensure all ranges same # of digits
for (let range of input) {
	let last = range.pop();
	for (let i = range[0].length; i < last.length; i++) {
		range.push(10 ** i - 1, 10 ** i);
	}
	range[0] = parseInt(range[0]);
	range.push(parseInt(last));
	while (range.length > 2) input.push(range.splice(0, 2));
}
const digitsOf = (n) => Math.floor(Math.log10(n)) + 1;
let inputDiv = input.filter((r) => digitsOf(r[0]) % 2 === 0),
	invalid = new Set(); // 2
for (let range of inputDiv) {
	let mult = 10 ** (digitsOf(range[0]) / 2) + 1;
	for (let i = 0; i <= range[1]; i += mult) {
		if (i >= range[0]) {
			total += i;
			invalid.add(i); // 2
		}
	}
}
console.log(`Invalid Sum (2 reps): ${total}, found ${invalid.size} IDs`);

// Part 2
// See also: lines labelled `//2`
let max = input.reduce((max, r) => Math.max(max, digitsOf(r[0])), 0);
for (let reps of primes(max)) {
	if (reps === 2) continue;
	inputDiv = input.filter((r) => digitsOf(r[0]) % reps === 0);
	for (let range of inputDiv) {
		let mult = 0;
		for (let i = 0; i < digitsOf(range[0]); i += digitsOf(range[0]) / reps)
			mult += 10 ** i;
		for (let i = 0; i <= range[1]; i += mult) {
			if (i >= range[0]) {
				if (!invalid.has(i)) total += i;
				invalid.add(i);
			}
		}
	}
}
console.log(`Invalid Sum (* reps): ${total}, found ${invalid.size} IDs`);
