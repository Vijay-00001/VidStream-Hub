import Head from "@/components/Head";
import Image from "next/image";
import React from "react";

const AboutUS: React.FC = () => {
  return (
    <div className="min-height-screen container mx-auto px-2 my-6">
      <Head title="About Us" />
      <div className="xl:py-20 py-10 px-4">
        <div className="grid grid-flow-row xl:grid-cols-2 gap-4 xl:gap-16 items-center">
          <div>
            <h3 className="text-xl lg:text-3xl mb-4 font-semibold">
              Welcome to Our VidStream Hub
            </h3>
            <div className="mt-3 text-sm leading-8 text-text">
              <p>
                Welcome to Our VidStream Hub, your ultimate destination for
                immersive movie experiences and engaging discussions. Step into
                a world where cinema comes alive, where you can watch your
                favorite films with friends and fellow enthusiasts from the
                comfort of your own space. Dive into captivating topics, from
                classic masterpieces to the latest blockbusters, and share your
                thoughts with a community passionate about all things film. Join
                us in exploring the magic of movies and creating unforgettable
                memories together in our virtual haven. Welcome aboard!
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="p-8 bg-dry rounded-lg">
                <span className="text-3xl block font-extrabold mt-4">10K</span>
                <h4 className="text-lg font-bold mb-1">Listed Movies</h4>
                <p className="mb-0 text-text leading-7 text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
              <div className="p-8 bg-dry rounded-lg">
                <span className="text-3xl block font-extrabold mt-4">8K</span>
                <h4 className="text-lg font-bold mb-1">Lovely Users</h4>
                <p className="mb-0 text-text leading-7 text-sm">
                  Animi enim molestiae modi illo cum, eaque magnam deleniti.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-10 lg:mt-0">
            <Image
              src="https://i.pinimg.com/736x/49/35/a3/4935a36561a5e8d4fa89ba310c3fd7ee.jpg"
              alt="about us"
              height={500}
              width={500}
              className="w-full xl:block hidden h-header rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUS;
