// @ts-nocheck
"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { TUser } from "@/types/types";
import { uploadToCloudinary } from "@/utils/ImageUpload";

interface PostFormData {
  title: string;
  content: string;
  category: string;
  isPremium: boolean;
  images: FileList;
}

interface CreatePostProps {
  user: TUser;
  createPostAction: (
    data: any
  ) => Promise<{ success: boolean; message: string }>;
}

const CreatePost: React.FC<CreatePostProps> = ({ user, createPostAction }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PostFormData>();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<PostFormData> = async (data) => {
    setIsLoading(true);

    try {
      let imageUrl = "";
      if (data.images && data.images[0]) {
        imageUrl = await uploadToCloudinary(data.images[0]);
      }

      await new Promise((resolve) => setTimeout(resolve, 0));

      const postData = {
        title: data.title,
        content: data.content,
        category: data.category,
        isPremium: data.isPremium,
        images: imageUrl ? [imageUrl] : [],
        author: user._id,
      };

      const result = await createPostAction(postData);
      if (result.success) {
        toast.success(result.message);
        setIsOpen(false);
        reset(); // Reset the form
        router.refresh();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <p className="border-2 border-gray-300 px-12 md:px-24 lg:px-36 bg-gray-100 py-2 rounded-2xl cursor-pointer w-full">
          Create Post
        </p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Post</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <Input
              {...register("title", { required: "Title is required" })}
              id="title"
              placeholder="Enter post title"
            />
            {errors.title && (
              <span className="text-red-500 text-xs">
                {errors.title.message}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Content
            </label>
            <Input
              {...register("content", { required: "Content is required" })}
              id="content"
              placeholder="Enter post content"
            />
            {errors.content && (
              <span className="text-red-500 text-xs">
                {errors.content.message}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <Input
              {...register("category", { required: "Category is required" })}
              id="category"
              placeholder="Enter post category"
            />
            {errors.category && (
              <span className="text-red-500 text-xs">
                {errors.category.message}
              </span>
            )}
          </div>

          <div className="flex items-center">
            <input
              {...register("isPremium")}
              type="checkbox"
              id="isPremium"
              className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <label
              htmlFor="isPremium"
              className="ml-2 block text-sm text-gray-900"
            >
              Premium Post
            </label>
          </div>

          <div>
            <label
              htmlFor="images"
              className="block text-sm font-medium text-gray-700"
            >
              Image
            </label>
            <Input
              {...register("images")}
              type="file"
              id="images"
              accept="image/*"
            />
          </div>

          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Post"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
