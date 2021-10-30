import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";

import useLoading from "hook/HookLoading";
import { useEffect, useState } from "react";

import { getTopProductOrder , getTopProductImport } from "api/Statics";


const TOP = 10;
export default function PageVisitsCard() {
  const [hidden, display, Loading] = useLoading();
  const [listData, setListData] = useState([]);

  useEffect(() => {
    
    getStaticsFromTos(
        TOP
      );
  }, []);

  const getStaticsFromTos = async (from) => {
    try {
      display();
      const res = await getTopProductImport(from);
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
  return (
    <Card>
      <CardHeader color="purple" contentPosition="none">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-white text-2xl">Top 10 sản phẩm đã nhập vào</h2>
        </div>
      </CardHeader>
      <CardBody>
        <div className="overflow-x-auto scroll max-h-[700px]">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  STT
                </th>
                <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  Mã sản phẩm
                </th>
                <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                    Tên sản phẩm
                </th>
                <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  Số lượng
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
                        {value.masp}
                      </td>
                      <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                        {value.tensp}
                      </td>
                      <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                        {value.soluong}
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
