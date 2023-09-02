import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';
import parseCode from 'ws/utils/code-parser';

export default class Code extends Component {
  @service state;

  @action store() {
    this.state.store();
  }

  @action updateCode(e) {
    this.state.code = e.target.value;
  }

  get codeParsed() {
    return parseCode(this.state.code);
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
        'end',
      );
    }
  }

  get compressed() {
    const p = this.codeParsed;
    return p.filter(x => x.code).map(x => [
      x.code[0][0],
      x.code[1],
    ].join('')).join('');
  }

  @action reset(e) {
    e.stopPropagation();
    if (confirm('reset?')) {
      this.state.reset_code();
    }
  }
}
