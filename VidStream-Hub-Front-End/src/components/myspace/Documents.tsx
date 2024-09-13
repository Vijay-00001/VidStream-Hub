"use client";
import { useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaShareAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../notifications/Loader";
import { MdDelete } from "react-icons/md";
import {
  deleteDocumentsByIdAction,
  getAllPrivateDocumentAction,
} from "@/redux/actions/VideosActions";
import { IoMdDownload } from "react-icons/io";
import { SidebarContext } from "@/context/DrawerContext";
import { DownloadVideo } from "@/context/Functionalities";
import FileSaver from "file-saver";
import { TypeOfContent, TypeOfDispatch, TypeOfState } from "@/Types";
import ShareModal from "../modals/ShareModal";
import { Empty } from "../notifications/Empty";
import Swal from "sweetalert2";

const Documents = () => {
  const dispatch = useDispatch<TypeOfDispatch>();
  const [shareModel, setShareModel] = useState<boolean>(false);

  const [videoId, setVideoId] = useState<string | undefined>("");
  const [videoTitle, setVideoTitle] = useState("");
  const { progress, setProgress } = useContext<TypeOfState>(SidebarContext);

  const { isLoading, isError, privateDocuments } = useSelector(
    (state: TypeOfState) => state.getAllPrivateDocument
  );

  // useEffect Call when any state change then re-render the component
  useEffect(() => {
    dispatch(getAllPrivateDocumentAction());
    if (isError) {
      toast.error(isError);
      dispatch({ type: "USER_GET_ALL_PRIVATE_DOCUMENT_RESET" });
    }
  }, [dispatch, isError]);

  // Delete Private Video
  const deletePrivateDocument = useCallback(
    (id: string | undefined) => {
      Swal.fire({
        title: "Are you sure?",
        text: "Are you sure you want to delete this document?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteDocumentsByIdAction(id ? id : ""));
        }
      });
    },
    [dispatch]
  );

  // Download Video
  const downloadDocument = async (docUrl: string, name: string) => {
    await DownloadVideo(docUrl, setProgress).then((data) => {
      setProgress(0);
      FileSaver.saveAs(data, name);
    });
  };

  return (
    <>
      <ShareModal
        modalOpen={shareModel}
        setModalOpen={setShareModel}
        movie_id={videoId}
        movie_title={videoTitle}
      />

      <div className="sm:mt-12 mt-1 w-full">
        {isLoading ? (
          <Loader />
        ) : privateDocuments?.length > 0 ? (
          privateDocuments?.map((document: TypeOfContent, index: number) => {
            return (
              <div
                key={index}
                className="border border-border p-1 flex flex-row justify-between relative rounded overflow-hidden"
              >
                <div className="flex-btn gap-2 top-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 py-3 transition-opacity duration-300">
                  <h3 className="font-semibold truncate">
                    {document?.title ? document.title : "No Name"}
                  </h3>
                </div>
                <div className="flex-btn gap-2 bottom-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 py-3 transition-opacity duration-300">
                  <button
                    disabled={progress > 0 && progress < 100}
                    onClick={() => {
                      downloadDocument(document?.url, document?.title);
                    }}
                    className={` aspect-square h-6 w-6 text-sm flex-colo transparent hover:cursor-pointer hover:bg-transparent border-[1px] rounded-md bg-main text-white`}
                  >
                    <IoMdDownload />
                  </button>
                  {/* <Link
                      href={`/user-videos/edit-document/${document?._id}`}
                      className={` aspect-square h-6 w-6 text-sm flex-colo transparent hover:cursor-pointer hover:bg-transparent border-[1px] rounded-md bg-main text-white`}
                    >
                      <FaEdit />
                    </Link> */}
                  <button
                    onClick={() => {
                      setShareModel(true);
                      setVideoId(document?._id);
                      setVideoTitle(document?.title);
                    }}
                    className={`aspect-square h-6 w-6 text-sm flex-colo transparent hover:cursor-pointer hover:bg-transparent border-[1px] rounded-md bg-main text-white`}
                  >
                    <FaShareAlt />
                  </button>
                  <button
                    onClick={() => deletePrivateDocument(document?._id)}
                    className={`aspect-square h-6 w-6 text-sm flex-colo transparent hover:cursor-pointer hover:bg-transparent border-[1px] rounded-md bg-main text-white`}
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="mt-6">
            <Empty message="It seem's like there's no documents" />
          </div>
        )}
      </div>
    </>
  );
};

export default Documents;
