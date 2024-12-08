import Link from 'next/link';
import { Blog } from '@/types/blog';
import { HeartIcon, MessageCircleIcon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

interface BlogCardProps {
  blog: Blog;
}

export const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <div className="bg-white border rounded-xl shadow-sm hover:shadow-md hover:bg-slate-200 transition-shadow duration-300 overflow-hidden">
      <Link href={`/dashboard/blog/${blog.slug}`} className="block">
        <div className="p-6 space-y-4">
          <h2 className="text-xl font-medium text-neutral-800 hover:text-neutral-600 transition-colors">
            {blog.title}
          </h2>
          
          <p className="text-neutral-600 text-sm leading-relaxed">
            <ReactMarkdown 
                          remarkPlugins={[remarkGfm]}
                          rehypePlugins={[rehypeHighlight]}
                        >
            {blog.content.length > 120
              ? `${blog.content.slice(0, 120)}...`
              : blog.content}
                        </ReactMarkdown>
          </p>
          
          <div className="flex justify-between items-center text-xs text-neutral-500">
            <div className="flex items-center space-x-2">
              <span>{blog.author?.name || 'Anonymous'}</span>
              <span className="text-neutral-300">•</span>
              <span>{new Date(blog.createdAt!).toLocaleDateString()}</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <HeartIcon className="h-5 w-5 text-red-400" />
                <span>{blog._count?.likes || 0}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircleIcon className="h-5 w-5  text-blue-400" />
                <span>{blog._count?.comments || 0}</span>
              </div>
            </div>
          </div>
          
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-[10px] text-neutral-500 border border-neutral-200 px-2 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};