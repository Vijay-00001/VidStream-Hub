"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import MainModals from "./MainModals";
import { Autoplay } from "swiper/modules";
import { useRef, useState } from "react";
import Image from "next/image";

const PublicContent = ({
  modalOpen,
  setModalOpen,
  url,
  title,
}: {
  modalOpen: boolean;
  setModalOpen: (modalOpen: boolean) => void;
  url: string | any;
  title: string;
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [progressBarWidth, setProgressBarWidth] = useState<string>("0%");

  // Toggle play/pause
  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  // Update progress bar
  const updateProgressBar = () => {
    const video = videoRef.current;
    const progressBar = progressBarRef.current;
    if (video && progressBar) {
      const progress = (video.currentTime / video.duration) * 100;
      progressBar.style.width = `${progress}%`;
    }
  };

  // Handle progress bar click
  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (video) {
      const progressBar = e.currentTarget;
      const { width, left } = progressBar.getBoundingClientRect();
      const clickX = e.clientX - left;
      const progress = (clickX / width) * video.duration;
      video.currentTime = progress;
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <MainModals modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main rounded-2xl text-white z-50">
        <Swiper
          direction="vertical"
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          speed={1000}
          modules={[Autoplay]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
        >
          <SwiperSlide>
            {title === "Published Photos" ? (
              <div className="relative w-full h-[86vh] boxShadow rounded-3xl">
                <Image
                  src={url}
                  alt="photo"
                  height={500}
                  width={500}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div
                onClick={(e) => {
                  if (videoRef.current?.contains(e.target as Node)) {
                    togglePlayPause();
                  }
                  if (!progressBarRef.current?.contains(e.target as Node)) {
                    togglePlayPause();
                  }
                }}
                className="relative w-full h-[86vh] boxShadow rounded-3xl"
              >
                {title === "Published Videos" ? (
                  <video
                    ref={videoRef}
                    className="w-full h-full"
                    preload={"auto"}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onClick={
                      isPlaying
                        ? () => videoRef.current?.pause()
                        : () => videoRef.current?.play()
                    }
                    autoPlay
                    onTimeUpdate={updateProgressBar}
                    loop
                  >
                    <source src={url} type="video/mp4" />
                    <source src={url} type="video/webm" />
                    <source src={url} type="video/ogg" />
                    <source src={url} type="video/mkv" />
                    <track
                      label="English"
                      kind="subtitles"
                      srcLang="en"
                      src={url}
                      default
                    />
                  </video>
                ) : (
                  <>
                    <audio
                      ref={videoRef}
                      className="w-full h-full"
                      preload={"auto"}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onClick={
                        isPlaying
                          ? () => videoRef.current?.pause()
                          : () => videoRef.current?.play()
                      }
                      autoPlay
                      onTimeUpdate={updateProgressBar}
                      loop
                    >
                      <source src={url} type="audio/mp3" />
                    </audio>
                    <Image
                      src="/audioImage.jpeg"
                      alt="audio"
                      height={500}
                      width={500}
                      className="absolute w-full h-full"
                    />
                  </>
                )}
                <div
                  ref={progressBarRef}
                  className="h-[3px] bg-subMain mb-5 absolute  bottom-0 left-0 right-0 cursor-pointer rounded-3xl"
                  onClick={handleProgressBarClick}
                >
                  <div style={{ width: `${progressBarWidth}` }} />
                </div>
              </div>
            )}
          </SwiperSlide>
        </Swiper>
      </div>
    </MainModals>
  );
};

export default PublicContent;
