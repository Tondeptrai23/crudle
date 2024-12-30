import { Button } from '@/components/common/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/common/ui/hover-card';
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/components/common/ui/toggle-group';
import { type Editor } from '@tiptap/core';
import { Level } from '@tiptap/extension-heading';
import { BubbleMenu as TiptapBubbleMenu } from '@tiptap/react';
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  ChevronDown,
  Code,
  Code2,
  Heading,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  Quote,
  Strikethrough,
  Subscript,
  Superscript,
  Underline,
} from 'lucide-react';

interface BubbleMenuProps {
  editor: Editor;
}

export function BubbleMenu({ editor }: BubbleMenuProps) {
  const getCurrentAlignmentIcon = () => {
    if (editor.isActive({ textAlign: 'center' }))
      return <AlignCenter className='h-3 w-3' />;
    if (editor.isActive({ textAlign: 'right' }))
      return <AlignRight className='h-3 w-3' />;
    if (editor.isActive({ textAlign: 'justify' }))
      return <AlignJustify className='h-3 w-3' />;
    return <AlignLeft className='h-3 w-3' />;
  };

  return (
    <TiptapBubbleMenu
      editor={editor}
      tippyOptions={{
        maxWidth: 'none',
        duration: 100,
        placement: 'top',
      }}
      className='flex flex-wrap divide-x rounded-md border border-gray-200 bg-white px-1 py-1 shadow-lg'
    >
      <div className='flex gap-1 p-1'>
        <ToggleGroup type='multiple' className='flex gap-1'>
          <ToggleGroupItem
            value='bold'
            size='sm'
            className={editor.isActive('bold') ? 'bg-muted' : ''}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <Bold className='h-3 w-3' />
          </ToggleGroupItem>
          <ToggleGroupItem
            value='italic'
            size='sm'
            className={editor.isActive('italic') ? 'bg-muted' : ''}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <Italic className='h-3 w-3' />
          </ToggleGroupItem>
          <ToggleGroupItem
            value='underline'
            size='sm'
            className={editor.isActive('underline') ? 'bg-muted' : ''}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <Underline className='h-3 w-3' />
          </ToggleGroupItem>
          <ToggleGroupItem
            value='strike'
            size='sm'
            className={editor.isActive('strike') ? 'bg-muted' : ''}
            onClick={() => editor.chain().focus().toggleStrike().run()}
          >
            <Strikethrough className='h-3 w-3' />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className='flex gap-1 p-1'>
        <ToggleGroup type='multiple' className='flex gap-1'>
          <ToggleGroupItem
            value='subscript'
            size='sm'
            className={editor.isActive('subscript') ? 'bg-muted' : ''}
            onClick={() => editor.chain().focus().toggleSubscript().run()}
          >
            <Subscript className='h-3 w-3' />
          </ToggleGroupItem>
          <ToggleGroupItem
            value='superscript'
            size='sm'
            className={editor.isActive('superscript') ? 'bg-muted' : ''}
            onClick={() => editor.chain().focus().toggleSuperscript().run()}
          >
            <Superscript className='h-3 w-3' />
          </ToggleGroupItem>
          <ToggleGroupItem
            value='code'
            size='sm'
            className={editor.isActive('code') ? 'bg-muted' : ''}
            onClick={() => editor.chain().focus().toggleCode().run()}
          >
            <Code className='h-3 w-3' />
          </ToggleGroupItem>
          <ToggleGroupItem
            value='highlight'
            size='sm'
            className={editor.isActive('highlight') ? 'bg-muted' : ''}
            onClick={() => editor.chain().focus().toggleHighlight().run()}
          >
            <Highlighter className='h-3 w-3' />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className='flex gap-1 p-1'>
        <HoverCard openDelay={0} closeDelay={0}>
          <HoverCardTrigger asChild>
            <Button
              variant='ghost'
              size='sm'
              type='button'
              className='flex gap-1'
            >
              <Heading className='h-3 w-3' />
              <ChevronDown className='h-3 w-3' />
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className='w-32 p-1' sideOffset={5}>
            <div className='flex flex-col gap-1'>
              {[1, 2, 3, 4].map((level) => (
                <Button
                  key={level}
                  type='button'
                  variant='ghost'
                  size='sm'
                  className={`justify-start ${editor.isActive('heading', { level }) ? 'bg-muted' : ''}`}
                  onClick={() =>
                    editor
                      .chain()
                      .focus()
                      .toggleHeading({ level: level as Level })
                      .run()
                  }
                >
                  Heading {level}
                </Button>
              ))}
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>

      <div className='flex gap-1 p-1'>
        <HoverCard openDelay={0} closeDelay={0}>
          <HoverCardTrigger asChild>
            <Button
              variant='ghost'
              size='sm'
              type='button'
              className='flex gap-1'
            >
              <List className='h-3 w-3' />
              <ChevronDown className='h-3 w-3' />
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className='w-40 p-1' sideOffset={5}>
            <div className='flex flex-col gap-1'>
              <Button
                type='button'
                variant='ghost'
                size='sm'
                className={`justify-start ${editor.isActive('bulletList') ? 'bg-muted' : ''}`}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
              >
                <List className='mr-2 h-3 w-3' />
                Bullet List
              </Button>
              <Button
                type='button'
                variant='ghost'
                size='sm'
                className={`justify-start ${editor.isActive('orderedList') ? 'bg-muted' : ''}`}
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
              >
                <ListOrdered className='mr-2 h-3 w-3' />
                Ordered List
              </Button>
              <Button
                type='button'
                variant='ghost'
                size='sm'
                className={`justify-start ${editor.isActive('blockquote') ? 'bg-muted' : ''}`}
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
              >
                <Quote className='mr-2 h-3 w-3' />
                Blockquote
              </Button>
              <Button
                type='button'
                variant='ghost'
                size='sm'
                className={`justify-start ${editor.isActive('codeBlock') ? 'bg-muted' : ''}`}
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              >
                <Code2 className='mr-2 h-3 w-3' />
                Code Block
              </Button>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>

      <div className='flex gap-1 p-1'>
        <HoverCard openDelay={0} closeDelay={0}>
          <HoverCardTrigger asChild>
            <Button
              variant='ghost'
              size='sm'
              type='button'
              className='flex gap-1'
            >
              {getCurrentAlignmentIcon()}
              <ChevronDown className='h-3 w-3' />
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className='w-40 p-1' sideOffset={5}>
            <div className='flex flex-col gap-1'>
              <Button
                type='button'
                variant='ghost'
                size='sm'
                className={`justify-start ${editor.isActive({ textAlign: 'left' }) ? 'bg-muted' : ''}`}
                onClick={() =>
                  editor.chain().focus().setTextAlign('left').run()
                }
              >
                <AlignLeft className='mr-2 h-3 w-3' />
                Left
              </Button>
              <Button
                type='button'
                variant='ghost'
                size='sm'
                className={`justify-start ${editor.isActive({ textAlign: 'center' }) ? 'bg-muted' : ''}`}
                onClick={() =>
                  editor.chain().focus().setTextAlign('center').run()
                }
              >
                <AlignCenter className='mr-2 h-3 w-3' />
                Center
              </Button>
              <Button
                type='button'
                variant='ghost'
                size='sm'
                className={`justify-start ${editor.isActive({ textAlign: 'right' }) ? 'bg-muted' : ''}`}
                onClick={() =>
                  editor.chain().focus().setTextAlign('right').run()
                }
              >
                <AlignRight className='mr-2 h-3 w-3' />
                Right
              </Button>
              <Button
                type='button'
                variant='ghost'
                size='sm'
                className={`justify-start ${editor.isActive({ textAlign: 'justify' }) ? 'bg-muted' : ''}`}
                onClick={() =>
                  editor.chain().focus().setTextAlign('justify').run()
                }
              >
                <AlignJustify className='mr-2 h-3 w-3' />
                Justify
              </Button>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </TiptapBubbleMenu>
  );
}
