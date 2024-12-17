import StarterKit from '@tiptap/starter-kit'
import Typography from '@tiptap/extension-typography'
import Highlight from '@tiptap/extension-highlight'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import Underline from '@tiptap/extension-underline'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import TextAlign from '@tiptap/extension-text-align'
import { common, createLowlight } from 'lowlight'
import { EditorContent, useEditor } from '@tiptap/react'
import { BubbleMenu } from './BubbleMenu.tsx'

interface ArticleContentEditorProps {
  content: string;
  onContentChange: (content: string) => void;
};

const ArticleContentEditor: React.FC<ArticleContentEditorProps> = ({content, onContentChange}) => {
  const lowlight = createLowlight(common)
  
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
    ],
    content: content,
    editorProps: {
      attributes: {
        class: 'prose prose-neutral max-w-none w-full focus:outline-none'
      },
    },
    onUpdate: ({ editor }) => {
      onContentChange(editor.getHTML());
    },
  });

  return (
    <div className="relative">
      {editor && <BubbleMenu editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  )
};

export default ArticleContentEditor;