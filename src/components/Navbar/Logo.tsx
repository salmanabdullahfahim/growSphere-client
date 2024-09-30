import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <Link
      href="/"
      className="text-2xl md:text-3xl font-semibold cursor-pointer duration-200 flex items-center italic gap-x-3"
    >
      <Image
        src="https://res.cloudinary.com/doq34sr4q/image/upload/v1727678488/logo_uspvfb.png"
        alt="Logo"
        width={70}
        height={70}
      />
      Grow<span className="text-md text-green-500">Sphere</span>
    </Link>
  );
};

export default Logo;
