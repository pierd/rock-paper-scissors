import { PieChart } from "./PieChart";
import { Results } from "./rules";

export function ResultsPieChart({ results }: { results: Results | undefined }) {
  if (results === undefined) {
    return <div>"Error"</div>;
  }
  var resultsSum = results.win + results.lose + results.draw;
  if (resultsSum === 0) {
    resultsSum = 1;
    results = { win: 0, lose: 0, draw: 1 };
  }
  return (
    <PieChart
      segments={[
        { color: "green", angle: (results.win / resultsSum) * 360 },
        { color: "red", angle: (results.lose / resultsSum) * 360 },
        { color: "grey", angle: (results.draw / resultsSum) * 360 },
      ]}
    />
  );
}
