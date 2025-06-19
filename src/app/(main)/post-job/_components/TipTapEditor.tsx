"use client";

import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import { MenuBar } from "./MenuBar";
import { ControllerRenderProps } from "react-hook-form";

const TipTapEditor = ({ field }: { field: ControllerRenderProps }) => {
  console.log({ tiptapdescription: field.value });
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Typography,
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[300px] p-4 max-w-none dark:prose-invert",
      },
      transformPastedHTML: (html) => html,
    },
    onUpdate: ({ editor }) => {
      field.onChange(editor.getText());
    },
    content: field.value,
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && field.value && editor.getText() !== field.value) {
      editor.commands.setContent(field.value);
    }
  }, [editor, field.value]);

  return (
    <div className="border rounded-lg overflow-hidden bg-card">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TipTapEditor;
