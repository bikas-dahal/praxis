export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
    const res = await fetch(`/api/blog?slug=${params.slug}`);
    const blog = await res.json();
  
    return (
      <div className="prose mx-auto">
        <h1>{blog.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        <p>Tags: {blog.tags.join(", ")}</p>
      </div>
    );
  }