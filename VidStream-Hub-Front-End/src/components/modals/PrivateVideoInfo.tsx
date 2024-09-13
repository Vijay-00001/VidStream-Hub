"use client";
import { useRef, useState } from "react";
import MainModals from "./MainModals";
import { TypeOfPrivateVideoInfo } from "@/Types";
import Image from "next/image";

const PrivateVideoInfo = ({
  modalOpen,
  setModalOpen,
  video,
  currentInfo,
}: TypeOfPrivateVideoInfo) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  return (
    <MainModals modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main rounded-2xl text-white z-50">
        {currentInfo === "video" ? (
          <div className="flex flex-col sm:flex-row gap-7 justify-center align-middle h-full">
            {/* Left side: Video display */}
            <div className="flex justify-center m-auto w-1/4 md:w-1/2">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                preload={"auto"}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onClick={
                  isPlaying
                    ? () => videoRef.current?.pause()
                    : () => videoRef.current?.play()
                }
              >
                <source src={video?.url} type="video/mp4" />
                <source src={video?.url} type="video/webm" />
                <source src={video?.url} type="video/ogg" />
                <source src={video?.url} type="video/mkv" />
                <track
                  label="English"
                  kind="subtitles"
                  srcLang="en"
                  src={video?.url}
                  default
                />
              </video>
            </div>
            {/* Right side: Video info */}
            <div className="flex flex-col items-middle ml-1 w-1/8">
              <div className="flex flex-col justify-start align-middle ml-1 gap-4">
                <div className="text-sm w-full ml-0 flex flex-col sm:flex-row ">
                  <label className="text-border text-start font-semibold mr-2">
                    Video Name
                  </label>
                  <p className="flex text-justify ml-1">{video?.title}</p>
                </div>
                <div className="text-sm w-full ml-0 flex flex-col sm:flex-row">
                  <label className="text-border text-start font-semibold mr-2">
                    Video Public
                  </label>
                  <p className="flex text-justify ml-1">
                    {video?.isPublic ? "Private" : "Public"}
                  </p>
                </div>
                <div className="text-sm w-full ml-0 flex flex-col sm:flex-row">
                  <label className="text-border text-start font-semibold mr-2">
                    Description
                  </label>
                  <p className="flex text-justify ml-1">{video?.description}</p>
                </div>
              </div>
            </div>
          </div>
        ) : currentInfo === "Document" ? (
          <div className="relative h-96 ">
            <div className="flex flex-col sm:flex-row gap-7 justify-center align-middle h-full">
              <embed src={video?.url} className="w-full h-full object-cover" />
            </div>
            <div className="absolute easy-transition flex-btn gap-2 top-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 py-3 transition-opacity duration-300">
              <h3 className="font-semibold truncate">
                {video?.title ? video.title : "No Name"}
              </h3>
            </div>
            <div className="absolute easy-transition flex-btn gap-2 bottom-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 py-3 transition-opacity duration-300">
              <h3 className="font-semibold truncate">
                {video?.description ? video.description : "No Name"}
              </h3>
            </div>
          </div>
        ) : currentInfo === "Music" ? (
          <div className="relative h-96 ">
            <div className="flex flex-col sm:flex-row gap-7 justify-center align-middle h-full">
              {/* Left side: Video display */}
              <audio
                src={video?.url}
                className="w-full h-full object-cover"
                autoPlay
              />
              <Image
                src="/audioImage.jpeg"
                alt="audio"
                height={200}
                width={200}
                className="absolute w-full h-full"
              />
            </div>
            <div className="absolute easy-transition flex-btn gap-2 top-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 py-3 transition-opacity duration-300">
              <h3 className="font-semibold truncate">
                {video?.title ? video.title : "No Name"}
              </h3>
            </div>
            <div className="absolute easy-transition flex-btn gap-2 bottom-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 py-3 transition-opacity duration-300">
              <h3 className="font-semibold truncate">
                {video?.description ? video.description : "No Name"}
              </h3>
            </div>
          </div>
        ) : currentInfo === "Photo" ? (
          <div className="flex flex-col sm:flex-row gap-7 justify-center align-middle h-full">
            {/* Left side: Video display */}
            <div className="flex justify-center m-auto w-1/4 md:w-1/2">
              <Image
                src={video?.url}
                alt="photo"
                height={500}
                width={500}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Right side: Video info */}
            <div className="flex flex-col items-middle ml-1 w-1/8">
              <div className="flex flex-col justify-start align-middle ml-1 gap-4">
                <div className="text-sm w-full ml-0 flex flex-col sm:flex-row ">
                  <label className="text-border text-start font-semibold mr-2">
                    Photo Name
                  </label>
                  <p className="flex text-justify ml-1">{video?.title}</p>
                </div>
                <div className="text-sm w-full ml-0 flex flex-col sm:flex-row">
                  <label className="text-border text-start font-semibold mr-2">
                    Photo is Public
                  </label>
                  <p className="flex text-justify ml-1">
                    {video?.isPublic ? "Private" : "Public"}
                  </p>
                </div>
                <div className="text-sm w-full ml-0 flex flex-col sm:flex-row">
                  <label className="text-border text-start font-semibold mr-2">
                    Description
                  </label>
                  <p className="flex text-justify ml-1">{video?.description}</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </MainModals>
  );
};

export default PrivateVideoInfo;
