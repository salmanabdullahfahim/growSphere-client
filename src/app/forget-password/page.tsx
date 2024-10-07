"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/components/Navbar/Logo";
import { forgetPassword } from "@/service/forgetPassword";
import { toast } from "sonner";

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await forgetPassword(email);
      toast.success("Password reset link sent. Please check your Email.");
      setEmail("");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen">
      <div className="absolute top-8 left-8">
        <Logo />
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen ">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center text-gray-900">
            Forget Password
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email:
              </label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-green-600 text-white hover:bg-green-600/90"
            >
              Reset Password
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
