import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import Image from "@material-tailwind/react/Image";
import Dropdown from "@material-tailwind/react/Dropdown";
import DropdownItem from "@material-tailwind/react/DropdownItem";

import InputText from "../common/InputText";
import InputSelection from "../common/InputSelection";
import InputPasword from "../common/InputPassword";
import Modal from "common/Modal";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaPerson } from "../hookform";

import { addCurrentUser } from "reducer/CurrentUser";
import { getUser , updateUser } from "api/Employee";

import Notification from "components/Notification";
import { notificationSuccess, notificationErorr } from "helper/Notification";
import { UPDATE_USER_SUCCESS, UPDATE_USER_FAIL } from "../constants/Respone";

import { updateCurentUser } from '../reducer/CurrentUser';
import useLoading from "../hook/HookLoading";

export default function AdminNavbar({ showSidebar, setShowSidebar }) {
  const location = useLocation().pathname;
  const currentUser = useSelector((state) => state.CurrentUser);
  const dispatch = useDispatch();

  const [modalInfo, setModalInfo] = useState(false);

  const [hidden, display, Loading] = useLoading();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaPerson),
  });
  const getCurrentUser = async (username) => {
    try {
      const res = await getUser(username);
      if (res.status === 200) {
        dispatch(addCurrentUser(res.data));
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("account"));
    if (localUser) {
      getCurrentUser(localUser);
    }
  }, []);

  const onClickPerson = () => {
    if (currentUser) {
      reset({
        manv: currentUser.manv,
        ten: currentUser.ten,
        diachi: currentUser.diachi,
        email: currentUser.email,
        gioitinh: currentUser.gioitinh,
        ho: currentUser.ho,
        sdt: currentUser.sdt,
        password: currentUser.taikhoan.password,
      });
    }
    setModalInfo(true);
  };
  const onSubmitPerson = async (value) => {
    try {
      value.username = currentUser.taikhoan.username;
      display();
      const res = await updateUser(value);
      hidden();
      if (res.status === 200) {
        notificationSuccess(UPDATE_USER_SUCCESS, 1000);
        setModalInfo(false);
        const body = {
          manv: value.manv,
          ho: value.ho,
          ten: value.ten,
          diachi: value.diachi,
          sdt: value.sdt,
          email: value.email,
          gioitinh: value.gioitinh,
          taikhoan : {
            matk : currentUser.taikhoan.matk,
            username : currentUser.taikhoan.username,
            password : value.password,
            quyen :  currentUser.taikhoan.quyen
          }
        };
        dispatch(updateCurentUser(body));
      }
    } catch (err) {
      hidden();
      notificationErorr(UPDATE_USER_FAIL, 3000);
      console.log(err);
    }
  };
  return (
    <>
      <nav className="bg-light-blue-500 py-6 px-3">
        <div className="container max-w-full mx-auto flex items-center justify-between md:pr-8 md:pl-10">
          <div className="md:hidden">
            <Button
              color="transparent"
              buttonType="link"
              size="lg"
              iconOnly
              rounded
              ripple="light"
              onClick={() => setShowSidebar("left-0")}
            >
              <Icon name="menu" size="2xl" color="white" />
            </Button>
            <div
              className={`absolute top-2 md:hidden ${
                showSidebar === "left-0" ? "left-64" : "-left-64"
              } z-50 transition-all duration-300`}
            >
              <Button
                color="transparent"
                buttonType="link"
                size="lg"
                iconOnly
                rounded
                ripple="light"
                onClick={() => setShowSidebar("-left-64")}
              >
                <Icon name="close" size="2xl" color="white" />
              </Button>
            </div>
          </div>

          <div className="flex justify-between items-center w-full">
            <h4 className="uppercase text-white text-sm tracking-wider mt-1">
              {location === "/"
                ? "DASHBOARD"
                : location.toUpperCase().replace("/", "")}
            </h4>
            <div className="flex items-center">
              <p className="text-white uppercase md:block hidden text-sm tracking-wider">
                Xin chào !{" "}
                {currentUser?.taikhoan?.quyen?.maquyen === 1
                  ? "ADMIN"
                  : "NHÂN VIÊN"}{" "}
                {currentUser?.ho} {currentUser?.ten}
              </p>
              <div className="-mr-4 ml-6">
                <Dropdown
                  color="transparent"
                  buttonText={
                    <div className="w-12">
                      <Image
                        src="https://images.genius.com/95bf59f77e01791377bc5dd80db89dc9.1000x1000x1.jpg"
                        rounded
                      />
                    </div>
                  }
                  rounded
                  style={{
                    padding: 0,
                    color: "transparent",
                  }}
                >
                  <DropdownItem color="lightBlue" onClick={onClickPerson}>
                    Cá nhân
                  </DropdownItem>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Modal
        handleSubmit={handleSubmit(onSubmitPerson)}
        title="Thông tin cá nhân"
        modal={modalInfo}
        setModal={setModalInfo}
        reset={reset}
        arrInput={[
          <InputText
            name="manv"
            register={register}
            errors={errors.manv}
            value=""
            placeholder="Mã nhân viên"
            icon="code"
            disable={true}
          />,
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
          <InputPasword register={register} errors={errors.password}/>,
        ]}
      />
      <Notification />
      {Loading}
    </>
  );
}
