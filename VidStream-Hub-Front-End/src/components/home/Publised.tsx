"use client";
import Titles from "../Titles";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaPlay } from "react-icons/fa";
import { Autoplay, Navigation } from "swiper/modules";
import Loader from "../notifications/Loader";
import { Empty } from "../notifications/Empty";
import { useState } from "react";
import { TypeOfContent } from "@/Types";
import PublicContent from "../modals/PublicContent";
import { BsEyeFill } from "react-icons/bs";
import Image from "next/image";

const Publised = ({
  contents,
  title,
  icon,
  isLoading,
}: {
  contents: TypeOfContent[];
  title: string;
  icon: React.ComponentType;
  isLoading: boolean;
}) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [publicContent, setPublicContent] = useState<string | null>(null);
  return (
    <div className="my-16">
      <PublicContent
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        url={publicContent}
        title={title}
      />
      <Titles title={title} Icon={icon} />
      {isLoading ? (
        <Loader />
      ) : contents?.length > 0 ? (
        <div className="mt-10">
          <Swiper
            autoplay={true}
            speed={3000}
            loop={true}
            modules={[Navigation, Autoplay]}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
            }}
          >
            {contents.length > 0 &&
              contents?.map(
                (content: TypeOfContent, index: number) =>
                  content.isPublic && (
                    <SwiperSlide key={index}>
                      <div
                        onClick={() => {
                          setModalOpen(true);
                          setPublicContent(content.url);
                        }}
                      >
                        <div className="p-4 h-rate  hovered border border-border bg-dry rounded-lg overflow-hidden">
                          {title === "Published Videos" ? (
                            <video
                              src={
                                content?.url
                                  ? content.url
                                  : "https://images.pexels.com/photos/1424239/pexels-photo-1424239.jpeg?auto=compress&cs=tinysrgb&w=600"
                              }
                              className="w-full h-full object-cover rounded-lg"
                              // autoPlay
                              muted
                            />
                          ) : title === "Published Musics" ? (
                            <>
                              <audio
                                src={
                                  content?.url
                                    ? content.url
                                    : "https://images.pexels.com/photos/1424239/pexels-photo-1424239.jpeg?auto=compress&cs=tinysrgb&w=600"
                                }
                                className="w-full h-full object-cover rounded-lg "
                                // autoPlay
                                muted
                              />
                              <Image
                                src="/audioImage.jpeg"
                                alt="music"
                                height={500}
                                width={500}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            </>
                          ) : (
                            <Image
                              src={
                                content?.url
                                  ? content.url
                                  : "https://images.pexels.com/photos/1424239/pexels-photo-1424239.jpeg?auto=compress&cs=tinysrgb&w=600"
                              }
                              alt="music"
                              height={500}
                              width={500}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          )}

                          <div className="px-4 hoveres gap-6 text-center absolute bg-black bg-opacity-50 top-0 left-0 right-0 bottom-0">
                            <button className="w-12 h-12 flex-colo transitions hover:bg-subMain rounded-full bg-white text-main">
                              {/* bg-opacity-30  */}
                              {title === "Published Videos" ||
                              title === "Published Musics" ? (
                                <FaPlay />
                              ) : (
                                <BsEyeFill />
                              )}
                            </button>
                            <button
                              className="font-semibold text-xl trancuted line-clamp-2 overflow-hidden"
                              onClick={() => setModalOpen(true)}
                            >
                              {content?.title ? content.title : "Video Name"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  )
              )}
          </Swiper>
        </div>
      ) : (
        <div className="mt-6">
          <Empty message="It seem's like there's no videos" />
        </div>
      )}
    </div>
  );
};

export default Publised;
