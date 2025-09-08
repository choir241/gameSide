const enemyGenerator = (() => {

  interface IStatMults{
    atk: number,
    spd: number,
    magicAtk: number,
    def: number,
    magicDef: number,
    health: number
  }

  // interface IArchetype {
  //   name: string;
  //   statMultipliers: IStatMults,
  //   abilities: string[]
  // }

  const archetypes = [
    {
      name: "Tank",
      statMultipliers: { atk: 0.6, spd: 0.4, magicAtk: 0.3, def: 1.3, magicDef: 1.2, health: 1.5 },
      abilities: ["Crushing Blow", "Iron Wall", "Shield Bash"],
    },
    {
      name: "Mage",
      statMultipliers: { atk: 0.3, spd: 0.6, magicAtk: 1.4, def: 0.7, magicDef: 1.1, health: 0.8 },
      abilities: ["Arcane Zap", "Mana Shield", "Echo Blast"],
    },
    {
      name: "Rogue",
      statMultipliers: { atk: 1.0, spd: 1.3, magicAtk: 0.5, def: 0.6, magicDef: 0.6, health: 1.0 },
      abilities: ["Savage Lunge", "Howl", "Quick Step"],
    },
    {
      name: "Hybrid",
      statMultipliers: { atk: 0.8, spd: 0.9, magicAtk: 0.8, def: 0.9, magicDef: 0.9, health: 1.2 },
      abilities: ["Resonant Strike", "Feedback Field", "Sonic Pulse"],
    }
  ];

  const moods = [
    { name: "Awful", expMod: 0.9, goldMod: 0.9, debuffChanceMod: 1.3 },
    { name: "Bad", expMod: 0.95, goldMod: 0.95, debuffChanceMod: 1.2 },
    { name: "Normal", expMod: 1.0, goldMod: 1.0, debuffChanceMod: 1.0 },
    { name: "Good", expMod: 1.02, goldMod: 1.02, debuffChanceMod: 0.8 },
    { name: "Great", expMod: 1.05, goldMod: 1.05, debuffChanceMod: 0.7 }
  ];

  const prefixes = ["Iron", "Shadow", "Crimson", "Azure", "Storm", "Silent", "Blazing", "Frozen"];
  const suffixes = ["Warden", "Reaper", "Stalker", "Phantom", "Serpent", "Juggernaut", "Specter", "Tyrant"];

  // Base stats scaled roughly from your character base stats (mid-range)
  const baseStats = {
    atk: 60,
    spd: 60,
    magicAtk: 60,
    def: 60,
    magicDef: 60,
    health: 600
  };

  // Generate a random number between min (inclusive) and max (exclusive)
  const randRange = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

  // Pick a random element from an array
  const pickRandom = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

  // Generate enemy for given floor
  function generateEnemy(floor: number) {
    // Choose archetype
    const archetype = pickRandom(archetypes);

    // Choose mood weighted: Normal > Good > Bad > Great > Awful (adjust weights)
    const moodWeights = [10, 7, 5, 3, 1]; // Normal, Good, Bad, Great, Awful
    const moodIndex = weightedRandom(moodWeights);
    const mood = moods[moodIndex];

    // Calculate level roughly as floor + small randomness
    const level = floor + randRange(-1, 2);
    const safeLevel = Math.max(1, Math.min(level, 100));

    // Scale stats per floor and archetype multipliers
    const scaleFactor = 1 + safeLevel * 0.1; // 10% increase per floor

    const stats = {
      atk: Math.round(baseStats.atk * archetype.statMultipliers.atk * scaleFactor),
      spd: Math.round(baseStats.spd * archetype.statMultipliers.spd * scaleFactor),
      magicAtk: Math.round(baseStats.magicAtk * archetype.statMultipliers.magicAtk * scaleFactor),
      def: Math.round(baseStats.def * archetype.statMultipliers.def * scaleFactor),
      magicDef: Math.round(baseStats.magicDef * archetype.statMultipliers.magicDef * scaleFactor),
      health: Math.round(baseStats.health * archetype.statMultipliers.health * scaleFactor)
    };

    // Generate 2 random abilities from archetype abilities
    const abilities = shuffleArray(archetype.abilities)
      .slice(0, 2)
      .map(name => ({
        name,
        type: determineAbilityType(name),
        target: determineAbilityTarget(name),
        effect: determineAbilityEffect(name, stats)
      }));

    // Calculate rewards scaling with level and mood
    const baseExp = 100 + safeLevel * 50;
    const baseGold = 20 + safeLevel * 10;

    const expReward = Math.round(baseExp * mood.expMod);
    const goldReward = Math.round(baseGold * mood.goldMod);

    // Generate name
    const name = `${pickRandom(prefixes)} ${pickRandom(suffixes)}`;

    return {
      name,
      level: safeLevel,
      archetype: archetype.name,
      stats,
      abilities,
      mood: mood.name,
      expReward,
      goldReward,
      difficulty: determineDifficulty(safeLevel)
    };
  }

  // Weighted random helper: weights = [w0, w1, w2...]
  function weightedRandom(weights: number[]) {
    const total = weights.reduce((acc, w) => acc + w, 0);
    let r = Math.random() * total;
    for (let i = 0; i < weights.length; i++) {
      if (r < weights[i]) return i;
      r -= weights[i];
    }
    return weights.length - 1;
  }

  // Shuffle an array (Fisher-Yates)
  function shuffleArray(array: []) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // Determine ability type (example logic)
  function determineAbilityType(name: string) {
    if (["Arcane Zap", "Echo Blast", "Sonic Pulse", "Mana Shield"].includes(name)) return "magic";
    if (["Crushing Blow", "Savage Lunge", "Shield Bash"].includes(name)) return "physical";
    if (["Iron Wall", "Feedback Field"].includes(name)) return "buff";
    if (["Howl", "Quick Step"].includes(name)) return "debuff";
    return "physical"; // default
  }

  // Determine ability target (simplified)
  function determineAbilityTarget(name: string) {
    if (["Feedback Field", "Iron Wall", "Mana Shield"].includes(name)) return "self";
    if (["Howl"].includes(name)) return "aoe";
    return "single";
  }

  // Determine ability effect - dummy placeholder with stat multiplier for damage/buff
  function determineAbilityEffect(name: string, stats: IStatMults) {
    switch (name) {
      case "Crushing Blow":
      case "Savage Lunge":
        return { stat: "atk", multiplier: 1.5 };
      case "Arcane Zap":
      case "Echo Blast":
      case "Sonic Pulse":
        return { stat: "magicAtk", multiplier: 1.4 };
      case "Iron Wall":
      case "Feedback Field":
      case "Mana Shield":
        return { stat: "def", percent: 20 };
      case "Howl":
        return { stat: "def", percent: -10 };
      case "Quick Step":
        return { stat: "spd", percent: 15 };
      case "Shield Bash":
        return { stat: "atk", multiplier: 1.2, debuff: { stat: "spd", percent: -10 } };
      default:
        return { stat: "atk", multiplier: 1.0 };
    }
  }

  // Determine difficulty from level (simple tiers)
  function determineDifficulty(level: number) {
    if (level < 5) return "easy";
    if (level < 10) return "normal";
    if (level < 20) return "hard";
    return "elite";
  }

  return {
    generateEnemy
  };
})();

export default enemyGenerator;
