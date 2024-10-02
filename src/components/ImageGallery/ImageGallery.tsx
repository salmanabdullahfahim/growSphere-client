import React from "react";

const portfolioList = [
  {
    image: "https://cdn.easyfrontend.com/pictures/portfolio/portfolio_1_1.png",
    title: "Photography",
    categories: ["Cinematography"],
  },
  {
    image: "https://cdn.easyfrontend.com/pictures/portfolio/portfolio_1_2.png",
    title: "Web Portal Dev",
    categories: ["Product Design"],
  },
  {
    image: "https://cdn.easyfrontend.com/pictures/portfolio/portfolio_1_3.png",
    title: "Marketing",
    categories: ["Digital Marketing"],
  },
  {
    image: "https://cdn.easyfrontend.com/pictures/portfolio/portfolio_1_4.png",
    title: "Web Portal Dev",
    categories: ["UI/UX Design"],
  },
  {
    image: "https://cdn.easyfrontend.com/pictures/portfolio/portfolio_1_5.png",
    title: "VS Code Editor",
    categories: ["Specialist"],
  },
  {
    image: "https://cdn.easyfrontend.com/pictures/portfolio/portfolio_1_6.png",
    title: "Management",
    categories: ["Project Manager"],
  },
  {
    image: "https://cdn.easyfrontend.com/pictures/portfolio/portfolio_1_7.png",
    title: "Logo Design",
    categories: ["Branding"],
  },
  {
    image: "https://cdn.easyfrontend.com/pictures/portfolio/portfolio1.jpg",
    title: "Full Stack Dev",
    categories: ["Wordpress"],
  },
  {
    image: "https://cdn.easyfrontend.com/pictures/portfolio/portfolio5.jpg",
    title: "Designing",
    categories: ["Product Design"],
  },
];

const ImageGallery = () => {
  return (
    <section className="ezy__portfolio1 light py-14 md:py-24 bg-white  text-gray-700 ">
      <div className="container px-4 w-full mx-auto">
        <div className="grid grid-cols-12 justify-center mb-6 md:mb-12">
          <div className="col-span-12 lg:col-span-6 lg:col-start-4 text-center">
            <p className="mb-2">THIS IS WHAT WE DO</p>
            <h2 className="text-3xl md:text-[45px] font-bold mb-6">
              Our Latest Gardening Works
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6 mx-12">
          {portfolioList.map((portfolio, i) => (
            <div className="col-span-12 md:col-span-6 lg:col-span-4" key={i}>
              <div className="group relative text-center">
                <img
                  src={portfolio.image}
                  alt={portfolio.title}
                  className="max-w-full w-full h-auto rounded-xl"
                />
                <div className="absolute left-4 right-4 bottom-4 rounded-xl bg-white bg-opacity-70 dark:bg-black dark:bg-opacity-40 bg-blur-sm bg-saturate-200 translate-y-5 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100 text-center p-6">
                  <h5 className="text-xl font-medium mb-2">
                    {portfolio.title}
                  </h5>
                  <p className="mb-0">{portfolio.categories.join(", ")}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;
