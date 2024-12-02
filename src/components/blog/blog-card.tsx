import { Blog } from "@prisma/client"
import { Button } from "../ui/button"
import Link from "next/link"

type BlogCardProps = {
    blog: {
      id: string;
      title: string;
      content: string;
      tags: string[];
      author: { name: string };
      _count: { likes: number; comments: number };
    };
  };


export const BlogCard = ({ blog }:BlogCardProps ) => {
    return (
        <div className="p-4 border rounded-lg">
        <h2 className="text-xl font-bold">{blog.title}</h2>
        <p>{blog.content.substring(0, 100)}...</p>
            <div className="flex justify-between items-center mt-4">
                <span>{blog._count.likes} Likes</span>
                <span>{blog._count.comments} Comments</span>
                <Button asChild variant="link">
                    <Link href={`/blog/${blog.id}`}>Read More</Link>
                </Button>
            </div>
        </div>
    )
}