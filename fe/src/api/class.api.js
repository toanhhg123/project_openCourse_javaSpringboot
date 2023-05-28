import baseAxios from "./axiosBase";

export const addClass = async (body) => {
  try {
    const { data } = await baseAxios.post("/CollegeClass", body);
    return Promise.resolve(data);
  } catch (error) {
    const message = error?.response?.data?.message ?? error.message;
    throw Error(message);
  }
};
export const getAllClass = async () => {
  try {
    const { data } = await baseAxios.get("/CollegeClass");
    return Promise.resolve(data);
  } catch (error) {
    const message = error?.response?.data?.message ?? error.message;
    throw Error(message);
  }
};

export const deleteClass = async (id) => {
  try {
    const { data } = await baseAxios.delete(`/CollegeClass/${id}`);
    return Promise.resolve(data);
  } catch (error) {
    const message = error?.response?.data?.message ?? error.message;
    throw Error(message);
  }
};
export const updateClass = async (id, body) => {
  try {
    const { data } = await baseAxios.patch(`/CollegeClass/${id}`, body);
    return Promise.resolve(data);
  } catch (error) {
    const message = error?.response?.data?.message ?? error.message;
    throw Error(message);
  }
};
