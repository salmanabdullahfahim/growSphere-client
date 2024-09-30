import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <Link
      href="/"
      className="text-2xl md:text-[1.7rem] font-semibold cursor-pointer duration-200 flex items-center italic gap-x-3"
    >
      <Image
        src="https://res.cloudinary.com/doq34sr4q/image/upload/v1727678488/logo_uspvfb.png"
        alt="Logo"
        width={50}
        height={50}
      />
      <p className="text-md">
        Grow<span className=" text-green-600">Sphere</span>
      </p>
    </Link>
  );
};

export default Logo;
