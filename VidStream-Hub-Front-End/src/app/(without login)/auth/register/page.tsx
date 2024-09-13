"use client";
import Link from "next/link";
import { TypeOfDispatch, TypeOfState, User } from "@/Types";
import { Inputs } from "@/components/UserInput";
import { InlineError } from "@/components/notifications/Error";
import { RegisterValidation } from "@/components/validation/UserValidation";
import { RegisterAction } from "@/redux/actions/UserActions";
import { yupResolver } from "@hookform/resolvers/yup";
import { redirect } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiLogIn } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Image from "next/image";

const Register = () => {
  const dispatch = useDispatch<TypeOfDispatch>();
  const [userChoise, setUserChoise] = useState<string>("password");

  const { isLoading, isError, userInfo, isSuccess } = useSelector(
    (state: TypeOfState) => state.userRegister
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterValidation),
  });

  const onSubmit = useCallback(
    (data: User) => {
      dispatch(RegisterAction(data));
    },
    [dispatch]
  );

  useEffect(() => {
    if (userInfo) {
      redirect("/auth/login");
    }
    if (isSuccess) {
      toast.success(`${userInfo?.fullName} Register Successfully`);
      dispatch({ type: "USER_REGISTER_RESET" });
    }
    if (isError) {
      toast.error(isError);
      dispatch({ type: "USER_REGISTER_RESET" });
    }
  }, [isSuccess, isError, userInfo, dispatch]);

  return (
    <div className="container mx-auto px-2 my-24 flex-colo">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full 2xl:w-2/5 md:w-3/5 gap-8 p-8 sm:p-14 flex-colo bg-dry rounded-lg border border-border "
      >
        <Image
          src="/Main_VidStream_Hub_Logo.png"
          alt="Logo"
          width={200}
          height={200}
          className="w-full h-12 object-contain scale-[2]"
        />
        <div className="w-full">
          <Inputs
            label="Full Name"
            placeholder="VidStream Hub"
            type="text"
            bg={true}
            name="fullName"
            value={userInfo?.fullName}
            register={register("fullName")}
          />
          {errors.fullName && <InlineError text={errors.fullName.message} />}
        </div>
        <div className="w-full">
          <Inputs
            label="Email"
            name="email"
            register={register("email")}
            value={userInfo?.email}
            placeholder="vidStream.hub@space.in"
            type="email"
            bg={true}
          />
          {errors.email && <InlineError text={errors.email.message} />}
        </div>
        <div className="w-full">
          <div className="relative text-white">
            <Inputs
              label="Password"
              placeholder="********"
              type={userChoise}
              bg={true}
              name="password"
              value={userInfo?.password}
              register={register("password")}
            />
            {userChoise === "password" ? (
              <button
                type="button"
                onClick={() => setUserChoise("text")}
                className="absolute bg-main right-3 top-9 bottom-0 m-3 text-2xl cursor-pointer"
              >
                <FaRegEyeSlash />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setUserChoise("password")}
                className="absolute right-3 top-9 bottom-0 m-3 text-2xl cursor-pointer"
              >
                <FaRegEye />
              </button>
            )}
          </div>
          {errors.password && <InlineError text={errors.password.message} />}
        </div>
        <button
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
          type="submit"
          className="bg-subMain hover:bg-main transitions flex-rows gap-4 text-white text-sm p-4 rounded-lg w-full"
        >
          {isLoading ? (
            <>
              <AiOutlineLoading3Quarters /> Loading...
            </>
          ) : (
            <>
              <FiLogIn /> Sign Up
            </>
          )}
        </button>
        <p className="text-center text-border">
          Already have an account?{" "}
          <Link
            href={"/auth/login"}
            className="text-dryGray font-semibold ml-2"
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
