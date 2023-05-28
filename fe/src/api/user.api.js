import baseAxios from "./axiosBase";

export const addUser = async (body) => {
  try {
    const { data } = await baseAxios.post("/users", body);
    return Promise.resolve(data);
  } catch (error) {
    const message = error?.response?.data?.message ?? error.message;
    throw Error(message);
  }
};

export const getOpenCourseByUserId = async (id) => {
  try {
    const { data } = await baseAxios.get("/users/opencourses/" + id);
    return Promise.resolve(data);
  } catch (error) {
    const message = error?.response?.data?.message ?? error.message;
    throw Error(message);
  }
};

export const getAllUser = async () => {
  try {
    const { data } = await baseAxios.get("/users");
    return Promise.resolve(data);
  } catch (error) {
    const message = error?.response?.data?.message ?? error.message;
    throw Error(message);
  }
};

export const deleteUser = async (id) => {
  try {
    const { data } = await baseAxios.delete(`/users/${id}`);
    return Promise.resolve(data);
  } catch (error) {
    const message = error?.response?.data?.message ?? error.message;
    throw Error(message);
  }
};
export const updateUser = async (id, body) => {
  try {
    const { data } = await baseAxios.patch(`/users/${id}`, body);
    return Promise.resolve(data);
  } catch (error) {
    const message = error?.response?.data?.message ?? error.message;
    throw Error(message);
  }
};
