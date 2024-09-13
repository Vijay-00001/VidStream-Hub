import Sidebar from "@/components/Sidebar";
import Documents from "@/components/myspace/Documents";
import Musics from "@/components/myspace/Musics";
import Photos from "@/components/myspace/Photos";
import Videos from "@/components/myspace/Videos";

const UserSpace = () => {
  return (
    <Sidebar>
      <h2 className="text-xl font-bold">My Videos</h2>
      <Videos />
      <h2 className="mt-6 text-xl font-bold">My Music</h2>
      <Musics />
      <h2 className="mt-6 text-xl font-bold">My Photos</h2>
      <Photos />
      <h2 className="mt-6 text-xl font-bold">My Documents</h2>
      <Documents />
    </Sidebar>
  );
};

export default UserSpace;
