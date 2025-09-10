import { Button } from "./components/ui/button";
import { useState } from "react";
import { character } from "./static/character";
import enemyGenerator from "./static/enemyGenerator";
import CharacterTable from "./components/CharacterTable";
import HealthAndManaBar from "./components/HealthAndManaBar";

// 🌟 Key Features:
// 🔁 Spaced Repetition Flashcards (Like Anki):

// Create decks for coding concepts (e.g., Python syntax, algorithms, regex).

// Supports cloze deletions, image occlusion, and markdown.

// Built-in popular decks (e.g., “100 JavaScript Tricks”, “DSA Quick Review”).

// 🎮 Level-Up System (RPG Style):

// Every flashcard reviewed or task completed gives XP.

// You choose your ninja/hero class (e.g., Coder Ninja, Debugging Mage).

// Characters level up, unlock skills, costumes, and even anime-style attacks.

// Stats increase with consistency: focus, memory, speed, etc.

// 📅 Daily Productivity Quests:

// Add daily goals (e.g., “Study 30 mins”, “Write 20 lines of code”, “Read docs”).

// Completing them gives extra XP, loot, and powers for your character.

// 🎨 Anime Art + Themes:

// Fully anime-themed UI with pixel art, chibi characters, and boss battles.

// Each “review session” can trigger a mini battle or story cutscene.

// ⚔️ Boss Battles (Optional Gamification):

// Weekly coding-related boss battles. To defeat them, you must hit review goals.

// Miss too many days? The boss “wins” and you lose loot or XP.

interface IStats {
  atk: number;
  spd: number;
  magicAtk: number;
  def: number;
  magicDef: number;
  health: number;
  mana: number;
  critChance: number;
  critDamage: number;
}

interface IHealthAndMana {
  health: number;
  mana: number;
}

export default function App() {
  const [bgColor, setBgColor] = useState("bg-[#000000]");
  const [currExp, setCurrExp] = useState(0);
  const [skills, setSkills] = useState([
    character.skills[0],
    character.skills[1],
    character.skills[2],
  ]);
  const [currFloor, setCurrFloor] = useState(1);
  const [currStats, setCurrStats] = useState<IStats>({
    health: character.baseStats.health,
    atk: character.baseStats.atk,
    spd: character.baseStats.spd,
    def: character.baseStats.def,
    magicAtk: character.baseStats.magicAtk,
    magicDef: character.baseStats.magicDef,
    mana: character.baseStats.mana,
    critChance: character.baseStats.critChance,
    critDamage: character.baseStats.critDamage,
  });
  const [healthAndMana, setHealthAndMana] = useState<IHealthAndMana>({
    mana: character.baseStats.mana,
    health: character.baseStats.health,
  });

  const [currTurn, setCurrTurn] = useState(1);
  const [currEnemy, setCurrEnemy] = useState(
    enemyGenerator.generateEnemy(currFloor)
  );
  const [enemyHealthAndMana, setEnemyHealthAndMana] = useState<IHealthAndMana>({
    mana: currEnemy.stats.mana,
    health: currEnemy.stats.health,
  });

  const currentLevel = character.getLevelFromExp(currExp);
  const nextLevelExp = character.getExpToLevel(currentLevel + 1);

  function triggerSkill(skill) {
    // Check for enough mana
    if (healthAndMana.mana < skill.mpCost) {
      alert("Not enough mana!");
      return;
    }

    // Deduct mana
    const newMana = healthAndMana.mana - skill.mpCost;
    setHealthAndMana((prev) => ({ ...prev, mana: newMana }));
    console.log(skill.description);
    console.log(skill)
    // Apply effects
    if (skill.target === "single") {
      let totalDamage = 0;

      for (let effect of skill.effects) {
        const statValue = currStats[effect.stat]; // e.g., atk, magicAtk
        const damage = statValue + Math.round(statValue * (effect.amount / 100));
        totalDamage += damage;
        Math.round(totalDamage)
      }

      const newEnemyHealth = Math.max(
        enemyHealthAndMana.health - totalDamage,
        0
      );

      setEnemyHealthAndMana((prev) => ({ ...prev, health: newEnemyHealth }));
    } else if (skill.target === "self") {
      const newStats = { ...currStats };

      for (let effect of skill.effects) {
        const statValue = currStats[effect.stat];
        const buff = statValue + Math.round(statValue * (effect.amount / 100));
        newStats[effect.stat] = buff;
      }

      console.log(newStats)
      setCurrStats(newStats);
    }

    // Add handling for other target types if needed later
  }

  function triggerAttack() {
    const newCurrEnemyHealth =
      enemyHealthAndMana.health - (currStats.atk - currEnemy.stats.def);
    if (newCurrEnemyHealth > 0) {
      setEnemyHealthAndMana({
        health: newCurrEnemyHealth,
        mana: enemyHealthAndMana.mana,
      });
    } else {
      setEnemyHealthAndMana({
        health: 0,
        mana: enemyHealthAndMana.mana,
      });
    }

    // setCurrEnemy({...currEnemy, stats: {...currEnemy.stats, health: newCurrEnemyHealth}})
  }

  return (
    <>
      <section>
        <span>
          {currEnemy.name} Lv: {currEnemy.level} Mood: {currEnemy.mood}{" "}
          {currEnemy.archetype}
        </span>
        <HealthAndManaBar
          className="health"
          max={currEnemy.stats.health}
          value={enemyHealthAndMana.health}
        />

        <HealthAndManaBar
          className="mana"
          max={currEnemy.stats.mana}
          value={enemyHealthAndMana.mana}
        />

        <CharacterTable
          bgColor={bgColor}
          characterStats={{
            health: enemyHealthAndMana.health,
            atk: currEnemy.stats.atk,
            spd: currEnemy.stats.spd,
            def: currEnemy.stats.def,
            magicAtk: currEnemy.stats.magicAtk,
            magicDef: currEnemy.stats.magicDef,
          }}
        />
      </section>

      <section>
        <span>
          {character.baseStats.name} Lv: {currentLevel} Mood:{" "}
          {character.baseStats.mood}
        </span>
        <section>
          <HealthAndManaBar
            className="health"
            max={character.baseStats.health}
            value={healthAndMana.health}
          />
          <HealthAndManaBar
            className="mana"
            max={currStats.mana}
            value={healthAndMana.mana}
          />
        </section>
        <CharacterTable
          bgColor={bgColor}
          characterStats={{
            health: currStats.health,
            atk: currStats.atk,
            spd: currStats.spd,
            def: currStats.def,
            magicAtk: currStats.magicAtk,
            magicDef: currStats.magicDef,
          }}
        />

        <Button onClick={() => triggerAttack()}>Attack</Button>
        {skills.map((skill, i) => {
          return (
            <Button onClick={() => triggerSkill(skill)}>Skill {i + 1}</Button>
          );
        })}
      </section>
    </>
  );
}
