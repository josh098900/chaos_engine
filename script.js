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