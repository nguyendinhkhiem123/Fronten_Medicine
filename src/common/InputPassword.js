import React , {useState} from "react";

export default function FormItem({ errors, register, disable }) {
  const [visibility, setVisility] = useState(false);
  const onClickVisility = () => {
    const temp = visibility;
    const password = document.getElementsByClassName("password");
    

    if (temp) {
        for(let i = 0 ; i < password.length ; i++){
            password[i].setAttribute('type' ,'password')
        }
       
    } else {
        for(let i = 0 ; i < password.length ; i++){
            password[i].setAttribute('type' ,'text')
        }
    }
    
    setVisility(!temp);
  };
  return (
    <div className="mb-1">
      <div className="relative">
        <div>
          <span class="material-icons absolute left-2 top-0 text-2xl text-gray-500">
            lock
          </span>
          <input
            type="password"
            placeholder="Mật khẩu"
            id="password"
            className={`${disable? 'bg-gray-100' : ''} group w-full outline-none font-light pr-4 pl-12 py-2 border-b-[3px] text-sm ${
                errors ? "border-red-500" : "border-gray-400  focus:border-blue-400 password"
              } `}
            {...register("password")}
          />
          {visibility ? (
            <span
              class="material-icons text-gray-500 absolute top-2 right-2 cursor-pointer"
              onClick={onClickVisility}
            >
              visibility_off
            </span>
          ) : (
            <span
              class="material-icons absolute top-2 right-2 text-gray-500 cursor-pointer"
              onClick={onClickVisility}
            >
              visibility
            </span>
          )}
        </div>
      </div>

      <i className="mt-2 inline-block text-red-600 text-sm transition-all ease-linear duration-200">
        {errors?.message}
      </i>
    </div>
  );
}
