"use client";

import Logo from "@/components/Navbar/Logo";
import { Button } from "@/components/ui/button";
import VerifiedLogo from "@/components/UserProfile/VerifiedLogo";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { verifyUser } from "@/service/verifyUser";

import { extractClientUser } from "@/utils/extractClientuser";

const VerifyUser = () => {
  const user = extractClientUser();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  async function handleVerify() {
    try {
      // @ts-expect-error
      const result = await verifyUser(user?.id);
      if (result.success && result.payment_url) {
        router.push(result.payment_url);
      } else {
        setErrorMessage(
          result.message || "Verification failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Verification error:", error);
      setErrorMessage(
        "An error occurred during verification. Please try again."
      );
    }
  }

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
            <Button variant="outline">Back to Home</Button>
          </Link>
          <Button
            onClick={handleVerify}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Verify Now
          </Button>
        </div>
        {errorMessage && (
          <p className="text-white mt-6 text-[1rem] font-semibold bg-red-500 rounded-lg px-4 py-2">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default VerifyUser;
