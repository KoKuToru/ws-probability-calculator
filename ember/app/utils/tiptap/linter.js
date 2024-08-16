import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view'

function runAllLinterPlugins(doc, plugins) {
  const decorations = [];

  const results = plugins
    .map(RegisteredLinterPlugin => {
      return new RegisteredLinterPlugin(doc).scan().getResults()
    })
    .flat();

  results.forEach(issue => {
    decorations.push(
      Decoration.inline(issue.from, issue.to, {
        class: issue.cls,
      })
    );
  });

  return DecorationSet.create(doc, decorations);
}

export default Extension.create({
  name: 'linter',

  addOptions() {
    return {
      plugins: []
    };
  },

  addProseMirrorPlugins() {
    const { plugins } = this.options;

    return [
      new Plugin({
        key: new PluginKey('linter'),
        state: {
          init(_, { doc }) {
            return runAllLinterPlugins(doc, plugins);
          },
          apply(transaction, oldState) {
            return transaction.docChanged ? runAllLinterPlugins(transaction.doc, plugins) : oldState;
          }
        },
        props: {
          decorations(state) {
            return this.getState(state);
          }
        }
      })
    ]
  }
});
