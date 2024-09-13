"use client";
import React, { useCallback, useEffect, useState } from "react";
import MainModals from "./MainModals";
import { Inputs } from "../UserInput";
import { RxUpdate } from "react-icons/rx";
import { HiPlusCircle } from "react-icons/hi";
import { Uploder } from "../Uploder";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CastValidation } from "../validation/MovieValidation";
import {
  addCastsAction,
  updateCastsAction,
} from "@/redux/actions/MovieActions";
import toast from "react-hot-toast";
import { InlineError } from "../notifications/Error";
import { ImagePreview } from "../ImagePreview";
import { TypeOfCastsModal, TypeOfDispatch, TypeOfState } from "@/Types";

const CastsModal = ({ modalOpen, setModalOpen, cast }: TypeOfCastsModal) => {
  const dispatch = useDispatch<TypeOfDispatch>();

  const [image, setImage] = useState("");
  const generatedId = Math.floor(Math.random() * 100000000);
  const { userInfo } = useSelector((state: TypeOfState) => state.userLogin);

  // react form hooks used to handle the form data.
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(CastValidation),
  });

  // Update Movie from the Redux store and when the any state updates then reset the form
  useEffect(() => {
    if (cast) {
      setValue("name", cast?.name);
      setImage(cast?.image);
    }
  }, [cast, setValue]);

  // Add and Update Movie
  const onSubmit = useCallback(
    (data: { name: string }) => {
      if (cast && cast?.id) {
        dispatch(
          updateCastsAction({
            ...data,
            image,
            id: cast?.id,
          })
        );
        toast.success("Cast Updated Successfully");
      } else {
        dispatch(
          addCastsAction({
            ...data,
            image,
            id: generatedId,
          })
        );
        toast.success("Cast Created Successfully");
      }
      reset();
      setValue("name", "");
      setImage("");
      setModalOpen(false);
    },
    [image, generatedId, reset, setValue, setModalOpen, dispatch, cast]
  );

  return (
    <MainModals modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main  rounded-2xl text-white z-50">
        <h2 className="text-3xl font-bold ">
          {cast ? "Update Cast" : "Create Cast"}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 text-left mt-6"
        >
          <div className="w-full">
            <Inputs
              label="Cast Name"
              placeholder={cast ? cast.name : "Cast Name"}
              type="text"
              bg={false}
              register={register("name")}
              name="name"
            />
            {errors?.name && <InlineError text={errors?.name?.message} />}
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-border font-semibold text-sm">
              Image with title
            </p>
            <Uploder setImageUrl={setImage} token={userInfo?.token} />
            <ImagePreview src={image} alt={cast?.name} />
          </div>
          <button
            onClick={() => setModalOpen(false)}
            className="w-full flex-rows gap-4 py-3 font-bold rounded border-2 border-subMain hover:bg-dry bg-subMain text-white"
          >
            {cast ? (
              <>
                <RxUpdate /> <h1>Update Cast</h1>
              </>
            ) : (
              <>
                <HiPlusCircle />
                <h1> Add Cast</h1>
              </>
            )}
          </button>
        </form>
      </div>
    </MainModals>
  );
};

export default CastsModal;
