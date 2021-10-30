import React, { useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Label from "@material-tailwind/react/Label";

import { getAllProduct } from "api/Product";

import useLoading from "../hook/HookLoading";
import Table from "common/Table";
import Modal from "common/Modal";

import InputNumber from "common/InputNumber";
import InputSelection from "common/InputSelection";
import { schemaImportProduct } from "hookform";

import { useSelector } from "react-redux";

import { formatMoney, checkUnquie, stringToNumber } from "utils";
import { notificationErorr } from "helper/Notification";
import { notificationSuccess } from "helper/Notification";
import { insertImportMedicine } from "api/Import";
import { useHistory } from "react-router";

const TITLE = "Thểm sản phẩm phiếu nhập";

const arrTitleProduct = [
  "STT",
  "MÃ SẢN PHẨM",
  "TÊN SẢN PHẨM",
  "HÌNH ẢNH",
  "SỐ LƯỢNG",
  "ĐƠN GIÁ",
  "THÀNH TIỀN",
];

export default function ImportMedicinePage() {
  const [search, setSearch] = useState("");
  const [hidden, display, loading] = useLoading();
  const [modalInsert, setModalInsert] = useState(false);
  const [listAddProduct, setListAddProduct] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  const currentUser = useSelector((state) => state.CurrentUser);
  const [modalUpdate, setModalUpdate] = useState(false);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaImportProduct),
  });
  const {
    register: registerUpdate,
    handleSubmit: handleSubmitUpdate,
    reset: resetUpdate,
    formState: { errors: errorsUpdate },
  } = useForm({
    resolver: yupResolver(schemaImportProduct),
  });
  const getAll = async () => {
    try {
      display();
      const res = await getAllProduct();
      if (res.status === 200) {
        hidden();
        setListProduct(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    document.title = TITLE;
    getAll();
  }, []);

  const onAdd = () => {
    setModalInsert(true);
  };
  const onUpdate = (value) => {
    setModalUpdate(true);
    resetUpdate({
      masp: value.masp,
      dongia: stringToNumber(value.dongia),
      soluong: value.soluong,
    });
  };
  const onDelete = async (value) => {
    if (window.confirm("Bạn có chắc chắn xóa sản phẩm đã lựa chọn")) {
      let temp = listAddProduct.filter((values) => {
        return values.masp !== value.masp;
      });
      notificationSuccess("Xóa thành công", 1000);
      setListAddProduct(temp);
    }
  };

  const onSubmitInsert = (value) => {
    let i = checkUnquie(listAddProduct, value.masp);
    if (i > -1) {
      notificationErorr("Sản phẩm đã có trong danh sách", 3000);
    } else {
      let temp = listProduct.filter((values) => {
        return values.masp === value.masp;
      });

      let tempListAddProduct = [...listAddProduct];
      tempListAddProduct.push({
        masp: temp[0].masp,
        tensp: temp[0].tensp,
        photo: temp[0].photo,
        soluong: value.soluong,
        dongia: `${formatMoney(value.dongia.toString())}đ`,
        thanhtien: `${formatMoney((value.soluong * value.dongia).toString())}đ`,
      });
      notificationSuccess("Chọn sản phẩm thành công", 2000);
      setListAddProduct(tempListAddProduct);
      setModalInsert(false);
      reset({});
    }
  };

  const onSubmitUpdate = (value) => {
    let temp = [...listAddProduct];
    let i = checkUnquie(temp, value.masp);
    temp[i].soluong = value.soluong;
    temp[i].dongia = `${formatMoney(value.dongia.toString())}đ`;
    temp[i].thanhtien = `${formatMoney((temp[i].soluong*value.dongia).toString())}đ`
    setListAddProduct(temp);
    setModalUpdate(false);
    notificationSuccess("Cập nhật thành công", 1000);
  };
  const onClickAddImport = async () => {
    if (listAddProduct.length === 0) {
      notificationErorr("Vui lòng chọn sản phẩm", 3000);
    } else {
      if (window.confirm("Bạn có chắc chắn lập phiếu")) {
        let body = listAddProduct.map((value) => {
          return {
            masp: value.masp,
            soluong: value.soluong,
            dongia: stringToNumber(value.dongia),
          };
        });
        try {
          display();
          const res = await insertImportMedicine(body, currentUser.manv);
          if (res.status === 200) {
            hidden();
            setListAddProduct([]);
            notificationSuccess("Lập phiếu thành công", 1000);
          }
        } catch (err) {
          hidden();
          notificationErorr("Lập phiếu nhập thất bại", 3000);
          console.log(err);
        }
      }
    }
  }
  const onClickBack = ()=>{
      history.replace("/nhap-hang");
  }
  let totalMoney = 0;
  if (listAddProduct.length > 0) {
    listAddProduct.forEach((value) => {
      let dongia = stringToNumber(value.dongia)
      totalMoney += value.soluong * dongia;
    });
  }
  return (
    <>
      <Table
        arrTitle={arrTitleProduct}
        setSearch={setSearch}
        title="THÊM SẢN PHẨM PHIẾU NHẬP"
        onAdd={onAdd}
        searchNull={true}
        arrContent={listAddProduct}
        arrActivity={[
          {
            title: "Chỉnh sửa",
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
      <div className="mt-10 flex justify-end">
        <div className="flex flex-col gap-4 items-end">
          <div className="font-light py-4 border-[#ccc] border-b-2 bordersolid">
            Tổng tiền : {formatMoney(totalMoney.toString())}đ
          </div>
          <div className="flex gap-4" >
            <div className="cursor-pointer" onClick={onClickBack}>
              <Label color="orange">
                <div className="flex items-center gap-2">
                  <span class="material-icons">arrow_back</span> Quay lại
                </div>
              </Label>
            </div>
            <div className="cursor-pointer" onClick={onClickAddImport}>
              <Label color="cyan">
                <div className="flex items-center gap-2">
                  <span class="material-icons">commit</span> Xác nhận
                </div>
              </Label>
            </div>
          </div>
        </div>
      </div>

      <Modal
        handleSubmit={handleSubmit(onSubmitInsert)}
        title="Chọn sản phẩm"
        modal={modalInsert}
        setModal={setModalInsert}
        reset={reset}
        arrInput={[
          <InputSelection
            name="masp"
            register={register}
            errors={errors.masp}
            title="Mã sản phẩm"
            placeholder="Mã sản phẩm"
            icon="inventory_2"
            arrOption={
              listProduct.length > 0
                ? listProduct.map((value) => {
                    return {
                      value: value.masp,
                      title: value.tensp,
                    };
                  })
                : []
            }
          />,
          <InputNumber
            name="soluong"
            register={register}
            errors={errors.soluong}
            placeholder="Số lượng"
            icon="production_quantity_limits"
          />,
          <InputNumber
            name="dongia"
            register={register}
            errors={errors.dongia}
            placeholder="Đơn giá"
            icon="request_quote"
          />,
        ]}
      />

      <Modal
        handleSubmit={handleSubmitUpdate(onSubmitUpdate)}
        title="Sửa sản phẩm"
        modal={modalUpdate}
        setModal={setModalUpdate}
        reset={resetUpdate}
        arrInput={[
          <InputSelection
            name="masp"
            register={registerUpdate}
            errors={errorsUpdate.masp}
            title="Mã sản phẩm"
            placeholder="Mã sản phẩm"
            icon="inventory_2"
            arrOption={
              listProduct.length > 0
                ? listProduct.map((value) => {
                    return {
                      value: value.masp,
                      title: value.tensp,
                    };
                  })
                : []
            }
          />,
          <InputNumber
            name="soluong"
            register={registerUpdate}
            errors={errorsUpdate.soluong}
            placeholder="Số lượng"
            icon="production_quantity_limits"
          />,
          <InputNumber
            name="dongia"
            register={registerUpdate}
            errors={errorsUpdate.dongia}
            placeholder="Đơn giá"
            icon="request_quote"
          />,
        ]}
      />
      {loading}
    </>
  );
}
