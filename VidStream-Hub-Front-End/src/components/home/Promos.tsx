"use client";
import Image from "next/image";
import { FaUser } from "react-icons/fa";

const Promos = () => {
  return (
    <div className="my-20 py-10 md:px-20 px-8 bg-dry">
      <div className="lg:grid lg:grid-cols-2 lg:gap-10 items-center">
        <div className="flex lg:gap-10 gap-6 flex-col">
          <h1 className="xl:text-3xl text-xl capitalize font-sans font-medium xl:leading-relaxed">
            Download Your Movies Watch Offline <br /> Enjoy on Your Mobile
          </h1>
          <p className="text-text text-sm xl:text-base leading-6 xl:leading-8">
            Download your favorite movies to watch offline and enjoy them on
            your mobile device anytime, anywhere. Whether you&apos;re on a long
            journey, in an area with poor internet connectivity, or simply want
            to save data, downloading movies allows you to have uninterrupted
            entertainment. With just a few taps, you can access a wide selection
            of movies and TV shows from various genres. From action-packed
            thrillers to heartwarming dramas and everything in between,
            there&apos;s something for everyone. Don&apos;t let internet
            limitations hold you back; download your movies today and experience
            the convenience and flexibility of offline viewing on your mobile
            device.
          </p>
          <div className="flex gap-4 md:text-lg text-sm">
            <div className="flex-colo bg-black text-subMain px-6 py-3 rounded-md font-bold">
              HD 4K
            </div>
            <div className="flex-rows gap-4 bg-black text-subMain px-6 py-3 rounded-md font-bold">
              <FaUser /> 2K
            </div>
          </div>
        </div>
        <div>
          <Image
            src="https://netflixo-ten.vercel.app/images/mobile.png"
            alt="Mobile App"
            width={500}
            height={500}
            className="w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Promos;
