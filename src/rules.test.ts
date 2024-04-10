import { rules, beats, beatenBy, moves } from './rules';

const counterpartResult = {
    win: "lose",
    lose: "win",
    draw: "draw",
};

test('rules make sense', () => {
    for (const move of moves) {
        for (const otherMove of moves) {
            expect(rules[move][otherMove]).toBe(counterpartResult[rules[otherMove][move]]);
        }
    }
    
    for (const move of moves) {
        expect(beatenBy[beats[move]]).toBe(move);
        expect(beats[beatenBy[move]]).toBe(move);
    }
});
