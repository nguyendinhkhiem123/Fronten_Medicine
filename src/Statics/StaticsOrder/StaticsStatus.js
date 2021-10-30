import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Button from "@material-tailwind/react/Button";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schmeStatisFromTo } from "hookform";
import useLoading from "hook/HookLoading";
import { useEffect, useState } from "react";

import { getStatusOrder } from "api/Statics";
import InputDate from "../../common/InputDate";
import Chart from 'chart.js'
let myChartOne = null;
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
    let month =
      date.getMonth() + 1 < 10
        ? "0" + date.getMonth() + 1
        : date.getMonth() + 1;
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

    reset({
      tungay: `${date.getFullYear()}-${month}-${day}`,
      denngay: `${date.getFullYear()}-${month}-${day}`,
    });
    getStatisOrders(
      `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
      `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    );
  }, []);

  const getStatisOrders = async (from, to) => {
    try {
      display();
      const res = await getStatusOrder(from, to);
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
    console.log(to);
    console.log(
      `${from.getFullYear()}-${from.getMonth() + 1}-${from.getDate()}`,
      `${to.getFullYear()}-${to.getMonth() + 1}-${to.getDate()}`
    );
    getStatisOrders(
      `${from.getFullYear()}-${from.getMonth() + 1}-${from.getDate()}`,
      `${to.getFullYear()}-${to.getMonth() + 1}-${to.getDate()}`
    );
  };

  useEffect(() => {
    //   window.myLine.destroy();
    // document.getElementById("line-chart")?.remove();
    // let i = document.getElementById("chart-container").append('<canvas id="line-chart"></canvas>');
    // console.log(i)
    let ctx = document.getElementById("line-chart-double").getContext("2d");

    if (myChartOne !== null) {
        myChartOne.destroy();
    }
    myChartOne = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Chưa duyệt","Đã duyệt","Đang giao","Thành công", "Đã hủy"],
        datasets: [
          {
            label: "My First Dataset",
                data: listData.length > 0 ? listData.map((value)=>{
                    return value.sodon
                }) : []
            ,
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
              "rgb(12, 240, 79)",
              "rgb(239, 11, 49)"
            ],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Sales Charts",
          fontColor: "white",
        },
        legend: {
          labels: {
            fontColor: "black",
          },
          align: "end",
          position: "bottom",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
      },
    });
  }, [listData]);
  console.log(listData);
  return (
    <Card>
      <CardHeader color="purple" contentPosition="none">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-white text-2xl">
            Biểu đồ thống kê trạng thái đơn hàng{" "}
          </h2>
        </div>
      </CardHeader>
      <CardBody>
        <form className="mb-10" onSubmit={handleSubmit(onSubmitFromTo)}>
          <div className="flex gap-x-6 items-start flex-wrap ">
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
        <div className="relative h-96" >
          <canvas id="line-chart-double"></canvas>
        </div>
      </CardBody>
      {Loading}
    </Card>
  );
}
