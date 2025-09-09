import { character } from "@/static/character";

interface ICharacterStats {
  atk: number;
  spd: number;
  magicAtk: number;
  def: number;
  magicDef: number;
  health: number;
}

export default function CharacterTable({
  bgColor,
  characterStats,
}: {
  bgColor: string;
  characterStats: ICharacterStats;
}) {
  return (
    <table>
      <thead>
        <tr className={`text-center text-white ${bgColor}`}>
          <td>{character.statDescriptions.health.name}</td>
          <td>{character.statDescriptions.atk.name}</td>
          <td>{character.statDescriptions.def.name}</td>
          <td>{character.statDescriptions.magicAtk.name}</td>
          <td>{character.statDescriptions.magicDef.name}</td>
          <td>{character.statDescriptions.spd.name}</td>
        </tr>
      </thead>
      <tbody>
        <tr className="text-center">
          <td className="border">{characterStats.health}</td>
          <td className="border">{characterStats.atk}</td>
          <td className="border">{characterStats.def}</td>
          <td className="border">{characterStats.magicAtk}</td>
          <td className="border">{characterStats.magicDef}</td>
          <td className="border">{characterStats.spd}</td>
        </tr>
      </tbody>
    </table>
  );
}
