import React, { useState, useEffect } from "react";

import {
  getImportMedicine,
  deleteImportMedicine,
  cancleImportMedicine,
  updateStatusImportMedicine,
  getDetailImport,
} from "api/Import";

import { addImport } from "reducer/Import";

import useLoading from "../hook/HookLoading";

import Table from "common/Table";
import ModalTable from "common/ModalTable";

import { useDispatch, useSelector } from "react-redux";

import { formatMoney } from "utils";
import { notificationErorr } from "helper/Notification";
import { notificationSuccess } from "helper/Notification";
import { useHistory } from "react-router";

const TITLE = "Phiếu nhập";

const arrTitle = [
  "STT",
  "MÃ PHIẾU NHẬP",
  "TỔNG TIỀN",
  "NGÀY LẬP",
  "TRẠNG THÁI",
  "MÃ NHÂN VIÊN",
  "TÊN NHÂN VIÊN",
];

const arrTitleProduct = [
  "STT",
  "MÃ SẢN PHẨM",
  "TÊN SẢN PHẨM",
  "HÌNH ẢNH",
  "SỐ LƯỢNG",
  "ĐƠN GIÁ",
  "THÀNH TIỀN",
];

const arrOption = [
  {
    title: "Tất cả ",
    value: -1,
  },
  {
    title: "Đang giao ",
    value: 0,
  },
  {
    title: "Thành công ",
    value: 1,
  },
  {
    title: "Đã hủy",
    value: 4,
  },
];
export default function ImportMedicinePage() {
  const [search, setSearch] = useState("");
  const [option, setOption] = useState("");
  const [modal, setModal] = useState(false);
  const [detail, setDetail] = useState();
  const [hidden, display, loading] = useLoading();
  const [listDetailImport , setListDetailImport ] = useState([])
  const listImportMedicine = useSelector((state) => state.Import);
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector((state) => state.CurrentUser);
  const getAllImportMedicine = async () => {
    try {
      display();
      const res = await getImportMedicine();
      if (res.status === 200) {
        hidden();
        dispatch(addImport(res.data));
      }
    } catch (err) {
      console.log(err);
      hidden();
    }
  };

  useEffect(() => {
    document.title = TITLE;
    getAllImportMedicine();
  }, []);

  let listImportMedicineTemp = [];

  if (listImportMedicine.length > 0) {
    listImportMedicineTemp = listImportMedicine
      .filter((value) => {
        return (
          value.mapn
            .toLowerCase()
            .trim()
            .indexOf(search.toLowerCase().trim()) !== -1
        );
      })
      .map((value) => {
        let trangthai = "";
        if (value.trangthai === 0) {
          trangthai = "Đang nhập";
        } else if (value.trangthai === 1) {
          trangthai = "Thành công";
        } else if (value.trangthai === 4) {
          trangthai = "Đã hủy";
        }
        return {
          mapn: value.mapn,
          tongtien: `${formatMoney(value.tongtien.toString())}đ`,
          ngaylap: value.ngaylap.slice(0, 19),
          trangthaiphieunhap: trangthai,
          manv: value.nhanvien ? value.nhanvien.manv : "",
          hoten: value.nhanvien
            ? `${value.nhanvien.ho} ${value.nhanvien.ten}`
            : "",
        };
      });
  }

  if (Number.parseInt(option) > -1 && listImportMedicineTemp.length > 0) {
    listImportMedicineTemp = listImportMedicineTemp.filter((value) => {
      if (Number.parseInt(option) === 0) {
        return value.trangthaiphieunhap === "Đang nhập";
      } else if (Number.parseInt(option) === 1) {
        return value.trangthaiphieunhap === "Thành công";
      } else if (Number.parseInt(option) === 4) {
        return value.trangthaiphieunhap === "Đã hủy";
      }
    });
  }

  let listProductDetailTemp = [];
  if (listDetailImport.length > 0 && detail) {
    listProductDetailTemp = listDetailImport.map((value) => {
        return {
          masp: value.sanpham.masp,
          tensp: value.sanpham.tensp,
          hinhanh: value.sanpham.photo,
          soluong: value.soluong,
          dongia: `${formatMoney(value.dongia.toString())}đ`,
          thanhtien: `${formatMoney(
            (value.dongia * value.soluong).toString()
          )}đ`,
        };
      });
  }
  const onAdd = () => {
    history.push("/nhap-hang/them");
  };
  // const onUpdate = (value) => {
  //   if (value.trangthaiphieunhap === "Đã hủy") {
  //     notificationErorr("Phiếu nhập đã hủy", 3000);
  //   } else if (value.trangthaiphieunhap === "Thành công") {
  //     notificationErorr("Phiếu nhập đã thành công", 3000);
  //   } else {
  //     history.push(`/nhap-hang/${value.mapn}`);
  //   }
  // };
  const onDelete = async (value) => {
    if (value.trangthaiphieunhap !== "Đã hủy") {
      notificationErorr("Phiếu nhập không thể xóa", 3000);
    } else {
      if (window.confirm("Bạn chắc chắn xóa phiếu nhập")) {
        try {
          display();
           const res = await deleteImportMedicine(value.mapn);
          if (res.status === 200) {
            hidden();
            notificationSuccess("Xóa phiếu nhập thành công", 1000);
            getAllImportMedicine();
          }
        } catch (err) {
          notificationErorr("Xóa phiếu nhập thất bại", 3000);
          hidden();
          console.log(err);
        }
      }
    }
  };
  const onUpdateStatus = async (value) => {
    if (value.trangthaiphieunhap === "Đã hủy") {
      notificationErorr("Phiếu nhập đã hủy", 3000);
    } else if (value.trangthaiphieunhap === "Thành công") {
      notificationErorr("Phiếu nhập đã thành công", 3000);
    } else {
      if (window.confirm("Bạn chắc chắn cập nhật trạng thái phiếu nhập")) {
        try {
          display();
          const res = await updateStatusImportMedicine(
            value.mapn,
            currentUser.manv
          );
          if (res.status === 200) {
            hidden();
            notificationSuccess("Cập nhật trạng thái thành công", 1000);
            getAllImportMedicine();
          }
        } catch (err) {
          notificationErorr("Cập nhật trạng thái thất bại", 3000);
          hidden();
          console.log(err);
        }
      }
    }
  };
  const onCancle = async (value) => {
    if (value.trangthaiphieunhap === "Đã hủy") {
      notificationErorr("Phiếu nhập đã hủy", 3000);
    } else if (value.trangthaiphieunhap === "Thành công") {
      notificationErorr("Phiếu nhập đã thành công", 3000);
    } else {
      if (window.confirm("Bạn chắc chắn hủy phiếu nhập")) {
        try {
          display();
          const res = await cancleImportMedicine(value.mapn, currentUser.manv);
          if (res.status === 200) {
            hidden();
            notificationSuccess("Hủy phiếu nhập thành công", 1000);
            getAllImportMedicine();
          }
        } catch (err) {
          notificationErorr("Hủy phiếu nhập thất bại", 3000);
          hidden();
          console.log(err);
        }
      }
    }
  };
  const onDetail = async(value) => {
    try{
      const res = await getDetailImport(value.mapn);
      if(res.status === 200){
        setDetail(value);
        setModal(true);
        hidden();
        setListDetailImport(res.data);

      }
    }catch(err){
      console.log(err)
      hidden();
    }
  
  };

  return (
    <>
      <Table
        arrOption={arrOption}
        arrTitle={arrTitle}
        setSearch={setSearch}
        setOption={setOption}
        title="PHIẾU NHẬP"
        onAdd={onAdd}
        arrContent={listImportMedicineTemp}
        arrActivity={[
          {
            title: "Xóa",
            icon: "delete",
            color: "red",
            onClick: onDelete,
          },

          {
            title: "Cập nhật",
            icon: "update",
            color: "lime",
            onClick: onUpdateStatus,
          },
          {
            title: "HỦY",
            icon: "not_interested",
            color: "pink",
            onClick: onCancle,
          },
          {
            title: "Chi tiết",
            icon: "info",
            color: "blue",
            onClick: onDetail,
          },
        ]}
      />
      <ModalTable modal={modal} setModal={setModal}>
        <Table
          arrTitle={arrTitleProduct}
          title="CHI TIẾT PHIẾU NHẬP"
          arrContent={listProductDetailTemp}
          searchNull={true}
        />
      </ModalTable>
      {loading}
    </>
  );
}
