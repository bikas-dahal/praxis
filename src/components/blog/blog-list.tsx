// 'use client'

import { BlogCard } from './blog-card';
import { prisma } from '@/lib/prisma';

export const BlogList: React.FC = async() => {
  
    const blogs = await prisma.blog.findMany({
        select: {
            id: true,
            title: true,
            content: true,
            createdAt: true,
            slug: true,
            tags: true,
            author: {
                select: {
                    id: true,
                    name: true
                }
            },
            _count: {
                select: {
                    likes: true,
                    comments: true
                }
            }
        }
    })

//   if (isLoading) return <div>Loading blogs...</div>;
//   if (isError) return <div>Error loading blogs</div>;

  return (
    <div>
      {blogs?.map(blog => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
{/* 
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setPage(p => p + 1)}
          disabled={!data || data.blogs.length < 10}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div> */}
    </div>
  );
};
