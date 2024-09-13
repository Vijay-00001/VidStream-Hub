"use client";
import Filters from "@/components/Filters";
import Movie from "@/components/Movie";
import Loader from "@/components/notifications/Loader";
import { getAllMoviesAction } from "@/redux/actions/MovieActions";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { RiMovie2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";
import {
  LanguagesData,
  RateData,
  TimeData,
  YearData,
} from "@/data/Filters/FiltersData";
import { useSearchParams } from "next/navigation";
import { TypeOfCreateMovieInfo, TypeOfDispatch, TypeOfState } from "@/Types";

const ViewMovies = () => {
  const dispatch = useDispatch<TypeOfDispatch>();
  const search = useSearchParams()?.toString().replace("=", "");
  const [category, setCategory] = useState({ title: "All Categories" });
  const [year, setYear] = useState<TypeOfDispatch>(YearData[0]);
  const [time, setTime] = useState<TypeOfDispatch>(TimeData[0]);
  const [rate, setRate] = useState<TypeOfDispatch>(RateData[0]);
  const [language, setLanguage] = useState<TypeOfDispatch>(LanguagesData[0]);

  // Others CSS to used commanly.
  const sameClass =
    "text-white py-2 px-4 rounded font-semibold border-2 border-subMain cursor-pointer hover:bg-subMain";

  // Get All Movies
  const { isLoading, isError, movies, pages, page } = useSelector(
    (state: TypeOfState) => state.getAllMovies
  );

  // Here write the use quiries...
  const queries = useMemo(() => {
    const query = {
      category: category?.title === "All Categories" ? "" : category?.title,
      language: language?.title === "Filter By Language" ? "" : language?.title,
      year: year?.title.replace(/\D/g, ""),
      time: time?.title.replace(/\D/g, ""),
      rate: rate?.title.replace(/\D/g, ""),
      search: search ? search : "",
    };
    return query;
  }, [category, language, year, time, rate, search]);

  // All Categorys from the Redux store
  const { categories } = useSelector(
    (state: TypeOfState) => state.getAllCategory
  );

  // useEffect use when any state change then re-render the component.
  useEffect(() => {
    if (isError) {
      toast.error(isError);
    }
    dispatch(getAllMoviesAction(queries));
  }, [dispatch, isError, queries]);

  // Pagination Handeler
  const prevPage = () => {
    dispatch(
      getAllMoviesAction({ ...queries, pageNumber: `${Number(page) - 1}` })
    );
  };

  const nextPage = () => {
    dispatch(
      getAllMoviesAction({ ...queries, pageNumber: `${Number(page) + 1}` })
    );
  };

  const datas = {
    categories,
    category,
    setCategory,
    year,
    setYear,
    time,
    setTime,
    language,
    setLanguage,
    rate,
    setRate,
  };

  return (
    <div className="min-height-screen container mx-auto px-2 my-6">
      <Filters data={datas} />
      <p className="text-lg font-medium my-4">
        Total{" "}
        <span className="font-bold text-subMain">
          {movies ? movies.length : 0}
        </span>{" "}
        Items Found {search && `for ${search}`}
      </p>
      {/* Loading or Error */}
      {isLoading ? (
        <div className="w-full gap-6 flex-colo min-h-scrneen">
          <Loader />
        </div>
      ) : movies?.length > 0 ? (
        <>
          <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
            {movies?.map((movie: TypeOfCreateMovieInfo, index: number) => {
              return <Movie key={index} movie={movie} />;
            })}
          </div>
          <div className=" w-full flex-rows gap-6 md:my-20 my-10">
            <button
              disabled={Number(page) === 1}
              onClick={prevPage}
              className={sameClass}
            >
              <TbPlayerTrackPrev className="text-2xl" />
            </button>
            <button
              disabled={Number(page) === Number(pages)}
              onClick={nextPage}
              className={sameClass}
            >
              <TbPlayerTrackNext className="text-2xl" />
            </button>
          </div>
        </>
      ) : (
        <div className="w-full gap-6 flex-colo min-h-scrneen">
          <div className="w-24 h-24 p-5 rounded-full bg-main text-subMain text-4xl flex-colo">
            <RiMovie2Line />
          </div>
          <p className="text-border text-sm">
            It seem`&apos;s like we don&apos;t have any movie
          </p>
        </div>
      )}
    </div>
  );
};

export default ViewMovies;
