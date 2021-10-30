import React from "react";

export default function InputSelection({
  icon,
  placeholder,
  arrOption,
  title,
  disable,
  setOption,
}) {
    const onChange = (e)=>{
        setOption(e.target.value)
    }
  return (
    <div className="mb-1">
      <div className="relative">
      <span class="material-icons absolute left-2 top-1 text-2xl  text-gray-500">
        tune
      </span>
        <select onChange={onChange}
          className=  {` group w-full outline-none font-light pr-4 pl-12 py-3 border-b-[3px] text-sm ${
            "border-gray-400  focus:border-blue-400"
          } `}
          placeholder={placeholder}
          disabled={disable}

        >
          {arrOption && arrOption.length > 0
            ? arrOption.map((valueOne, index) => {
                return (
                  <option
                    className="font-light"
                    key={index}
                    value={valueOne.value}
                  >
                    {valueOne.title}
                  </option>
                );
              })
            : null}
        </select>
      </div>
    </div>
  );
}
