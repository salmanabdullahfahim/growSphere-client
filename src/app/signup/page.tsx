"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  ArrowRight,
  Mail,
  Lock,
  User,
  Phone,
  Image as ImageIcon,
} from "lucide-react";

import Image from "next/image";

import Link from "next/link";
import Logo from "@/components/Navbar/Logo";
import nexiosInstance from "@/config/nexios.config";
import { uploadToCloudinary } from "@/utils/ImageUpload";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    let uploadedImageUrl = "";

    try {
      // Upload the profile image to Cloudinary
      if (data.profileImage && data.profileImage[0]) {
        setIsUploading(true);
        uploadedImageUrl = await uploadToCloudinary(data.profileImage[0]);
        setImageURL(uploadedImageUrl);
        setIsUploading(false);
      }

      // Wait for state to update
      await new Promise((resolve) => setTimeout(resolve, 0));

      const payload = {
        ...data,
        profileImage: uploadedImageUrl || imageURL,
      };

      const response = await nexiosInstance.post("/auth/signup", payload);
      if (response?.data?.success === true) {
        toast.success(response?.data?.message);
        router.push("/signin");
      } else {
        toast.error(
          response?.data?.message || "Signup failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Error signing up:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      }
      toast.error("Failed to sign up. Please try again.");
    } finally {
      setLoading(false);
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-12">
      <div className="w-full relative mb-6">
        <input
          type="text"
          className="bg-transparent border-b border-black focus:outline-none focus:border-green-600 text-sm w-full py-2"
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

      <div className="w-full relative mb-6">
        <input
          type="email"
          className="bg-transparent border-b border-black focus:outline-none focus:border-green-600 text-sm w-full py-2"
          placeholder="Email Address"
          {...register("email", {
            required: "Email is required",
            pattern: /^\S+@\S+$/i,
          })}
        />
        <Mail
          className="absolute top-1/2 -translate-y-1/2 right-2 opacity-80"
          size={18}
        />
        {errors.email && (
          <span className="text-red-500 text-xs">
            {errors.email.message?.toString() ?? ""}
          </span>
        )}
      </div>

      <div className="w-full relative mb-6">
        <input
          type="password"
          className="bg-transparent border-b border-black focus:outline-none focus:border-green-600 text-sm w-full py-2"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: 6,
          })}
        />
        <Lock
          className="absolute top-1/2 -translate-y-1/2 right-2 opacity-80"
          size={18}
        />
        {errors.password && (
          <span className="text-red-500 text-xs">
            {errors.password.message?.toString()}
          </span>
        )}
      </div>

      <div className="w-full relative mb-6">
        <input
          type="tel"
          className="bg-transparent border-b border-black focus:outline-none focus:border-green-600 text-sm w-full py-2"
          placeholder="Phone Number"
          {...register("phone", { required: "Phone number is required" })}
        />
        <Phone
          className="absolute top-1/2 -translate-y-1/2 right-2 opacity-80"
          size={18}
        />
        {errors.phone && (
          <span className="text-red-500 text-xs">
            {errors.phone.message?.toString()}
          </span>
        )}
      </div>

      <div className="w-full relative mb-6">
        <input
          type="file"
          accept="image/*"
          className="bg-transparent border-b border-black focus:outline-none focus:border-green-600 text-sm w-full py-2"
          {...register("profileImage")}
        />
        <ImageIcon
          className="absolute top-1/2 -translate-y-1/2 right-2 opacity-80"
          size={18}
        />
      </div>

      <button
        type="submit"
        className="bg-green-500 py-4 px-10 text-white hover:bg-opacity-95 duration-300 mt-4 flex items-center rounded-md font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={loading || isUploading}
      >
        {loading || isUploading ? (
          "Processing..."
        ) : (
          <>
            Create Account <ArrowRight className="ml-2" size={18} />
          </>
        )}
      </button>
    </form>
  );
};

const SignUp15 = () => {
  return (
    <section className="ezy__signup15 light flex items-center justify-center py-14 md:py-24 bg-white text-black text-opacity-90 overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="flex justify-center">
          <div className="w-full md:w-2/3">
            <div className="bg-white shadow-xl p-6 lg:p-12">
              <div className="flex flex-wrap justify-between items-center">
                <div className="w-full lg:w-1/2 lg:order-2">
                  <div className="flex flex-col items-center justify-center h-full mt-12 lg:mt-0">
                    <Image
                      src="https://cdn.easyfrontend.com/pictures/sign-in-up/abstract1.png"
                      alt="Abstract"
                      width={300}
                      height={300}
                    />
                    <div className="text-center mt-12">
                      Already have an account?
                      <Link
                        href="/signin"
                        className="underline hover:text-green-600 duration-300"
                      >
                        {" "}
                        Sign In
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
                  <div className="flex flex-col h-full p-2 lg:p-6 xl:p-12">
                    <Logo />
                    <h2 className="my-6 text-xl font-semibold">
                      Sign Up to create account
                    </h2>
                    <SignUpForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function SignUpPage() {
  return <SignUp15 />;
}
