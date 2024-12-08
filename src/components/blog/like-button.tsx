'use client';

import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { blogIsLiked, likeBlog } from "@/actions/blogActions";
import { HeartIcon, Loader2Icon } from "lucide-react"; // Import Lucide icons
import { HeartFilledIcon } from "@radix-ui/react-icons";

export const LikeButton = ({ blogId }: { blogId: string }) => {
  const currentUser = useCurrentUser();

  if (!currentUser) {
    return null;
  }

  const [isLiked, setIsLiked] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const liked = await blogIsLiked(blogId, currentUser.id!);
        setIsLiked(liked);
      } catch (error) {
        console.error("Error fetching like status:", error);
      }
    };
    fetchLikeStatus();
  }, [blogId, currentUser?.id]);

  const handleLikeToggle = async () => {
    setLoading(true);
    try {
      await likeBlog(blogId, currentUser?.id!);
      setIsLiked((prev) => !prev);
    } catch (error) {
      console.error("Error toggling like:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      size="sm"
      onClick={handleLikeToggle}
      variant={'ghost'}
      disabled={loading}
      className="flex items-center siz-4"
    >
      {loading ? (
        <Loader2Icon className="animate-spin size-5" />
      ) : isLiked ? (
        <HeartFilledIcon className="text-red-500 size-5" />
      ) : (
        <HeartIcon className="size-5" />
      )}
      {/* {isLiked ? "Unlike" : "Like"} */}
    </Button>
  );
};
