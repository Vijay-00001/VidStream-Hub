"use client";
import Aos from "aos";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { BsFillGridFill } from "react-icons/bs";
import { FaHeart, FaListAlt, FaUsers } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { HiViewGridAdd } from "react-icons/hi";
import { TiCloudStorage } from "react-icons/ti";
import {
  RiLockPasswordLine,
  RiLogoutCircleLine,
  RiMovie2Fill,
  RiVideoAddFill,
} from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { LogoutAction } from "@/redux/actions/UserActions";
import { TypeOfDispatch, TypeOfState } from "@/Types";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Sidebar: any = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();
  const dispatch = useDispatch<TypeOfDispatch>();
  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const { userInfo } = useSelector((state: TypeOfState) => state.userLogin);

  // Logout User Handalar
  const logoutHandler = useCallback(() => {
    MySwal.fire({
      title: "Are you sure?",
      text: "Do you really want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log out!",
      cancelButtonText: "No, stay logged in",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(LogoutAction());
        dispatch({ type: "USER_LOGOUT" });
        router.push("/auth/login");
      }
    });
  }, [router, dispatch, MySwal]);
  // UseEffect Hook
  useEffect(() => {
    Aos.init(); // Initialize AOS when component mounts
  }, []);
  const SideLinks = userInfo?.isAdmin
    ? [
        {
          title: "Dashboard",
          link: "/dashboard",
          icon: BsFillGridFill,
        },
        {
          title: "Movies List",
          link: "/movies/movies-list",
          icon: FaListAlt,
        },
        {
          title: "Add Movie",
          link: "/movies/add-movie",
          icon: RiMovie2Fill,
        },
        {
          title: "Categories",
          link: "/movies/categories",
          icon: HiViewGridAdd,
        },
        {
          title: "Users",
          link: "/dashboard/users",
          icon: FaUsers,
        },
        {
          title: "Update Profile",
          link: "/dashboard/profile",
          icon: FiSettings,
        },
        {
          title: "Favorites Movies",
          link: "/movies/favorites",
          icon: FaHeart,
        },
        {
          title: "Change Password",
          link: "/auth/change-password",
          icon: RiLockPasswordLine,
        },
      ]
    : userInfo
    ? [
        {
          title: "Update Profile",
          link: "/dashboard/profile",
          icon: FiSettings,
        },
        {
          title: "Favorites Movies",
          link: "/movies/favorites",
          icon: FaHeart,
        },
        {
          title: "Change Password",
          link: "/auth/change-password",
          icon: RiLockPasswordLine,
        },
        {
          title: "Subscriptions",
          link: "/dashboard/subscriptions",
          icon: FaListAlt,
        },
      ]
    : [];
  return (
    <div className="min-h-screen container mx-auto px-2">
      <div className="xl:grid grid-cols-8 gap-10 items-start md:py-12 py-6">
        <div className="col-span-2 sticky bg-dry border border-gray-800 p-6 rounded-md xl:mb-0 mb-5">
          {SideLinks.map((link, index) => (
            <Link
              href={link.link}
              key={index}
              className={`
              ${
                pathname === link.link
                  ? "bg-dryGray text-subMain transitions"
                  : "hover:text-subMain hover:bg-main"
              }
              rounded font-medium text-sm transitions flex gap-3 items-center p-4`}
            >
              <link.icon className="" />
              <p>{link.title}</p>
            </Link>
          ))}
          <Link
            href={"/user-videos/new-video"}
            className={`
              ${
                pathname === "/user-videos/new-video"
                  ? "bg-dryGray text-subMain transitions"
                  : "hover:text-subMain hover:bg-main"
              }
              rounded font-medium text-sm transitions flex gap-3 items-center p-4`}
          >
            <RiVideoAddFill />
            <p>Add Content</p>
          </Link>
          <Link
            href={"/dashboard/my-space"}
            className={`
              ${
                pathname === "/dashboard/my-space"
                  ? "bg-dryGray text-subMain transitions"
                  : "hover:text-subMain hover:bg-main"
              }
              rounded font-medium text-sm transitions flex gap-3 items-center p-4`}
          >
            <TiCloudStorage />
            <p>My Space</p>
          </Link>

          <button
            onClick={logoutHandler}
            className="rounded font-medium text-sm transitions flex gap-3 items-center p-4 hover:text-subMain hover:bg-main"
          >
            <RiLogoutCircleLine /> Logout
          </button>
        </div>
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="10"
          data-aos-offset="200"
          className="col-span-6 rounded-md bg-dry border border-gray-800 p-6 lg:h-[521px] lg:overflow-auto"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
