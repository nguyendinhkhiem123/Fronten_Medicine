import React from "react";

export default function FormItem({
  icon,
  name,
  errors,
  placeholder,
  register,
  disable
}) {
  return (
    <div className="mb-1">
      <div className="relative">
        <span class="material-icons absolute left-2 top-0 text-2xl  text-gray-500">
          {icon}
        </span>
        <input
          name={name}
          type="date"
          className={`${disable? 'bg-gray-300' : ''} transition-all duration-300 ease-linear group w-full outline-none font-light pr-4 pl-12 py-2 border-b-[3px] text-sm ${
            errors ? "border-red-500" : "border-gray-500  focus:border-blue-500"
          } `}
          {...register(name)}
          disabled={disable}
          placeholder={placeholder}
        />
      </div>
      <i className="mt-2 inline-block text-red-600 text-sm">{errors?.message}</i>
    </div>
  );
}
