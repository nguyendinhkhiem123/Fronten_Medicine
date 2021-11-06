import axiosClient from "../axios";

export const getStaticsFromTo = (from, to) => {
  return axiosClient.get(`doanhthu/${from}/${to}`);
};

export const getStaticsYear = (from) => {
  return axiosClient.get(`doanhthu/${from}`);
};

export const getStaticsImportFromTo = (from, to) => {
  return axiosClient.get(`phinhap/${from}/${to}`);
};

export const getStaticsImportYear = (from) => {
  return axiosClient.get(`phinhap/${from}`);
};

export const getStatusOrder = (from, to) => {
  return axiosClient.get(`doanhthu/trangthai/${from}/${to}`);
};

export const getTopProductOrder = (number, from, to) => {
  return axiosClient.get(`topsp/${number}/${from}/${to}`);
};

export const getTopProductImport = (number, from, to) => {
  return axiosClient.get(`topspdt/nhap/${number}/${from}/${to}`);
};
