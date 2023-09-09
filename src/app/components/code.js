import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';
import parseCode, { unparse as unparseCode } from 'ws/utils/code-parser';
import { compress as compressCode, decompress as decompressCode } from 'ws/utils/code-compressor';

export default class Code extends Component {
  @service state;

  @action store() {
    const tmp = [];
    const ccode = compressCode(this.codeParsed, tmp);
    const dcode = decompressCode(ccode, tmp);
    this.state.code = unparseCode(dcode);
    this.state.store();
  }

  @action updateCode(e) {
    this.state.code = e.target.value;
  }

  get codeParsed() {
    return parseCode(this.state.code);
  }

  @action onKeyDown(e) {
    return;
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
    const code = compressCode(this.codeParsed);
    return code;
  }

  @action reset(e) {
    e.stopPropagation();
    if (confirm('reset?')) {
      this.state.reset_code();
    }
  }
}
