const skills = [
  {
    name: "Sky-High Azure Dive",
    description:
      "Powerful combo attack with AoE splash damage and high crit chance.",
    mpCost: 30,
    cooldown: 3,
    effects: [
      { stat: "atk", multiplier: 1.5 },
      { stat: "critChance", amount: 25 },
    ],
    target: "aoe",
    type: "attack",
  },
  {
    name: "Prudent Positioning",
    description: "Boosts defense and dodge for 2 turns.",
    mpCost: 10,
    cooldown: 0,
    effects: [
      { stat: "def", percent: 10 },
      { stat: "dodge", percent: 20 },
    ],
    target: "self",
    type: "buff",
  },
  {
    name: "Thunderbolt Step",
    description: "Magic lightning attack with a chance to stun.",
    mpCost: 20,
    cooldown: 2,
    effects: [
      { stat: "magicAtk", multiplier: 1.2 },
      { stat: "statusEffect", type: "stun", chance: 25 },
    ],
    target: "single",
    type: "attack",
  },
  {
    name: "Shrewd Step",
    description: "Increases crit chance and speed for 3 turns.",
    mpCost: 15,
    cooldown: 0,
    effects: [
      { stat: "critChance", amount: 15 },
      { stat: "spd", amount: 10 },
    ],
    target: "self",
    type: "buff",
  },
  {
    name: "Go with the Flow",
    description: "50% chance to reflect debuffs for 2 turns.",
    mpCost: 15,
    cooldown: 0,
    effects: [{ stat: "debuffReflect", chance: 50 }],
    target: "self",
    type: "utility",
  },
  {
    name: "Technician",
    description: "Reduces cooldown of all other skills by 1 turn.",
    mpCost: 25,
    cooldown: 4,
    effects: [{ stat: "cooldownReduction", amount: 1 }],
    target: "self",
    type: "utility",
  },
  {
    name: "Soft Step",
    description: "Enters stealth and boosts magic defense.",
    mpCost: 10,
    cooldown: 0,
    effects: [
      { stat: "stealth", duration: 1 },
      { stat: "magicDef", percent: 20 },
    ],
    target: "self",
    type: "buff",
  },
  {
    name: "Lightning Step",
    description: "High-speed strike that guarantees first action next turn.",
    mpCost: 20,
    cooldown: 0,
    effects: [
      { stat: "atk", multiplier: 0.8 },
      { stat: "spd", multiplier: 0.4 },
      { stat: "priorityNextTurn", value: true },
    ],
    target: "single",
    type: "attack",
  },
  {
    name: "Prepared to Pass",
    description: "Removes status and boosts speed temporarily.",
    mpCost: 10,
    cooldown: 0,
    effects: [
      { stat: "cleanse", status: ["slow", "poison", "blind"] },
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
      { stat: "atk", multiplier: 2.0 },
      { stat: "crit", guaranteed: true },
      { stat: "hpThreshold", condition: "<=25%" },
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
      { stat: "atk", percent: 5 },
      { stat: "spd", amount: 5 },
    ],
    target: "self",
    type: "passive",
  },
  {
    name: "Spring Runner",
    description: "Boosts team speed and mood for 2 turns.",
    mpCost: 20,
    cooldown: 3,
    effects: [
      { stat: "spd", amount: 5 },
      { stat: "mood", increase: 1 },
    ],
    target: "aoe",
    type: "support",
  },
  {
    name: "Race Planner",
    description: "Reduces next enemy action damage and reveals turn order.",
    mpCost: 15,
    cooldown: 0,
    effects: [
      { stat: "damageReduction", percent: 20 },
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
      { stat: "heal", percent: 10 },
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
      { stat: "evasionChance", percent: 20 },
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
  mana: randomizeStat(80, 100)
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
