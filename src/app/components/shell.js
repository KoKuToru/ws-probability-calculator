import Component from '@glimmer/component';
import { service } from '@ember/service';

export default class ShellComponent extends Component {
  @service state;

  get overview_extra() {
    const dmg = this.state.selected_dmg ?? null;
    if (dmg === null) {
      return 'weighted average damage';
    }
    if (dmg === 0) {
      return 'dmg 0 probability %';
    }
    return `dmg ≥ ${dmg} probability %`;
  }
}
