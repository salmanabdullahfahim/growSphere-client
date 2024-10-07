import React from "react";
import { ChangePasswordForm } from "./_components/ChangePasswordForm";
import Logo from "@/components/Navbar/Logo";
import { changePassword } from "@/service/changePassword";

const ChangePassword = () => {
  return (
    <div className="mx-auto mt-8">
      <div className="px-14 py-4">
        <Logo />
      </div>
      <div className=" bg-white shadow-lg p-8 rounded-md w-1/2 mx-auto mt-16">
        <h1 className="text-2xl font-bold mb-4">Change Password</h1>
        <ChangePasswordForm changePassword={changePassword} />
      </div>
    </div>
  );
};

export default ChangePassword;
