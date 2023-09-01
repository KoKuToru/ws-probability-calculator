import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class Section extends Component {
  @service state;

  get open() {
    return this.state[this.args.name] ?? this.args.open ?? true;
  }

  @action toggle(e) {
    this.state[this.args.name] = !this.open;
    this.state.store();
  }
}
