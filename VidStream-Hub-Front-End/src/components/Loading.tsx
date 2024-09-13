import HashLoader from "react-spinners/HashLoader";

const Loading = () => {
  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50 overflow-y-auto text-center justify-center align-middle w-screen h-screen z-20">
        {" "}
      </div>
      <div className="fixed inset-0 w-full h-full flex-colo z-40">
        <HashLoader color="#F20000" size={100} />
      </div>
    </>
  );
};

export default Loading;
