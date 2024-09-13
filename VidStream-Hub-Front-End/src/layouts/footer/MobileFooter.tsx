"use client";
import { TypeOfState } from "@/Types";
import MenuDrawer from "@/components/drawer/MenuDrawer";
import { SidebarContext } from "@/context/DrawerContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { BiHome } from "react-icons/bi";
import { BsCollectionPlay } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { FiUserCheck } from "react-icons/fi";
import { useSelector } from "react-redux";

const MobileFooter = () => {
  const pathname = usePathname();

  // Get Mobile Drawer State from the Context
  const { mobileDrawer, toggleDrawer } =
    useContext<TypeOfState>(SidebarContext);

  // Get Liked Movies from the Redux store
  const { likedMovies } = useSelector(
    (state: TypeOfState) => state.userGetAllFavorites
  );

  // Get User Info from the Redux store
  const { userInfo } = useSelector(
    (state: TypeOfState) => state.userLogin || state.userRegister
  );

  return (
    <>
      <div className="bg-white flelx flex-col h-full justify-between align-middle  rounded cursor-pointer overflow-y-scroll flex-grow w-full">
        {/* Drawer */}
        <MenuDrawer drawerOpen={mobileDrawer} toggleDrawer={toggleDrawer} />
      </div>
      <footer className="lg:hidden fixed z-50 bottom-0 w-full p-1">
        <div className="bg-dry rounded-md flex-btn w-full p-1">
          <Link
            href={"/"}
            className={`${
              pathname === "/" ? "bg-white text-subMain transitions" : ""
            }
            hover:bg-white hover:text-main text-2xl rounded-md transitions flex-colo  items-center px-4 py-3`}
          >
            <BiHome />
          </Link>
          <Link
            href={"/movies"}
            className={`${
              pathname === "/movies" ? "bg-white text-subMain transitions" : ""
            }
            hover:bg-white hover:text-main text-2xl rounded-md transitions flex-colo  items-center px-4 py-3`}
          >
            <BsCollectionPlay />
          </Link>
          <Link
            href={"/movies/favorites"}
            className={`${
              pathname === "/movies/favorites"
                ? "bg-white text-subMain transitions"
                : "text-white"
            }
            hover:bg-white hover:text-main text-2xl rounded-md transitions flex-colo  items-center px-4 py-3 relative`}
          >
            {likedMovies && likedMovies?.length > 0 && (
              <div className="w-4 h-4 flex-colo bg-subMain rounded-full text-xs text-white absolute top-[2px] right-[10px]">
                {likedMovies?.length}
              </div>
            )}
            <FaHeart />
          </Link>
          <Link
            href={
              userInfo
                ? userInfo?.isAdmin
                  ? "/dashboard"
                  : "/dashboard/profile"
                : "/auth/login"
            }
            className={`${
              pathname === "/auth/login" ||
              pathname === "/dashboard/profile" ||
              pathname === "/dashboard"
                ? "bg-white text-subMain transitions"
                : "text-white"
            }
            hover:bg-white hover:text-main text-2xl rounded-md transitions flex-colo  items-center px-4 py-3`}
          >
            <FiUserCheck />
          </Link>
        </div>
      </footer>
    </>
  );
};

export default MobileFooter;
