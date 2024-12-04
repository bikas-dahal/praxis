import { auth } from "@/auth";
import { CommentForm } from "@/components/blog/comment-form";
import { LikeButton } from "@/components/blog/like-button";
import { prisma } from "@/lib/prisma";

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {

  const session = await auth();

  console.log('sessionadfdafa', session);

  const isLiked = await prisma.like.findFirst({
    where: {
      userId: session?.user?.id,
      blogId: params.slug
    }
  })
  

  const { slug } = params;
  const blog = await prisma.blog.findUnique({
    where: { slug },
    select: {
      _count: {
        select: {
          comments: true,
          likes: true
        }
      },
      title: true,
      content: true,
      tags: true,
      id: true,
      author: {
        select: {
          name: true
        }
      }
    }
  });

  if (!blog) {
    return <div>Blog not found.</div>;
  }

  const comments = await prisma.comment.findMany({
    where: {
      blogId: blog?.id,
    },
    select: {
      content: true,
      createdAt: true,
      user: {
        select: {
          name: true,
        },
      }
    },
    orderBy: {
      createdAt: 'desc'
    },
  })

  console.log('comment', comments);
  

  if (!blog) {
    return <div>Blog not found.</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">{blog.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      <p>Tags: {blog.tags.join(", ")}</p>
      <p>Author: {blog.author.name}</p>
      <p>Comments: {blog._count.comments}</p>
      <p className="flex">
        <LikeButton blogId={blog.id}  /> 
        {blog._count.likes}
      </p>
      <CommentForm blogId={blog.id} />
      {comments.map((comment) => (
        <div key={comment.content} className="border p-4 mb-4 rounded-lg">
          <h2 className="text-xl font-bold">{comment.user.name}</h2>
          <p>{comment.createdAt.toLocaleDateString()}</p>
          <p>{comment.content}</p>  
        </div>
      ))}
    </div>
  );
}
