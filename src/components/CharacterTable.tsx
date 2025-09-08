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
        <tr className={`text-white ${bgColor}`}>
          <td>Health</td>
          <td>Atk</td>
          <td>Def</td>
          <td>Mag Atk</td>
          <td>Mag Def</td>
          <td>Speed</td>
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
