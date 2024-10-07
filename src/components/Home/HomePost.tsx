import Image from "next/image";
import Link from "next/link";
import React from "react";

const HomePost = () => {
  const gardeningPosts = [
    {
      title: "Spring Planting Tips",
      content: "Learn the best techniques for planting your spring garden.",
      image:
        "https://images.unsplash.com/photo-1621371045485-c6c744e176a0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8U3ByaW5nJTIwUGxhbnRpbmclMjBUaXBzfGVufDB8fDB8fHww",
    },
    {
      title: "Organic Pest Control",
      content: "Discover natural ways to keep pests out of your garden.",
      image:
        "https://images.unsplash.com/photo-1581578017426-04fbc2b0511e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fE9yZ2FuaWMlMjBQZXN0JTIwQ29udHJvbHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      title: "Water Conservation",
      content:
        "Explore methods to reduce water usage while maintaining a healthy garden.",
      image:
        "https://plus.unsplash.com/premium_photo-1663051340315-fe85330b60bd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8V2F0ZXIlMjBDb25zZXJ2YXRpb24lMjBpbiUyMEdhcmRlbmluZ3xlbnwwfHwwfHx8MA%3D%3D",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <h2 className="text-3xl md:text-[45px] text-gray-700 font-bold text-center mb-12">
        Gardening Tips
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 mx-12 pt-9">
        {gardeningPosts.map((post, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <Image
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
              width={100}
              height={100}
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {post.title}
              </h3>
              <p className="text-gray-600">{post.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <Link
          href="/my-feed"
          className="inline-block bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition duration-300"
        >
          To Learn More Click Me
        </Link>
      </div>
    </div>
  );
};

export default HomePost;
