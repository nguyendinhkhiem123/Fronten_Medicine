import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import H6 from "@material-tailwind/react/Heading6";

import SidebarItem from "common/SidebarItem";

import { getListCategory } from "api/Category";
import { addListCategory } from "reducer/Category";

import { useSelector, useDispatch } from "react-redux";

import  useLoading from '../hook/HookLoading';

export default function Sidebar() {
  const [showSidebar, setShowSidebar] = useState("-left-64");
  const [collapse, setCollapse] = useState(false);

  const [ hidden , display , loading ] = useLoading();

  const category = useSelector((state) => state.Category);
  const dispatch = useDispatch();

  const onClick = () => {
    const temp = collapse;
    setCollapse(!temp);
  };

  const getCategory = async () => {
    try {
      display();
      const res = await getListCategory();
      if (res.status === 200) {
        dispatch(addListCategory(res.data));
        hidden()
      }
    } catch (err) {
      console.log(err);
      hidden();
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const navTemp = [
    {
      title: "THỐNG KÊ",
      icon: "dashboard",
      link: "/",
      sub: [],
    },
    {
      title: "DANH MỤC",
      icon: "folder",
      link: "",
      sub: [
        {
          title: "QUẢN LÍ",
          icon: "description",
          link: "/quan-ly-danh-muc",
        },
      ],
    },
    {
      title: "NHÀ THUỐC",
      icon: "map",
      link: "/nha-thuoc",
      sub: [],
    },
    {
      title: "NHÂN VIÊN",
      icon: "badge",
      link: "/nhan-vien",
      sub: [],
    },
    {
      title: "NHẬP HÀNG",
      icon: "list_alt",
      link: "/nhap-hang",
      sub: [],
    },
    {
      title: "ĐƠN HÀNG",
      icon: "payments",
      link: "/don-hang",
      sub: [],
    },
    {
      title: "BÌNH LUẬN",
      icon: "question_answer",
      link: "/binh-luan",
      sub: [],
    },
    {
      title: "ĐÁNH GIÁ",
      icon: "thumb_up",
      link: "/danh-gia",
      sub: [],
    },
  ];

  if (category.length > 0) {
    category.forEach((element) => {
      navTemp[1].sub.push({
        title: element.tendm,
        icon: "category",
        link: `/danh-muc/${element.madm}`,
      });
    });
  }
  const listNavMap = navTemp.map((value, index) => {
    if (value.sub.length > 0) {
      const height = value.sub.length * 56;
      return (
        <div className="overflow-hidden " key={index}>
          <li className="rounded-lg mb-2 ">
            <div
              onClick={onClick}
              className="flex cursor-pointer items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
            >
              <span className="material-icons">{value.icon}</span>
              {value.title}
              <span
                class={` block material-icons transition-all duration-300 ease-linear `}
                style={{
                  transform: collapse ? "rotate(90deg)" : "none",
                }}
              >
                chevron_right
              </span>
            </div>
          </li>
          <ul
            className="transition-all linear duration-500 ml-4 pr-2 overflow-y-scroll scroll"
            style={{
              height: !collapse ? "0" : `${height}px`,
            }}
          >
            {value.sub.length > 0
              ? value.sub.map((valueSub, indexSub) => {
                  return (
                    <SidebarItem
                      title={valueSub.title}
                      link={valueSub.link}
                      icon={valueSub.icon}
                      key={indexSub}
                    />
                  );
                })
              : null}
          </ul>
        </div>
      );
    } else {
      return (
        <SidebarItem
          title={value.title}
          link={value.link}
          icon={value.icon}
          key={index}
        />
      );
    }
  });
  return (
    <>
      <AdminNavbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div
        className={`scroll after:h-10 h-screen fixed top-0 md:left-0 ${showSidebar} overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-white w-64 z-10 py-4 px-2 transition-all duration-300`}
      >
        <div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative">
          <Link
            to="/"
            rel="noreferrer"
            className=" cursor-pointer mt-2  w-full gap-x-2 flex items-end justify-center"
          >
             <span className="material-icons text-6xl inline-block text-blue-500">bloodtype</span>
            <H6 color="gray">
              NHÀ THUỐC
            </H6>
          </Link>
          <div className="flex flex-col">
            <hr className="my-4 min-w-full" />
            <ul className="flex-col min-w-full flex list-none">{listNavMap}</ul>
            <ul className="flex-col min-w-full flex list-none  mt-4">
              <li className="bg-gradient-to-tr from-purple-500 to-purple-700 px-4 rounded-lg text-white">
                <Link
                  to="/logout"
                  className="flex items-center justify-center gap-4 text-sm font-light py-3"
                >
                  Đăng xuất
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {loading}
    </>
  );
}
