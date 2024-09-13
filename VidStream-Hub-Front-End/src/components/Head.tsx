import Image from "next/image";

const Head = ({ title }: { title: string }) => {
  return (
    <div className="w-full bg-deepGray lg:h-64 h-40 relative overflow-hidden rounded-md">
      <Image
        src="https://e1.pxfuel.com/desktop-wallpaper/574/383/desktop-wallpaper-movie-poster-mix-of-movies.jpg"
        alt="movie"
        height={500}
        width={500}
        className="w-full h-full object-cover"
      />
      <div className="absolute top-0 bottom-0 left-0 right-0 bg-black bg-opacity-30"></div>
      <div className="absolute lg:top-24  flex-colo w-full ">
        <h1 className="lg:text-h1 text-2xl font-bold text-white text-center">
          {title && title}
        </h1>
      </div>
    </div>
  );
};

export default Head;
