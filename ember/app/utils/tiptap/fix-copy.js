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
              const str = fragment.textBetween(0, fragment.size, '\n');
              fr.append(options.document.createTextNode(str));
              return fr;
            }
          },
          clipboardTextSerializer(slice, view) {
            const str = slice.content.textBetween(0, slice.content.size, "\n");
            return str;
          }
        }
      })
    ]
  }
});
