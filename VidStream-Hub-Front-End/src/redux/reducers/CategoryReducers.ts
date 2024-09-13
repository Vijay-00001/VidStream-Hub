import * as CategoryConstants from "../constants/CategoryConstants";

// Get All Category
export const getCategoryReducer = (state = { categories: [] }, action: any) => {
  switch (action.type) {
    case CategoryConstants.GET_ALL_CATEGORYS_REQUEST:
      return { isLoading: true };
    case CategoryConstants.GET_ALL_CATEGORIES_SUCCESS:
      return { isLoading: false, categories: action.payload };
    case CategoryConstants.GET_ALL_CATEGORIES_FAIL:
      return { isLoading: false, isError: action.payload };
    case CategoryConstants.GET_ALL_CATEGORIES_RESET:
      return { categories: [] };
    default:
      return state;
  }
};

// Add Category Reducer
export const addCategoryReducer = (state = {}, action: any) => {
  switch (action.type) {
    case CategoryConstants.ADD_NEW_CATEGORY_REQUEST:
      return { isLoading: true };
    case CategoryConstants.ADD_NEW_CATEGORY_SUCCESS:
      return { isLoading: false, category: action.payload };
    case CategoryConstants.ADD_NEW_CATEGORY_FAIL:
      return { isLoading: false, isError: action.payload };
    case CategoryConstants.ADD_NEW_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};

// Update Category Reducer
export const updateCategoryReducer = (state = {}, action: any) => {
  switch (action.type) {
    case CategoryConstants.UPDATE_CATEGORY_REQUEST:
      return { isLoading: true };
    case CategoryConstants.UPDATE_CATEGORY_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case CategoryConstants.UPDATE_CATEGORY_FAIL:
      return { isLoading: false, isError: action.payload };
    case CategoryConstants.UPDATE_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};

// Delete Category Reducer
export const deleteCategoryReducer = (state = {}, action: any) => {
  switch (action.type) {
    case CategoryConstants.DELETE_CATEGORY_REQUEST:
      return { isLoading: true };
    case CategoryConstants.DELETE_CATEGORY_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case CategoryConstants.DELETE_CATEGORY_FAIL:
      return { isLoading: false, isError: action.payload };
    case CategoryConstants.DELETE_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};
