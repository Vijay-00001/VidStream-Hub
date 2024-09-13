import PuffLoader from "react-spinners/PuffLoader";

const Loader = () => {
  return (
    <div className="w-full py-4 px-2 flex-colo">
      <PuffLoader color="#F20000" />
    </div>
  );
};

export default Loader;
