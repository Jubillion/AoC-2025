function primes(n) {
	if (!Number.isInteger(n)) throw new TypeError("n must be an integer.");
	let primes = [];
	for (let i = 2; i <= n; i++) {
		if (!primes.some((a) => i % a === 0)) primes.push(i);
	}
	return primes;
}

function nPrimes(n) {
	if (!Number.isInteger(n)) throw new TypeError("n must be an integer.");
	let primes = [];
	for (let i = 2; primes.length <= n; i++) {
		if (!primes.some((a) => i % a === 0)) primes.push(i);
	}
	return primes;
}

export { primes, nPrimes };
