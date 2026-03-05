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

  readLineAsync(query) {
    return new Promise((resolve, reject) => {
      if (arguments.length !== 1) {
        reject(new Error("arguments must be 1"));
      }

      if (typeof query !== "string") {
        reject(new Error("query must be string"));
      }

      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question(query, (input) => {
        rl.close();
        resolve(input);
      });
    });
  },
};

export default Utils;
