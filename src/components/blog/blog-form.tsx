'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BlogSchema, BlogInput } from '@/schemas/blogSchema';
import { useRouter } from 'next/navigation';
import { useCurrentUser } from '@/hooks/use-current-user';
import { saveBlog } from '@/app/dashboard/(blogs)/blogs/create/action';

export const BlogForm: React.FC = () => {
  const router = useRouter();
  const user = useCurrentUser();

  // React Hook Form setup with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BlogInput>({
    resolver: zodResolver(BlogSchema),
    defaultValues: {
      title: '',
      content: '',
      tags: '',
      authorId: user?.id || 'author-id-placeholder', 
      isPublished: true,
    },
  });

  // Form submission handler
  const onSubmit = async (data: BlogInput) => {
    console.log('data', data);
    
    try {

      const response = await saveBlog(data);

      console.log('response', response);

      router.push(`/dashboard/blog/${response.slug}`); // Redirect to blogs list
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto">
      <div className="mb-4">
        <label htmlFor="title" className="block mb-2 font-bold">
          Title
        </label>
        <input
          id="title"
          type="text"
          {...register('title')}
          className="w-full px-3 py-2 border rounded"
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="content" className="block mb-2 font-bold">
          Content
        </label>
        <textarea
          id="content"
          {...register('content')}
          className="w-full px-3 py-2 border rounded"
          rows={6}
        ></textarea>
        {errors.content && (
          <p className="text-red-500">{errors.content.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="tags" className="block mb-2 font-bold">
          Tags (comma-separated)
        </label>
        <input
          id="tags"
          type="text"
          {...register('tags')}
          className="w-full px-3 py-2 border rounded"
        />
        {errors.tags && <p className="text-red-500">{errors.tags.message}</p>}
      </div>

      <div className="mb-4 flex items-center">
        <input
          id="isPublished"
          type="checkbox"
          {...register('isPublished')}
          className="mr-2"
        />
        <label htmlFor="isPublished" className="font-bold">
          Publish Blog
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {isSubmitting ? 'Submitting...' : 'Create Blog'}
      </button>
    </form>
  );
};
