import { Extension } from '@tiptap/core'

export default Extension.create({
  name: 'ide-enter',

  addOptions() {
    return {};
  },

  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => {
        debugger;
        const { state } = editor;
        const { selection } = state;
        const { $from } = selection;

        // get leading whitespace from current paragraph
        const paragraphText = $from.node(1)?.textContent;;
        const leadingWhitespace = paragraphText?.match(/^\s*/)?.[0];

        // split the current paragraph
        const defaultEnter = editor.commands.splitBlock();

        if (defaultEnter) {
          if (leadingWhitespace) {
            editor.commands.insertContent(leadingWhitespace);
          }
          return true;
        }

        return false;
      }
    }
  }
});
