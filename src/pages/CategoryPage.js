import React, { useEffect, useState } from "react";
import Table from "../common/Table";

import useLoading from "../hook/HookLoading";
import { notificationSuccess, notificationErorr } from "helper/Notification";

import { addListCategory } from "reducer/Category";
import { getCodeLast , insertCategory , getListCategory , updateCategory , deleteCategory } from "api/Category";
import { useDispatch, useSelector } from "react-redux";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Modal from "common/Modal";
import { schemaCategory } from "hookform";
import InputText from "../common/InputText";


import {
  INSERT_CATEGORY_SUCCESS,
  INSERT_CATEGORY_FAIL,
  DELELTE_CATEGORY_SUCCESS,
  DELELTE_CATEGORY_FAIL,
  UPDATE_CATEGORY_FAIL ,
  UPDATE_CATEGORY_SUCCESS
} from "constants/Respone";


const TITLE = "Danh mục";
const arrTitle = [
  "STT",
  "TÊN DANH MỤC",
  "MÃ DANH MỤC"
];

export default function CategoryPage() {
  const [hidden, display, Loading] = useLoading();
  const dispatch = useDispatch();
  const listCategory = useSelector((state) => state.Category);
  const [modalInsert, setModalInsert] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);

  const [ search , setSearch ] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaCategory),
  });

  const {
    register: registerUpdate,
    handleSubmit: handleSubmitUpdate,
    reset: resetUpdate,
    formState: { errors: errorsUpdate },
  } = useForm({
    resolver: yupResolver(schemaCategory),
  });

  const getCategory= async () => {
    try {
      display();
      const res = await getListCategory();
      if (res.status === 200) {
        hidden();
        let temp = [...res.data];
        dispatch(addListCategory(temp));
      }
    } catch (err) {
      hidden();
      console.log(err);
    }
  };

  useEffect(() => {
    document.title = TITLE;
    getCategory();
  }, []);

  const onUpdate = (value) => {
    resetUpdate(
       value
    )
    setModalUpdate(true);
   
  };
  const onAdd = async() => {
    try{
        display();
        const res = await getCodeLast();
        hidden();
        if(res.status === 200){
            let code = res.data.madm.slice(2,6);
            let codeNumber = Number.parseInt(code);
            codeNumber++;
            let codeTemp ="DM";
            if(codeNumber.toString().length > 0){
                for(let i = 0 ; i < codeNumber.toString().length ; i++){
                    codeTemp+='0';
                }
            }
            codeTemp+=codeNumber.toString();
            reset({
                madm : codeTemp
            })
            setModalInsert(true);
          
        }
    }catch(err){
        hidden();
        console.log(err)
    }
    
    
  };

  const onDelete = async (value) => {
    if (window.confirm("Bạn có chắc chắn xóa ?")) {
      try {
        display();
        const res = await deleteCategory(value.madm);
        if (res.status === 200) {
          notificationSuccess(DELELTE_CATEGORY_SUCCESS, 1000);
          hidden();
          getCategory();
        }
      } catch (err) {
        hidden();
        notificationErorr( DELELTE_CATEGORY_FAIL, 3000);
        console.log(err);
      }
    }
  };

  const handleSubmitInsert = async (value) => {
    try {
      display();
      const res = await insertCategory(value);
      if (res.status === 200) {
        notificationSuccess(INSERT_CATEGORY_SUCCESS, 1000);
        setModalInsert(false);
        reset({});
        hidden();
        getCategory();
      }
    } catch (err) {
      hidden();
      notificationErorr(INSERT_CATEGORY_FAIL, 3000);
      console.log(err);
    }
  };
  
  const handleSubmitUpdateS = async(value) => {
      if(window.confirm('Bạn có chắc chắn sửa ?')){
        try {
            display();
            const res = await updateCategory(value);
            if (res.status === 200) {
              notificationSuccess(UPDATE_CATEGORY_SUCCESS, 1000);
              setModalUpdate(false);
              resetUpdate({});
              hidden();
              getCategory();
            }
          } catch (err) {
            hidden();
            notificationErorr(UPDATE_CATEGORY_FAIL, 3000);
            console.log(err);
          }
      }
  };
  let temp = [];
  if(listCategory.length > 0){
      temp = listCategory.filter(value=>{
          return (
          value.madm.toLowerCase().trim().indexOf(search.toLowerCase().trim()) !== -1
          || value.tendm.toLowerCase().trim().indexOf(search.toLowerCase().trim()) !== -1
          )
      })
  }
  return (
    <>
      <Table 
        setSearch = {setSearch}
        onAdd={onAdd}
        title="DANH MỤC"
        arrTitle={arrTitle}
        arrContent={temp}
        arrActivity={[
          {
            title: "Sửa",
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

      <Modal
      key={1}
        modal={modalInsert}
        setModal={setModalInsert}
        title="Thêm danh mục"
        handleSubmit={handleSubmit(handleSubmitInsert)}
        reset={reset}
        arrInput={[
          <InputText
            name="madm"
            register={register}
            errors={errors.madm}
            value=""
            placeholder="Mã danh mục"
            icon="category"
            disable={true}
          />,
          <InputText
            name="tendm"
            register={register}
            errors={errors.tendm}
            value=""
            placeholder="Tên danh mục"
            icon="category"
          />,
           
        ]}
      />

      <Modal
        key={2}
        modal={modalUpdate}
        setModal={setModalUpdate}
        title="Sửa danh mục"
        reset={resetUpdate}
        handleSubmit={handleSubmitUpdate(handleSubmitUpdateS)}
        arrInput={[
            <InputText
            name="madm"
            register={registerUpdate}
            errors={errors.madm}
            value=""
            placeholder="Mã danh mục"
            icon="category"
            disable={true}
          />,
          <InputText
            name="tendm"
            register={registerUpdate}
            errors={errors.tendm}
            value=""
            placeholder="Tên danh mục"
            icon="category"
          />,
        ]}
      />
      {Loading}
    </>
  );
}
