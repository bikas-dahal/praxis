import { auth } from "@/auth";
import { CommentForm } from "@/components/blog/comment-form";
import { LikeButton } from "@/components/blog/like-button";
import { prisma } from "@/lib/prisma";
import { UserIcon, Clock, Tag, MessageCircleIcon } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';
import { redirect } from "next/navigation";
import Image from "next/image";

type Params = Promise<{ slug: string }>

export default async function BlogDetailPage({ params }: { params: Params }) {
  const session = await auth();

  if (!session?.user) return redirect('/auth/login');

  const { slug } = await params;

  const blog = await prisma.blog.findUnique({
    where: { slug },
    select: {
      _count: { select: { comments: true, likes: true } },
      title: true,
      content: true,
      tags: true,
      id: true,
      createdAt: true,
      author: { select: { name: true, image: true } },
    },
  });

  if (!blog) return <div className="min-h-screen flex items-center justify-center text-neutral-600">Blog not found.</div>;

  const comments = await prisma.comment.findMany({
    where: { blogId: blog.id },
    select: { 
      content: true, 
      createdAt: true, 
      user: { select: { name: true, image: true } } 
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="bg-white text-neutral-800 min-h-screen">
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <article className="bg-white rounded-xl shadow-lg border border-neutral-100 p-8 md:p-12">
          {/* Title Section */}
          <header className="mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6 leading-tight">
              {blog.title}
            </h1>
            
            {/* Author and Date */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center space-x-3">
                {blog.author.image ? (
                  <Image 
                    src={blog.author.image} 
                    alt={blog.author.name || 'Author'} 
                    width={40}
                        height={40}
                    className="w-12 h-12 rounded-full object-cover border-2 border-neutral-200"
                  />
                ) : (
                  <UserIcon className="w-12 h-12 text-neutral-400" />
                )}
                <div>
                  <p className="font-semibold text-neutral-800">{blog.author.name}</p>
                  <div className="flex items-center text-neutral-600 text-sm space-x-2">
                    <Clock className="w-4 h-4" />
                    <time dateTime={blog.createdAt.toISOString()}>
                      {new Date(blog.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Content Section */}
          <div className="prose max-w-none prose-lg prose-neutral mb-10">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {blog.content}
            </ReactMarkdown>
          </div>

          {/* Interaction Section */}
          <footer className="border-t border-neutral-200 pt-6">
            <div className="flex justify-between items-center">
              {/* Likes and Comments */}
              <div className="flex space-x-4 text-neutral-600">
                <div className="flex items-center space-x-2">
                  <LikeButton blogId={blog.id} />
                  <span>{blog._count.likes}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageCircleIcon className="w-5 h-5 text-blue-500" />
                  <span>{blog._count.comments}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex items-center space-x-2">
                <Tag className="w-5 h-5 text-neutral-500" />
                <div className="flex gap-2 flex-wrap">
                  {blog.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </footer>
        </article>

        {/* Comments Section */}
        <section className="mt-12">
          <CommentForm blogId={blog.id} />
          
          {comments.length > 0 && (
            <div className="mt-8 space-y-6">
              <h3 className="text-2xl font-semibold text-neutral-900 mb-6">Comments</h3>
              {comments.map((comment, index) => (
                <div 
                  key={index} 
                  className="bg-white border border-neutral-200 p-6 rounded-lg"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    {comment.user.image ? (
                      <Image 
                        width={40}
                        height={40}
                        src={comment.user.image} 
                        alt={comment.user.name || 'Commenter'} 
                        className="w-10 h-10 rounded-full object-cover border-2 border-neutral-200"
                      />
                    ) : (
                      <UserIcon className="w-10 h-10 text-neutral-400" />
                    )}
                    <div>
                      <div className="font-semibold text-neutral-800">{comment.user.name}</div>
                      <div className="text-xs text-neutral-600">
                        {new Date(comment.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="text-neutral-700">{comment.content}</div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}