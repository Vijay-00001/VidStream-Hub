"use client";
import { useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit, FaShareAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../notifications/Loader";
import { MdDelete } from "react-icons/md";
import { GoEye } from "react-icons/go";
import {
  GetAllPrivatePhotosAction,
  deletePhotoByIdAction,
} from "@/redux/actions/VideosActions";
import PrivateVideoInfo from "../modals/PrivateVideoInfo";
import { IoMdDownload } from "react-icons/io";
import { SidebarContext } from "@/context/DrawerContext";
import { DownloadVideo } from "@/context/Functionalities";
import FileSaver from "file-saver";
import {
  TypeOfContent,
  TypeOfDispatch,
  TypeOfPhoto,
  TypeOfState,
} from "@/Types";
import ShareModal from "../modals/ShareModal";
import { Empty } from "../notifications/Empty";
import Image from "next/image";
import Swal from "sweetalert2";

const Photos = () => {
  const dispatch = useDispatch<TypeOfDispatch>();
  const [privateMusicModel, setPrivateMusicModel] = useState<boolean>(false);
  const [shareModel, setShareModel] = useState<boolean>(false);
  const [publicPhoto, setPublicPhoto] = useState<string | TypeOfContent | null>(
    null
  );
  const [videoId, setVideoId] = useState<string | undefined>("");
  const [videoTitle, setVideoTitle] = useState("");
  const { progress, setProgress } = useContext<TypeOfState>(SidebarContext);

  const { isLoading, isError, privatePhotos } = useSelector(
    (state: TypeOfState) => state.getAllPrivatePhoto
  );

  // useEffect Call when any state change then re-render the component
  useEffect(() => {
    dispatch(GetAllPrivatePhotosAction());
    if (isError) {
      toast.error(isError);
      dispatch({ type: "USER_GET_ALL_PRIVATE_PHOTO_RESET" });
    }
  }, [dispatch, isError]);

  // Delete Private Video
  const deletePrivatePhoto = useCallback(
    (id: string | undefined) => {
      Swal.fire({
        title: "Are you sure?",
        text: "Are you sure you want to delete this photo?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deletePhotoByIdAction(id ? id : ""));
        }
      });
    },
    [dispatch]
  );

  // Download Video
  const downloadMusic = async (photoUrl: string, name: string) => {
    await DownloadVideo(photoUrl, setProgress).then((data) => {
      setProgress(0);
      FileSaver.saveAs(data, name);
    });
  };

  return (
    <>
      <PrivateVideoInfo
        modalOpen={privateMusicModel}
        setModalOpen={setPrivateMusicModel}
        video={publicPhoto}
        currentInfo="Photo"
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
        ) : privatePhotos?.length > 0 ? (
          privatePhotos?.map((photo: TypeOfContent, index: number) => {
            return (
              <div
                key={index}
                className="border border-border p-1 relative rounded overflow-hidden"
              >
                <div
                  className="w-full"
                  onClick={() => {
                    setPublicPhoto(photo.url);
                  }}
                >
                  <Image
                    src={photo?.url}
                    alt="photo"
                    height={500}
                    width={500}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div>
                  <div className="absolute easy-transition flex-btn gap-2 top-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 py-3 transition-opacity duration-300">
                    <h3 className="font-semibold truncate">
                      {photo?.title ? photo.title : "No Name"}
                    </h3>
                  </div>
                  <div className="absolute easy-transition flex-btn gap-2 bottom-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 py-3 transition-opacity duration-300">
                    <button
                      onClick={() => {
                        setPrivateMusicModel(true);
                        setPublicPhoto(photo);
                      }}
                      className={` aspect-square h-6 w-6 text-sm flex-colo transparent hover:cursor-pointer hover:bg-transparent border-[1px] rounded-md bg-main text-white`}
                    >
                      <GoEye />
                    </button>
                    <button
                      disabled={progress > 0 && progress < 100}
                      onClick={() => {
                        downloadMusic(photo?.url, photo?.title);
                      }}
                      className={` aspect-square h-6 w-6 text-sm flex-colo transparent hover:cursor-pointer hover:bg-transparent border-[1px] rounded-md bg-main text-white`}
                    >
                      <IoMdDownload />
                    </button>

                    <button
                      onClick={() => {
                        setShareModel(true);
                        setVideoId(photo?._id);
                        setVideoTitle(photo?.title);
                      }}
                      className={` aspect-square h-6 w-6 text-sm flex-colo transparent hover:cursor-pointer hover:bg-transparent border-[1px] rounded-md bg-main text-white`}
                    >
                      <FaShareAlt />
                    </button>
                    <button
                      onClick={() => deletePrivatePhoto(photo?._id)}
                      className={` aspect-square h-6 w-6 text-sm flex-colo transparent hover:cursor-pointer hover:bg-transparent border-[1px] rounded-md bg-main text-white`}
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="mt-6">
            <Empty message="It seem's like there's no photos" />
          </div>
        )}
      </div>
    </>
  );
};

export default Photos;
