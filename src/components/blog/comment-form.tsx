'use client';
import { postComment } from '@/actions/blogActions';
import { useCurrentUser } from "@/hooks/use-current-user";
import { CommentInput, CommentSchema } from "@/schemas/blogSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

export const CommentForm = ({ blogId }: { blogId: string }) => {
     const user = useCurrentUser();
     const [submitError, setSubmitError] = useState<string | null>(null);

     if (!user) return <p>Please log in to comment.</p>;

     const { 
         register, 
         handleSubmit, 
         reset, 
         formState: { errors, isSubmitting } 
     } = useForm<CommentInput>({
         defaultValues: {
             content: '',
             userId: user.id,
             blogId,
         },
         resolver: zodResolver(CommentSchema),
     });

     const onSubmit = async (data: CommentInput) => {
         setSubmitError(null);
         try {
             const response = await postComment(data);
             console.log('Comment submitted successfully:', response);
            
             reset(); // Clear the form after successful submission
         } catch (error) {
             console.error('Submission error:', error);
             setSubmitError(
                 error instanceof Error 
                     ? error.message 
                     : 'An unexpected error occurred'
             );
         }
     };

     return (
         <form onSubmit={handleSubmit(onSubmit)}>
             <div>
                 <label htmlFor="content">Content</label>
                 <textarea 
                     id="content" 
                     {...register("content")} 
                 />
                 {errors.content && <p>{errors.content.message}</p>}
             </div>
             {submitError && (
                 <div style={{ color: 'red' }}>
                     {submitError}
                 </div>
             )}
             <button onClick={() => {
                console.log('submitting comment');
                
             }} type="submit" disabled={isSubmitting}>
                 {isSubmitting ? 'Submitting...' : 'Submit'}
             </button>
         </form>
     );
};