"use client";


import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import RichTextEditor from "@/components/RichTextEditor";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast"; 

// Helper function to extract text from HTML
function extractTextFromHTML(html: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  return doc.body.textContent?.trim() || "";
}

// Form validation schema
const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  content: z
    .string()
    .refine((value) => extractTextFromHTML(value).length >= 5, {
      message: "Content must be at least 5 characters long.",
    }),
});

// Fake API request function
async function createBlogPost(data: any) {
  const response = await fetch("/api/blogs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Failed to create blog post.");
  return response.json();
}

export default function BlogCreationForm() {
  const form = useForm({
    mode: "onTouched",
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const mutation = useMutation(createBlogPost, {
    onSuccess: () => toast.success("Blog post created successfully!"),
    onError: () => toast.error("Failed to create blog post."),
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h1 className="text-2xl font-semibold mb-6 text-gray-700">Create Blog</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Title Field */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    type="text"
                    placeholder="Enter a captivating title"
                    className="w-full border rounded-md p-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Content Field */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <RichTextEditor
                    content={field.value}
                    onChange={(value) => field.onChange(value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={mutation.isLoading}
            className="w-full py-3 text-lg"
          >
            {mutation.isLoading ? "Submitting..." : "Create Blog"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
