"use client";
import { TypeOfState } from "@/Types";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

const Footer = () => {
  const { userInfo } = useSelector((state: TypeOfState) => state.userLogin);
  const Links = [
    {
      title: "Company",
      links: [
        {
          name: "Home",
          link: "/",
        },
        {
          name: "About Us",
          link: "/about-us",
        },
        {
          name: "Contact Us",
          link: "/contact-us",
        },
        {
          name: "Movies",
          link: "/movies",
        },
      ],
    },
    {
      title: "Top Categories",
      links: [
        {
          name: "Action",
          link: "/movies",
        },
        {
          name: "Romantic",
          link: "/movies",
        },
        {
          name: "Drama",
          link: "/movies",
        },
        {
          name: "Historical",
          link: "/movies",
        },
      ],
    },
    {
      title: "My Account",
      links: [
        {
          name: userInfo?.isAdmin
            ? "Dashboard"
            : userInfo
            ? "Profile"
            : "login", //Dashboard",
          link: userInfo?.isAdmin
            ? "/dashboard"
            : userInfo
            ? "/dashboard/profile"
            : "/auth/login",
        },
        {
          name: "My Favorites",
          link: "/movies/favorites",
        },
        {
          name: "Profile",
          link: "/dashboard/profile",
        },
        {
          name: "Change Password",
          link: "/auth/change-password",
        },
      ],
    },
  ];
  return (
    <>
      <div className="bg-dry py-4 border=t-2 border-black">
        <div className="container mx-auto px-2">
          <div className="grid grid-cols-2 md:grid-cols-7 xl:grid-cols-12 gap-5 sm:gap-9 lg:gap-11 xl:gap-7 py-10 justify-between">
            {Links.map((link, index) => (
              <div
                key={index}
                className="col-span-1 md:col-span-2 lg:col-span-3 pb-3.5 sm:pb-0"
              >
                <h3 className="text-md lg:leading-7 font-medium mb-4 sm:mb-5 lg:mb-6 pb-0.5">
                  {link.title}
                </h3>
                <ul className="text-sm flex flex-col space-y-3">
                  {link.links.map((link, index) => (
                    <li key={index} className="flex  items-baseline">
                      <Link
                        href={link.link}
                        className="text-border inline-block w-full hover:text-subMain"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className=" pb-3.5 sm:pb-0 col-span-1 md:col-span-2 lg:col-span-3">
              <Link href={"/"}>
                <Image
                  src="/Main_VidStream_Hub_Logo.png"
                  alt="logo"
                  width={200}
                  height={200}
                  className="w-2/4 object-contain h-12 scale-[1.3]"
                />
              </Link>
              <p className="leading-7 text-sm text-border mt-3 overflow-hidden">
                <span>
                  408, 4th Floor, Luxurious tower,
                  <br /> Airport Road, Surat, Gujarat
                </span>
                <br />
                <span className="text-border">Tell : +1 (800) 123 456 789</span>
                <br />
                <span>Email : vertualspace@owner.com</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
