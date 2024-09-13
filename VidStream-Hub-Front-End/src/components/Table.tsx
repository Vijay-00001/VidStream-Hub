import { TypeOfCreateMovieInfo } from "@/Types";
import Image from "next/image";
import Link from "next/link";
import { FaCloudDownloadAlt, FaEdit } from "react-icons/fa";
import { GoEye } from "react-icons/go";
import { MdDelete } from "react-icons/md";

const text = "text-sm text-left leading-6 whitespace-nowrap px-5 py-3";

//Table Rows
const Rows: any = ({
  movie,
  index,
  admin,
  onDeleteHandeler,
  downloadVideo,
  progress,
}: {
  movie: TypeOfCreateMovieInfo | any;
  index: number;
  admin: boolean;
  onDeleteHandeler?: any;
  downloadVideo?: any;
  progress: number;
}) => {
  return (
    <tr key={index}>
      <td className={`${text}`}>
        <div className="w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden">
          <Image
            src={
              movie?.movie_thumbnail_image
                ? movie.movie_thumbnail_image
                : "https://images.pexels.com/photos/1595655/pexels-photo-1595655.jpeg?cs=srgb&dl=pexels-vlad-che%C8%9Ban-1595655.jpg&fm=jpg"
            }
            alt={movie?.movie_title}
            height={500}
            width={500}
            className="h-full w-full object-cover"
          />
        </div>
      </td>
      <td className={`${text} truncate`}>
        {movie?.movie_title ? movie.movie_title : "N/A"}
      </td>
      <td className={`${text}`}>
        {movie?.movie_catagory ? movie.movie_catagory : "N/A"}
      </td>
      <td className={`${text}`}>{movie?.movie_language}</td>
      <td className={`${text}`}>{movie?.movie_year}</td>
      <td className={`${text}`}>{movie?.movie_time_duration}</td>
      <td className={`${text} float-right flex-rows gap-2`}>
        {admin ? (
          <>
            <Link
              href={`/movies/edit-movie/${movie?._id}`}
              className="border border-border bg-dry flex-rows gap-2 text-border rounded px-2 py-1"
            >
              Edit <FaEdit className="text-green-500" />
            </Link>
            <button
              onClick={() => onDeleteHandeler(movie?._id)}
              className="bg-subMain text-white rounded flex-colo w-6 h-6"
            >
              <MdDelete />
            </button>
          </>
        ) : (
          <>
            <button
              disabled={progress > 0 && progress < 100}
              onClick={() =>
                downloadVideo(movie?.movie_video_url, movie?.movie_title)
              }
              className="border border-border bg-dry flex-rows gap-2 text-border rounded px-2 py-1"
            >
              Download <FaCloudDownloadAlt className="text-green-500" />
            </button>
            <Link
              href={`/movies/single-movie-info/${movie?._id}`}
              className="bg-subMain text-white rounded flex-colo w-6 h-6"
            >
              <GoEye />
            </Link>
            <button
              onClick={() => onDeleteHandeler(movie?._id)}
              className="bg-subMain text-white rounded flex-colo w-6 h-6"
            >
              <MdDelete />
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

// Table Components
const Table = ({
  data,
  admin,
  onDeleteHandeler,
  downloadVideo,
  progress,
}: {
  data?: any;
  admin: boolean;
  onDeleteHandeler?: any;
  downloadVideo?: any;
  progress?: number;
}) => {
  return (
    <div className="overflow-x-scroll overflow-y-auto relative w-full">
      <table className="w-full table-auto border border-border divide-y divide-border">
        <thead>
          <tr className="bg-dryGray">
            <th
              scope="col"
              className="px-6 py-2 text-left text-xs text-main font-semibold uppercase"
            >
              Image
            </th>
            <th
              scope="col"
              className="px-6 py-2 text-left text-xs text-main font-semibold uppercase"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-2 text-left text-xs text-main font-semibold uppercase"
            >
              Category
            </th>
            <th
              scope="col"
              className="px-6 py-2 text-left text-xs text-main font-semibold uppercase"
            >
              Language
            </th>
            <th
              scope="col"
              className="px-6 py-2 text-left text-xs text-main font-semibold uppercase"
            >
              Year
            </th>
            <th
              scope="col"
              className="px-6 py-2 text-left text-xs text-main font-semibold uppercase"
            >
              Hours
            </th>
            <th
              scope="col"
              className="px-6 py-2 text-xs text-main font-semibold uppercase text-end"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-main divide-y divide-gray-800">
          {data.map((movie: any, index: number) => (
            <Rows
              key={index}
              movie={movie}
              admin={admin}
              onDeleteHandeler={onDeleteHandeler}
              downloadVideo={downloadVideo}
              progress={progress}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
