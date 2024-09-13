"use client";
import Sidebar from "@/components/Sidebar";
import React from "react";
import { Passwords, TypeOfDispatch, TypeOfState, User } from "@/Types";
import { Inputs } from "@/components/UserInput";
import { InlineError } from "@/components/notifications/Error";
import { ChangePasswordValidation } from "@/components/validation/UserValidation";
import { ChangePasswordAction } from "@/redux/actions/UserActions";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
// import Password from "@/screens/dashboard/Password";

const ChangePassword = () => {
  const dispatch = useDispatch<TypeOfDispatch>();
  const route = useRouter();

  // Fetch the state from redux
  const { isLoading, isError, message, isSuccess } = useSelector(
    (state: TypeOfState) => state.userChangePassword
  );

  // React-form-hook to handle the form data
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(ChangePasswordValidation),
  });

  // On Submit To send the data to the backend
  const onSubmit = (data: Passwords) => {
    dispatch(ChangePasswordAction(data));
  };

  // UseEffect Hook call when the redux state and other properties change
  useEffect(() => {
    if (isSuccess) {
      dispatch({ type: "USER_CHANGE_PASSWORD_RESET" });
    }
    if (isError) {
      toast.error(isError);
      dispatch({ type: "USER_CHANGE_PASSWORD_RESET" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "USER_CHANGE_PASSWORD_RESET" });
    }
  }, [isSuccess, isError, message, dispatch, route, reset]);

  return (
    <Sidebar>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Change Password</h2>

        <div className="w-full">
          <Inputs
            label="Previous Password"
            placeholder="********"
            type="password"
            bg={true}
            name="oldPassword"
            register={register("oldPassword")}
          />
          {errors.oldPassword && (
            <InlineError text={errors.oldPassword.message} />
          )}
        </div>
        <div className="w-full">
          <Inputs
            label="New Password"
            placeholder="**********"
            type="password"
            bg={true}
            name="newPassword"
            register={register("newPassword")}
          />
          {errors.newPassword && (
            <InlineError text={errors.newPassword.message} />
          )}
        </div>
        <div className="w-full">
          <Inputs
            label="Confirm Password"
            placeholder="**********"
            type="password"
            bg={true}
            name="confirmPassword"
            register={register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <InlineError text={errors.confirmPassword.message} />
          )}
        </div>
        <div className="flex justify-end items-center my-4">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-main font-medium tansitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto"
          >
            {isLoading ? "Changing Password..." : "Change Password"}
          </button>
        </div>
      </form>
    </Sidebar>
  );
};

export default ChangePassword;
