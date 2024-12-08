'use client';
import { postComment } from '@/actions/blogActions';
import { useCurrentUser } from "@/hooks/use-current-user";
import { CommentInput, CommentSchema } from "@/schemas/blogSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import Image from 'next/image';

export const CommentForm = ({ blogId }: { blogId: string }) => {
  const user = useCurrentUser();
  const [submitError, setSubmitError] = useState<string | null>(null);



  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CommentInput>({
    defaultValues: {
      content: '',
      userId: user?.id,
      blogId,
    },
    resolver: zodResolver(CommentSchema),
  });

  const onSubmit = async (data: CommentInput) => {
    setSubmitError(null);
    try {
      await postComment(data);
      reset();
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'An unexpected error occurred'
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white border border-neutral-200 p-2 rounded-xl shadow-sm space-y-2"
    >
      <div className="flex items-center space-x-4 mb-4">
        {user?.image ? (
          <Image
            src={user.image || '/images/avatar.png'} 
            width={48}
            height={48}
            alt={user.name || 'User'} 
            className="w-12 h-12 rounded-full object-cover border-2 border-neutral-200"
          />
        ) : null}
        {/* <p className="font-semibold text-neutral-800">{user.name}</p> */}
      </div>

      <textarea
        id="content"
        {...register("content")}
        placeholder="Share your thoughts..."
        className="w-full p-4 bg-neutral-50 text-neutral-800 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={4}
      />
      
      {errors.content && (
        <div className="text-red-600 text-sm">{errors.content.message}</div>
      )}
      
      {submitError && (
        <div className="text-red-600 text-sm">{submitError}</div>
      )}
      
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="
            flex items-center 
            px-6 py-2 
            bg-blue-600 
            text-white 
            rounded-lg 
            hover:bg-blue-700 
            transition-colors 
            disabled:opacity-50
            focus:outline-none 
            focus:ring-2 
            focus:ring-blue-500 
            focus:ring-offset-2 
            focus:ring-offset-white
          "
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
          ) : (
            <Send className="w-5 h-5 mr-2" />
          )}
          {isSubmitting ? 'Submitting...' : 'Post Comment'}
        </button>
      </div>
    </form>
  );
};