// import React, { useState } from "react";
// import InputField from "../shared/InputField";
// import { AiOutlineEye, AiOutlineLogin } from "react-icons/ai";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { useForm } from "react-hook-form";
// import Spinners from "../shared/Spinners";
// import { authenticateLoginUser } from "../../store/actions";
// import toast from "react-hot-toast";

// const Login = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [loader, setLoader] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const togglePassword = () => setShowPassword(!showPassword);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm({
//     mode: "onTouched",
//   });

//   const loginHandler = async (data) => {
//     console.log("Click login");
//     dispatch(authenticateLoginUser(data, toast, reset, navigate, setLoader));
//   };

//   return (
//     <div className="min-h-[calc(100vh-64px)] flex justify-center items-center ]">
//       <form
//         onClick={handleSubmit(loginHandler)}
//         className="sm:w-112.5 w-90 shadow-[0_4px_12px_rgba(0,0,0,0.15)] py-8  sm:px-8 px-4 rounded-md"
//       >
//         <div className="flex flex-col items-center justify-center space-y-4">
//           <AiOutlineLogin className="text-slate-800 text-5xl" />
//           <h1 className="text-slate-800 text-center text-montserrat lg:text-3xl text-3xl font-bold">
//             Login Here
//           </h1>
//         </div>
//         <hr className="mt-2 mb-5 text-black" />
//         <div className="flex flex-col gap-3">
//           <InputField
//             label="UserName"
//             required
//             id="username"
//             type="text"
//             message="*Username is required"
//             placeholder="Enter your name"
//             register={register}
//             errors={errors}
//           />

//           <InputField
//             label="Password"
//             required
//             id="password"
//             type={showPassword ? "text" : "password"}
//             message="*Password is required"
//             placeholder="Enter your password"
//             register={register}
//             errors={errors}
//             showPassword={showPassword}
//             onTogglePassword={togglePassword}
//           />
//         </div>
//         <button
//           disabled={loader}
//           type="submit"
//           className="bg-linear-to-r from-purple-500 to-pink-600 flex gap-2 justify-center items-center text-white font-semibold w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-xs my-3"
//         >
//           {loader ? (
//             <>
//               {" "}
//               <Spinners />
//               Loading...
//             </>
//           ) : (
//             <>Login</>
//           )}
//         </button>
//         <p className="text-slate-800 text-center mt-6 text-sm">
//           Don't have an account?
//           <Link
//             className="font-semibold underline hover:text-black "
//             to="/register"
//           >
//             <span>SignUp</span>
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;

import React, { useState, useEffect } from "react";
import InputField from "../shared/InputField";
import { AiOutlineEye, AiOutlineLogin } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Spinners from "../shared/Spinners";
import {
  authenticateLoginUser,
  authenticateGoogleLoginUser,
} from "../../store/actions";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const loginHandler = async (data) => {
    console.log("Click login");
    dispatch(authenticateLoginUser(data, toast, reset, navigate, setLoader));
  };

  const handleGoogleLoginResponse = (response) => {
    const { credential } = response;
    dispatch(
      authenticateGoogleLoginUser(credential, toast, navigate, setLoader),
    );
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id:
            import.meta.env.VITE_GOOGLE_CLIENT_ID ||
            "564478148906-8n9gfv4e402h2f33i7g4rjg12cda472d.apps.googleusercontent.com",
          callback: handleGoogleLoginResponse,
        });

        window.google.accounts.id.renderButton(
          document.getElementById("google-login-button"),
          {
            theme: "outline",
            size: "large",
            text: "continue_with",
            shape: "rectangular",
            width: "360",
          },
        );
      }
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [dispatch]);

  return (
    <div className="min-h-[calc(100vh-80px)] flex justify-center items-center text-gray-900 bg-gray-50/50 font-bodyFont py-12 px-6 sm:px-12">
      <form
        onSubmit={handleSubmit(loginHandler)}
        className="w-full max-w-[440px] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100/80 py-10 px-8 sm:px-10 rounded-[32px] bg-white"
      >
        {/* HEADER */}
        <div className="flex flex-col space-y-1 mb-6">
          <h1 className="text-[#111] text-4xl md:text-5xl font-bold tracking-tight">
            Welcome !
          </h1>
          <h2 className="text-[#111] text-2xl md:text-3xl font-bold tracking-tight pb-5">
            Log into your account
          </h2>

          {/* Google Sign-In Integrated Button */}
          <div className="flex justify-center items-center w-full mt-2 min-h-[46px]">
            <div
              id="google-login-button"
              className="w-full flex justify-center"
            ></div>
          </div>
        </div>

        <div className="relative flex py-4 items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="shrink-0 px-4 text-gray-400 text-sm font-semibold">
            or continue with email
          </span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* INPUTS */}
        <div className="flex flex-col gap-4 mt-1">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="username"
              className="text-base font-bold text-[#111]"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              {...register("username", { required: true })}
              id="username"
              type="text"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-md px-4 py-2.5 outline-none focus:border-blue-600 transition-colors placeholder:text-gray-400 text-base"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-0.5">
                *Username is required
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1 relative">
            <label
              htmlFor="password"
              className="text-base font-bold text-[#111]"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                {...register("password", { required: true })}
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-md px-4 py-2.5 outline-none focus:border-blue-600 transition-colors placeholder:text-gray-400 text-base"
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
              >
                <AiOutlineEye className="text-xl" />
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-0.5">
                *Password is required
              </p>
            )}
          </div>

          <div className="flex w-full mt-1">
            <a
              href="#"
              className="text-blue-600 text-[15px] font-bold hover:underline"
            >
              Forgot password ?
            </a>
          </div>
        </div>

        {/* BUTTON */}
        <button
          disabled={loader}
          type="submit"
          className="mt-5 bg-[#2563EB] hover:bg-blue-700 flex gap-2 justify-center items-center text-white text-lg font-bold w-full py-3 rounded-full shadow-md transition-colors"
        >
          {loader ? (
            <>
              <Spinners />
              Logging in...
            </>
          ) : (
            "Log in"
          )}
        </button>

        {/* FOOTER */}
        <p className="text-gray-500 text-center mt-5 text-base font-medium">
          Don't you have an account?{" "}
          <Link
            className="text-[#2563EB] text-base font-bold hover:underline"
            to="/register"
          >
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
