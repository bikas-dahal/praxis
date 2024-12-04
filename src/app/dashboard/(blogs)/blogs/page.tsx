import { BlogList } from '@/components/blog/blog-list';
import Link from 'next/link';

export default function BlogsPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Blog Posts</h1>
        <Link
          href="/dashboard/blogs/create"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Create New Blog
        </Link>
      </div>
      <BlogList />
    </div>
  );
}


// import { BlogCard } from "@/components/blog/blog-card";

// const BlogPage = async () => {

//   const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs`;
//   const response = await fetch(apiUrl, { method: "GET" });
//   const { blogs } = await response.json();

//   return (
//     <div>
//         {blogs.map((blog) => (
//         <BlogCard key={blog.id} blog={blog} />
//       ))}
//     </div>
//   )
// }

// export default BlogPage
