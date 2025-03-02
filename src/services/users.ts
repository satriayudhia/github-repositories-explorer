import { APIPUBLIC } from "../configs/api";

export const searchUsers = async (params = {}) => {
  try {
    const res = await APIPUBLIC.get("/search/users", { params });
    return res;
  } catch (error) {
    return error;
  }
};
