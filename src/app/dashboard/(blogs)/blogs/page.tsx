import { BlogList } from '@/components/blog/blog-list';
import Link from 'next/link';

export default function BlogsPage() {
  return (
    <div className="container items-center mx-auto p-2">
      <div className="flex justify-between items-center px-20 py-2">
        <h1 className="text-2xl font-bold text-gray-800">Blog Posts</h1>
        <Link
          href="/dashboard/blogs/create"
          className="flex items-center gap-2 px-2 py-3 bg-sky-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-lg"
        >
          <span>+ Create Blog</span>
        </Link>
      </div>
      <BlogList />
    </div>
  );
}
