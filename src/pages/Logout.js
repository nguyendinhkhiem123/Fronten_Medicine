import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import { removeLogin } from "reducer/Login";
import { removeCurrentUser } from "reducer/CurrentUser";
import { removeEmployee } from "reducer/Employee";
import { removeListCategory } from "reducer/Category";
import { removeMedicine } from "reducer/Medicine";

import { notificationSuccess } from "helper/Notification";
import useLoading from "./../hook/HookLoading";
export default function Logout() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [hidden, display, loading] = useLoading();

  useEffect(() => {
    if (window.confirm("Bạn có chắc chắn đăng xuất")) {
      display();

      notificationSuccess("Đăng xuất thành công", 2000);
      setTimeout(() => {
        hidden();
        dispatch(removeLogin());
        dispatch(removeCurrentUser());
        dispatch(removeEmployee());
        dispatch(removeListCategory());
        dispatch(removeMedicine());
        localStorage.removeItem("account");
        console.log("hello");
        history.push("/");
      }, 2000);
    }
    else{
        history.push("/");
    }
    return ()=>{
        clearTimeout();
    }
  }, []);
  return <>{loading}</>;
}
