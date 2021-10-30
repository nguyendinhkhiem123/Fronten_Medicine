import React, { useEffect } from "react";

import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import useHookLoading from "hook/HookLoading";

import Notification from "components/Notification";
import { notificationSuccess, notificationErorr } from "helper/Notification";
import { LOGIN_SUCCESS, LOGIN_FAIL } from "constants/Respone";

import { loginAPI } from "api/Login";
import { forgotPassword } from "api/ForgotPassword";

import { login } from "../reducer/Login";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import InputText from "./../common/InputText";
import InputPassword from "./../common/InputPassword";
import Modals from "common/Modal";
import { schemaLogin, schemaForgotPassword } from "../hookform";
import { useState } from "react";

const TITLE = "Đăng nhập";

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaLogin),
  });

  const {
    register: registerPasswrod,
    handleSubmit: handleSumbitPassword,
    reset: resetPassword,
    formState: { errors: errorsPassword },
  } = useForm({
    resolver: yupResolver(schemaForgotPassword),
  });
  const [modal, setModal] = useState(false);
  const [hidden, display, Loading] = useHookLoading();
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async (value) => {
    try {
      display();
      const res = await loginAPI(value);
      hidden();
      if (res.status === 200) {
        notificationSuccess(LOGIN_SUCCESS, 1000);
        localStorage.setItem("account", JSON.stringify(res.data.username));
        setTimeout(() => {
          dispatch(login());
          history.replace("/");
        }, 1000);
      }
    } catch (err) {
      hidden();
      notificationErorr(LOGIN_FAIL, 3000);
    }
  };

  const forgotPasswords= () => {
    resetPassword({});
    setModal(true);
  };
  const onSumitForgotPassword = async (value) => {
    try {
      display();
      const res = await forgotPassword({
        message: "Mật khẩu của bạn là",
        subject: "CẤP LẠI MẬT KHẨU",
        to: value.email,
      });

      if (res.status === 200) {
        hidden();
        setModal(false);
        resetPassword({})
        notificationSuccess("Vui check mail để lấy mật khẩu mới", 1000);
      }
    } catch (err) {
      hidden();
      notificationErorr("Email chưa đăng kí tài khoản hoặc lỗi máy chủ", 3000);
    }
  };
  useEffect(() => {
    document.title = TITLE;
  }, []);
  return (
    <div className="flex items-center justify-center h-screen max-w-screen-2xl w-full mx-auto">
      <div className="w-6/12 h-screen md:block hidden relative ">
        <img
          className="h-screen"
          src="https://abs.twimg.com/sticky/illustrations/lohp_en_1302x955.png"
        />

        <div
          className="absolute top-2/4 left-2/4 transform -translate-y-1/2"
          style={{
            transform: "translateX(-50%) translateY(-50%)",
          }}
        >
          <span class="material-icons text-white text-text-300px">
            bloodtype
          </span>
        </div>
      </div>

      <div className="flex-1 px-6 relative">
        <div className="absolute -top-32">
          <Icon name="bloodtype" size="5xl" color="blue" />
        </div>

        <h1 className="font-light text-center xl:text-6xl text-4xl tracking-tight text-black">
          Đăng nhập
        </h1>
        <form className="mt-14 xl:px-20 px-2" onSubmit={handleSubmit(onSubmit)}>
          <InputText
            placeholder="Tài khoản"
            icon="person"
            name="username"
            errors={errors.username}
            register={register}
          />
          <InputPassword register={register} errors={errors.password} />
          <div className="flex justify-end items-center">
            <div
              className="mr-4 text-xs sm:text-base cursor-pointer font-bold"
              onClick={forgotPasswords}
            >
              <i className="text-black text-xs sm:text-base">Quên mật khẩu ?</i>
            </div>
            <Button
              color="lightBlue"
              buttonType="filled"
              size="regular"
              rounded={false}
              block={false}
              iconOnly={false}
              ripple="light"
              type="submit"
              className="text-10px sm:text-base"
            >
              Đăng nhập
            </Button>
          </div>
        </form>
      </div>
      <Modals
        title="Quên mật khẩu"
        modal={modal}
        setModal={setModal}
        handleSubmit={handleSumbitPassword(onSumitForgotPassword)}
        reset={resetPassword}
        arrInput={[
          <InputText
            name="email"
            placeholder="Nhập email đăng kí tài khoản"
            errors={errorsPassword.email}
            register={registerPasswrod}
            icon="email"
          />,
        ]}
      />
      <Notification />
      {Loading}
    </div>
  );
}
