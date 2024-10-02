// @ts-nocheck
"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TUser } from "@/types/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { User, Mail, Phone, Image as ImageIcon } from "lucide-react";
import { uploadToCloudinary } from "@/utils/ImageUpload";
import { toast } from "sonner";
import Image from "next/image";
import { getClientNexiosInstance } from "@/config/nexios.config";

const EditUser = ({ user }: { user: TUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
      phone: user.phone,
    },
  });

  const [loading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState(user.profileImage);
  const [isUploading, setIsUploading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    let uploadedImageUrl = "";

    try {
      // Upload the profile image to Cloudinary if a new file is selected
      if (data.profileImage && data.profileImage[0]) {
        setIsUploading(true);
        uploadedImageUrl = await uploadToCloudinary(data.profileImage[0]);
        setImageURL(uploadedImageUrl);
        setIsUploading(false);
      }

      // Wait for state to update
      await new Promise((resolve) => setTimeout(resolve, 0));

      const payload = {
        name: data.name,
        email: data.email,
        phone: data.phone || user.phone,
        profileImage: uploadedImageUrl || imageURL || user.profileImage,
      };

      // Update the user profile

      // const clientNexiosInstance = await getClientNexiosInstance();

      // // Update the user profile
      // const response = await clientNexiosInstance;
      // console.log(response);
      // if (response?.data?.success === true) {
      //   toast.success("Profile updated successfully");
      // } else {
      //   toast.error("Failed to update profile. Please try again.");
      // }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
      setIsUploading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">✏️ Edit Profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="relative">
              <Input
                id="name"
                placeholder="Name"
                {...register("name", { required: "Name is required" })}
              />
              <User
                className="absolute top-1/2 -translate-y-1/2 right-2 opacity-80"
                size={18}
              />
              {errors.name && (
                <span className="text-red-500 text-xs">
                  {errors.name.message as string}
                </span>
              )}
            </div>
            <div className="relative">
              <Input
                id="email"
                placeholder="Email"
                {...register("email")}
                disabled
              />
              <Mail
                className="absolute top-1/2 -translate-y-1/2 right-2 opacity-80"
                size={18}
              />
            </div>
            <div className="relative">
              <Input
                id="phone"
                placeholder="Phone Number"
                {...register("phone")}
              />
              <Phone
                className="absolute top-1/2 -translate-y-1/2 right-2 opacity-80"
                size={18}
              />
            </div>
            <div className="relative">
              <Input
                type="file"
                accept="image/*"
                {...register("profileImage")}
              />
              <ImageIcon
                className="absolute top-1/2 -translate-y-1/2 right-2 opacity-80"
                size={18}
              />
            </div>
            {imageURL && (
              <div className="mt-2">
                <Image
                  src={imageURL}
                  alt="Profile"
                  className="object-cover rounded-full"
                  width={100}
                  height={100}
                />
              </div>
            )}
            <Button
              type="submit"
              disabled={loading || isUploading}
              className=""
            >
              {loading || isUploading ? "Processing..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUser;
