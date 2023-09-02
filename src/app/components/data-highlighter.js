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
    const element = e.target.closest('[data-cx][data-ds], [data-cx], [data-ds], [data-dmg]');
    if (!element) {
      this.#style.textContent = '';
      return;
    }
    const cx = parseInt(element.dataset.cx);
    const ds = parseInt(element.dataset.ds);
    const dmg = parseInt(element.dataset.dmg);

    document.querySelector(`[data-cx="${cx}"][data-ds="${ds}"]`)?.scrollIntoViewIfNeeded?.(true);

    let css = '__DUMMY__';

    if (element.classList.contains('header')) {
      if (!element.closest('.probability-section')) {
        if (!isNaN(cx)) {
          css += `,[data-cx="${cx}"]::after`;
        }
        if (!isNaN(ds)) {
          css += `,[data-ds="${ds}"]::after`;
        }
      } else {
        if (!isNaN(cx) && !isNaN(ds)) {
          css += `,[data-cx="${cx}"][data-ds="${ds}"]::after`;
          css += `,[data-cx="${cx}"]:not([data-ds])::after`;
          css += `,[data-ds="${ds}"]:not([data-cx])::after`;
        }
      }
      if (!isNaN(dmg)) {
        css += `,[data-dmg="${dmg}"]::after`;
      }
    } else {
      if (!isNaN(cx) && !isNaN(ds)) {
        if (!element.closest('.probability-section')) {
          css += `,[data-cx="${cx}"][data-ds="${ds}"]::after`;
        } else {
          css += `,[data-cx="${cx}"][data-ds="${ds}"]:not([data-dmg])::after`;
          css += `,[data-dmg="${dmg}"]:not([data-cx]):not([data-ds])::after`;
        }
        css += `,[data-cx="${cx}"]:not([data-ds])::after`;
        css += `,[data-ds="${ds}"]:not([data-cx])::after`;
      } else if (!isNaN(cx)) {
        css += `,[data-cx="${cx}"]::after`;
      } else if (!isNaN(ds)) {
        css += `,[data-ds="${ds}"]::after`;
      } else {
        css += `,[data-dmg="${dmg}"]::after`;
      }
    }

    if (!css) {
      // something went wrong
      return;
    }

    css += `{
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
}`;
    this.#style.textContent = css;
  }
}
