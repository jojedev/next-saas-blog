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
import { FaBold, FaItalic } from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";


const TiptapEditor = ({ value, onChange }: {value:string, onChange:any}) => {
  const editor = useEditor({
    extensions: [StarterKit],
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
      <div className='p-5 pt-0 pb-2 border border-gray-200 rounded-lg shadow-sm'>
        <EditorContent className={`my-4`} editor={editor} />
        <button
          onClick={() => {editor.chain().focus().toggleBold().run();  handleSubmit(event)}}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleBold()
              .run()
          }
          className={`${editor.isActive('bold') ? 'is-active' : ''} p-2 mr-1.5 rounded-full border hover:bg-gray-200`}
        >
          <FaBold />
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
          className={`${editor.isActive('italic') ? 'is-active' : ''} p-2 mr-1.5 rounded-full border hover:bg-gray-200`}
        >
          <FaItalic />
        </button>
        <button
          onClick={() => {editor.chain().focus().toggleBulletList().run(); handleSubmit(event)}
          }
          className={`${editor.isActive('bulletList') ? 'is-active' : ''} p-2 mr-1.5 rounded-full border hover:bg-gray-200`}
        >
          <CiBoxList />
        </button>
      </div>
    </>

  )
}

export default TiptapEditor