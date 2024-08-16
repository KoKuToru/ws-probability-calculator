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

import Linter from 'ws/utils/tiptap/linter';
import WsCode from 'ws/utils/tiptap/linter-ws-code';
import FixCopy from 'ws/utils/tiptap/fix-copy';

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

