import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state';

export default Extension.create({
  name: 'fix-copy',

  addOptions() {
    return {};
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('fix-copy'),
        props: {
          clipboardSerializer: {
            serializeFragment(fragment, options) {
              const fr = new DocumentFragment();
              const pre = document.createElement('pre');
              const str = fragment.textBetween(0, fragment.size, '\n');
              const span = options.document.createElement('span')
              const html = str.split('\n').map(x => {
                span.innerText = x;
                return span.innerHTML;
              }).join('<br>');
              span.innerHTML = html;
              pre.append(span);
              fr.append(pre)
              return fr;
            }
          },
          clipboardTextSerializer(slice, view) {
            view;
            const str = slice.content.textBetween(0, slice.content.size, "\n");
            return str;
          },
          transformPastedHTML(html) {
            const span = document.createElement('span');
            span.innerHTML = html;
            for (const br of span.querySelectorAll('br')) {
              br.replaceWith(document.createTextNode('\n'));
            }
            const div = document.createElement('div');
            for (const line of span.innerText.split('\n'))  {
              const p = document.createElement('p');
              p.append(document.createTextNode(line));
              div.append(p);
            }
            // XXX: use data-pm-slice to preserve whitespace..
            return `<div data-pm-slice="0 0 []">${div.innerHTML}</div>`;
          }
        }
      })
    ]
  }
});
