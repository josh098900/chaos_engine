// Data Arrays (Expanded with Themes)
const npcNames = {
    default: ["Zorbo", "Klyra", "Thump", "Vex", "Mira", "Grok"],
    underdark: ["Xyris", "Droth", "Zulka", "Vyrn"],
    pirate: ["Blackfin", "Salty Meg", "Crabclaw", "Rumjack"],
    feywild: ["Liora", "Feyrin", "Twix", "Elara"],
};
const npcQuirksDefault = ["hums battle anthems", "juggling pinecones", "winks too much", "laughs at danger"];
const npcSecretsDefault = ["hides a map to a crypt", "is a polymorphed goose", "seeks a lost sibling", "cursed to rhyme"];

const twists = {
    default: [
        "The bridge collapses mid-fight—roll to grab the ledge!",
        "A horn sounds; reinforcements arrive, but whose?",
        "The enemy vanishes, leaving a ticking box behind.",
        "A storm rolls in—lightning strikes something vital!",
    ],
    underdark: ["A cave-in traps you with glowing eyes in the dark!", "Poison gas seeps from the walls—hold your breath!"],
    pirate: ["The ship lurches—a kraken’s tentacle grabs the mast!", "Cannon fire erupts; the enemy ship is sinking fast!"],
    feywild: ["Time warps—everyone’s suddenly 10 years younger!", "A laughing mist turns weapons into flowers!"],
};

const lootItems = {
    default: ["Sword of Oops", "Cloak of Chuckles", "Boots of Bonks", "Ring of Rude Noises", "Staff of Splat"],
    underdark: ["Drowfang Dagger", "Webweaver Cloak", "Glowcap Ring"],
    pirate: ["Cutlass of Tides", "Pegleg of Peril", "Parrot Whistle"],
    feywild: ["Pixieblade", "Glimmerdust Veil", "Thornstep Boots"],
};
const lootEffectsDefault = [
    "+2 damage, 10% chance to hit wielder",
    "invisibility but you giggle",
    "double speed, 50% chance to trip",
    "summons a fart cloud once per day",
    "+1 to spells, glows pink in danger",
];

const enemies = {
    default: ["a giggling ogre", "three sarcastic goblins", "a confused owlbear", "a bard with a cursed lute"],
    underdark: ["a mind flayer’s thrall", "a swarm of cave spiders"],
    pirate: ["a scurvy pirate crew", "a ghost shark"],
    feywild: ["a mischievous satyr", "a dancing treant"],
};
const settings = {
    default: ["a crumbling tower", "a foggy swamp", "a rickety bridge", "a haunted tavern"],
    underdark: ["a dripping cavern", "a fungal abyss"],
    pirate: ["a stormy deck", "a treasure islet"],
    feywild: ["a mushroom glade", "a crystal pond"],
};
const hooks = {
    default: ["offers a duel or a riddle", "demands a toll in snacks", "is mid-argument with a ghost", "sings off-key for help"],
    underdark: ["whispers a dark bargain", "guards a glowing crystal"],
    pirate: ["challenges you to a plank walk", "offers a cursed map"],
    feywild: ["trades riddles for wishes", "dances for your soul"],
};

// History Storage
let savedResults = [];

function rollDice(sides) {
    const result = Math.floor(Math.random() * sides) + 1;
    document.getElementById("dice-result").innerText = `Result: ${result}`;
    return result;
}

function generateNPC() {
    const tone = document.getElementById("tone").value;
    const theme = document.getElementById("theme").value;
    let names = npcNames[theme] || npcNames.default;
    let quirks = npcQuirksDefault;
    let secrets = npcSecretsDefault;

    if (tone === "silly") {
        quirks = ["juggling flaming pinecones", "wearing a clown nose", "talks in puns"];
        secrets = ["is secretly a birthday clown", "owns 17 pet chickens", "fears spoons"];
    } else if (tone === "combat") {
        quirks = ["polishes a sword obsessively", "counts kills aloud", "spars with trees"];
        secrets = ["hunts a rival warrior", "stole a warlord’s axe", "leads a mercenary band"];
    } else if (tone === "roleplay") {
        quirks = ["whispers to an imaginary friend", "carries a locket", "quotes poetry"];
        secrets = ["seeks a lost love", "guards a family secret", "flees a dark past"];
    }

    const name = names[Math.floor(Math.random() * names.length)];
    const quirk = quirks[Math.floor(Math.random() * quirks.length)];
    const secret = secrets[Math.floor(Math.random() * secrets.length)];
    document.getElementById("output").innerText = `${name}, who ${quirk}, secretly ${secret}.`;
}

function generateTwist() {
    const theme = document.getElementById("theme").value;
    const twistList = twists[theme] || twists.default;
    const twist = twistList[Math.floor(Math.random() * twistList.length)];
    const roll = rollDice(20);
    document.getElementById("output").innerText = `${twist} (Roll: ${roll} - DM decides the outcome!)`;
}

function generateLoot() {
    const tone = document.getElementById("tone").value;
    const theme = document.getElementById("theme").value;
    let items = lootItems[theme] || lootItems.default;
    let effects = lootEffectsDefault;

    if (tone === "silly") {
        effects = ["turns foes into ducks for 1 turn", "makes you quack when hit", "shoots glitter"];
    } else if (tone === "combat") {
        effects = ["+3 damage vs undead", "explodes on crit (5 damage)", "heals 1d6 on kill"];
    } else if (tone === "roleplay") {
        effects = ["whispers its past owner’s name", "glows near hidden doors", "sings when danger’s near"];
    }

    const item = items[Math.floor(Math.random() * items.length)];
    const effect = effects[Math.floor(Math.random() * effects.length)];
    document.getElementById("output").innerText = `${item}: ${effect}.`;
}

function generateEncounter() {
    const tone = document.getElementById("tone").value;
    const theme = document.getElementById("theme").value;
    let enemyList = enemies[theme] || enemies.default;
    let settingList = settings[theme] || settings.default;
    let hookList = hooks[theme] || hooks.default;

    if (tone === "silly") {
        enemyList = enemyList.map(e => `a silly ${e}`);
        hookList = ["challenges you to a dance-off", "throws pies instead of punches"];
    } else if (tone === "combat") {
        hookList = ["ambushes from the shadows", "roars a challenge"];
    } else if (tone === "roleplay") {
        hookList = ["offers a cryptic warning", "seeks aid for a quest"];
    }

    const enemy = enemyList[Math.floor(Math.random() * enemyList.length)];
    const setting = settingList[Math.floor(Math.random() * settingList.length)];
    const hook = hookList[Math.floor(Math.random() * hookList.length)];
    document.getElementById("output").innerText = `${enemy} in ${setting}, ${hook}.`;
}

function saveResult() {
    const output = document.getElementById("output").innerText;
    if (output && !savedResults.includes(output)) {
        savedResults.push(output);
        updateHistory();
    }
}

function updateHistory() {
    const historyList = document.getElementById("history-list");
    historyList.innerHTML = "";
    savedResults.forEach(result => {
        const li = document.createElement("li");
        li.innerText = result;
        historyList.appendChild(li);
    });
}

function runCombatSim() {
    const partyInput = document.getElementById("party-input").value.trim().split("\n").filter(line => line.trim() !== "");
    const enemyInput = document.getElementById("enemy-input").value.trim().split("\n").filter(line => line.trim() !== "");
    let log = "";

    // Parse inputs matching your format: "Name: HP, AC, +Attack, Damage"
    const party = partyInput.map(line => {
        const parts = line.split(/,\s*/); // Split on comma with optional spaces
        if (parts.length !== 4) { // Expect 4 parts after comma split
            log += `Invalid party entry: "${line}"\n`;
            return null;
        }
        const [nameHP, ac, atk, dmg] = parts;
        const [name, hp] = nameHP.split(/:\s*/); // Split name and HP on colon
        if (!name || !hp) {
            log += `Invalid name/HP in party entry: "${line}"\n`;
            return null;
        }
        return {
            name: name.trim(),
            hp: parseInt(hp) || 0,
            ac: parseInt(ac) || 10,
            atk: parseInt(atk.replace("+", "")) || 0,
            dmg: dmg || "1d4"
        };
    }).filter(c => c !== null);

    const enemies = enemyInput.map(line => {
        const parts = line.split(/,\s*/); // Split on comma with optional spaces
        if (parts.length !== 4) { // Expect 4 parts after comma split
            log += `Invalid enemy entry: "${line}"\n`;
            return null;
        }
        const [nameHP, ac, atk, dmg] = parts;
        const [name, hp] = nameHP.split(/:\s*/); // Split name and HP on colon
        if (!name || !hp) {
            log += `Invalid name/HP in enemy entry: "${line}"\n`;
            return null;
        }
        return {
            name: name.trim(),
            hp: parseInt(hp) || 0,
            ac: parseInt(ac) || 10,
            atk: parseInt(atk.replace("+", "")) || 0,
            dmg: dmg || "1d4"
        };
    }).filter(c => c !== null);

    if (party.length === 0 || enemies.length === 0) {
        log += "Please enter at least one valid party member and one enemy!\nFormat: Name: HP, AC, +Attack, Damage (e.g., Fighter: 20 HP, 16 AC, +5, 1d8+3)";
        document.getElementById("combat-log").innerText = log;
        return;
    }

    // Simple combat loop (5 rounds max)
    let combatants = [...party, ...enemies];
    for (let round = 1; round <= 5 && party.some(c => c.hp > 0) && enemies.some(c => c.hp > 0); round++) {
        log += `Round ${round}:\n`;
        combatants.forEach(attacker => {
            if (attacker.hp <= 0) return;
            const target = attacker.hp > 0 ? (party.includes(attacker) ? enemies : party).find(t => t.hp > 0) : null;
            if (!target) return;

            const roll = rollDice(20);
            const hit = roll + attacker.atk >= target.ac;
            if (hit) {
                const damage = evalDice(attacker.dmg);
                target.hp -= damage;
                log += `${attacker.name} hits ${target.name} for ${damage} damage! (${target.hp} HP left)\n`;
            } else {
                log += `${attacker.name} misses ${target.name}!\n`;
            }
        });
    }

    // Outcome
    if (party.every(c => c.hp <= 0)) log += "Enemies win!\n";
    else if (enemies.every(c => c.hp <= 0)) log += "Party wins!\n";
    else log += "The battle rages on—roll for a twist!\n";

    document.getElementById("combat-log").innerText = log;
}

function evalDice(dmgString) { // e.g., "1d8+3"
    if (!dmgString || typeof dmgString !== "string") return 1; // Fallback to 1 damage if invalid
    const [dice, mod] = dmgString.split("+");
    const [count, sides] = dice.split("d").map(Number);
    let total = 0;
    for (let i = 0; i < (count || 1); i++) total += Math.floor(Math.random() * (sides || 4)) + 1;
    return total + (parseInt(mod) || 0);
}