import baseAxios from "./axiosBase";

export const login = async (user) => {
  try {
    const { data } = await baseAxios.post("/auth/authenticate", user);
    return Promise.resolve(data);
  } catch (error) {
    const message = error?.response?.data?.message ?? error.message;
    throw Error(message);
  }
};
