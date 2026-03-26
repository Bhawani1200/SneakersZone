import React from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const InputField = ({
  label,
  id,
  type,
  errors,
  register,
  required,
  className,
  message,
  min,
  value,
  placeholder,
  showPassword,
  onTogglePassword,
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label
        htmlFor={id}
        className={`${className ? className : ""} font-semibold text-sm text-slate-800`}
      >
        {label}
      </label>

      <div className="relative w-full">
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          className={`
            ${className ? className : ""}
            w-full px-2 py-2 pr-12 border bg-white rounded-md text-slate-800 outline-hidden
            ${errors[id]?.message ? "border-red-500" : "border-slate-700"}
          `}
          {...register(id, {
            required: { value: required, message },
            minLength: min
              ? { value: min, message: `Minimum ${min} characters required` }
              : null,
            pattern:
              type === "email"
                ? {
                    value: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+com+$/,
                    message: "Invalid email",
                  }
                : type === "url"
                  ? {
                      value:
                        /^(https?:\/\/)?(([a-zA-Z0-9\u00a1-\uffff-]+\.)+[a-zA-Z\u00a1-\uffff]{2,})(:\d{2,5})?(\/[^\s]*)?$/,
                      message: "Please enter a valid URL",
                    }
                  : null,
          })}
        />

        {id === "password" && (
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-xl text-gray-500 hover:text-black"
            onClick={onTogglePassword}
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </span>
        )}
      </div>

      {errors[id]?.message && (
        <p className="text-sm font-semibold mt-0 text-red-600">
          {errors[id]?.message}
        </p>
      )}
    </div>
  );
};

export default InputField;
