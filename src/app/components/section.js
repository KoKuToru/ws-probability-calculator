import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class Section extends Component {
  @tracked _open;

  get open() {
    return this._open ?? this.args.open ?? true;
  }

  @action toggle(e) {
    this._open = !this.open;
  }
}
