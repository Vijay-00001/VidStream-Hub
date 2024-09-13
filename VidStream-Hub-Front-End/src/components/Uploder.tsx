"use client";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import Loader from "./notifications/Loader";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  uploadImageService,
  uploadVideoService,
} from "@/redux/apis/ImageUploadServices";

const MySwal = withReactContent(Swal);

const supportedFormatsForImages = ["svg", "png", "jpg", "jpeg", "gif"];
const maxFileSize = 1048576000; // 10 MB in bytes
const minFileSize = 1024; // 1 KB in bytes

export const Uploder = ({
  setImageUrl,
  token,
}: {
  setImageUrl?: string | any;
  token?: string | any;
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  // Upload file
  const onDrop = useCallback(
    async (acceptedFiles: any) => {
      const file = acceptedFiles[0];

      // Check if file format is supported
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      if (
        !fileExtension ||
        !supportedFormatsForImages.includes(fileExtension)
      ) {
        MySwal.fire({
          icon: "error",
          title: "Unsupported file format!",
          text: `Supported formats are: ${supportedFormatsForImages.join(
            ", "
          )}`,
        });
        return;
      }

      // Check file size
      const fileSize = file.size;
      if (fileSize > maxFileSize || fileSize < minFileSize) {
        MySwal.fire({
          icon: "error",
          title: "Invalid file size",
          text: "File size should be between 1 KB and 10 MB.",
        });
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      const data = await uploadImageService(formData, setLoading, token);
      setImageUrl(data);
    },
    [setImageUrl, token]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      multiple: false,
      onDrop,
    });

  return (
    <div className="w-full text-center flex-colo gap-6">
      {loading ? (
        <div className="px-6 w-full py-8 border-2 border-border border-dash bg-dry rounded-md">
          <Loader />
        </div>
      ) : (
        <div
          {...getRootProps()}
          className="px-6 w-full pt-5 pb-6 border-2 border-border border-dashed bg-main rounded-md cursor-pointer"
        >
          <input {...getInputProps()} />
          <span className="mx-auto flex-colo text-subMain text-3xl">
            <FiUploadCloud />
          </span>
          <p className="text-sm mt-2">Drag and drop your files here</p>
          <em className="text-xs text-border">
            {isDragActive
              ? "Drop it like it's hot!"
              : isDragReject
              ? "Unsupported File type..."
              : `(only ${supportedFormatsForImages.join(
                  ", "
                )} files are allowed)`}
          </em>
        </div>
      )}
    </div>
  );
};

const supportedFormats: any = {
  documents: ["pdf", "doc", "docx"],
  photos: ["jpg", "jpeg", "png", "gif"],
  music: ["mp3", "wav", "ogg"],
  video: ["mkv", "mp4"],
};

export const VideoUploader = ({
  setVideoUrl,
  token,
  currentPage,
}: {
  setVideoUrl?: string | any;
  token?: string | any;
  currentPage?: string | any;
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  // Upload file
  const onDrop = useCallback(
    async (acceptedFiles: any) => {
      const file = new FormData();
      file.append("file", acceptedFiles[0]);

      // Check if file format is supported for the current page
      const fileExtension = acceptedFiles[0].name
        .split(".")
        .pop()
        ?.toLowerCase();
      if (
        !fileExtension ||
        !supportedFormats[currentPage]?.includes(fileExtension)
      ) {
        MySwal.fire({
          icon: "error",
          title: "Unsupported file format!",
          text: `Supported formats for ${currentPage} are: ${supportedFormats[
            currentPage
          ]?.join(", ")}`,
        });
        return;
      }

      // Check file size
      const fileSize = acceptedFiles[0].size;
      if (fileSize > maxFileSize || fileSize < minFileSize) {
        MySwal.fire({
          icon: "error",
          title: "Invalid file size",
          text: "File size should be between 1 KB and 100 MB.",
        });
        return;
      }

      const data = await uploadVideoService(file, setLoading, token);
      setVideoUrl(data);
    },
    [setVideoUrl, currentPage, token]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      multiple: false,
      onDrop,
    });

  return (
    <div className="w-full text-center flex-colo gap-6">
      {loading ? (
        <div className="px-6 w-full py-8 border-2 border-border border-dash bg-dry rounded-md">
          <Loader />
        </div>
      ) : (
        <div
          {...getRootProps()}
          className="px-6 w-full pt-5 pb-6 border-2 border-border border-dashed bg-main rounded-md cursor-pointer"
        >
          <input {...getInputProps()} />
          <span className="mx-auto flex-colo text-subMain text-3xl">
            <FiUploadCloud />
          </span>
          <p className="text-sm mt-2">Drag and drop your {currentPage} here</p>
          <em className="text-xs text-border">
            {isDragActive
              ? "Drop it like it's hot !"
              : isDragReject
              ? "Unsupported File type ..."
              : `(only ${supportedFormats[currentPage]} files are allowed)`}
          </em>
        </div>
      )}
    </div>
  );
};
