"use client";
import { Inputs } from "@/components/UserInput";
import Link from "next/link";
import { FiLogIn } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { LoginValidation } from "@/components/validation/UserValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { InlineError } from "@/components/notifications/Error";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { LoginAction } from "@/redux/actions/UserActions";
import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { TypeOfDispatch, TypeOfState, User } from "@/Types";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Image from "next/image";

const Login = () => {
  const dispatch = useDispatch<TypeOfDispatch>();
  const [userChoise, setUserChoise] = useState<string>("password");

  const { isLoading, isError, userInfo, isSuccess } = useSelector(
    (state: TypeOfState) => state.userLogin
  );

  // Validate User
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginValidation),
  });

  // onSubmit
  const onSubmit = useCallback(
    (data: User) => {
      dispatch(LoginAction(data));
    },
    [dispatch]
  );

  // UseEffect Hook
  useEffect(() => {
    if (isSuccess) {
      toast.success(`Welcome ${userInfo?.fullName}`);
    }
    if (isError) {
      toast.error(isError);
      dispatch({ type: "USER_LOGIN_RESET" });
    }
    if (userInfo?.isAdmin) {
      redirect("/dashboard");
    } else if (userInfo) {
      redirect("/dashboard/profile");
    }
  }, [isSuccess, isError, userInfo, dispatch]);

  return (
    <div className="container mx-auto px-2 my-24 flex-colo">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full 2xl:w-2/5 md:w-3/5 gap-8 p-8 sm:p-14 flex-colo bg-dry rounded-lg border border-border"
      >
        <Image
          src="/Main_VidStream_Hub_Logo.png"
          alt="Logo"
          width={200}
          height={200}
          className="w-full h-12 object-contain scale-[2]"
        />
        <div className="w-full ">
          <Inputs
            label="Email"
            placeholder="vidStream.hub@space.in"
            type="email"
            bg={true}
            name="username"
            value={userInfo?.email}
            register={register("username")}
          />
          {errors.username && <InlineError text={errors.username.message} />}
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
          type="submit"
          disabled={isLoading}
          className="bg-subMain hover:bg-main transitions flex-rows gap-4 text-white text-sm p-4 rounded-lg w-full"
        >
          {isLoading ? (
            <>
              <AiOutlineLoading3Quarters /> Loading...
            </>
          ) : (
            <>
              <FiLogIn /> Sign In
            </>
          )}
        </button>
        <p className="text-center text-border">
          Don&apos;t have an account?{" "}
          <Link
            href={"/auth/register"}
            className="text-dryGray font-semibold ml-2"
          >
            Sign Up
          </Link>
        </p>
        <p className="text-center text-border">
          Forgot password ?{" "}
          <Link
            href={"/auth/send-mail-forgot-password"}
            className="text-dryGray font-semibold ml-2"
          >
            click here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
