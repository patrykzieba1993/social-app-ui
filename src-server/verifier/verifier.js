const dictionary = require('./dictionaries/dictionary');

const firstLevel = require('./levels/firstLevel');
const secondLevel = require('./levels/secondLevel');

class Verifier {
  constructor() {
    this.dictionary = dictionary;
    this.levels = [
      firstLevel,
      secondLevel,
    ];
  }

  verify(text) {
    const input = { text };
    this.levels.forEach(level => level(input, this.dictionary, '***'));
    return input.text;
  }
}

module.exports = new Verifier();

