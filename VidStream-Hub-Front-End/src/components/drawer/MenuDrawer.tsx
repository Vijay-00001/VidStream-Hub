import React from "react";
import MainDrawer from "./MainDrawer";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import { BsCollectionPlay } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BiPhoneCall } from "react-icons/bi";
import { FaFacebook, FaMedium, FaTelegram, FaYoutube } from "react-icons/fa";

const MenuDrawer = ({ drawerOpen, toggleDrawer }: any) => {
  const Links = [
    {
      name: "Home",
      link: "/",
      icon: BsCollectionPlay,
    },
    {
      name: "About Us",
      link: "/about-us",
      icon: HiOutlineUserGroup,
    },
    {
      name: "Contact",
      link: "/contact-us",
      icon: BiPhoneCall,
    },
  ];

  const LinkDatas = [
    {
      icon: FaFacebook,
      link: "https://www.facebook.com/",
    },
    {
      icon: FaMedium,
      link: "https://medium.com/",
    },
    {
      icon: FaTelegram,
      link: "https://telegram.com/",
    },
    {
      icon: FaYoutube,
      link: "https://www.youtube.com/",
    },
  ];

  return (
    <MainDrawer drawerOpen={drawerOpen} closeDrawer={toggleDrawer}>
      <div className="drawer-content">
        <div className="drawer-header">
          <h2 className="drawer-title">
            <Link onClick={toggleDrawer} href={"/"} className="drawer-logo">
              Logo
            </Link>
            <button
              onClick={toggleDrawer}
              type="button"
              className="drawer-close-btn"
            >
              <IoClose />
            </button>
          </h2>
        </div>
        <div className="drawer-links">
          <div className="drawer-main-links">
            {Links.map((link: any, index: any) => (
              <Link
                href={link.link}
                key={index}
                onClick={toggleDrawer}
                className="drawer-link"
              >
                <link.icon className="drawer-link-icon" />
                <span className="drawer-link-text">{link.name}</span>
              </Link>
            ))}
          </div>
          <div className="drawer-side-links">
            {LinkDatas.map((link: any, index: any) => (
              <Link
                href={link.link}
                key={index}
                onClick={toggleDrawer}
                className="drawer-side-link"
              >
                <link.icon className="drawer-side-link-icon" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </MainDrawer>

    //  <MainDrawer drawerOpen={drawerOpen} closeDrawer={toggleDrawer}>
    //    <div className="flex flex-col w-full h-full justify-between items-center bg-main text-white rounded">
    //      <div className="w-full flex-btn h-16 py-6 bg-dry">
    //        <h2 className="font-semibold text-lg m-0 flex items-center">
    //          <Link onClick={toggleDrawer} href={"/"}>
    //            {/* <img
    //              src="/images/logo.png"
    //              alt="logo"
    //              className="w-auto h-auto object-contain"
    //            /> */}
    //            Logo
    //          </Link>
    //          <button
    //            onClick={toggleDrawer}
    //            type="button"
    //            className="transitions w-10 h-10 flex-colo text-base text-subMain bg-white rounded-full"
    //          >
    //            <IoClose />
    //          </button>
    //        </h2>
    //      </div>
    //      <div className="w-full overflow-y-scroll flex-grow max-height-full">
    //        <div className="pb-12 pt-4">
    //          {Links.map((link: any, index: any) => (
    //            <Link href={link.link} key={index} onClick={toggleDrawer}>
    //              <link.icon className="w-8 h-8 text-subMain" />
    //              {link.name}
    //            </Link>
    //          ))}
    //        </div>
    //        <div className="flex-rows gap-6 w-full">
    //          {LinkDatas.map((link: any, index: any) => (
    //            <Link
    //              href={link.link}
    //              key={index}
    //              onClick={toggleDrawer}
    //              className="flex-colo w-12 aspect-square transitions hover:bg-subMain text-lg bg-white rounded bg-opacity-30"
    //            >
    //              <link.icon className="w-8 h-8 text-subMain" />
    //            </Link>
    //          ))}
    //        </div>
    //      </div>
    //    </div>
    //  </MainDrawer>
  );
};

export default MenuDrawer;
