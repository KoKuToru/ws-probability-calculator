import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class Code extends Component {
  @tracked code = `attack 3
burn 1`;

  @action updateCode(e) {
    this.code = e.target.value;
  }

  get codeByLine() {
    return this.code.split('\n');
  }

  @action onKeyDown(e) {
    const target = e.currentTarget;
    if (e.keyCode === 9) {
      //XXX todo .. improve this logic
      e.preventDefault(); //<- XXX: this prevents oninput ..
      target.setRangeText(
        '\t',
        target.selectionStart,
        target.selectionStart,
        'end'
      );
    }
  }
}
