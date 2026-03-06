const Validator = {
  validateNotEmptyString(string) {
    return string !== "";
  },

  validatePositiveNumber(number) {
    return number > 0;
  },

  validateNumberUpper(upper, number) {
    return number <= upper;
  },

  validateNumberLower(lower, number) {
    return number >= lower;
  },

  validateStringIsNumber(string) {
    return !isNaN(string);
  },

  validateNumberDivided(number, divideNumber) {
    return number % divideNumber === 0;
  },
};

export default Validator;
