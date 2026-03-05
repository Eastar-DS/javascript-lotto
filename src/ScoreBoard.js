import { RANK } from "./constants";

class ScoreBoard {
  static getRank(matchCount, hasBonus) {
    if (matchCount === RANK.FIRST.MATCH_COUNT) {
      return RANK.FIRST.DISPLAY;
    }
    if (matchCount === RANK.SECOND.MATCH_COUNT && hasBonus) {
      return RANK.SECOND.DISPLAY;
    }
    if (matchCount === RANK.THIRD.MATCH_COUNT) {
      return RANK.THIRD.DISPLAY;
    }
    if (matchCount === RANK.FOURTH.MATCH_COUNT) {
      return RANK.FOURTH.DISPLAY;
    }
    if (matchCount === RANK.FIFTH.MATCH_COUNT) {
      return RANK.FIFTH.DISPLAY;
    }
  }

  static makeAllRankCount(lottos, winningLotto) {
    const allRankCount = {
      FIRST: 0,
      SECOND: 0,
      THIRD: 0,
      FOURTH: 0,
      FIFTH: 0,
    };

    lottos.forEach((lotto) => {
      const matchCount = winningLotto.getMatchCount(lotto);
      const hasBonus = winningLotto.hasBonus(lotto);
      allRankCount[ScoreBoard.getRank(matchCount, hasBonus)]++;
    });

    return allRankCount;
  }
}

export default ScoreBoard;
