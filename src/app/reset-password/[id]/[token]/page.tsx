"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Logo from "@/components/Navbar/Logo";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/service/resetPassword";

const ResetPassword = ({
  params,
}: {
  params: { id: string; token: string };
}) => {
  const { id, token } = params;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const result = await resetPassword(id, token, password);
      if (result.success) {
        toast.success("Password reset successful, please sign in");
        router.push("/signin");
      } else {
        toast.error(
          result.error || "An error occurred while resetting your password"
        );
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="p-6">
        <Logo />
      </div>
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-semibold text-center mb-6">
              Reset Password
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button
                type="submit"
                className="w-full text-white bg-green-600 hover:bg-green-600/90 "
                disabled={isLoading}
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
