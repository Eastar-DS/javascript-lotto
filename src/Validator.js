const Validator = {
  validatePositiveNumber(number) {
    return number > 0;
  },

  validateNumberUpper(upper, number) {
    return number <= upper;
  },

  validateNumberLower(lower, number) {
    return number >= lower;
  },
};

export default Validator;
