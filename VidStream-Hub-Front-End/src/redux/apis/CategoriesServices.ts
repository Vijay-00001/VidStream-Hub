import Axios from "./Axios";

// ================ USER API CALLS ===================

//Get all categories API call
export const GetAllCategoriesServices = async () => {
  const { data } = await Axios.get("/categories");
  return data;
};

// ================ ADMIN API CALLS ===================

//Add new category API call
export const AddNewCategoryServices = async (title: string, token: string) => {
  const { data } = await Axios.post("/categories", title, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

//Update category API call
export const UpdateCategoryServices = async (
  id: string,
  title: object,
  token: string
) => {
  const { data } = await Axios.put(`/categories/${id}`, title, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

//Delete category API call
export const DeleteCategoryServices = async (id: string, token: string) => {
  const { data } = await Axios.delete(`/categories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
