// // hooks/useBlog.ts
// import {
//     useQuery,
//     useMutation,
//     useQueryClient,
//     UseQueryResult,
//     UseMutationResult
//   } from '@tanstack/react-query';
//   import { blogApi } from '@/lib/api/blogs';
//   import { Blog, BlogInput } from '@/types/blog';
//   import { toast } from 'sonner'; // Optional, use your preferred toast library
  
//   // Hook for fetching blogs with pagination
//   export const useBlogList = (page = 1, limit = 10) => {
//     return useQuery({
//       queryKey: ['blogs', page, limit],
//       queryFn: () => blogApi.getBlogs(page, limit),
//     //   keepPreviousData: true
//     });
//   };
  
//   // Hook for fetching a single blog
//   export const useSingleBlog = (slug: string): UseQueryResult<Blog> => {
//     return useQuery({
//       queryKey: ['blog', slug],
//       queryFn: () => blogApi.getBlogBySlug(slug)
//     });
//   };
  
//   // Hook for creating a blog
//   export const useCreateBlog = () => {
//     const queryClient = useQueryClient();
  
//     return useMutation({
//       mutationFn: blogApi.createBlog,
//       onSuccess: (newBlog) => {
//         // Invalidate and refetch blogs list
//         queryClient.invalidateQueries({ queryKey: ['blogs'] });
//         toast.success('Blog created successfully');
//         return newBlog;
//       },
//       onError: (error) => {
//         toast.error('Failed to create blog');
//         throw error;
//       }
//     });
//   };
  
//   // Hook for updating a blog
//   export const useUpdateBlog = (slug: string) => {
//     const queryClient = useQueryClient();
  
//     return useMutation({
//       mutationFn: (data: BlogInput) => blogApi.updateBlog(slug, data),
//       onSuccess: (updatedBlog) => {
//         // Update the blog in the cache
//         queryClient.setQueryData(['blog', slug], updatedBlog);
//         queryClient.invalidateQueries({ queryKey: ['blogs'] });
//         toast.success('Blog updated successfully');
//         return updatedBlog;
//       },
//       onError: (error) => {
//         toast.error('Failed to update blog');
//         throw error;
//       }
//     });
//   };
  
//   // Hook for deleting a blog
//   export const useDeleteBlog = () => {
//     const queryClient = useQueryClient();
  
//     return useMutation({
//       mutationFn: blogApi.deleteBlog,
//       onSuccess: () => {
//         // Invalidate blogs list
//         queryClient.invalidateQueries({ queryKey: ['blogs'] });
//         toast.success('Blog deleted successfully');
//       },
//       onError: (error) => {
//         toast.error('Failed to delete blog');
//         throw error;
//       }
//     });
//   };
  
  