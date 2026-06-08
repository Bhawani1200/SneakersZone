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

import React, { useState } from "react";
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

  const handleGoogleButtonClick = () => {
    const clientId =
      import.meta.env.VITE_GOOGLE_CLIENT_ID ||
      "564478148906-8n9gfv4e402h2f33i7g4rjg12cda472d.apps.googleusercontent.com";
    const redirectUri = window.location.origin + "/auth/google/callback";
    const nonce = Math.random().toString(36).substring(2);
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: "id_token",
      scope: "openid email profile",
      nonce,
      prompt: "select_account",
    });

    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const popup = window.open(
      `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`,
      "google-login",
      `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no`
    );

    if (!popup) {
      toast.error("Popup was blocked. Please allow popups for this site.");
      return;
    }

    const timer = setInterval(() => {
      try {
        if (popup.closed) {
          clearInterval(timer);
          return;
        }
        const hash = popup.location.hash;
        if (hash && hash.includes("id_token")) {
          const hashParams = new URLSearchParams(hash.substring(1));
          const idToken = hashParams.get("id_token");
          if (idToken) {
            clearInterval(timer);
            popup.close();
            dispatch(
              authenticateGoogleLoginUser(idToken, toast, navigate, setLoader)
            );
          }
        }
      } catch (e) {
        // Cross-origin — popup still on Google's domain, safe to ignore
      }
    }, 300);
  };

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

          <button
            type="button"
            onClick={handleGoogleButtonClick}
            className="flex items-center justify-center gap-3 w-full border border-gray-300 rounded-md px-4 py-2.5 bg-white hover:bg-gray-50 transition-colors shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="22" height="22">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              <path fill="none" d="M0 0h48v48H0z"/>
            </svg>
            <span className="text-sm font-semibold text-gray-700">Sign in with Google</span>
          </button>
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
