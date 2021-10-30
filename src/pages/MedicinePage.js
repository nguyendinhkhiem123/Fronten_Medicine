import React, { useEffect, useState } from "react";
import Table from "../common/Table";

import useLoading from "../hook/HookLoading";
import { notificationSuccess, notificationErorr } from "helper/Notification";

import {
  getAllMedicine,
  updateMedicine,
  deleteMedicine,
  insertMedicine,
} from "api/Medicine";
import { getMedicine } from "reducer/Medicine";
import { useDispatch, useSelector } from "react-redux";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Modal from "common/Modal";

import { schemaMedicine } from "hookform";

import InputText from "../common/InputText";
import InputPasword from "../common/InputPassword";

import {
  DELELTE_USER_SUCCESS,
  DELELTE_USER_FAIL,
  UPDATE_USER_FAIL,
  UPDATE_USER_SUCCESS,
} from "constants/Respone";

const TITLE = "Nhà thuốc";
const arrTitle = [
  "STT",
  "MÃ NHÀ THUỐC",
  "TÊN NHÀ THUỐC",
  "EMAIL",
  "SDT",
  "ĐỊA CHỈ",
  "TÊN TÀI KHOẢN",
  "MẬT KHẨU",
  "MÃ TÀI KHOẢN",
];

export default function EmployeePage() {
  const [hidden, display, Loading] = useLoading();
  const dispatch = useDispatch();
  const listMedicine = useSelector((state) => state.Medicine);

  const [modalInsert, setModalInsert] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);

  const [search, setSearch] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaMedicine),
  });

  const {
    register: registerUpdate,
    handleSubmit: handleSubmitUpdate,
    reset: resetUpdate,
    formState: { errors: errorsUpdate },
  } = useForm({
    resolver: yupResolver(schemaMedicine),
  });

  const getListMedicine = async () => {
    try {
      display();
      const res = await getAllMedicine();
      if (res.status === 200) {
        hidden();
        let temp = [...res.data];
        res.data.forEach((element, index) => {
          temp[index].username = element.taikhoan.username;
          temp[index].password = element.taikhoan.password;
          temp[index].matk = element.taikhoan.matk;
        });

        temp.forEach((value) => {
          delete value["taikhoan"];
        });
        dispatch(getMedicine(temp));
      }
    } catch (err) {
      hidden();
      console.log(err);
    }
  };

  useEffect(() => {
    document.title = TITLE;
    getListMedicine();
  }, []);

  const onUpdate = (value) => {
    resetUpdate(value);
    setModalUpdate(true);
  };
  const onDelete = async (value) => {
    if (window.confirm("Bạn có chắc chắn xóa ?")) {
      try {
        display();
        const res = await deleteMedicine(value.matk);
        if (res.status === 200) {
          hidden();
          getListMedicine();
          notificationSuccess(DELELTE_USER_SUCCESS, 1000);
        }
      } catch (err) {
        hidden();
        notificationErorr(DELELTE_USER_FAIL, 3000);
        console.log(err);
      }
    }
  };
  const handleSubmitUpdateS = async (value) => {
    if (window.confirm("Bạn có chắc chắn sửa ?")) {
      try {
        display();
        const res = await updateMedicine(value);
        if (res.status === 200) {
          notificationSuccess(UPDATE_USER_SUCCESS, 1000);
          setModalUpdate(false);
          resetUpdate({});
          hidden();
          getListMedicine();
        }
      } catch (err) {
        hidden();
        notificationErorr("Tên tài khoản hoắc email đã trùng", 3000);
        console.log(err);
      }
    }
  };

  let temp = [];
  if (listMedicine.length > 0) {
    temp = listMedicine.filter((value) => {
      return (
        value.manhathuoc
          .toLowerCase()
          .trim()
          .indexOf(search.toLowerCase().trim()) !== -1 ||
        value.tennhathuoc
          .toLowerCase()
          .trim()
          .indexOf(search.toLowerCase().trim()) !== -1 ||
        value.diachi
          .toLowerCase()
          .trim()
          .indexOf(search.toLowerCase().trim()) !== -1
      );
    });
  }

  const onAdd = () => {
    setModalInsert(true);
  };
  const handleSubmitInsert = async (value) => {
    console.log(value);
    try{
      display(hidden);
      const res = await insertMedicine(value);
      if(res.status === 200){
        notificationSuccess("Thêm thành công" , 1000)
        getListMedicine(); 
        setModalInsert(false);
        reset({});
      }
    }catch(err){
      hidden();
      console.log(err);
      notificationErorr("Tên tài khoản hoắc email đã trùng", 3000)
    }
  };
  return (
    <>
      <Table
        setSearch={setSearch}
        title="NHÀ THUỐC"
        arrTitle={arrTitle}
        arrContent={temp}
        onAdd={onAdd}
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
        title="Thêm nhân viên"
        reset={reset}
        handleSubmit={handleSubmit(handleSubmitInsert)}
        arrInput={[
          <InputText
            name="username"
            register={register}
            errors={errors.username}
            value=""
            placeholder="Tên tài khoản"
            icon="person"
          />,
          <InputPasword register={register} errors={errors.password} />,
          <InputText
            name="tennhathuoc"
            register={register}
            errors={errors.tennhathuoc}
            value=""
            placeholder="Tên nhà thuốc"
            icon="drive_file_rename_outline"
          />,
          <InputText
            name="email"
            register={register}
            errors={errors.email}
            value=""
            placeholder="Email nhà thuốc"
            icon="email"
          />,
          <InputText
            name="diachi"
            register={register}
            errors={errors.diachi}
            value=""
            placeholder="Địa chỉ"
            icon="add_location"
          />,
          <InputText
            name="sdt"
            register={register}
            errors={errors.sdt}
            value=""
            placeholder="Số điện thoại"
            icon="phone"
          />,
        ]}
      />
      <Modal
        key={2}
        modal={modalUpdate}
        setModal={setModalUpdate}
        title="Sửa thông tin nhà thuốc"
        reset={resetUpdate}
        handleSubmit={handleSubmitUpdate(handleSubmitUpdateS)}
        arrInput={[
          <InputText
            name="manhathuoc"
            register={registerUpdate}
            errors={errorsUpdate.manhathuoc}
            value=""
            placeholder="Mã nhà thuốc"
            icon="code"
            disable={true}
          />,
          <InputText
            name="username"
            register={registerUpdate}
            errors={errorsUpdate.username}
            value=""
            placeholder="Tên tài khoản"
            icon="person"
            disable={true}
          />,
          <InputPasword
            register={registerUpdate}
            errors={errorsUpdate.password}
          />,
          <InputText
            name="tennhathuoc"
            register={registerUpdate}
            errors={errorsUpdate.tennhathuoc}
            value=""
            placeholder="Tên nhà thuốc"
            icon="drive_file_rename_outline"
          />,
          <InputText
            name="email"
            register={registerUpdate}
            errors={errorsUpdate.email}
            value=""
            placeholder="Email nhà thuốc"
            icon="email"
          />,
          <InputText
            name="diachi"
            register={registerUpdate}
            errors={errorsUpdate.diachi}
            value=""
            placeholder="Địa chỉ"
            icon="add_location"
          />,
          <InputText
            name="sdt"
            register={registerUpdate}
            errors={errorsUpdate.sdt}
            value=""
            placeholder="Số điện thoại"
            icon="phone"
          />,
        ]}
      />

      {Loading}
    </>
  );
}
