import { BlogForm } from '@/components/blog/blog-form';

export default function CreateBlogPage() {
  return (
    <div className="container mx-auto px-4">
      {/* <h1 className="text-2xl font-bold mb-6">Create New Blog</h1> */}
      <BlogForm />
    </div>
  );
}
