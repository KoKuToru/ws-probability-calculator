import Component from '@glimmer/component';

export default class Section extends Component {
  get open() {
    return this.args.open ?? true;
  }
}
