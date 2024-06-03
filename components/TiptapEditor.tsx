'use client'

import BulletList from '@tiptap/extension-bullet-list'
import Document from '@tiptap/extension-document'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { EditorContent, useEditor } from '@tiptap/react'
import React, { useState } from 'react'
import StarterKit from '@tiptap/starter-kit';


const TiptapEditor = ({ value, onChange }: {value:string,onChange:any}) => {
  const editor = useEditor({
    extensions: [Document, Paragraph, Text, BulletList, OrderedList, ListItem,  StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
  })

  if (!editor) {
    return null
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
  };

  return (
    <>  
      <button
        onClick={() => {editor.chain().focus().toggleBold().run();  handleSubmit(event)}}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        bold
      </button>
      <button
        onClick={() => {editor.chain().focus().toggleBulletList().run(); handleSubmit(event)}
        }
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        List
      </button>
      <button
        onClick={() => {editor.chain().focus().toggleItalic().run(); handleSubmit(event)}}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        italic
      </button>
        <EditorContent editor={editor} />
    </>

  )
}

export default TiptapEditor