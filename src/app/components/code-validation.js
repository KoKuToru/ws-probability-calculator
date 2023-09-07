import Component from '@glimmer/component';

export default class CodeValidation extends Component {
  get class() {
    if (this.args.value?.error) {
      return 'bad';
    }
    return this.args.value?.code ? 'ok' : 'comment';
  }

  updateTabSpacing(el, [spaceCount]) {
    el.style.setProperty('--space-count', spaceCount);
  }
}
