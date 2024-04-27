import { rules, beats, beatenBy, MOVES } from "./rules";

const counterpartResult = {
  win: "lose",
  lose: "win",
  draw: "draw",
};

test("rules make sense", () => {
  for (const move of MOVES) {
    for (const otherMove of MOVES) {
      expect(rules[move][otherMove]).toBe(
        counterpartResult[rules[otherMove][move]]
      );
    }
  }

  for (const move of MOVES) {
    expect(beatenBy[beats[move]]).toBe(move);
    expect(beats[beatenBy[move]]).toBe(move);
  }
});
