import React, { useEffect } from "react";

export default function InputImage({
  icon,
  name,
  errors,
  placeholder,
  register,
  watch,
  disable,
  src,
}) {
  const fileList = watch("photo"); // Theo dõi file input file
  if (fileList && fileList.length > 0) {
    // const file = fileList[0];
    // const arr = document.getElementsByClassName("image");

    // for (let i = 0; i < arr.length; i++) {
    //   arr[i].src = URL.createObjectURL(file);
    // }
  }

  
  return (
    <div className="mb-1">
      <div className="relative">
        <span class="material-icons absolute left-2 top-2 text-gray-500">
          {icon}
        </span>
        <input
          name={name}
          type="file"
          accept="image/*"
          className={`${
            disable ? "bg-gray-300" : ""
          }  transition-all duration-300 ease-linear group w-full outline-none font-light pr-4 pl-12 py-2 border-b-[3px] text-sm  ${
            errors ? "border-red-500" : "border-gray-500  focus:border-blue-500"
          } `}
          placeholder={placeholder}
          {...register(name)}
          disabled={disable}
        />
        {}
        {/* <div className="m-2">
          <img className="w-4/12 image" src={src} />
        </div> */}
      </div>
      <i className="mt-2 inline-block text-red-600 text-sm">
        {errors?.message}
      </i>
    </div>
  );
}
