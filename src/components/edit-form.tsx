'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UploadButton } from "@/lib/uploadthing";
import { updateUserProfile } from "@/actions/auth/settings";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import Link from "next/link";
import { MoveLeftIcon } from "lucide-react";
import { Separator } from "./ui/separator";
import Image from "next/image";
import { useRouter } from "next/navigation";

const editProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  image: z.string().url().optional(),
});

type EditProfileSchema = z.infer<typeof editProfileSchema>;

interface EditFormProps {
  initialName: string;
  initialImage?: string;
}

const EditForm: React.FC<EditFormProps> = ({ initialName, initialImage }) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(initialImage);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: initialName,
      image: initialImage,
    },
  });

  const router = useRouter()

  const onSubmit = async (formData: EditProfileSchema) => {
    try {
      const finalImageUrl = imageUrl || formData.image;

      const result = await updateUserProfile({
        name: formData.name,
        image: finalImageUrl,
      });

      if (result.status === "success") {
        router.refresh()
        toast.success("Profile updated successfully");
      } else {
        toast.error(result?.error || "Error updating profile");
      }
    } catch (error) {
      console.log(error);
      
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <div className="flex items-center justify-center my-20">
      <div className="p-4 rounded-md bg-slate-200 shadow-md w-[400px]">
        <Button type="button" asChild size="sm">
          <Link href="/dashboard">
            <MoveLeftIcon className="size-4" />
          </Link>
        </Button>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <h2 className="text-xl font-semibold text-center text-gray-800 mb-6">
            Edit Profile
          </h2>
          <Separator className="w-2 text-red-400" />

          {/* Profile Picture Section */}
          <div className="mb-3">
            <div className="flex items-center justify-center">
              <div className="relative w-24 h-24 rounded-full border border-gray-300 bg-gray-100 overflow-hidden">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt="Profile"
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <Avatar className="w-24 h-24">
                    <AvatarFallback className="text-xl text-gray-500">
                        <Image src={initialImage || '/images/avatar.png' }alt={initialName} width={24} height={24} />
                      {/* {initialName.charAt(0).toUpperCase()} */}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            </div>
            <div className="mt-4">
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  const uploadedImageUrl = res[0].url;
                  setImageUrl(uploadedImageUrl);
                  setValue("image", uploadedImageUrl);
                  toast.success("Image uploaded successfully");
                }}
                onUploadError={(error) => {
                  toast.error(`Upload failed: ${error.message}`);
                }}
              />
            </div>
          </div>

          {/* Name Input */}
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name")}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <div className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 rounded-md text-white font-medium ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-slate-900 hover:bg-slate-700"
            }`}
          >
            {isSubmitting ? "Updating..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
