import { Contender, duel } from "./Contender";
import { PieChart } from "./PieChart";
import { Result } from "./rules";

export function Tournament({
  contenders,
}: {
  contenders: { [id: string]: { name: string; contender: Contender<any> } };
}) {
  var contendersList: {
    id: string;
    name: string;
    contender: Contender<any>;
  }[] = Object.entries(contenders).map(([id, { name, contender }]) => ({
    id,
    name,
    contender,
  }));
  contendersList.sort((a, b) => a.name.localeCompare(b.name));
  return (
    <table>
      <thead>
        <tr>
          <th>&nbsp;</th>
          {contendersList.map((contender) => (
            <th key={contender.id}>{contender.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {contendersList.map((contenderA) => (
          <tr key={contenderA.id}>
            <td>{contenderA.name}</td>
            {contendersList.map((contenderB) => (
              <td key={contenderB.id}>
                {renderDuelResult(
                  duel(contenderA.contender, contenderB.contender, 1000)
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function renderDuelResult(result: { [_ in Result]: number } | undefined) {
  if (result === undefined) {
    return "Error";
  }
  const resultsSum = result.win + result.lose + result.draw;
  return (
    <PieChart
      segments={[
        { color: "green", angle: (result.win / resultsSum) * 360 },
        { color: "red", angle: (result.lose / resultsSum) * 360 },
        { color: "grey", angle: (result.draw / resultsSum) * 360 },
      ]}
    />
  );
}
