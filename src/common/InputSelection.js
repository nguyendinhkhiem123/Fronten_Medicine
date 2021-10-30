import React from "react";

export default function InputSelection({
  icon,
  name,
  errors,
  placeholder,
  arrOption,
  register,
  title,
  disable,
}) {
  return (
    <div className="mb-1">
      <div className="relative">
        <span class="material-icons absolute left-2 top-0 text-2xl text-gray-500">
          {icon}
        </span>
        <select
          name={name}
          className={`${disable? 'bg-gray-400' : ''} group w-full outline-none font-light pr-4 pl-11 py-2 border-b-[3px] text-sm ${
            errors ? "border-red-500" : "border-gray-400  focus:border-blue-400"
          } `}
          {...register(name)}
          placeholder={placeholder}
          disabled={disable}
        >
          <option className="font-light" value="" disabled selected>
           {title}
          </option>
          {
          arrOption && arrOption.length > 0 ? 
          arrOption.map((valueOne, index) => {
            return (
              <option className="font-light" key={index} value={valueOne.value}>
                {valueOne.title}
              </option>
            );
          })
         : null
        }
        </select>
      </div>
      <i className="mt-2 inline-block text-red-600 text-sm">
        {errors?.message}
      </i>
    </div>
  );
}
