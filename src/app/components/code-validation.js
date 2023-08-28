import Component from '@glimmer/component';

export default class CodeValidation extends Component {
  get class() {
    return this.args.value?.code ? 'ok' : 'bad';
  }

  updateTabSpacing(el, [spaceCount]) {
    el.style.setProperty('--space-count', spaceCount);
  }
}
