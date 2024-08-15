import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';
import parseCode, { unparse as unparseCode } from 'ws/utils/code-parser';
import { compress as compressCode, decompress as decompressCode } from 'ws/utils/code-compressor';
import { tracked } from '@glimmer/tracking';

import { Editor } from '@tiptap/core';
import Document from '@tiptap/extension-document';
import History from '@tiptap/extension-history'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text';
import Dropcursor from '@tiptap/extension-dropcursor';
import Gapcursor from '@tiptap/extension-gapcursor';

import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'

export default class Code extends Component {
  @service state;
  #state_code;

  @action store() {
    const tmp = [];
    const ccode = compressCode(this.codeParsed, tmp);
    const dcode = decompressCode(ccode, tmp);
    this.state.code = unparseCode(dcode);
    this.state.store();
  }

  @action getCode() {
    let value = this.state.code ?? '';
    value = value.split('\n');
    const doc = {
      type: 'doc',
      content: value.map(x => ({
        type: 'paragraph',
        content: x.length ? [{
          type: 'text',
          text: x
        }] : undefined
      }))
    };
    return doc;
  }

  parseDoc(doc) {
    const res = [];
    for (const p of doc.content ?? []) {
      if (p.content) {
        for (const t of p.content) {
          res.push(t.text ?? '')
        }
      } else {
        res.push('');
      }
    }
    return res.join('\n');
  }

  @action updateCode({editor}) {
    const value = this.parseDoc(editor.getJSON());
    this.#state_code = value;
    this.state.code = value;
  }

  get codeParsed() {
    return parseCode(this.state.code);
  }

  get compressed() {
    const code = compressCode(this.codeParsed);
    return code;
  }

  @action reset(e) {
    e.stopPropagation();
    if (confirm('reset?')) {
      this.state.reset_code();
    }
  }

  @tracked _editor;
  @action setupEditor(el) {
    const CustomDocument = Document.extend({
      content: 'paragraph*',
    });
    this._editor = new Editor({
      element: el,
      extensions: [
        CustomDocument,
        Paragraph,
        Text,
        Dropcursor,
        Gapcursor,
        History,
        Linter.configure({
          plugins: [
            WsCode
          ]
        }),
        FixCopy
      ],
      content: this.getCode(),
      onUpdate: this.updateCode,
      onBlur: this.store,
      onCreate: ({ editor }) => {
        editor.view.dom.setAttribute("spellcheck", "false");
        editor.view.dom.setAttribute("autocomplete", "off");
        editor.view.dom.setAttribute("autocapitalize", "off");
      }
    });
  }
  @action destroyEditor(el) {
    el;
    this._editor.destroy();
  }
  @action updateEditor(el) {
    el;
    const value = this.state.code ?? '';
    if (this.#state_code === value) {
      return;
    }
    this._editor.commands.setContent(this.getCode());
  }
}

class LinterPlugin {
  doc;

  results = [];

  constructor(doc) {
    this.doc = doc;
  }

  record(cls, from, to, fix) {
    this.results.push({
      cls,
      from,
      to,
      fix,
    });
  }

  scan() {
    return this;
  }

  getResults() {
    return this.results;
  }
}

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

const FixCopy = Extension.create({
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

const Linter = Extension.create({
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

class WsCode extends LinterPlugin {
  scan() {
    const nodes = [];
    this.doc.descendants((node, position) => {
      if (!node.isText) {
        return;
      }
      nodes.push({text: node.text, position});
    });

    let fulltext = '';
    let pos = [];
    for (const {text, position} of nodes) {
      pos.push([fulltext.length, position])
      fulltext += text + '\n';
    }

    const parsed = flattenChildren(parseCode(fulltext));

    for (const p of parsed) {
      if (!p.error && !p.code) {
        continue;
      }

      const o = pos.findLast(x => x[0] <= p.offset);
      if (!o) {
        break;
      }
      const o1 = o[1] + p.offset - o[0];
      const o2 = o1 + p.text.length;

      this.record(
        p.error ? 'lint-code-error' : 'lint-code-ok',
        o1,
        o2
      );
    }

    return this;
  }
}

function* flattenChildren(x) {
  for (const y of x) {
    yield y;
    if (Array.isArray(y?.children)) {
      for (const z of flattenChildren(y?.children)) {
        yield z;
      }
    }
  }
}
