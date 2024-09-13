"use client";
import { Inputs } from "../UserInput";
import MainModals from "./MainModals";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  addNewCategoryAction,
  updateCategoryAction,
} from "@/redux/actions/CategoryActions";
import toast from "react-hot-toast";
import { TypeOfCategory, TypeOfDispatch, TypeOfState } from "@/Types";

const CategoriesModal = ({
  modalOpen,
  setModalOpen,
  category,
}: TypeOfCategory) => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch<TypeOfDispatch>();
  const { isLoading, isError, isSuccess } = useSelector(
    (state: TypeOfState) => {
      return state.addCategory;
    }
  );

  // Get Updated Category from the Redux store
  const {
    isLoading: upLoading,
    isError: upError,
    isSuccess: upSuccess,
  } = useSelector((state: TypeOfState) => {
    return state.updateCategory;
  });

  // Add Category
  const submitHandler = (e: any) => {
    e.preventDefault();
    if (title) {
      // If Category is not null then update else add category
      if (category) {
        dispatch(updateCategoryAction(category?._id, { title: title }));
        setModalOpen(!modalOpen);
      } else {
        dispatch(addNewCategoryAction({ title: title }));
        setTitle("");
      }
    } else {
      toast.error("Please Enter Category Name");
    }
  };

  // UseEffect When any state change then rerender he component
  useEffect(() => {
    // Error Handling
    if (upError || isError) {
      toast.error(upError || isError);
      dispatch({
        type: isError ? "ADD_NEW_CATEGORY_RESET" : "UPDATE_CATEGORY_RESET",
      });
    }
    // Success Handling
    if (upSuccess || isSuccess) {
      dispatch({
        type: isSuccess ? "ADD_NEW_CATEGORY_RESET" : "UPDATE_CATEGORY_RESET",
      });
    }

    // If Category is not null then set title else set empty
    if (category) {
      setTitle(category?.title);
    }

    // If modal is not open then set title to empty
    if (!modalOpen) {
      setTitle("");
    }
  }, [dispatch, isError, isSuccess, upError, upSuccess, category, modalOpen]);

  return (
    <MainModals modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main  rounded-2xl text-white z-50">
        <h2 className="text-3xl font-bold ">
          {category ? "Update" : "Create"}
        </h2>
        <form
          onSubmit={submitHandler}
          className="flex flex-col gap-6 text-left mt-6"
        >
          <Inputs
            label="Category Name"
            placeholder={category ? category.title : "Category Name"}
            type="text"
            bg={false}
            value={title}
            onChange={(e: any) => setTitle(e.target.value)}
          />
          <button
            type="submit"
            disabled={isLoading || upLoading}
            className="w-full flex-rows gap-4 py-3 font-bold rounded border-2 border-subMain hover:bg-dry bg-subMain text-white"
          >
            {isLoading || upLoading
              ? "Loading..."
              : category
              ? "Update"
              : "Create"}
          </button>
        </form>
      </div>
    </MainModals>
  );
};

export default CategoriesModal;
