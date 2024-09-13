"use client";
import Link from "next/link";
import { FaSearch, FaHeart } from "react-icons/fa";
import { CgUser } from "react-icons/cg";
import { useSelector } from "react-redux";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { TypeOfState } from "@/Types";
import Image from "next/image";

interface HoverProps {
  isActive: boolean;
}

const Navbar = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  // Get User Info from the Redux store
  const { userInfo } = useSelector(
    (state: TypeOfState) =>
      state.userLogin || state.userRegister || state.userProfileUpdate
  );

  // Get All Liked Movies from the Redux store
  const { likedMovies } = useSelector(
    (state: TypeOfState) => state.userGetAllFavorites
  );

  // If current State is active of not is given style.
  const Hover = ({ isActive }: HoverProps) =>
    isActive ? "text-subMain" : "hover:text-subMain transitions text-white";

  const handleSearch = useCallback(
    (e: any) => {
      e.preventDefault();
      if (search.trim() !== "") {
        setSearch(search);
        router.push(`/movies?${search.trim()}`);
      } else {
        router.push("/movies");
      }
    },
    [router, search]
  );

  return (
    <>
      <div className="bg-main shadow-md sticky top-0 z-30">
        <div className="container mx-auto py-6 px-2 lg:grid gap-10 grid-cols-7 justify-between items-center">
          {/* Logo */}
          <div className="col-span-1 lg:block hidden">
            <Link href="/">
              <Image
                src="/Main_VidStream_Hub_Logo.png"
                alt="logo"
                width={200}
                height={200}
                className="w-full h-12 object-contain scale-[1.3]"
              />
            </Link>
          </div>
          {/* Search Bar */}
          <div className="col-span-3">
            <form
              onSubmit={handleSearch}
              className="w-full text-sm bg-dryGray rounded flex-btn gap-4"
            >
              <button
                type="submit"
                className="bg-subMain w-12 flex-colo h-12 rounded text-white"
              >
                <FaSearch />
              </button>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Movie Name From here"
                className="font-medium placeholder:text-border text-sm w-11/12 h-12 bg-transparent border-none px-2 text-black"
              />
            </form>
          </div>
          {/* menus */}
          <div className="col-span-3 font-medium text-sm hidden xl:gap-14 2xl:gap-20 justify-between lg:flex xl:justify-end items-center">
            <Link href={"/movies"} className={Hover({ isActive: false })}>
              Movies
            </Link>
            <Link href={"/about-us"} className={Hover({ isActive: false })}>
              About Us
            </Link>
            <Link href={"/contact-us"} className={Hover({ isActive: false })}>
              Contact Us
            </Link>
            <Link
              href={
                userInfo?.isAdmin
                  ? "/dashboard"
                  : userInfo
                  ? "/dashboard/profile"
                  : "/auth/login"
              }
              className={Hover({ isActive: false })}
            >
              {userInfo ? (
                <Image
                  src={userInfo?.image ? userInfo?.image : "/profile.png"}
                  alt={userInfo?.fullName}
                  width={40}
                  height={40}
                  className="w-8 h-8 rounded-full border border-subMain object-cover"
                />
              ) : (
                <CgUser className="w-8 h-8" />
              )}
            </Link>
            <Link
              href={"/movies/favorites"}
              className={`${Hover({ isActive: false })} relative`}
            >
              <FaHeart className="w-6 h-6" />
              {likedMovies?.length > 0 && (
                <div className="w-4 h-4 flex-colo bg-subMain rounded-full text-xs text-white absolute -top-2 -right-2">
                  {likedMovies?.length}
                </div>
              )}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
