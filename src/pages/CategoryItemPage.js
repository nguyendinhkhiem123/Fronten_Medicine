import React, { useEffect, useState } from "react";
import Table from "../common/Table";

import axios from "axios";
import useLoading from "../hook/HookLoading";
import { notificationSuccess, notificationErorr } from "helper/Notification";

import { addListProduct } from "reducer/Product";
import {
  getListOfCategory,
  getCodeLastProduct,
  insertProduct,
  deleteProduct,
  updateProduct,
} from "api/Product";

import { uploadImage } from "api/upload";

import { toBase64 } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaProduct } from "hookform";

import Modal from "common/Modal";

import InputText from "../common/InputText";
import InputImage from "common/InputImage";
import InputNumber from "common/InputNumber";
import InputTextarea from "common/InputTextarea";
import InputSelection from "common/InputSelection";

import { formatMoney, stringToNumber } from "utils";

import {
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_CATEGORY_FAIL,
  UPDATE_CATEGORY_SUCCESS,
  INSERT_USER_FAIL,
  INSERT_USER_SUCCESS,
} from "constants/Respone";

import { useRouteMatch } from "react-router";

const TITLE = "Sản phẩm";
const arrTitle = [
  "STT",
  "MÃ SẢN PHẨM",
  "TÊN SẢN PHẨM",
  "SỐ LƯỢNG",
  "ĐƠN GIÁ",
  "MÔ TẢ NGẮN",
  "MÔ TẢ CHI TIẾT",
  "HÌNH ẢNH",
];

export default function CategoryPageItemPage() {
  const location = useRouteMatch();
  const [hidden, display, Loading] = useLoading();
  const dispatch = useDispatch();
  const listCategory = useSelector((state) => state.Category);
  const listProduct = useSelector((state) => state.Product);
  const [modalInsert, setModalInsert] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);

  const [srcImage, setSrcImage] = useState("");
  const madm = location.params.madm;
  const [search, setSearch] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaProduct),
  });
  const {
    register: registerUpdate,
    handleSubmit: handleSubmitUpdate,
    reset: resetUpdate,
    watch: watchUpdate,
    formState: { errors: errorsUpdate },
  } = useForm({
    resolver: yupResolver(schemaProduct),
  });

  const getProductOfCategory = async (id) => {
    try {
      display();
      const res = await getListOfCategory(id);
      if (res.status === 200) {
        hidden();
        let temp = [...res.data];
        temp.forEach((value) => {
          delete value["danhmuc"];
        });
        dispatch(addListProduct(temp));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    document.title = TITLE;
    getProductOfCategory(madm);
  }, [location]);

  const onUpdate = (values) => {
    const tempImageURL = values.photo;
    let tempValues = { ...values };
    setSrcImage(tempImageURL);
    tempValues.photo = "";
    tempValues.dongia = stringToNumber(tempValues.dongia);
    resetUpdate({
      ...tempValues,
      danhmuc: madm,
    });
    setModalUpdate(true);
  };
  const onAdd = async () => {
    try {
      display();
      const res = await getCodeLastProduct();
      hidden();
      if (res.status === 200) {
        let code = res.data.masp.slice(2, res.data.masp.length);
        let codeNumber = Number.parseInt(code);
        codeNumber++;
        let codeTemp = "DM";
        codeTemp += codeNumber.toString();
        reset({
          masp: codeTemp,
          soluong: 0,
          danhmuc: madm,
        });
        setModalInsert(true);
      }
    } catch (err) {
      hidden();
      console.log(err);
    }
  };

  const onDelete = async (value) => {
    if (window.confirm("Bạn có chắc chắn xóa ?")) {
      try {
        display();
        const res = await deleteProduct(value.masp);
        if (res.status === 200) {
          notificationSuccess(UPDATE_USER_FAIL, 1000);
          hidden();
          getProductOfCategory(madm);
        }
      } catch (err) {
        hidden();
        notificationErorr(UPDATE_USER_SUCCESS, 3000);
        console.log(err);
      }
    }
  };

  const handleSubmitInsert = async (value) => {
    try {
      display();
      if (value.photo.length > 0) {
        const image = value.photo[0];
        const base64Image = await toBase64(image);
        const formData = new FormData();
        formData.append("file", base64Image);
        formData.append("upload_preset", "jy6ujik2");

        const resImage = await axios.post(
          "https://api.cloudinary.com/v1_1/dw59ze6aa/image/upload",
          formData
        );
        if (resImage.status === 200) {
          value.photo = resImage.data.url;
        }
      } else {
        value.photo = "";
      }
      const dmTemp = value.danhmuc;
      delete value["danhmuc"];
      value.danhmuc = {
        madm: dmTemp,
        tendm: "string",
      };

      const res = await insertProduct(value);
      if (res.status === 200) {
        notificationSuccess(INSERT_USER_SUCCESS, 1000);
        setModalInsert(false);
        reset({});
        hidden();
        getProductOfCategory(madm);
      }
    } catch (err) {
      hidden();
      notificationErorr(INSERT_USER_FAIL, 3000);
      console.log(err);
    }
  };

  const handleSubmitUpdateS = async (value) => {
    if (window.confirm("Bạn có chắc chắn sửa ?")) {
      try {
        display();
        if (value.photo.length > 0) {
          const image = value.photo[0];
          const base64Image = await toBase64(image);
          const formData = new FormData();
          formData.append("file", base64Image);
          formData.append("upload_preset", "jy6ujik2");

          const resImage = await axios.post(
            "https://api.cloudinary.com/v1_1/dw59ze6aa/image/upload",
            formData
          );
          if (resImage.status === 200) {
            value.photo = resImage.data.url;
          }
        } else {
          value.photo = srcImage;
        }

        const dmTemp = value.danhmuc;
        delete value["danhmuc"];
        value.danhmuc = {
          madm: dmTemp,
          tendm: "string",
        };
        const res = await updateProduct(value);
        if (res.status === 200) {
          notificationSuccess(UPDATE_CATEGORY_SUCCESS, 1000);
          setModalUpdate(false);
          resetUpdate({});
          hidden();
          getProductOfCategory(madm);
          setSrcImage("");
        }
      } catch (err) {
        hidden();
        notificationErorr("Lỗi tải hình ảnh", 3000);
        console.log(err);
      }
    }
  };
  let temp = [];
  if (listProduct.length > 0) {
    temp = listProduct
      .filter((value) => {
        return (
          value.masp
            .toLowerCase()
            .trim()
            .indexOf(search.toLowerCase().trim()) !== -1 ||
          value.tensp
            .toLowerCase()
            .trim()
            .indexOf(search.toLowerCase().trim()) !== -1
        );
      })
      .map((value) => {
        return {
          masp: value.masp,
          tensp: value.tensp,
          soluong: value.soluong,
          dongia: `${formatMoney(value.dongia.toString())}đ`,
          mota_ngan: value.mota_ngan,
          mota_chitiet: value.mota_chitiet,
          photo: value.photo,
        };
      });
  }
  let categoryTemp = [];
  if (listCategory.length > 0) {
    listCategory.forEach((valueOne) => {
      categoryTemp.push({
        title: valueOne.tendm,
        value: valueOne.madm,
      });
    });
  }
  return (
    <>
      <Table
        setSearch={setSearch}
        onAdd={onAdd}
        title="SẢN PHẨM"
        arrTitle={arrTitle}
        arrContent={temp}
        arrActivity={[
          {
            title: "Sửa",
            icon: "update",
            color: "yellow",
            onClick: onUpdate,
          },
          {
            title: "Xóa",
            icon: "delete",
            color: "red",
            onClick: onDelete,
          },
        ]}
      />

      <Modal
        key={1}
        modal={modalInsert}
        setModal={setModalInsert}
        title="Thêm sản phẩm"
        handleSubmit={handleSubmit(handleSubmitInsert)}
        reset={reset}
        arrInput={[
          <InputText
            name="masp"
            register={register}
            errors={errors.masp}
            placeholder="Mã sản phẩm"
            icon="inventory_2"
            disable={true}
          />,
          <InputText
            name="tensp"
            register={register}
            errors={errors.tensp}
            placeholder="Tên sản phẩm"
            icon="badge"
          />,
          <InputNumber
            name="soluong"
            register={register}
            errors={errors.soluong}
            placeholder="Số lượng"
            icon="production_quantity_limits"
            disable={true}
          />,
          <InputNumber
            name="dongia"
            register={register}
            errors={errors.dongia}
            placeholder="Đơn giá"
            icon="request_quote"
          />,
          <InputSelection
            name="danhmuc"
            register={register}
            errors={errors.danhmuc}
            placeholder="Loại sản phẩm"
            icon="category"
            title="Chọn loại"
            arrOption={categoryTemp}
            disable={true}
          />,
          <InputText
            name="mota_ngan"
            register={register}
            errors={errors.mota_ngan}
            placeholder="Mô tả ngắn"
            icon="description"
          />,
          <InputTextarea
            name="mota_chitiet"
            register={register}
            errors={errors.mota_chitiet}
            placeholder="Mô tả chi tiết"
            icon="description"
            row={4}
          />,
          <InputImage
            name="photo"
            register={register}
            errors={errors.photo}
            icon="add_a_photo"
            watch={watchUpdate}
            placeholder="Chọn ảnh"
          />,
        ]}
      />

      <Modal
        key={2}
        modal={modalUpdate}
        setModal={setModalUpdate}
        title="Sửa sản phẩm"
        reset={resetUpdate}
        handleSubmit={handleSubmitUpdate(handleSubmitUpdateS)}
        arrInput={[
          <InputText
            name="masp"
            register={registerUpdate}
            errors={errors.masp}
            placeholder="Mã sản phẩm"
            icon="inventory_2"
            disable={true}
          />,
          <InputText
            name="tensp"
            register={registerUpdate}
            errors={errorsUpdate.tensp}
            placeholder="Tên sản phẩm"
            icon="badge"
          />,
          <InputNumber
            name="soluong"
            register={registerUpdate}
            errors={errorsUpdate.soluong}
            placeholder="Số lượng"
            icon="production_quantity_limits"
            disable={true}
          />,
          <InputNumber
            name="dongia"
            register={registerUpdate}
            errors={errorsUpdate.dongia}
            placeholder="Đơn giá"
            icon="request_quote"
          />,

          <InputSelection
            name="danhmuc"
            register={registerUpdate}
            errors={errorsUpdate.danhmuc}
            placeholder="Loại sản phẩm"
            icon="category"
            title="Chọn loại"
            arrOption={categoryTemp}
          />,
          <InputText
            name="mota_ngan"
            register={registerUpdate}
            errors={errorsUpdate.mota_ngan}
            placeholder="Mô tả ngắn"
            icon="description"
          />,
          <InputTextarea
            name="mota_chitiet"
            register={registerUpdate}
            errors={errorsUpdate.mota_chitiet}
            placeholder="Mô tả chi tiết"
            icon="description"
            row={4}
          />,
          <InputImage
            name="photo"
            register={registerUpdate}
            errors={errorsUpdate.photo}
            icon="add_a_photo"
            watch={watch}
            placeholder="Chọn ảnh"
            src={srcImage}
          />,
        ]}
      />
      {Loading}
    </>
  );
}
