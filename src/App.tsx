import { Button } from "./components/ui/button";
import { useState } from "react";
import { character } from "./static/character";
import enemyGenerator from "./static/enemyGenerator";
import CharacterTable from "./components/characterTable";

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
}

interface IHealthAndMana {
  health: number;
  mana: number;
}

export default function App() {
  const [bgColor, setBgColor] = useState("bg-[#000000]");
  const [currExp, setCurrExp] = useState(0);
  const [skills, setSkills] = useState([]);
  const [currFloor, setCurrFloor] = useState(1);
  const [currStats, setCurrStats] = useState<IStats>({
    health: character.baseStats.health,
    atk: character.baseStats.atk,
    spd: character.baseStats.spd,
    def: character.baseStats.def,
    magicAtk: character.baseStats.magicAtk,
    magicDef: character.baseStats.magicDef,
    mana: character.baseStats.mana,
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
    mana: 100,
    health: currEnemy.stats.health,
  });
  
  const currentLevel = character.getLevelFromExp(currExp);
  const nextLevelExp = character.getExpToLevel(currentLevel + 1);

  function triggerSkill(skill) {}

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
          {currEnemy.name} Lv: {currEnemy.level} Mood: {currEnemy.mood}
        </span>
        <progress
          className="health"
          max={currEnemy.stats.health}
          value={enemyHealthAndMana.health}
        />
        <progress
          className="mana"
          value={healthAndMana.mana}
          max={currStats.mana}
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
          <progress
            className="health"
            max={character.baseStats.health}
            value={healthAndMana.health}
          />
          <progress
            className="mana"
            value={healthAndMana.mana}
            max={currStats.mana}
          />
        </section>
        <CharacterTable
          bgColor={bgColor}
          characterStats={{
            health: character.baseStats.health,
            atk: character.baseStats.atk,
            spd: character.baseStats.spd,
            def: character.baseStats.def,
            magicAtk: character.baseStats.magicAtk,
            magicDef: character.baseStats.magicDef,
          }}
        />

        <Button onClick={() => triggerAttack()}>Attack</Button>
        <Button>Skill 1</Button>
        <Button>Skill 2</Button>
        <Button>Skill 3</Button>
      </section>
    </>
  );
}
