// @ts-nocheck
"use client";

import React from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ChangePasswordFormProps {
  changePassword: (
    prevState: any,
    formData: FormData
  ) => Promise<{ error?: string; success?: boolean }>;
}

export const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
  changePassword,
}) => {
  const router = useRouter();
  const [state, formAction] = useFormState(changePassword, { error: null });

  React.useEffect(() => {
    if (state.success) {
      toast.success(
        "Password changed successfully! You will be redirected to the sign-in page shortly."
      );
      setTimeout(() => {
        router.push("/signin");
      }, 1000);
    }
  }, [state, router]);

  return (
    <>
      <form action={formAction} className="max-w-md">
        <div className="mb-4">
          <label htmlFor="newPassword" className="block mb-2">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block mb-2">
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        {state.error && <p className="text-red-500 mb-4">{state.error}</p>}
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Change Password
        </button>
      </form>
    </>
  );
};
