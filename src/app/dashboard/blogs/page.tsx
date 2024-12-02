import { BlogCard } from "@/components/blog/blog-card";

const BlogPage = async () => {

  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog`;
  const response = await fetch(apiUrl, { method: "GET" });
  const { blogs } = await response.json();

  return (
    <div>
        {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default BlogPage
