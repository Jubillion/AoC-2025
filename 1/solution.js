let input = await Bun.file("./input.txt").text();
input = input.split("\n").slice(0, -1);

// Part 1
let cur = 50,
  prev = 50, // 2
  pwd = 0,
  pwd2 = 0; // 2
for (let cmd of input) {
  prev = cur // 2
  if (cmd[0] === "L") {
    cur -= parseInt(cmd.slice(1));
    pwd2 += -Math.ceil(cur / 100) + 1; // 2
    if(prev === 0 && Math.ceil(cur / 100) < 1) pwd2--; // 2
  } else {
    cur += parseInt(cmd.slice(1));
    pwd2 += Math.floor(cur / 100); // 2
  }
  cur %= 100;
  cur += 100; // for js modulo glitch
  cur %= 100; // " "
  if (cur === 0) pwd++;
}
console.log(`Password: ${pwd}`);

// Part 2
// See also: lines labelled `//2` 
console.log(`"CLICK" Password: ${pwd2}`)