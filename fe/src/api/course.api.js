import baseAxios from "./axiosBase";

export const addCourse = async (body) => {
  try {
    const { data } = await baseAxios.post("/courses", body);
    return Promise.resolve(data);
  } catch (error) {
    const message = error?.response?.data?.message ?? error.message;
    throw Error(message);
  }
};
export const getAllCourse = async () => {
  try {
    const { data } = await baseAxios.get("/courses");
    return Promise.resolve(data);
  } catch (error) {
    const message = error?.response?.data?.message ?? error.message;
    throw Error(message);
  }
};

export const deleteCourse = async (id) => {
  try {
    const { data } = await baseAxios.delete(`/courses/${id}`);
    return Promise.resolve(data);
  } catch (error) {
    const message = error?.response?.data?.message ?? error.message;
    throw Error(message);
  }
};
export const updateCourse = async (id, body) => {
  try {
    const { data } = await baseAxios.patch(`/courses/${id}`, body);
    return Promise.resolve(data);
  } catch (error) {
    const message = error?.response?.data?.message ?? error.message;
    throw Error(message);
  }
};
