import { Extension } from '@tiptap/core'

export default Extension.create({
  name: 'ide-tab',

  addOptions() {
    return {};
  },

  addKeyboardShortcuts() {
    return {
      Tab: ({ editor }) => {
        const {
          nodes,
          pos_start,
          pos_end
        } = getText(editor);
        if (!nodes?.length) {
          editor.chain().insertContent('  ').run();
          return true;
        }
        nodes.reverse(); // makes the position update easier
        let npos_start = pos_start;
        let npos_end = pos_end;
        const chain = editor.chain();
        for (const { text, pos } of nodes) {
          const depth = text.match(/^ */)[0].length;
          if (nodes.length == 1) {
            // SPECIAL CASE FOR SINGLE LINE
            if (text.slice(depth) !== editor.state.doc.textBetween(pos_start, pos_end)) {
              editor.chain().insertContent('  ').run();
              return true;
            }
          }
          const ndepth = Math.floor(depth / 2 + 1) * 2;
          const shift = ndepth - depth;
          const indent = ' '.repeat(shift);
          if (pos <= pos_start) {
            npos_start += shift;
          }
          if (pos <= pos_end) {
            npos_end += shift;
          }
          chain.insertContentAt(pos, indent);
        }
        chain.setTextSelection({from: npos_start, to: npos_end});
        chain.run();
        return true;
      },
      'Shift-Tab': ({ editor }) => {
        const {
          nodes,
          pos_start,
          pos_end
        } = getText(editor);
        if (!nodes.length) {
          return true;
        }
        nodes.reverse(); // makes the position update easier
        let npos_start = pos_start;
        let npos_end = pos_end;
        const chain = editor.chain();
        for (const { text, pos } of nodes) {
          const depth = text.match(/^ */)[0].length;
          const ndepth = Math.max(0, Math.floor(depth / 2 - 1) * 2);
          const shift = ndepth - depth;
          if (pos <= pos_start) {
            npos_start += shift;
          }
          if (pos <= pos_end) {
            npos_end += shift;
          }
          chain.deleteRange({ from: pos, to: pos - shift });
        }
        chain.setTextSelection({from: npos_start, to: npos_end});
        chain.run();
        return true;
      }
    }
  }
});

function getText(editor) {
  const { $from, $to } = editor.state.selection;
  let pos_start = $from.pos;
  let pos_end = $to.pos;
  const nodes = [];
  editor.state.doc.nodesBetween(pos_start, pos_end, (x, o) => {
    if (x.type.name === 'text') {
      nodes.push({ text: x.text, pos: o});
    }
  });
  if (!nodes.length) {
    return true;
  }
  // fix selection
  pos_start = Math.max(pos_start, nodes.at(0).pos);
  pos_end   = Math.min(pos_end  , nodes.at(-1).pos + nodes.at(-1).text.length);
  return {
    nodes,
    pos_start,
    pos_end
  };
}
