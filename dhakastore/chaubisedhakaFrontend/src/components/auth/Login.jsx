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
import { authenticateLoginUser } from "../../store/actions";
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

  return (
    <div className="min-h-screen flex text-gray-900 bg-white font-bodyFont">
      {/* LEFT COLUMN - Form */}
      <div className="w-full lg:w-1/2 flex justify-center items-center px-6 sm:px-12 xl:px-24">
        <form
          onSubmit={handleSubmit(loginHandler)}
          className="w-full max-w-[400px]"
        >
          {/* HEADER */}
          <div className="flex flex-col space-y-1 mb-6">
            <h1 className="text-[#111] text-4xl md:text-5xl font-bold tracking-tight">
              Welcome !
            </h1>
            <h2 className="text-[#111] text-2xl md:text-3xl font-bold tracking-tight pb-5">
              Log into your account
            </h2>

            {/* Social Logins - visual only per reference */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button type="button" className="flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 hover:bg-gray-50 transition-colors">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                <span className="text-[15px] font-semibold">Google</span>
              </button>
              <button type="button" className="flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 hover:bg-gray-50 transition-colors">
                <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" className="w-5 h-5" />
                <span className="text-[15px] font-semibold text-gray-700">Facebook</span>
              </button>
              <button type="button" className="flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 hover:bg-gray-50 transition-colors sm:col-span-1">
                <span className="text-[15px] font-semibold">Mobile</span>
              </button>
            </div>
          </div>

          <div className="relative flex py-4 items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="shrink-0 px-4 text-gray-500 text-sm font-semibold">or continue with email</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* INPUTS */}
          <div className="flex flex-col gap-4 mt-1">
            <div className="flex flex-col gap-1">
              <label htmlFor="username" className="text-base font-bold text-[#111]">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                {...register("username", { required: true })}
                id="username"
                type="text"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-md px-4 py-2.5 outline-none focus:border-blue-600 transition-colors placeholder:text-gray-400 text-base"
              />
              {errors.username && <p className="text-red-500 text-sm mt-0.5">*Username is required</p>}
            </div>

            <div className="flex flex-col gap-1 relative">
              <label htmlFor="password" className="text-base font-bold text-[#111]">
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
              {errors.password && <p className="text-red-500 text-sm mt-0.5">*Password is required</p>}
            </div>

            <div className="flex w-full mt-1">
              <a href="#" className="text-blue-600 text-[15px] font-bold hover:underline">
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

      {/* RIGHT COLUMN - Image Background */}
      <div className="hidden lg:block lg:w-1/2 relative bg-[#1E3A8A] overflow-hidden">
        {/* Placeholder image layer - replace with actual shoe image */}
        <div 
          className="absolute inset-x-12 inset-y-16 xl:inset-x-20 xl:inset-y-24 bg-cover bg-center rounded-2xl shadow-2xl z-10 mx-auto"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')" }}
        >
          {/* Overlay gradient text area if desired */}
          <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl">
            <h2 className="text-white text-2xl font-bold mb-2">Exclusive Collection</h2>
            <p className="text-gray-200 text-sm">Sign in to uncover our latest collection.</p>
          </div>
        </div>
        
        {/* Abstract vector shape in background */}
        <div className="absolute top-0 right-0 w-3/4 h-full bg-[#3B82F6] rounded-l-[100px] opacity-70 -translate-y-10 scale-110 blur-xl mix-blend-screen" />
      </div>
    </div>
  );
};

export default Login;

