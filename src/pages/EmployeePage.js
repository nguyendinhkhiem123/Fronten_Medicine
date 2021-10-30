import React, { useEffect, useState } from "react";
import Table from "../common/Table";

import useLoading from "../hook/HookLoading";
import { notificationSuccess, notificationErorr } from "helper/Notification";

import { getAllEmployee, insertEmployee, deleteEmployee , updateUser } from "api/Employee";
import { getEmployee } from "reducer/Employee";
import { useDispatch, useSelector } from "react-redux";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Modal from "common/Modal";

import { schemaEmployee } from "hookform";

import InputText from "../common/InputText";
import InputPasword from "../common/InputPassword";
import InputSelection from "common/InputSelection";

import {
  INSERT_USER_SUCCESS,
  INSERT_USER_FAIL_USERNAME,
  DELELTE_USER_SUCCESS,
  DELELTE_USER_FAIL,
  UPDATE_USER_FAIL ,
  UPDATE_USER_SUCCESS
} from "constants/Respone";

const TITLE = "Nhân viên";
const arrTitle = [
  "STT",
  "MÃ NHÂN VIÊN",
  "HỌ",
  "TÊN",
  "ĐỊA CHỈ",
  "SDT",
  "EMAIL",
  "GIỚI TÍNH",
  "TÊN TÀI KHOẢN",
  "MẬT KHẨU",
  "MÃ TÀI KHOẢN",
];

export default function EmployeePage() {
  const [hidden, display, Loading] = useLoading();
  const dispatch = useDispatch();
  const listEmployee = useSelector((state) => state.Employee);
  const [modalInsert, setModalInsert] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);

  const [ search , setSearch ] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaEmployee),
  });

  const {
    register: registerUpdate,
    handleSubmit: handleSubmitUpdate,
    reset: resetUpdate,
    formState: { errors: errorsUpdate },
  } = useForm({
    resolver: yupResolver(schemaEmployee),
  });

  const getListUser = async () => {
    try {
      display();
      const res = await getAllEmployee();
      if (res.status === 200) {
        let temp = [...res.data];
        hidden();
        // })
        res.data.forEach((element, index) => {
          temp[index].username = element.taikhoan.username;
          temp[index].password = element.taikhoan.password;
          temp[index].matk = element.taikhoan.matk;
        });

        temp.forEach((value) => {
          delete value["taikhoan"];
        });
        dispatch(getEmployee(temp));
      }
    } catch (err) {
      hidden();
      console.log(err);
    }
  };

  useEffect(() => {
    document.title = TITLE;
    getListUser();
  }, []);

  const onUpdate = (value) => {
    resetUpdate(
       value
    )
    setModalUpdate(true);
   
  };
  const onAdd = () => {
    setModalInsert(true);
  };

  const onDelete = async (value) => {
    if (window.confirm("Bạn có chắc chắn xóa ?")) {
      try {
        display();
        const res = await deleteEmployee(value.matk);
        if (res.status === 200) {
          notificationSuccess(DELELTE_USER_SUCCESS, 1000);
          hidden();
          getListUser();
        }
      } catch (err) {
        hidden();
        notificationErorr(DELELTE_USER_FAIL, 3000);
        console.log(err);
      }
    }
  };

  const handleSubmitInsert = async (value) => {
    try {
      display();
      const res = await insertEmployee(value);
      if (res.status === 200) {
        notificationSuccess(INSERT_USER_SUCCESS, 1000);
        setModalInsert(false);
        reset({});
        hidden();
        getListUser();
      }
    } catch (err) {
      hidden();
      notificationErorr("Tên tài khoản hoắc email đã trùng", 3000);
      console.log(err);
    }
  };
  let temp = [];
  if(listEmployee.length > 0){
      temp = listEmployee.filter(value=>{
          return (value.manv.toLowerCase().trim().indexOf(search.toLowerCase().trim()) !== -1
          || value.ho.toLowerCase().trim().indexOf(search.toLowerCase().trim()) !== -1
          || value.ten.toLowerCase().trim().indexOf(search.toLowerCase().trim()) !== -1
          || value.diachi.toLowerCase().trim().indexOf(search.toLowerCase().trim()) !== -1
          )
      })
  }
  const handleSubmitUpdateS = async(value) => {
      if(window.confirm('Bạn có chắc chắn sửa ?')){
        try {
            display();
            const res = await updateUser(value);
            if (res.status === 200) {
              notificationSuccess(UPDATE_USER_SUCCESS, 1000);
              setModalUpdate(false);
              resetUpdate({});
              hidden();
              getListUser();
            }
          } catch (err) {
            hidden();
            notificationErorr("Tên tài khoản hoắc email đã trùng", 3000);
            console.log(err);
          }
      }
  };
  return (
    <>
      <Table 
        setSearch = {setSearch}
        onAdd={onAdd}
        title="NHÂN VIÊN"
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
        title="Thêm nhân viên"
        handleSubmit={handleSubmit(handleSubmitInsert)}
        reset={reset}
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
            name="ho"
            register={register}
            errors={errors.ho}
            value=""
            placeholder="Họ nhân viên"
            icon="dns"
          />,
          <InputText
            name="ten"
            register={register}
            errors={errors.ten}
            value=""
            placeholder="Tên nhân viên"
            icon="drive_file_rename_outline"
          />,
          <InputText
            name="email"
            register={register}
            errors={errors.email}
            value=""
            placeholder="Email nhân viên"
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
          <InputSelection
            name="gioitinh"
            register={register}
            errors={errors.gioitinh}
            value=""
            placeholder="Giới tính"
            icon="transgender"
            arrOption={[
              {
                value: 1,
                title: "Nữ",
              },
              {
                value: 0,
                title: "Nam",
              },
            ]}
          />,
        ]}
      />

      <Modal
        key={2}
        modal={modalUpdate}
        setModal={setModalUpdate}
        title="Sửa nhân viên"
        reset={resetUpdate}
        handleSubmit={handleSubmitUpdate(handleSubmitUpdateS)}
        arrInput={[
          <InputText
            name="manv"
            register={registerUpdate}
            errors={errorsUpdate.manv}
            value=""
            placeholder="Mã nhân viên"
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
          <InputPasword register={registerUpdate} errors={errorsUpdate.password} />,
          <InputText
            name="ho"
            register={registerUpdate}
            errors={errorsUpdate.ho}
            value=""
            placeholder="Họ nhân viên"
            icon="dns"
          />,
          <InputText
            name="ten"
            register={registerUpdate}
            errors={errorsUpdate.ten}
            value=""
            placeholder="Tên nhân viên"
            icon="drive_file_rename_outline"
          />,
          <InputText
            name="email"
            register={registerUpdate}
            errors={errorsUpdate.email}
            value=""
            placeholder="Email nhân viên"
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
          <InputSelection
            name="gioitinh"
            register={registerUpdate}
            errors={errorsUpdate.gioitinh}
            value=""
            placeholder="Giới tính"
            icon="transgender"
            arrOption={[
              {
                value: 1,
                title: "Nữ",
              },
              {
                value: 0,
                title: "Nam",
              },
            ]}
          />,
        ]}
      />

      {Loading}
    </>
  );
}
