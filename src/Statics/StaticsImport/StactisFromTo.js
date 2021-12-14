import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Button from "@material-tailwind/react/Button";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schmeStatisFromTo } from "hookform";
import useLoading from "hook/HookLoading";
import { useEffect, useState } from "react";

import { formatMoney } from 'utils';
import InputDate from "../../common/InputDate";
import { getStaticsImportFromTo } from "api/Statics";
export default function PageVisitsCard() {
  const date = new Date();
  const [hidden, display, Loading] = useLoading();
  const [listData, setListData] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schmeStatisFromTo),
  });

  useEffect(() => {
    let month = date.getMonth() + 1 < 10 ? '0'+date.getMonth() + 1 : date.getMonth() + 1
    let day = date.getDate()  < 10 ? '0'+date.getDate() : date.getDate() 

    reset({
        tungay :  `${date.getFullYear()}-${month}-${day}`,
        denngay : `${date.getFullYear()}-${month}-${day}`,
    })
    getStaticsFromTos(
        `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
        `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      );
  }, []);

  const getStaticsFromTos = async (from, to) => {
    try {
      display();
      const res = await getStaticsImportFromTo(from, to);
      console.log(res);
      if (res.status === 200) {
        hidden();
        setListData(res.data);
      }
    } catch (err) {
      hidden();
      console.log(err);
    }
  };
  const onSubmitFromTo = (value) => {
    const from = new Date(value.tungay);
    const to = new Date(value.denngay);
    console.log(to)
    console.log(
      `${from.getFullYear()}-${from.getMonth() + 1}-${from.getDate()}`,`${to.getFullYear()}-${to.getMonth() + 1}-${to.getDate()}`
    );
    getStaticsFromTos(
      `${from.getFullYear()}-${from.getMonth() + 1}-${from.getDate()}`,
      `${to.getFullYear()}-${to.getMonth() + 1}-${to.getDate()}`
    );
  };
  return (
    <Card>
      <CardHeader color="blue" contentPosition="none">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-white text-2xl">Bảng thống kê chi phí nhập hàng</h2>
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
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  STT
                </th>
                <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  Ngày
                </th>
                <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  Chí phí
                </th>
              </tr>
            </thead>
            <tbody>
              {listData.length > 0 ? (
                listData.map((value, index) => {
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
      </CardBody>
      {Loading}
    </Card>
  );
}
