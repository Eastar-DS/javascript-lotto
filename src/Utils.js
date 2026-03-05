const Utils = {
  getRandomNumber(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
  },

  getRandomNumbers(min, max, count) {
    return Array.from({ length: count }, (v) =>
      Utils.getRandomNumber(min, max),
    );
  },
};

export default Utils;
