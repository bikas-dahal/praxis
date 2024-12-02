'use client'

import { getUserSession } from "@/actions/auth/session";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const blogSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters long'),
  tags: z.string().optional(),
});

export default function BlogCreatePage() {
  const {register, handleSubmit, formState } = useForm({
    resolver: zodResolver(blogSchema),
  })

  const { errors } = formState;

  const session = getUserSession();

  const [content, setContent] = useState('');
  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
    onUpdate: ({ editor }) => setContent(editor.getHTML()),
  });


  // const mutation = useMutation({
  //   mutationFn: async (data: any) => {
  //     if (!session || !session?.user) throw new Error('You must be logged in to create a blog');
  //     return createBlog({ ...data, content, authorId: session?.user.id });
  //   },
  //   onSuccess: () => {
  //     toast.success('Blog created successfully');
  //   },
  //   onError: (error: any) => {
  //     toast( message: 'Error', description: error.message || 'Failed to create blog' );
  //   },
  // })

  const onSubmit = (data: any) => {
    console.log(data);
    
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Create New Blog</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" placeholder="Enter blog title" {...register('title')} />
          {errors.title && <p className="text-red-500 text-sm">hi</p>}
        </div>
        <div>
          <Label htmlFor="content">Content</Label>
          <div className="border rounded-md p-3">
            <EditorContent editor={editor} />
          </div>
        </div>
        <div>
          <Label htmlFor="tags">Tags</Label>
          <Input
            id="tags"
            placeholder="Comma-separated tags (e.g., tech, programming)"
            {...register('tags')}
          />
        </div>
        <Button type="submit" className="w-full" disabled={false}>
          {/* {mutation.isLoading ? 'Creating...' : 'Create Blog'} */}
          hi
        </Button>
      </form>
    </div>
  )

}