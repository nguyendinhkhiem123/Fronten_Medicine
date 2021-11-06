import React, { useEffect, useState } from "react";

import Table from "common/Table";

import { getListOrder, cancleOrder, updateStatusOrder } from "api/Order";
import { refundPayment } from "api/Payment";
import useLoading from "hook/HookLoading";

import { notificationSuccess, notificationErorr } from "helper/Notification";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "reducer/Order";

import { formatMoney } from "utils";

import ModalTable from "common/ModalTable";
import { useHistory } from "react-router";

const TITLE = "Đơn hàng";
const arrTitle = [
  "STT",
  "MÃ ĐƠN HÀNG",
  "TỔNG TIỀN",
  "NGÀY ĐẶT",
  "THANH TOÁN",
  "TRẠNG THÁI",
  "MÃ NHÂN VIÊN",
  "TÊN NHÂN VIÊN",
  "TÊN NHÀ THUỐC",
  "ĐỊA CHỈ",
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
    title: "Chưa duyệt",
    value: 0,
  },
  {
    title: "Đã duyệt ",
    value: 1,
  },
  {
    title: "Đang giao ",
    value: 2,
  },
  {
    title: "Thành công",
    value: 3,
  },
  {
    title: "Đã hủy",
    value: 4,
  },
];

export default function OrderPage() {
  const [hidden, display, loading] = useLoading();
  const listOrder = useSelector((state) => state.Order);
  const [modal, setModal] = useState(false);
  const [detail, setDetail] = useState();
  const [search, setSearch] = useState("");
  const [option, setOption] = useState(-1);
  const currentUser = useSelector((state) => state.CurrentUser);
  const dispatch = useDispatch();
  const history = useHistory();
  const getOrder = async () => {
    try {
      display();
      const res = await getListOrder();
      if (res.status === 200) {
        hidden();
        dispatch(addOrder(res.data));
      }
    } catch (err) {
      console.log(err);
      hidden();
    }
  };
  useEffect(() => {
    document.title = TITLE;
    getOrder();
  }, []);

  let listOrderTemp = [];

  if (listOrder.length > 0) {
    listOrderTemp = listOrder
      .filter((value) => {
        return (
          value.madh
            .toLowerCase()
            .trim()
            .indexOf(search.toLowerCase().trim()) !== -1 ||
          value.nhathuoc.tennhathuoc
            .toLowerCase()
            .trim()
            .indexOf(search.toLowerCase().trim()) !== -1
        );
      })
      .map((value) => {
        let trangthai = "";
        if (value.trangthai === 0) {
          trangthai = "Chưa duyệt";
        } else if (value.trangthai === 1) {
          trangthai = "Đã duyệt";
        } else if (value.trangthai === 2) {
          trangthai = "Đang giao";
        } else if (value.trangthai === 3) {
          trangthai = "Thành công";
        } else {
          trangthai = "Đã hủy";
        }
        return {
          madh: value.madh,
          tongtien: `${formatMoney(value.tongtien.toString())}đ`,
          ngaydat: value.ngaydat.slice(0, 19),
          hihinhthucthanhtoan:
            value.hinhthucthanhtoan === 2 ? "Trực tuyến" : "Tiền mặt",
          trangthaidonhang: trangthai,
          manv: value.nhanvien ? value.nhanvien.manv : "",
          hoten: value.nhanvien
            ? `${value.nhanvien.ho} ${value.nhanvien.ten}`
            : "",
          tennhathuoc: value.nhathuoc.tennhathuoc,
          diachi: value.nhathuoc.diachi,
        };
      });
  }

  if (Number.parseInt(option) > -1 && listOrderTemp.length > 0) {
    listOrderTemp = listOrderTemp.filter((value) => {
      if (Number.parseInt(option) === 0) {
        return value.trangthaidonhang === "Chưa duyệt";
      } else if (Number.parseInt(option) === 1) {
        return value.trangthaidonhang === "Đã duyệt";
      } else if (Number.parseInt(option) === 2) {
        return value.trangthaidonhang === "Đang giao";
      } else if (Number.parseInt(option) === 3) {
        return value.trangthaidonhang === "Thành công";
      }
    });
  }
  let listProductDetailTemp = [];
  if (listOrder.length > 0 && detail) {
    listProductDetailTemp = listOrder
      .filter((value) => {
        return value.madh === detail.madh;
      })[0]
      .listCTDH.map((value) => {
        return {
          masp: value.sanpham.masp,
          tensp: value.sanpham.tensp,
          hinhanh: value.sanpham.photo,
          soluong: value.soluong,
          dongia: `${formatMoney(value.giaban.toString())}đ`,
          thanhtien: `${formatMoney(
            (value.sanpham.dongia * value.soluong).toString()
          )}đ`,
        };
      });
  }
  const onUpdate = async (value) => {
    if (window.confirm("Bạn có chắc chắn cập nhật đơn hàng ?")) {
      if (value.trangthaidonhang === "Đã hủy") {
        notificationErorr("Đơn hàng đã ở trạng thái hủy", 3000);
      } else if (value.trangthaidonhang === "Thành công") {
        notificationErorr("Đơn hàng đã ở trạng thái thành công", 3000);
      } else {
        try {
          display();
          const res = await updateStatusOrder(value.madh, currentUser.manv);
          if (res.status === 200) {
            hidden();
            getOrder();
            notificationSuccess("Cập nhật thành công", 1000);
            getListOrder();
          }
        } catch (err) {
          notificationErorr("Cập nhật thất bại", 3000);
          hidden();
        }
      }
    }
  };
  const onCancle = async (value) => {
    if (window.confirm("Bán có chắc chắn hủy đơn hàng ?")) {
      if (value.trangthaidonhang === "Đã hủy") {
        notificationErorr("Đơn hàng đã ở trạng thái hủy", 3000);
      } else if (value.trangthaidonhang === "Thành công") {
        notificationErorr("Đơn hàng đã ở trạng thái thành công", 3000);
      } else {
        try {
          display();
          let temp = listOrder.filter((values) => {
            return values.madh === value.madh;
          });
          let payment = temp[0].paymentcreated;
          console.log(temp);
          if (payment) {
            const res = await Promise.all([
              cancleOrder(value.madh, currentUser.manv),
              refundPayment({
                pi: payment,
              }),
            ]);

            if (res[0].status === 200) {
              hidden();
              getOrder();
              notificationSuccess(
                "Đơn hàng hủy thành công và tiền đã được refund",
                1000
              );
            }
          } else {
            const res = await cancleOrder(value.madh, currentUser.manv);
            if (res.status === 200) {
              hidden();
              getOrder();
              notificationSuccess("Hùy đơn hàng thành công", 1000);
            }
          }
        } catch (err) {
          hidden();
          console.log(err);
          notificationErorr("Hủy thất bại", 3000);
        }
      }
    }
  };

  const onDetail = (value) => {
    setModal(true);
    setDetail(value);
  };
  const onAdd = () => {
    history.push("/don-hang/them");
  };
  return (
    <>
      <Table
        title="ĐƠN HÀNG"
        arrTitle={arrTitle}
        arrContent={listOrderTemp}
        setSearch={setSearch}
        setOption={setOption}
        arrOption={arrOption}
        onAdd={onAdd}
        arrActivity={[
          {
            title: "Cập nhật",
            icon: "update",
            color: "lime",
            onClick: onUpdate,
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
          title="CHI TIẾT ĐƠN HÀNG"
          arrContent={listProductDetailTemp}
          searchNull={true}
        />
      </ModalTable>
      {loading}
    </>
  );
}
