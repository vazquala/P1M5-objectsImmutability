const player = {
  name: "Sam",
  level: 7,
  settings: { theme: "dark", sound: true },
  inventory: [
    { id: 1, item: "sword",  qty: 1 },
    { id: 2, item: "potion", qty: 3 },
    { id: 3, item: "rope",   qty: 2 },
  ],
};

// #1
const alias = player;
alias.level = 8;
console.log(alias.level);    // Setting alias to player, changing the level, then printing the result.
alias.level = 7;
const copy = {...player};
console.log(copy === player);    // I assume that despite having the same contents inside, the object is counted as different due to it being a copy?

// #2
function reactWouldRerender(before, after) {
  return before !== after;
}

console.log(reactWouldRerender(player, player));
console.log(reactWouldRerender(player, copy));      // Yup, not equal despite being the same.

// #3
const levelledUp = { ...player, level: player.level + 1 };
console.log(alias.level);       // New level in a different object.
console.log(levelledUp !== player);       // New level. Object is not the same as only the copy had level + 1.

// #4
const shallow = { ...player };
console.log(shallow.settings === player.settings);      // So the objects are different but its values are the same.

const themed = {
  ...player,
  settings: { ...player.settings, theme: "light" },
};

console.log(themed.settings === player.settings);       // Settings are different, a new object.
console.log(themed.inventory === player.inventory);        // Inventory is the same.

// #5
const added = { ...player, inventory: [...player.inventory, { id: 4, item: "torch", qty: 5 }] };
const removed = { ...player, inventory: player.inventory.filter(i => i.id !== 1) };
const used = {
  ...player,
  inventory: player.inventory.map(i => i.id === 2 ? { ...i, qty: i.qty - 1 } : i),
};

used.inventory[0] === player.inventory[0]   // true  — untouched item reused.
used.inventory[1] !== player.inventory[1]   // true  — changed item replaced.

// #6
console.log(player);        // Still the same.

// Stretch
const frozen = Object.freeze({ ...player });
frozen.level = 1000;
console.log(frozen.level);      // still 7 — the write was ignored

