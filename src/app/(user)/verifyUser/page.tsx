import Logo from "@/components/Navbar/Logo";
import { Button } from "@/components/ui/button";
import VerifiedLogo from "@/components/UserProfile/VerifiedLogo";
import Link from "next/link";
import React from "react";

const VerifyUser = () => {
  return (
    <div className="mx-auto mt-10 p-6">
      <div className="px-2">
        <Logo />
      </div>

      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-12">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold ml-2 py-3">User Verification</h1>
          <VerifiedLogo wi={22} he={22} />
        </div>
        <p className="mb-4">
          Verify your account to unlock exclusive benefits:
        </p>
        <ul className="list-disc list-inside mb-6">
          <li>Receive a special verification badge</li>
          <li>Access premium content</li>
        </ul>
        <p className="mb-6">
          Verification Charge:{" "}
          <span className="font-semibold">1200 BDT / Month</span>
        </p>
        <div className="flex justify-between items-center pt-4">
          <Link href="/">
            {" "}
            <Button variant="outline">Back to Home</Button>
          </Link>
          <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors">
            Verify Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyUser;
