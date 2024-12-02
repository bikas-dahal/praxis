'use client'

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export const RichTextEditor = ({ value, onChange}:{value: string, onChange: (value: string) => void}) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: value,
        onUpdate({ editor }) {
            onChange(editor.getHTML());
        },
    })

    return <EditorContent editor={editor} />
}