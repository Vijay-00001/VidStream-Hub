"use client";
import { TypeOfDispatch, TypeOfState } from "@/Types";
import Sidebar from "@/components/Sidebar";
import Table2 from "@/components/Table2";
import { Empty } from "@/components/notifications/Empty";
import Loader from "@/components/notifications/Loader";
import {
  GetFavoritesMoviesAction,
  adminDeleteUserAction,
  adminGetAllUsersAction,
} from "@/redux/actions/UserActions";
import { useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ViewAllUsers = () => {
  const MySwal = withReactContent(Swal);

  const dispatch = useDispatch<TypeOfDispatch>();

  const { isLoading, isError, users } = useSelector(
    (state: TypeOfState) => state.adminGetAllUser
  );

  const { isError: deleteError, isSuccess } = useSelector(
    (state: TypeOfState) => {
      return state.adminDeleteUser;
    }
  );

  // Delete Movies handeler
  const deleteUserHandler = useCallback(
    (id: string) => {
      MySwal.fire({
        title: "Are you sure?",
        text: "Do you really want to delete this user?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, keep it",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(adminDeleteUserAction(id));
        }
      });
    },
    [dispatch, MySwal]
  );

  // UseEffect use
  useEffect(() => {
    dispatch(adminGetAllUsersAction());
    dispatch(GetFavoritesMoviesAction());
    if (isError || deleteError) {
      toast.error(isError || deleteError);
      dispatch({
        type: isError
          ? "GET_ALL_USERS_RESET"
          : "ADMIN_DELETE_USER_ACCOUNT_RESET",
      });
    }
  }, [dispatch, isError, deleteError, isSuccess]);

  return (
    <Sidebar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Users</h2>
        </div>
        {isLoading ? (
          <Loader />
        ) : users?.length > 0 ? (
          <Table2
            data={users}
            users={true}
            onDeleteFunction={deleteUserHandler}
          />
        ) : (
          <Empty message="You don't have any users" />
        )}
      </div>
    </Sidebar>
  );
};

export default ViewAllUsers;
