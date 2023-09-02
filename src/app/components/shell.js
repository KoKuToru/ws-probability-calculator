import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class ShellComponent extends Component {
  @service state;

  @action help(e) {
    e.stopPropagation();
    window.open('https://github.com/KoKuToru/koku-ws-simulator/blob/master/README.md', '_blank');
  }

  @action reset(e) {
    e.stopPropagation();
    if (confirm('reset everything?')) {
      this.state.reset();
    }
  }
}
