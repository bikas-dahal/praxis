// components/blogs/BlogCard.tsx
import Link from 'next/link';
import { Blog } from '@/types/blog';

interface BlogCardProps {
  blog: Blog;
}

export const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <div className="border p-4 mb-4 rounded-lg">
      <Link href={`/dashboard/blog/${blog.slug}`} className="hover:underline">
        <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
      </Link>
      <p className="text-gray-600 mb-2">
        {blog.content.length > 100
          ? `${blog.content.slice(0, 100)}...`
          : blog.content}
      </p>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>
          Created: {blog.createdAt?.toLocaleDateString()}
        </span>
        <div className="space-x-2">
          <span>Likes: {blog._count?.likes || 0}</span>
          <span>Comments: {blog._count?.comments || 0}</span>
        </div>
      </div>
    </div>
  );
};



// import { Button } from "../ui/button"
// import Link from "next/link"

// type BlogCardProps = {
//     blog: {
//       id: string;
//       title: string;
//       content: string;
//       tags: string[];
//       author: { name: string };
//       _count: { likes: number; comments: number };
//     };
//   };


// export const BlogCard = ({ blog }:BlogCardProps ) => {
//     return (
//         <div className="p-4 border rounded-lg">
//         <h2 className="text-xl font-bold">{blog.title}</h2>
//         <p>{blog.content.substring(0, 100)}...</p>
//             <div className="flex justify-between items-center mt-4">
//                 <span>{blog._count.likes} Likes</span>
//                 <span>{blog._count.comments} Comments</span>
//                 <Button asChild variant="link">
//                     <Link href={`/blog/${blog.id}`}>Read More</Link>
//                 </Button>
//             </div>
//         </div>
//     )
// }