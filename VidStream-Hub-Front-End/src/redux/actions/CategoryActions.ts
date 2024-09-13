import { Dispatch } from "redux";
import { ErrorsAction, tokenProtection } from "../Protection";
import {
  AddNewCategoryServices,
  DeleteCategoryServices,
  GetAllCategoriesServices,
  UpdateCategoryServices,
} from "../apis/CategoriesServices";
import * as CategoryConstants from "../constants/CategoryConstants";
import toast from "react-hot-toast";
import { TypeOfDispatch, TypeOfErrors } from "@/Types";

// Get All Category Then Take Action
export const getAllCategoryAction = () => async (dispatch: Dispatch) => {
  try {
    if (dispatch) {
      dispatch({ type: CategoryConstants.GET_ALL_CATEGORYS_REQUEST });
    }
    const response = await GetAllCategoriesServices();
    if (dispatch) {
      dispatch({
        type: CategoryConstants.GET_ALL_CATEGORIES_SUCCESS,
        payload: response,
      });
    }
  } catch (error: any) {
    if (dispatch) {
      ErrorsAction(error, dispatch, CategoryConstants.GET_ALL_CATEGORIES_FAIL);
    }
  }
};

// Add New Category Then Take Action
export const addNewCategoryAction =
  (data: any) =>
  async (dispatch: Dispatch | TypeOfDispatch, getState: object) => {
    try {
      dispatch({ type: CategoryConstants.ADD_NEW_CATEGORY_REQUEST });
      const response = await AddNewCategoryServices(
        data,
        tokenProtection(getState)
      );
      dispatch({
        type: CategoryConstants.ADD_NEW_CATEGORY_SUCCESS,
        payload: response,
      });
      toast.success("Category Added Successfully");
      dispatch(getAllCategoryAction());
    } catch (error: TypeOfErrors) {
      ErrorsAction(error, dispatch, CategoryConstants.ADD_NEW_CATEGORY_FAIL);
    }
  };

// Update Category Then Take Action
export const updateCategoryAction =
  (id: string, title: object) =>
  async (dispatch: Dispatch | TypeOfDispatch, getState: object) => {
    try {
      dispatch({ type: CategoryConstants.UPDATE_CATEGORY_REQUEST });
      const response = await UpdateCategoryServices(
        id,
        title,
        tokenProtection(getState)
      );
      dispatch({
        type: CategoryConstants.UPDATE_CATEGORY_SUCCESS,
        payload: response,
      });
      toast.success("Category Updated Successfully");
      dispatch(getAllCategoryAction());
    } catch (error: TypeOfErrors) {
      ErrorsAction(error, dispatch, CategoryConstants.UPDATE_CATEGORY_FAIL);
    }
  };

// Delete Category Then Take Action
export const deleteCategoryAction =
  (id: string) => async (dispatch: TypeOfDispatch, getState: object) => {
    try {
      dispatch({ type: CategoryConstants.DELETE_CATEGORY_REQUEST });
      await DeleteCategoryServices(id, tokenProtection(getState));
      dispatch({
        type: CategoryConstants.DELETE_CATEGORY_SUCCESS,
        payload: id,
      });
      dispatch(getAllCategoryAction());
    } catch (error: TypeOfErrors) {
      ErrorsAction(error, dispatch, CategoryConstants.DELETE_CATEGORY_FAIL);
    }
  };
