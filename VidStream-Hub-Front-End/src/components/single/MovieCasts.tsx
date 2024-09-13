import { FaUserFriends } from "react-icons/fa";
import Titles from "../Titles";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { TypeOfCast, TypeOfCreateMovieInfo } from "@/Types";
import Image from "next/image";

const MovieCasts = ({ movie }: { movie: TypeOfCreateMovieInfo[] | any }) => {
  return (
    movie?.movie_casts?.length > 0 && (
      <div className="my-12">
        <Titles title="Castes" Icon={FaUserFriends} />
        <div className="mt-10">
          <Swiper
            autoplay={{ delay: 1000, disableOnInteraction: false }}
            modules={[Autoplay]}
            loop={true}
            speed={1000}
            spaceBetween={10}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              400: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 30,
              },
            }}
          >
            {movie?.movie_casts.map((cast: TypeOfCast) => {
              return (
                <SwiperSlide key={cast?.id}>
                  <div className="w-full p-3 italic text-xs text-text rounded flex-colo bg-dry border border-gray-800">
                    <Image
                      src={
                        cast?.image
                          ? cast.image
                          : "https://images.pexels.com/photos/5845717/pexels-photo-5845717.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      }
                      alt={cast?.name ? cast.name : "Cast Name"}
                      height={500}
                      width={500}
                      className="w-full h-64 object-cover rounded mb-2"
                    />
                    <p>{cast?.name ? cast.name : "Cast Name"}</p>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    )
  );
};

export default MovieCasts;
