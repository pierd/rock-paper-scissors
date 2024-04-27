import { Contender, duel } from "./Contender";
import { ResultsPieChart } from "./ResultsPieChart";

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
                <ResultsPieChart
                  results={duel(
                    contenderA.contender,
                    contenderB.contender,
                    1000
                  )}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
