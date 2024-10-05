import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="my-12 flex items-center justify-center px-2 md:my-24 md:px-0">
      <div className="lg:flex lg:items-center lg:space-x-10">
        <Image
          src="https://illustrations.popsy.co/lime/question-mark.svg"
          alt="question-mark"
          className="h-[300px] w-auto"
          width={300}
          height={300}
        />
        <div>
          <p className="mt-6 text-sm font-semibold text-black">404 error</p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">
            We can&apos;t find that page
          </h1>
          <p className="mt-4 text-gray-500">
            Sorry, the page you are looking for doesn&apos;t exist or has been
            moved.
          </p>
          <div className="mt-6 flex items-center space-x-3">
            <Link
              href="/"
              className="inline-flex items-center rounded-md border border-green-600 px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              <ArrowLeft size={16} className="mr-2" />
              Go back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
