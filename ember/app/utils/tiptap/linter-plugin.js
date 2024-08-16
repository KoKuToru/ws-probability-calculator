export default class LinterPlugin {
  doc;

  results = [];

  constructor(doc) {
    this.doc = doc;
  }

  record(cls, from, to, fix) {
    this.results.push({
      cls,
      from,
      to,
      fix,
    });
  }

  scan() {
    return this;
  }

  getResults() {
    return this.results;
  }
}
