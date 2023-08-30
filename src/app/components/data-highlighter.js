import Component from '@glimmer/component';
import { registerDestructor } from '@ember/destroyable';
import { action } from '@ember/object';

export default class DataHighlighterComponent extends Component {
  #style = document.createElement('style');

  constructor(...args) {
    super(...args);

    const html = document.documentElement;
    const head = document.head;

    html.addEventListener('mousemove', this.mousemove);
    head.append(this.#style);

    registerDestructor(this, () => {
      head.remove(this.#style);
      html.removeEventListener('mousemove', this.mousemove)
    });
  }

  @action mousemove(e) {
    const element = e.target.closest('[data-x][data-y]');
    if (!element) {
      this.#style.textContent = '';
      return;
    }
    const x = parseInt(element.dataset.x);
    const y = parseInt(element.dataset.y);

    document.querySelector(`[data-x="${x}"][data-y="${y}"]`).scrollIntoViewIfNeeded?.(true);

    this.#style.textContent = `
[data-x="${x}"][data-y="${y}"]::after,
[data-x="${x}"]:not([data-y])::after,
[data-y="${y}"]:not([data-x])::after {
  display: block;
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: #b0c1d7;
  mix-blend-mode: multiply;
  pointer-events: none;
}
`;
  }
}
