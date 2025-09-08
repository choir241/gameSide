const bossGenerator = (() => {
  interface IStatMults {
    atk: number;
    spd: number;
    magicAtk: number;
    def: number;
    magicDef: number;
    health: number;
  }

  // Boss archetypes with higher multipliers
  const bossArchetypes = [
    {
      name: "Colossus",
      statMultipliers: {
        atk: 1.2,
        spd: 0.8,
        magicAtk: 0.7,
        def: 1.7,
        magicDef: 1.5,
        health: 3.0,
      },
      abilities: [
        "Titan Slam",
        "Unbreakable Guard",
        "Earthquake",
        "Roar of Endurance",
      ],
      specialTraits: ["damageReduction", "slowHeal"],
    },
    {
      name: "Archmage",
      statMultipliers: {
        atk: 0.7,
        spd: 1.1,
        magicAtk: 2.0,
        def: 1.0,
        magicDef: 1.5,
        health: 1.8,
      },
      abilities: [
        "Cataclysmic Blast",
        "Mana Barrier",
        "Time Warp",
        "Arcane Surge",
      ],
      specialTraits: ["manaShield", "statusImmunity"],
    },
    {
      name: "Phantom Lord",
      statMultipliers: {
        atk: 1.5,
        spd: 1.5,
        magicAtk: 1.2,
        def: 1.0,
        magicDef: 1.0,
        health: 2.0,
      },
      abilities: ["Shadow Strike", "Phantom Veil", "Blink Slash", "Soul Drain"],
      specialTraits: ["evasionBoost", "lifeSteal"],
    },
  ];

  const moods = [
    { name: "Awful", expMod: 0.9, goldMod: 0.9 },
    { name: "Bad", expMod: 0.95, goldMod: 0.95 },
    { name: "Normal", expMod: 1.0, goldMod: 1.0 },
    { name: "Good", expMod: 1.05, goldMod: 1.05 },
    { name: "Great", expMod: 1.1, goldMod: 1.1 },
  ];

  const bossPrefixes = [
    "Eternal",
    "Dread",
    "Infernal",
    "Celestial",
    "Void",
    "Prime",
    "Obsidian",
  ];
  const bossSuffixes = [
    "Behemoth",
    "Overlord",
    "Sovereign",
    "Titan",
    "Harbinger",
    "Warlord",
    "Emperor",
  ];

  // Base boss stats (higher than generic enemy base)
  const baseStats = {
    atk: 90,
    spd: 80,
    magicAtk: 90,
    def: 90,
    magicDef: 90,
    health: 3000,
  };

  // Helper functions from previous enemy generator
  const randRange = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min)) + min;
  const pickRandom = (arr: any[]) =>
    arr[Math.floor(Math.random() * arr.length)];
  const shuffleArray = (array: []) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };
  const weightedRandom = (weights: any[]) => {
    const total = weights.reduce((acc: string, w: string) => acc + w, 0);
    let r = Math.random() * total;
    for (let i = 0; i < weights.length; i++) {
      if (r < weights[i]) return i;
      r -= weights[i];
    }
    return weights.length - 1;
  };

  // Determine ability type and target - for boss skills (some new ones)
  function determineAbilityType(name: string) {
    if (
      [
        "Cataclysmic Blast",
        "Arcane Surge",
        "Time Warp",
        "Mana Barrier",
      ].includes(name)
    )
      return "magic";
    if (
      [
        "Titan Slam",
        "Earthquake",
        "Roar of Endurance",
        "Unbreakable Guard",
      ].includes(name)
    )
      return "physical";
    if (
      ["Phantom Veil", "Blink Slash", "Shadow Strike", "Soul Drain"].includes(
        name
      )
    )
      return "physical";
    return "physical";
  }

  function determineAbilityTarget(name: string) {
    if (["Mana Barrier", "Unbreakable Guard", "Phantom Veil"].includes(name))
      return "self";
    if (["Roar of Endurance", "Earthquake", "Time Warp"].includes(name))
      return "aoe";
    return "single";
  }

  // Determine ability effect - dummy placeholder for boss skills
  function determineAbilityEffect(name: string, stats: IStatMults) {
    switch (name) {
      case "Titan Slam":
      case "Earthquake":
      case "Shadow Strike":
        return { stat: "atk", multiplier: 2.0 };
      case "Cataclysmic Blast":
      case "Arcane Surge":
        return { stat: "magicAtk", multiplier: 2.5 };
      case "Unbreakable Guard":
      case "Mana Barrier":
        return { stat: "def", percent: 30 };
      case "Phantom Veil":
        return { stat: "spd", percent: 30 };
      case "Roar of Endurance":
        return { stat: "health", percent: 15 };
      case "Time Warp":
        return { stat: "spd", percent: 40 };
      case "Blink Slash":
        return { stat: "atk", multiplier: 1.7 };
      case "Soul Drain":
        return { stat: "magicAtk", multiplier: 1.5, lifesteal: true };
      default:
        return { stat: "atk", multiplier: 1.5 };
    }
  }

  // Determine difficulty for bosses based on level
  function determineDifficulty(level: number) {
    if (level < 10) return "challenging";
    if (level < 20) return "hard";
    if (level < 40) return "very hard";
    return "legendary";
  }

  // Generate boss for a given floor/level
  function generateBoss(floor: number) {
    const archetype = pickRandom(bossArchetypes);
    const moodIndex = weightedRandom([10, 7, 5, 3, 1]);
    const mood = moods[moodIndex];

    const level = Math.max(1, floor + randRange(-1, 3));
    const scaleFactor = 1 + level * 0.15; // 15% scaling per floor for bosses (stronger than generic)

    // Scale stats for boss
    const stats = {
      atk: Math.round(
        baseStats.atk * archetype.statMultipliers.atk * scaleFactor
      ),
      spd: Math.round(
        baseStats.spd * archetype.statMultipliers.spd * scaleFactor
      ),
      magicAtk: Math.round(
        baseStats.magicAtk * archetype.statMultipliers.magicAtk * scaleFactor
      ),
      def: Math.round(
        baseStats.def * archetype.statMultipliers.def * scaleFactor
      ),
      magicDef: Math.round(
        baseStats.magicDef * archetype.statMultipliers.magicDef * scaleFactor
      ),
      health: Math.round(
        baseStats.health * archetype.statMultipliers.health * scaleFactor
      ),
    };

    // Choose 3-4 abilities from archetype, shuffle to get random subset
    const abilitiesCount = randRange(3, 5);
    const abilities = shuffleArray(archetype.abilities)
      .slice(0, abilitiesCount)
      .map((name) => ({
        name,
        type: determineAbilityType(name),
        target: determineAbilityTarget(name),
        effect: determineAbilityEffect(name, stats),
      }));

    // Boss-specific special traits, attached as booleans
    const specialTraits = {};
    archetype.specialTraits.forEach((trait: any[]) => {
      specialTraits[trait] = true;
    });

    // Rewards scaled higher for bosses
    const baseExp = 1000 + level * 200;
    const baseGold = 200 + level * 50;

    const expReward = Math.round(baseExp * mood.expMod);
    const goldReward = Math.round(baseGold * mood.goldMod);

    // Boss name generator with unique pools
    const name = `${pickRandom(bossPrefixes)} ${pickRandom(bossSuffixes)}`;

    return {
      name,
      level,
      archetype: archetype.name,
      stats,
      abilities,
      mood: mood.name,
      specialTraits,
      expReward,
      goldReward,
      difficulty: determineDifficulty(level),
      isBoss: true,
    };
  }

  return {
    generateBoss,
  };
})();

export default bossGenerator;
