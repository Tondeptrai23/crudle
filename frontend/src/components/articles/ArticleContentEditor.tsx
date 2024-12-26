import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import Typography from '@tiptap/extension-typography';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { common, createLowlight } from 'lowlight';
import { BubbleMenu } from './BubbleMenu.tsx';

interface ArticleContentEditorProps {
  content: string;
  onContentChange: (content: string) => void;
}

const ArticleContentEditor: React.FC<ArticleContentEditorProps> = ({
  content,
  onContentChange,
}) => {
  const lowlight = createLowlight(common);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Typography,
      Highlight,
      Subscript,
      Superscript,
      Underline,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
      }),
      Placeholder.configure({
        placeholder: 'Write something...',
        emptyEditorClass: 'text-gray',
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class: 'prose prose-neutral max-w-none w-full focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      onContentChange(editor.getHTML());
    },
  });

  return (
    <div className='relative'>
      {editor && <BubbleMenu editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
};

export default ArticleContentEditor;
