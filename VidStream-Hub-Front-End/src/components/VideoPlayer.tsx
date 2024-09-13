import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  FaPlay,
  FaPause,
  FaForward,
  FaBackward,
  FaExpand,
  FaCompress,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";
import { FadeLoader } from "react-spinners";

const VideoPlayer = ({ videoUrl }: { videoUrl: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playBarRef = useRef<HTMLDivElement>(null);
  const volumeBarRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [currentQuality, setCurrentQuality] = useState<string>("720p");
  const [progressBarWidth, setProgressBarWidth] = useState<string>("0%");
  const [volumePercentage, setVolumePercentage] = useState<number>(100);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>("0:00");

  useEffect(() => {
    const video: any = videoRef.current;
    const handleProgress = () => {
      const progress = (video.currentTime / video.duration) * 100;
      setProgressBarWidth(`${progress}%`);

      const minutes = Math.floor(video.currentTime / 60);
      const seconds = Math.floor(video.currentTime % 60)
        .toString()
        .padStart(2, "0");
      setCurrentTime(`${minutes}:${seconds}`);
    };
    const handleLoadedData = () => {
      setIsLoading(false);
    };

    if (video) {
      video.addEventListener("timeupdate", handleProgress);
      video.addEventListener("loadeddata", handleLoadedData);
      return () => {
        video.removeEventListener("timeupdate", handleProgress);
        video.removeEventListener("loadeddata", handleLoadedData);
      };
    }
  }, []);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.error("Error playing video:", error);
          });
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleForward = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime += 5;
    }
  };

  const handleBackward = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime -= 5;
    }
  };

  const handlePlaybackSpeed = (speed: number) => {
    setPlaybackSpeed(speed);
    const video = videoRef.current;
    if (video) {
      video.playbackRate = speed;
    }
  };

  // const handleQualityChange = (quality: string) => {
  //   setCurrentQuality(quality);
  //   // Logic to change video quality
  // };

  const handleFullScreenToggle = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      if (!isFullScreen) {
        video.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
      setIsFullScreen(!isFullScreen);
    }
  }, [isFullScreen]);

  const handleMuteToggle = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
      setVolumePercentage(video.muted ? 0 : 100);
    }
  };

  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    if (volumePercentage === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
    const video = videoRef.current;
    if (video && volumeBarRef.current) {
      const volumeBar = volumeBarRef.current;
      const { width, left } = volumeBar.getBoundingClientRect();
      const clickX = e.clientX - left;
      const volume = Math.min(1, Math.max(0, clickX / width));
      video.volume = volume;
      setVolumePercentage(volume * 100);
      setIsMuted(volume === 0);
    }
  };

  const handleProgressBarClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
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
    },
    [videoRef]
  );

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleFullScreenToggle();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleForward();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handleBackward();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const video: number | any = videoRef.current;
        handlePlaybackSpeed(video.playbackRate + 0.25);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        const video: number | any = videoRef.current;
        handlePlaybackSpeed(video.playbackRate - 0.25);
      } else if (e.key === "m" || e.key === "M") {
        e.preventDefault();
        const video = videoRef.current;
        if (video) {
          video.muted = !video.muted;
          setIsMuted(video.muted);
          setVolumePercentage(video.muted ? 0 : 100);
        }
      } else if (e.key === "f" || e.key === "F") {
        handleFullScreenToggle();
      } else if (e.key === "p" || e.key === " " || e.key === "P") {
        e.preventDefault();
        togglePlayPause();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [
    isFullScreen,
    isMuted,
    playbackSpeed,
    currentQuality,
    volumePercentage,
    handleProgressBarClick,
    handleFullScreenToggle,
    setVolumePercentage,
  ]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => {
        if (!playBarRef.current?.contains(e.target as Node)) {
          togglePlayPause();
        }
      }}
      className="relative w-full h-[46vh] sm:h-[86vh] boxShadow rounded-3xl"
    >
      {isLoading && (
        <div className="absolute w-full h-full flex-colo bg-dry">
          {" "}
          <FadeLoader color="#F20000" />{" "}
        </div>
      )}{" "}
      <video
        ref={videoRef}
        className="w-full h-full"
        preload={"auto"}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        autoPlay
      >
        <source src={videoUrl} type="video/mp4" />
        <source src={videoUrl} type="video/webm" />
        <source src={videoUrl} type="video/ogg" />
        <source src={videoUrl} type="video/mkv" />
        <track
          label="English"
          kind="subtitles"
          srcLang="en"
          src={videoUrl}
          default
        />
      </video>
      <div
        ref={playBarRef}
        className={`absolute top-0 left-9 right-0 flex flex-col sm:flex-row justify-center items-center bg-opacity-75 py-2 px-9 sm:px-16 md:px-32 rounded-3xl transition-opacity z-10 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <h2 className="text-xl font-bold text-subMain">
          VidStream Hub Video player
        </h2>
      </div>
      <div
        ref={playBarRef}
        className={`absolute bottom-7 left-0 right-0 flex flex-col sm:flex-row justify-between items-center bg-opacity-75 py-4 px-9 sm:px-16 md:px-32 rounded-3xl transition-opacity z-10 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center">
          <button onClick={handleBackward} className="mr-4 text-subMain">
            <FaBackward />
          </button>
          <button onClick={togglePlayPause} className="mr-4 text-subMain">
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button onClick={handleForward} className="mr-4 text-subMain">
            <FaForward />
          </button>
          <div className="flex items-center mr-4">
            <div className="flex items-center w-7 mr-8">
              <span className="text-subMain">{currentTime}</span>
            </div>
            <label className="mr-2 text-subMain">Speed:</label>
            <select
              value={playbackSpeed}
              onChange={(e) => handlePlaybackSpeed(Number(e.target.value))}
              className="bg-transparent text-subMain rounded-md p-1"
            >
              <option value={0.5}>0.5x</option>
              <option value={1}>1x</option>
              <option value={1.5}>1.5x</option>
              <option value={2}>2x</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end sm:items-center w-full sm:w-auto">
          <div className="relative flex mr-4">
            <button onClick={handleMuteToggle} className="mr-4 text-subMain">
              {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>
            <div
              className={`h-1 relative bg-border w-24 cursor-pointer my-auto transition-opacity rounded-3xl z-30 overflow-x-hidden ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
              onClick={handleVolumeChange}
            >
              <div
                ref={volumeBarRef}
                className="h-full relative bg-subMain rounded-3xl z-0"
                style={{ width: `${volumePercentage}%` }}
              />
            </div>
          </div>

          <button
            onClick={handleFullScreenToggle}
            className="mr-4 text-subMain"
          >
            {isFullScreen ? <FaCompress /> : <FaExpand />}
          </button>
        </div>
        <div
          ref={progressBarRef}
          className="h-[6px] justify-center bg-border w-full sm:w-[81%] sm:mx-14 lg:mx-28 absolute  bottom-0 left-0 cursor-pointer rounded-3xl"
          onClick={handleProgressBarClick}
        >
          <div
            className="h-full absolute bg-subMain rounded-3xl"
            style={{ width: `${progressBarWidth}` }}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
