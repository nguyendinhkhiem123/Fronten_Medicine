import React from "react";
import NavbarInput from "@material-tailwind/react/NavbarInput";


export default function SearchBox({setSearch}) {
    const onChange = (e)=>{
        setSearch(e.target.value);
    }
  return (
    <div className="relative">
      <span class="material-icons absolute left-2 top-0 text-2xl  text-gray-500">
        search
      </span>
      <input
        type="text"
        className={`
        transition-all duration-300 ease-linear group w-full outline-none font-light pr-4 pl-12 py-2 border-b-[3px] text-sm ${
        "border-gray-500  focus:border-blue-500"
        } `}
        onChange={onChange}
        placeholder='Tìm kiếm'
      />
    </div>
  );
}
