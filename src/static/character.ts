const skills = [
  {
    name: "Sky-High Azure Dive",
    description:
      "Powerful combo attack with high crit chance.",
    mpCost: 50,
    cooldown: 3,
    effects: [
      { stat: "magicAtk", amount: 150 },
      { stat: "critChance", amount: 25 },
    ],
    target: "single",
    type: "attack",
  },
  {
    name: "Prudent Positioning",
    description: "Boosts defense and highly increases attack.",
    mpCost: 20,
    cooldown: 5,
    effects: [
      { stat: "def", amount: 10 },
      { stat: "atk", amount: 40 },
    ],
    target: "self",
    type: "buff",
  },
  {
    name: "Thunderbolt Step",
    description: "Magic lightning attack",
    mpCost: 20,
    cooldown: 2,
    effects: [
      { stat: "magicAtk", amount: 30 },
    ],
    target: "single",
    type: "attack",
  },
  {
    name: "Shrewd Step",
    description: "Increases crit chance and speed",
    mpCost: 15,
    cooldown: 3,
    effects: [
      { stat: "critChance", amount: 25 },
      { stat: "spd", amount: 40 },
    ],
    target: "self",
    type: "buff",
  },
  {
    name: "Go with the Flow",
    description: "Increase health by a small amount",
    mpCost: 25,
    cooldown: 2,
    effects: [{ stat: "health", amount: 40}
    ],

    target: "self",
    type: "utility",
  },
  {
    name: "Technician",
    description: "Recovers a large amount of mana",
    mpCost: 0,
    cooldown: 8,
    effects: [{ stat: "mana", amount: 80}],
    target: "single",
    type: "utility",
  },
  {
    name: "Soft Step",
    description: "Boosts magic defense, defense, and health, but decreases attack.",
    mpCost: 20,
    cooldown: 3,
    effects: [
      { stat: "atk", duration: -50 },
      { stat: "magicDef", amount: 30 },
      { stat: "def", amount: 30 },
      { stat: "health", amount: 30 },

    ],
    target: "self",
    type: "buff",
  },
  {
    name: "Lightning Step",
    description: "High-speed strike that is guaranteed to move first.",
    mpCost: 30,
    cooldown: 2,
    effects: [
      { stat: "magicAtk", amount: 20 },
      { stat: "spd", amount: 80 },
    ],
    target: "single",
    type: "attack",
  },
  {
    name: "Prepared to Pass",
    description: "",
    mpCost: 10,
    cooldown: 0,
    effects: [
      { stat: "spd", amount: 10 },
    ],
    target: "self",
    type: "support",
  },
  {
    name: "Certain Victory",
    description:
      "Deals double damage and guaranteed crit if target is below 25% HP.",
    mpCost: 15,
    cooldown: 3,
    effects: [
      { stat: "atk", amount: 20 },
      { stat: "crit", guaranteed: true },
      { stat: "hpThreshold", condition: 25 },
    ],
    target: "single",
    type: "attack",
  },
  {
    name: "Preferred Position",
    description: "Passive: Increases Atk and Spd if in Front or Pace position.",
    mpCost: 0,
    cooldown: 0,
    effects: [
      { stat: "atk", amount: 50 },
      { stat: "spd", amount: 50 },
    ],
    target: "self",
    type: "passive",
  },
  {
    name: "Spring Runner",
    description: "Boosts speed and mood for 2 turns.",
    mpCost: 20,
    cooldown: 3,
    effects: [
      { stat: "spd", amount: 50 },
      { stat: "mood", increase: 1 },
    ],
    target: "single",
    type: "support",
  },
  {
    name: "Race Planner",
    description: "Reduces next enemy action damage and reveals turn order.",
    mpCost: 15,
    cooldown: 0,
    effects: [
      { stat: "damageReduction", amount: 20 },
      { stat: "revealTurnOrder", value: true },
    ],
    target: "single",
    type: "utility",
  },
  {
    name: "Corner Recovery",
    description: "Heals and removes one random debuff.",
    mpCost: 10,
    cooldown: 2,
    effects: [
      { stat: "heal", amount: 10 },
      { stat: "cleanse", status: "random" },
    ],
    target: "self",
    type: "support",
  },
  {
    name: "Miraculous Step",
    description: "20% chance to fully evade any attack for 2 turns.",
    mpCost: 25,
    cooldown: 0,
    effects: [
      { stat: "evasionChance", amount: 20 },
      { stat: "duration", turns: 2 },
    ],
    target: "self",
    type: "buff",
  },
  {
    name: "Stamina to Spare",
    description: "Regenerates 10 MP per turn for 3 turns.",
    mpCost: 0,
    cooldown: 4,
    effects: [{ stat: "mpRegen", amount: 10, duration: 3 }],
    target: "self",
    type: "buff",
  },
  {
    name: "Corner Acceleration",
    description: "Boosts speed and grants an extra non-skill action.",
    mpCost: 30,
    cooldown: 5,
    effects: [
      { stat: "spd", amount: 15 },
      { stat: "extraAction", value: true },
    ],
    target: "self",
    type: "buff",
  },
];

const statDescriptions = {
  atk: {
    name: "Attack",
    key: "atk",
    description:
      "Determines how much damage a character does, reduced by the opponent's defense stat.",
  },
  spd: {
    name: "Speed",
    key: "spd",
    description:
      "Determines turn order; higher speed means acting earlier in a turn.",
  },
  magicAtk: {
    name: "Magic Attack",
    key: "magicAtk",
    description:
      "Determines how much magic damage a character does, reduced by the opponent's magic defense.",
  },
  def: {
    name: "Defense",
    key: "def",
    description: "Reduces incoming physical damage.",
  },
  magicDef: {
    name: "Magic Defense",
    key: "magicDef",
    description: "Reduces incoming magic damage.",
  },
  health: {
    name: "Health",
    key: "health",
    description: "If this hits 0, the character can no longer act in battle.",
  },
};

function randomizeStat(min:number, max:number){
 return Math.round(Math.random() * (max - min) + min);
}

const baseStats = {
  name: "Rice Shower",
  mood: "normal",
  atk: randomizeStat(80, 100),
  spd: randomizeStat(80, 100),
  magicAtk: randomizeStat(80, 100),
  def: randomizeStat(80, 100),
  magicDef: randomizeStat(80, 100),
  health: randomizeStat(800, 1000),
  mana: randomizeStat(80, 100),
  critChance: randomizeStat(1, 10),
  critDamage: randomizeStat(10, 30)
};

const perLevelGrowth = {
  atk: 2.5,
  spd: 3.0,
  magicAtk: 1.5,
  def: 2.0,
  magicDef: 2.5,
  health: 30,
};

const maxLvl = 100;

function getExpToLevel(level: number) {
  if (level < 2 || level > maxLvl) return 0;
  return 50 * level ** 2 + 100 * level;
}

function getTotalExpToLevel(level: number) {
  if (level < 2 || level > maxLvl) return 0;

  let totalExp = 0;
  for (let i = 2; i <= level; i++) {
    totalExp += getExpToLevel(i);
  }
  return totalExp;
}

function getLevelFromExp(totalExp: number) {
  let currentLevel = 1;
  let expNeeded = 0;

  while (currentLevel < maxLvl) {
    const nextExp = getExpToLevel(currentLevel + 1);
    if (totalExp < expNeeded + nextExp) break;

    expNeeded += nextExp;
    currentLevel++;
  }

  return currentLevel;
}

export const character = {
  getExpToLevel,
  getTotalExpToLevel,
  getLevelFromExp,
  skills,
  baseStats,
  statDescriptions,
  perLevelGrowth,
};
