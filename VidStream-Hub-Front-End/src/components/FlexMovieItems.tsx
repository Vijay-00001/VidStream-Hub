import { FaRegCalendarAlt } from "react-icons/fa";
import { BiTime } from "react-icons/bi";
import { TypeOfCreateMovieInfo } from "@/Types";

const FlexMovieItems = ({
  movie,
}: {
  movie: TypeOfCreateMovieInfo | undefined;
}) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">
          {movie?.movie_catagory ? movie?.movie_catagory : "Category"}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <FaRegCalendarAlt className="text-subMain w-3 h-3" />
        <span className="text-sm font-medium">
          {movie?.movie_year ? movie?.movie_year : "Year"}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <BiTime className="text-subMain w-3 h-3" />
        <span className="text-sm font-medium">
          {movie?.movie_time_duration ? movie?.movie_time_duration : "Time"} hr
        </span>
      </div>
    </>
  );
};

export default FlexMovieItems;
