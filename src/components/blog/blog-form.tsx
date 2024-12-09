'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BlogSchema, BlogInput } from '@/schemas/blogSchema';
import { useRouter } from 'next/navigation';
import { useCurrentUser } from '@/hooks/use-current-user';
import { saveBlog } from '@/app/dashboard/(blogs)/blogs/create/action';
import dynamic from 'next/dynamic';
import DOMPurify from 'isomorphic-dompurify';
import { Edit2, Eye, CheckCircle, XCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';
import { toast } from 'sonner';

// Dynamically import the markdown editor to reduce initial bundle size
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

export const BlogForm: React.FC = () => {
  const router = useRouter();
  const user = useCurrentUser();
  const [previewMode, setPreviewMode] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BlogInput>({
    resolver: zodResolver(BlogSchema),
    defaultValues: {
      title: '',
      content: '',
      tags: '',
      authorId: user?.id || '',
      isPublished: true,
    },
  });

  const content = watch('content');

  const onSubmit = async (data: BlogInput) => {
    // Additional client-side validation
    if (!user?.id) {
      console.error('User not authenticated');
      return;
    }

    // Sanitize input
    const sanitizedData = {
      ...data,
      title: DOMPurify.sanitize(data.title),
      content: DOMPurify.sanitize(data.content),
      tags: data?.tags!.split(',').map(tag => DOMPurify.sanitize(tag.trim())).filter(Boolean).join(',')
    };

    try {
      const response = await saveBlog(sanitizedData);
      toast.success('Blog created successfully');
      router.push(`/dashboard/blog/${response.slug}`);
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to create blog. Please try again.');
    }
  };

  // Limit tag input
  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(',')
      .slice(0, 5) // Limit to 5 tags
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
    setValue('tags', tags.join(','));
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)}
      className="min-h-screen  w-full "
    >
      <div className="max-w-screen-2xl p-3 shadow-xl rounded-xl space-y-2">
        <input
          {...register('title')}
          maxLength={100}
          className="w-full text-2xl font-bold text-gray-800 focus:outline-none focus:border-blue-500 border-b-2 border-gray-300 pb-2 mb-4 transition-colors duration-300"
          placeholder="Blog title (max 100 characters)"
        />
        {errors.title && <div className="text-red-500 mt-2 mb-2">{errors.title.message}</div>}

        {/* <div className="flex items-center justify-between mb-2">
          <div className="flex space-x-2">
            <button 
              type="button"
              onClick={() => setPreviewMode(false)}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-300 
                ${!previewMode 
                  ? 'bg-blue-500 shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              <Edit2 className="w-5 h-5" />
              <span>Write</span>
            </button>
            <button 
              type="button"
              onClick={() => setPreviewMode(true)}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-300 
                ${previewMode 
                  ? 'bg-green-500 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              <Eye className="w-5 h-5" />
              <span>Preview</span>
            </button>
          </div>
        </div> */}

        <div className="border rounded-lg overflow-hidden">
          {!previewMode ? (
            <MDEditor
              value={content}
              onChange={(val) => setValue('content', val || '')}
              height={700}
              preview='live'
              textareaProps={{
                placeholder: 'Present your thoughts...',
                maxLength: 10000
              }}
            />
          ) : (
            <div className="prose max-w-none p-4 bg-gray-50">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {content || '# No preview available'}
              </ReactMarkdown>
            </div>
          )}
        </div>
        
        {errors.content && <div className="text-red-500 mt-2">{errors.content.message}</div>}

        <input
          {...register('tags')}
          onChange={handleTagInput}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add tags (comma-separated, max 5 tags)"
        />

        <div className="flex justify-between items-center">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register('isPublished')}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 rounded"
            />
            <span className="text-gray-700 flex items-center space-x-2">
              {watch('isPublished') ? <CheckCircle className="text-green-500 w-5 h-5" /> : <XCircle className="text-red-500 w-5 h-5" />}
              <span>Publish</span>
            </span>
          </label>
          <button
            type="submit"
            className="
              flex items-center space-x-2 px-8 py-3 
              bg-blue-600 text-white rounded-lg 
              hover:bg-blue-700 transition-colors 
              disabled:opacity-50 group
            "
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Publishing...' : 'Publish Blog'}
          </button>
        </div>
      </div>
    </form>
  );
};