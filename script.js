// Data Arrays
const npcNames = ["Zorbo", "Klyra", "Thump", "Vex", "Mira", "Grok"];
const npcQuirksDefault = ["hums battle anthems", "juggling pinecones", "winks too much", "laughs at danger"];
const npcSecretsDefault = ["hides a map to a crypt", "is a polymorphed goose", "seeks a lost sibling", "cursed to rhyme"];

const twists = [
    "The bridge collapses mid-fight—roll to grab the ledge!",
    "A horn sounds; reinforcements arrive, but whose?",
    "The enemy vanishes, leaving a ticking box behind.",
    "A storm rolls in—lightning strikes something vital!",
    "The floor cracks open, revealing a shadowy figure below!",
];

const lootItems = ["Sword of Oops", "Cloak of Chuckles", "Boots of Bonks", "Ring of Rude Noises", "Staff of Splat"];
const lootEffectsDefault = [
    "+2 damage, 10% chance to hit wielder",
    "invisibility but you giggle",
    "double speed, 50% chance to trip",
    "summons a fart cloud once per day",
    "+1 to spells, glows pink in danger",
];

const enemies = ["a giggling ogre", "three sarcastic goblins", "a confused owlbear", "a bard with a cursed lute"];
const settings = ["a crumbling tower", "a foggy swamp", "a rickety bridge", "a haunted tavern"];
const hooks = ["offers a duel or a riddle", "demands a toll in snacks", "is mid-argument with a ghost", "sings off-key for help"];

// History Storage
let savedResults = [];

// Dice Roller
function rollDice(sides) {
    const result = Math.floor(Math.random() * sides) + 1;
    document.getElementById("dice-result").innerText = `Result: ${result}`;
    return result;
}

// Generators
function generateNPC() {
    const tone = document.getElementById("tone").value;
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

    const name = npcNames[Math.floor(Math.random() * npcNames.length)];
    const quirk = quirks[Math.floor(Math.random() * quirks.length)];
    const secret = secrets[Math.floor(Math.random() * secrets.length)];
    document.getElementById("output").innerText = `${name}, who ${quirk}, secretly ${secret}.`;
}

function generateTwist() {
    const twist = twists[Math.floor(Math.random() * twists.length)];
    const roll = rollDice(20);
    document.getElementById("output").innerText = `${twist} (Roll: ${roll} - DM decides the outcome!)`;
}

function generateLoot() {
    const tone = document.getElementById("tone").value;
    let effects = lootEffectsDefault;

    if (tone === "silly") {
        effects = ["turns foes into ducks for 1 turn", "makes you quack when hit", "shoots glitter"];
    } else if (tone === "combat") {
        effects = ["+3 damage vs undead", "explodes on crit (5 damage)", "heals 1d6 on kill"];
    } else if (tone === "roleplay") {
        effects = ["whispers its past owner’s name", "glows near hidden doors", "sings when danger’s near"];
    }

    const item = lootItems[Math.floor(Math.random() * lootItems.length)];
    const effect = effects[Math.floor(Math.random() * effects.length)];
    document.getElementById("output").innerText = `${item}: ${effect}.`;
}

function generateEncounter() {
    const tone = document.getElementById("tone").value;
    let enemyList = enemies;
    let hookList = hooks;

    if (tone === "silly") {
        enemyList = ["a tap-dancing troll", "a flock of rude parrots", "a wizard in flip-flops"];
        hookList = ["challenges you to a dance-off", "throws pies instead of punches", "wants to trade socks"];
    } else if (tone === "combat") {
        enemyList = ["a scarred minotaur", "a pack of dire wolves", "a rogue golem"];
        hookList = ["ambushes from the shadows", "guards a bloody chest", "roars a challenge"];
    } else if (tone === "roleplay") {
        enemyList = ["a mournful spirit", "a lost knight", "a chatty sphinx"];
        hookList = ["offers a cryptic warning", "seeks aid for a quest", "asks a riddle with stakes"];
    }

    const enemy = enemyList[Math.floor(Math.random() * enemyList.length)];
    const setting = settings[Math.floor(Math.random() * settings.length)];
    const hook = hookList[Math.floor(Math.random() * hookList.length)];
    document.getElementById("output").innerText = `${enemy} in ${setting}, ${hook}.`;
}

// Save Functionality
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