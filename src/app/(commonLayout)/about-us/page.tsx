import Image from "next/image";
import React from "react";

const AboutUsPage = () => {
  return (
    <section className="ezy__about18 light py-14 md:pt-24 lg:pb-0 bg-white  text-zinc-900 ">
      <div className="container px-4">
        <div className="grid grid-cols-12 md:gap-8">
          <div className="col-span-12 lg:col-span-6">
            <div className="z-[1] flex justify-center items-center relative h-full w-full">
              <svg
                className="absolute -top[20%] -left-[10%] -z-[1] text-green-500"
                viewBox="0 0 180 180"
              >
                <path
                  fill="currentColor"
                  d="M13.5,-18.7C16.9,-16.2,18.5,-11.4,23,-5.6C27.5,0.2,34.8,6.9,34.5,12.3C34.3,17.7,26.4,21.6,19.4,23.2C12.4,24.7,6.2,23.8,-0.8,25C-7.9,26.2,-15.8,29.4,-23.3,28C-30.9,26.6,-38.1,20.7,-38.9,13.7C-39.7,6.8,-34,-1.2,-30.2,-8.8C-26.3,-16.4,-24.4,-23.6,-19.6,-25.7C-14.9,-27.8,-7.5,-24.9,-1.2,-23.3C5.1,-21.6,10.2,-21.3,13.5,-18.7Z"
                  width="100%"
                  height="100%"
                  transform="translate(50 50)"
                  strokeWidth="0"
                  style={{ transition: "all 0.3s ease 0s" }}
                  opacity=".2"
                ></path>
              </svg>

              <div>
                <Image
                  src="https://res.cloudinary.com/doq34sr4q/image/upload/v1727691924/pngwing.com_nbjr8y.png"
                  alt=""
                  className="max-w-full"
                  width={500}
                  height={300}
                />
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-6">
            <hr className="bg-gray-500  bg-opacity-50 w-[11%] h-[2px]" />
            <h2 className="text-2xl font-bold leading-none md:text-5xl md:leading-none my-6">
              Grow Sphere&apos;s Story
            </h2>
            <p className="text-base sm:text-lg leading-relaxed tracking-wide break-words mt-4 md:mt-12 opacity-75">
              Grow Sphere is a platform dedicated to sharing gardening tips with
              fellow enthusiasts. Our community-driven approach allows gardeners
              of all levels to connect, learn, and grow together. Whether
              you&apos;re a seasoned horticulturist or just starting your green
              journey, Grow Sphere provides a space where you can exchange
              knowledge, seek advice, and inspire others with your gardening
              experiences.
            </p>
            <p className="text-base sm:text-lg leading-relaxed tracking-wide break-words opacity-80 mt-4">
              Our mission is to cultivate a thriving online ecosystem where
              gardeners can share their passion, expertise, and challenges. We
              believe that by fostering a supportive community, we can help each
              other overcome gardening obstacles, discover new techniques, and
              celebrate the joys of watching our plants flourish. From urban
              balcony gardens to sprawling rural landscapes, Grow Sphere
              embraces diversity in gardening styles and encourages sustainable
              practices that benefit both our members and the environment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsPage;
