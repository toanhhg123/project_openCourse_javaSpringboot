import baseAxios from "./axiosBase";

export const addOpenCourse = async (body) => {
  try {
    const { data } = await baseAxios.post("/opencoures", body);
    return Promise.resolve(data);
  } catch (error) {
    const message = error?.response?.data?.message ?? error.message;
    throw Error(message);
  }
};

export const getAllOpenCourse = async () => {
  try {
    const { data } = await baseAxios.get("/opencoures");
    return Promise.resolve(data);
  } catch (error) {
    const message = error?.response?.data?.message ?? error.message;
    throw Error(message);
  }
};

export const getAllOpenCourseByCourseId = async (id) => {
  try {
    const { data } = await baseAxios.get("/opencoures/course/" + id);
    return Promise.resolve(data);
  } catch (error) {
    const message = error?.response?.data?.message ?? error.message;
    throw Error(message);
  }
};

export const deleteOpenCourse = async (id) => {
  try {
    const { data } = await baseAxios.delete(`/opencoures/${id}`);
    return Promise.resolve(data);
  } catch (error) {
    const message = error?.response?.data?.message ?? error.message;
    throw Error(message);
  }
};

export const updateOpenCourse = async (id, body) => {
  try {
    const { data } = await baseAxios.patch(`/opencoures/${id}`, body);
    return Promise.resolve(data);
  } catch (error) {
    const message = error?.response?.data?.message ?? error.message;
    throw Error(message);
  }
};

export const registerOpenCourse = async (opencouseId, id) => {
  try {
    const { data } = await baseAxios.patch(
      `/opencoures/register/${opencouseId}/${id}`
    );
    return Promise.resolve(data);
  } catch (error) {
    const message = error?.response?.data?.message ?? error.message;
    throw Error(message);
  }
};
