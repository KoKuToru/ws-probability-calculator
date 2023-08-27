import Component from '@glimmer/component';

const syntax = [
  /^(attack)\s+([0-9]+)\s*$/g,
  /^(burn)\s+([0-9]+)\s*$/g
];

export default class CodeValidation extends Component {
  get class() {
    const value = this.args.value;
    for (const s of syntax) {
      s.lastIndex = 0; //< reset the regex
      if (s.exec(value)) {
        return 'ok'
      }
    }
    return 'bad';
  }
}
