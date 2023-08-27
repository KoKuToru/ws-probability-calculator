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

  get spaceCount() {
    let count = 0;
    const value = this.args.value ?? '';
    loop: for (let i = 0; i < value.length; ++i) {
      switch (value[i]) {
        case '\t':
          count += 2;
        default:
          if (!/\s/.exec(value[i])) {
            break loop;
          }
          count += 1;
      }
    }
    return count;
  }

  updateTabSpacing(el, [spaceCount]) {
    el.style.setProperty('--space-count', spaceCount);
  }

  get value() {
    let count = 0;
    const value = this.args.value ?? '';
    for (let i = 0; i < value.length; ++i) {
      if (!/\s/.exec(value[i])) {
        break;
      }
      count += 1;
    }
    return (this.args.value ?? '').slice(count);
  }
}
