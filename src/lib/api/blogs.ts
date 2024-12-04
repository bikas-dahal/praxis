// lib/api/blogs.ts
import axios from 'axios';
import { BlogSchema, BlogInput, Blog } from '@/types/blog';

const BASE_URL = '/api/blogs';

export const blogApi = {
  // Fetch all blogs with pagination
  getBlogs: async (page = 1, limit = 10) => {
    const { data } = await axios.get(`${BASE_URL}?page=${page}&limit=${limit}`);
    return {
      blogs: data.blogs.map((blog: any) => BlogSchema.parse(blog)),
      totalBlogs: data.totalBlogs
    };
  },

  // Fetch a single blog by slug
  getBlogBySlug: async (slug: string): Promise<Blog> => {
    const { data } = await axios.get(`${BASE_URL}/${slug}`);
    return BlogSchema.parse(data);
  },

  // Create a new blog
  createBlog: async (blogData: BlogInput): Promise<Blog> => {
    const { data } = await axios.post(BASE_URL, blogData);
    return BlogSchema.parse(data);
  },

  // Update an existing blog
  updateBlog: async (slug: string, blogData: BlogInput): Promise<Blog> => {
    const { data } = await axios.put(`${BASE_URL}/${slug}`, blogData);
    return BlogSchema.parse(data);
  },

  // Delete a blog
  deleteBlog: async (slug: string): Promise<void> => {
    await axios.delete(`${BASE_URL}/${slug}`);
  }
};

