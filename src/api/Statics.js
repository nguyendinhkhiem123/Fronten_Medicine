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
  return axiosClient.get(`topsp/nhap/${number}/${from}/${to}`);
};

export const getProfit = (number, from, to) => {
  return axiosClient.get(`multi_statistic/${number}/${from}/${to}`);
};

export const getMultiStaticExport = (from, to) => {
  return axiosClient.get(`multi_statistic/ban/1000/${from}/${to}`);
};

export const getMultiStaticImport = () => {
  return axiosClient.get(`multi_statistic/nhap/1000/2010-01-01/2030-01-01`);
};
