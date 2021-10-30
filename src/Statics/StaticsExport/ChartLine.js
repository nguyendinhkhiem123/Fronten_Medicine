import { useEffect, useState } from "react";
import Chart from "chart.js";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";

import Button from "@material-tailwind/react/Button";
import InputNumber from "common/InputNumber";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schmeStatisYear } from "hookform";

import useLoading from "hook/HookLoading";
import { notificationErorr } from "helper/Notification";

import { getStaticsYear } from "api/Statics";

let myChart = null;
export default function ChartLine() {
  const date = new Date();
  const [hidden, display, Loading] = useLoading();

  const [year, setYear] = useState();
  const [statics, setStatics] = useState({
    nowYear: [],
    oldYear: [],
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schmeStatisYear),
  });

  useEffect(() => {
    reset({
      nam: date.getFullYear(),
    });
    getStaticsYears(date.getFullYear());
    document.title = "Thống kê";
  }, []);

  const getStaticsYears = async (nam) => {
    try {
      display();
      const res = await Promise.all([
        getStaticsYear(nam),
        getStaticsYear(nam - 1),
      ]);

      if (res[0].status === 200 && res[1].status === 200) {
        // if (res[0].data.length === 0) {
        //   notificationErorr("Không có dữ liệu thống kê năm hiện tại", 3000);
        // } else if (res[1].data.length === 0) {
        //   notificationErorr("Không có dữ liệu thống kê năm cũ", 3000);
        // } else if (res[0].data.length === 0 && res[1].data.length === 0) {
        //   notificationErorr("Không có dữ liệu thống kê 2 năm", 3000);
        // }
        const body = {
          newYear: res[0].data,
          oldYear: res[1].data,
        };
        hidden();
        setYear(nam);
        setStatics(body);
      }
    } catch (err) {
      hidden();
      console.log(err);
    }
  };
  const onSubmitYear = (value) => {
    console.log(value);
    getStaticsYears(value.nam);
  };

  let objectStaticYear = (() => {
    let arrOldYear = [];
    for (let i = 0; i < 12; i++) {
      arrOldYear[i] = 0;
    }
    statics.oldYear?.forEach((value) => {
      arrOldYear[value.thang - 1] = value.tien;
    });

    let arrNewYear = [];
    for (let i = 0; i < 12; i++) {
      arrNewYear[i] = 0;
    }
    statics.newYear?.forEach((value) => {
      arrNewYear[value.thang - 1] = value.tien;
    });
    return {
      oldYear: arrOldYear,
      newYear: arrNewYear,
    };
  })();
  useEffect(() => {
    //   window.myLine.destroy();
    // document.getElementById("line-chart")?.remove();
    // let i = document.getElementById("chart-container").append('<canvas id="line-chart"></canvas>');
    // console.log(i)
    let ctx = document.getElementById("line-chart").getContext("2d");
    
    if(myChart !== null){
        myChart.destroy();
    }
    myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "Steptember",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: year,
            backgroundColor: "#03a9f4",
            borderColor: "#03a9f4",
            data: objectStaticYear.newYear,
            fill: false,
          },
          {
            label: year - 1,
            fill: false,
            backgroundColor: "#ff9800",
            borderColor: "#ff9800",
            data: objectStaticYear.oldYear,
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
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: "rgba(17,17,17,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Month",
                fontColor: "white",
              },
              gridLines: {
                display: false,
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(0, 0, 0, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: "rgba(17,17,17,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
                fontColor: "white",
              },
              gridLines: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: false,
                color: "rgba(17, 17, 17, 0.15)",
                zeroLineColor: "rgba(33, 37, 41, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    });
  }, [statics]);

  return (
    <Card>
      <CardHeader color="orange" contentPosition="left">
        <h2 className="text-white text-2xl">
          Biểu đô so sánh doanh thu hai năm
        </h2>
      </CardHeader>
      <CardBody>
        <div className="mb-10">
          <form onSubmit={handleSubmit(onSubmitYear)}>
            <div className="flex gap-x-6 items-start flex-wrap">
              <InputNumber
                register={register}
                errors={errors.nam}
                name="nam"
                icon="today"
                placeholder="Nhập năm"
              />
              <Button type="submit" color="green" ripple="light">
                <div className="flex items-center">
                  <span class="material-icons">add</span>
                  Thống kê
                </div>
              </Button>
            </div>
          </form>
        </div>
        <div className="relative h-96" id="chart-container">
          <canvas id="line-chart"></canvas>
        </div>
      </CardBody>
      {Loading}
    </Card>
  );
}
