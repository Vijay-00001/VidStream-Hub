"use client";
import { useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit, FaShareAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../notifications/Loader";
import PublicVideos from "../modals/PublicContent";
import { MdDelete } from "react-icons/md";
import { GoEye } from "react-icons/go";
import Link from "next/link";
import {
  GetAllPrivateVideosAction,
  deleteVideoByIdAction,
} from "@/redux/actions/VideosActions";
import PrivateVideoInfo from "../modals/PrivateVideoInfo";
import { IoMdDownload } from "react-icons/io";
import { SidebarContext } from "@/context/DrawerContext";
import { DownloadVideo } from "@/context/Functionalities";
import FileSaver from "file-saver";
import { TypeOfContent, TypeOfDispatch, TypeOfState } from "@/Types";
import ShareModal from "../modals/ShareModal";
import Swal from "sweetalert2";
import { Empty } from "../notifications/Empty";

const Videos = () => {
  const dispatch = useDispatch<TypeOfDispatch>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [privateVieoModel, setPrivateVieoModel] = useState<boolean>(false);
  const [shareModel, setShareModel] = useState<boolean>(false);
  const [publicVideo, setPublicVideo] = useState<string | TypeOfContent | null>(
    null
  );
  const [videoId, setVideoId] = useState<string | undefined>("");
  const [videoTitle, setVideoTitle] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { progress, setProgress } = useContext<TypeOfState>(SidebarContext);

  const { isLoading, isError, privateVideo } = useSelector(
    (state: TypeOfState) => state.getPrivateVideos
  );

  // useEffect Call when any state change then re-render the component
  useEffect(() => {
    dispatch(GetAllPrivateVideosAction());
    if (isError) {
      toast.error(isError);
      dispatch({ type: "USER_GET_PRIVATE_VIDEOS_RESET" });
    }
  }, [dispatch, isError]);

  // Handle Card Hover
  const handleCardHover = (index: number) => {
    setHoveredIndex(index);
  };

  // Handle Card Leave
  const handleCardLeave = () => {
    setHoveredIndex(null);
  };

  // Delete Private Video
  const deletePrivateVideo = useCallback(
    (id: string | undefined) => {
      Swal.fire({
        title: "Are you sure?",
        text: "Are you sure you want to delete this video?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteVideoByIdAction(id ? id : ""));
        }
      });
    },
    [dispatch]
  );

  // Download Video
  const downloadVideo = async (videoUrl: string, name: string) => {
    await DownloadVideo(videoUrl, setProgress).then((data) => {
      setProgress(0);
      FileSaver.saveAs(data, name);
    });
  };

  return (
    <>
      <PublicVideos
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        url={publicVideo}
        title="Published Videos"
      />
      <PrivateVideoInfo
        modalOpen={privateVieoModel}
        setModalOpen={setPrivateVieoModel}
        video={publicVideo}
        currentInfo="video"
      />
      <ShareModal
        modalOpen={shareModel}
        setModalOpen={setShareModel}
        movie_id={videoId}
        movie_title={videoTitle}
      />

      <div className="grid sm:mt-12 mt-1 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {isLoading ? (
          <Loader />
        ) : privateVideo?.length > 0 ? (
          privateVideo
            ?.slice(0, 8)
            .map((video: TypeOfContent, index: number) => {
              return (
                <div
                  key={index}
                  className="border border-border p-1 relative rounded overflow-hidden"
                  onMouseEnter={() => handleCardHover(index)}
                  onMouseLeave={handleCardLeave}
                >
                  <div
                    className="w-full"
                    onClick={() => {
                      setModalOpen(true);
                      setPublicVideo(video.url);
                    }}
                  >
                    <video
                      src={
                        video?.url
                          ? video.url
                          : "https://images.pexels.com/photos/1595655/pexels-photo-1595655.jpeg?cs=srgb&dl=pexels-vlad-che%C8%9Ban-1595655.jpg&fm=jpg"
                      }
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  {hoveredIndex === index && (
                    <>
                      <div className="absolute easy-transition flex-btn gap-2 top-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 py-3 transition-opacity duration-300">
                        <h3 className="font-semibold truncate">
                          {video?.title ? video.title : "No Name"}
                        </h3>
                      </div>
                      <div className="absolute easy-transition flex-btn gap-2 bottom-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 py-3 transition-opacity duration-300">
                        <button
                          onClick={() => {
                            setPrivateVieoModel(true);
                            setPublicVideo(video);
                          }}
                          className={` aspect-square h-6 w-6 text-sm flex-colo transparent hover:cursor-pointer hover:bg-transparent border-[1px] rounded-md bg-main text-white`}
                        >
                          <GoEye />
                        </button>
                        <button
                          disabled={progress > 0 && progress < 100}
                          onClick={() => {
                            downloadVideo(video?.url, video?.title);
                          }}
                          className={` aspect-square h-6 w-6 text-sm flex-colo transparent hover:cursor-pointer hover:bg-transparent border-[1px] rounded-md bg-main text-white`}
                        >
                          <IoMdDownload />
                        </button>
                        <Link
                          href={`/user-videos/edit-video/${video?._id}`}
                          className={` aspect-square h-6 w-6 text-sm flex-colo transparent hover:cursor-pointer hover:bg-transparent border-[1px] rounded-md bg-main text-white`}
                        >
                          <FaEdit />
                        </Link>
                        <button
                          onClick={() => {
                            setShareModel(true);
                            setVideoId(video?._id);
                            setVideoTitle(video?.title);
                          }}
                          className={` aspect-square h-6 w-6 text-sm flex-colo transparent hover:cursor-pointer hover:bg-transparent border-[1px] rounded-md bg-main text-white`}
                        >
                          <FaShareAlt />
                        </button>
                        <button
                          onClick={() => deletePrivateVideo(video?._id)}
                          className={` aspect-square h-6 w-6 text-sm flex-colo transparent hover:cursor-pointer hover:bg-transparent border-[1px] rounded-md bg-main text-white`}
                        >
                          <MdDelete />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              );
            })
        ) : (
          <div className="w-full">
            <Empty message="No Videos Found" />
          </div>
        )}
      </div>
    </>
  );
};

export default Videos;
