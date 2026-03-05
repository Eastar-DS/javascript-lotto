const Utils = {
  getRandomNumber(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
  },

  getRandomNumbers(min, max, count) {
    const randomNumbers = [];
    while (randomNumbers.length !== count) {
      const randomNumber = Utils.getRandomNumber(min, max);
      if (randomNumbers.includes(randomNumber)) continue;

      randomNumbers.push(randomNumber);
    }

    return randomNumbers;
  },
};

export default Utils;
