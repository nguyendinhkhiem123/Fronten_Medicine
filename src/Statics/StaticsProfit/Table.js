import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schmeStatisFromTo } from "hookform";

import useLoading from "hook/HookLoading";
import { useEffect, useState } from "react";

import { getStaticsImportFromTo, getStaticsFromTo } from "api/Statics";
import InputDate from "../../common/InputDate";
import Button from "@material-tailwind/react/Button";
import { formatMoney } from "utils";
import StaticsProfit from ".";

export default function PageVisitsCard() {
  const date = new Date();
  const [hidden, display, Loading] = useLoading();
  const [statics, setStatics] = useState({
    order: [],
    import: [],
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schmeStatisFromTo),
  });

  useEffect(() => {
    let month =
      date.getMonth() + 1 < 10
        ? "0" + date.getMonth() + 1
        : date.getMonth() + 1;
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

    reset({
      tungay: `${date.getFullYear()}-${month}-${day}`,
      denngay: `${date.getFullYear()}-${month}-${day}`,
    });

    getStaticsFromTos(
      `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
      `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    );
  }, []);

  const getStaticsFromTos = async (from, to) => {
    try {
      display();
      const res = await Promise.all([
        getStaticsFromTo(from, to),
        getStaticsImportFromTo(from, to),
      ]);

      if (res[0].status === 200 && res[1].status === 200) {
        const body = {
          order: res[0].data,
          import: res[1].data,
        };
        hidden();
        setStatics(body);
      }
    } catch (err) {
      hidden();
      console.log(err);
    }
  };

  const onSubmitFromTo = (value) => {
    const from = new Date(value.tungay);
    const to = new Date(value.denngay);
    console.log(to);
    console.log(
      `${from.getFullYear()}-${from.getMonth() + 1}-${from.getDate()}`,
      `${to.getFullYear()}-${to.getMonth() + 1}-${to.getDate()}`
    );
    getStaticsFromTos(
      `${from.getFullYear()}-${from.getMonth() + 1}-${from.getDate()}`,
      `${to.getFullYear()}-${to.getMonth() + 1}-${to.getDate()}`
    );
  };

  const total = (arr) => {
    let sum = 0;
    if (arr.length > 0) {
      arr.forEach((value) => {
        sum += value.tien;
      });
    }

    return sum;
  };
  return (
    <Card>
      <CardHeader color="purple" contentPosition="none">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-white text-2xl">
            Bảng doanh thu và chi phí doanh thu theo từng tháng
          </h2>
        </div>
      </CardHeader>
      <CardBody>
        <form className="mb-10" onSubmit={handleSubmit(onSubmitFromTo)}>
          <div className="flex gap-x-6 items-start flex-wrap">
            <InputDate
              register={register}
              errors={errors.tungay}
              name="tungay"
              icon="today"
              placeholder="Ngày bắt đầu"
            />
            <InputDate
              register={register}
              errors={errors.denngay}
              name="denngay"
              icon="today"
              placeholder="Ngày kết thúc"
            />
            <Button type="submit" color="green" ripple="light">
              <div className="flex items-center">
                <span class="material-icons">add</span>
                Thống kê
              </div>
            </Button>
          </div>
        </form>
        <div className="overflow-x-auto scroll max-h-[700px]">
          <h2 className="font-light text-3xl">Bảng thống kê bán hàng</h2>
          <table className="items-center w-full bg-transparent border-collapse mt-2">
            <thead>
              <tr>
                <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  STT
                </th>
                <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  Ngày
                </th>
                <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  Doanh thu
                </th>
              </tr>
            </thead>
            <tbody>
              {statics.order.length > 0 ? (
                statics.order.map((value, index) => {
                  return (
                    <tr key={index}>
                      <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                        {index + 1}
                      </th>
                      <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                        {value.ngay}
                      </td>
                      <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                        {formatMoney(value.tien.toString())}đ
                      </td>
                    </tr>
                  );
                })
              ) : (
                <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                  Không có dữ liệu
                </th>
              )}
            </tbody>
          </table>
        </div>
        <div className="overflow-x-auto scroll max-h-[700px] mt-10">
          <h2 className="font-light text-3xl">Bảng thống kê nhập hàng</h2>
          <table className="items-center w-full bg-transparent border-collapse mt-2">
            <thead>
              <tr>
                <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  STT
                </th>
                <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  Ngày
                </th>
                <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  Doanh thu
                </th>
              </tr>
            </thead>
            <tbody>
              {statics.import.length > 0 ? (
                statics.import.map((value, index) => {
                  return (
                    <tr key={index}>
                      <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                        {index + 1}
                      </th>
                      <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                        {value.ngay}
                      </td>
                      <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                        {formatMoney(value.tien.toString())}đ
                      </td>
                    </tr>
                  );
                })
              ) : (
                <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                  Không có dữ liệu
                </th>
              )}
            </tbody>
          </table>
        </div>
        <div className="text-right flex flex-col gap-y-3 mt-12">
          <div className="font-bold text-2xl">Tổng lợi nhuận  </div>
          <div>
            Doanh thu :{" "}
            <span className="font-bold">
              {" "}
              {formatMoney(total(statics.order).toString())}đ
            </span>
          </div>
          <div>
            Chi phí :{" "}
            <span className="font-bold">
              {formatMoney(total(statics.import).toString())}đ
            </span>
          </div>
          <div>
            Lợi nhuận :{" "}
            <span className="font-bold">
              {formatMoney(
                (total(statics.order) - total(statics.import)).toString()
              )}
              đ
            </span>
          </div>
        </div>
      </CardBody>
      {Loading}
    </Card>
  );
}
