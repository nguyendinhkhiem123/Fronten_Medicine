import axiosClient from "./../axios";

export const uploadImage = (body) => {
  return axiosClient.post("upload/base", body);
};
