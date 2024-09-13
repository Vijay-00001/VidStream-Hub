import Image from "next/image";
import Link from "next/link";
import { BiHomeAlt } from "react-icons/bi";

const NotFound = () => {
  return (
    <div className="flex-colo w-full min-h-screen text-white bg-main lg:py-20 py-10 px-6 ">
      <Image
        src="https://png.pngtree.com/background/20210712/original/pngtree-error-page-not-found-404-background-picture-image_1177786.jpg"
        alt="404"
        width={500}
        height={500}
        className="w-full h-96 object-contain"
      />
      <p className="font-medium italic text-border leading-6">
        The page you are looking for dose not exist. You may have mistyped the
        URL.
      </p>
      <Link
        className="bg-subMain mt-4 text-white flex-rows gap-4 font-medium py-3 px-4 rounded-md hover:bg-main transitions hover:border-2 hover:border-subMain"
        href={"/"}
      >
        <BiHomeAlt /> Back To Home
      </Link>
    </div>
  );
};

export default NotFound;
