"use client";
import CategoriesModal from "@/components/modals/CategoriesModal";
import { deleteCategoryAction } from "@/redux/actions/CategoryActions";
import Sidebar from "@/components/Sidebar";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Table2 from "@/components/Table2";
import { HiPlusCircle } from "react-icons/hi";
import Loader from "@/components/notifications/Loader";
import { Empty } from "@/components/notifications/Empty";
import { TypeOfDispatch, TypeOfState } from "@/Types";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// import Categories from "@/screens/dashboard/admin/Categories";

const ViewAllCategories = () => {
  const MySwal = withReactContent(Swal);

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // Get All Category and Maintain State
  const [category, setCategory] = useState<string | null>(null);
  const dispatch = useDispatch<TypeOfDispatch>();

  // All Categorys
  const { isLoading, categories } = useSelector(
    (state: TypeOfState) => state.getAllCategory
  );

  // Delete Category
  const { isError, isSuccess } = useSelector((state: TypeOfState) => {
    return state.deleteCategory;
  });

  // Delete Category Function
  const adminDeleteCategory = useCallback(
    (id: string) => {
      MySwal.fire({
        title: "Are you sure?",
        text: "Do you really want to delete this category?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, keep it",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteCategoryAction(id));
        }
      });
    },
    [dispatch, MySwal]
  );

  // Edit Category Function Call
  const onEditFunction = useCallback(
    (id: string) => {
      setCategory(id);
      setModalOpen(!modalOpen);
    },
    [modalOpen]
  );

  // UseEffect use when any state change then rerender the page
  useEffect(() => {
    if (isError) {
      toast.error(isError);
      dispatch({
        type: "DELETE_CATEGORY_RESET",
      });
    }
    if (!isLoading) {
      if (isError) {
        return categories;
      }
    }
    if (isSuccess) {
      toast.success("Category Deleted Successfully");
      dispatch({ type: "DELETE_CATEGORY_RESET" });
    }
    if (modalOpen === false) {
      setCategory(null);
    }
    if (!isLoading) {
      if (isError) {
        return categories;
      }
    }
  }, [modalOpen, dispatch, isError, isSuccess, isLoading, categories]);

  return (
    <Sidebar>
      <CategoriesModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        category={category}
      />
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Categories</h2>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-subMain flex-rows border gap-4 border-subMain font-medium transitions hover:bg-main text-white py-[10px] px-6 rounded"
          >
            <HiPlusCircle /> Create
          </button>
        </div>
        {isLoading ? (
          <Loader />
        ) : categories?.length > 0 ? (
          <Table2
            key={categories?._id}
            data={categories}
            users={false}
            onEditFunction={onEditFunction}
            onDeleteFunction={adminDeleteCategory}
          />
        ) : (
          <Empty message="You have not any category" />
        )}
      </div>
    </Sidebar>
  );
};

export default ViewAllCategories;
