// import React from "react";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import InputField from "../shared/InputField";
// import { useDispatch } from "react-redux";
// import { authenticateLoginUser, registerNewUser } from "../../store/actions";
// import toast from "react-hot-toast";
// import { FaUserPlus } from "react-icons/fa";
// import Spinners from "../shared/Spinners";

// const Register = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [loader, setLoader] = useState();

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm({
//     mode: "onTouched",
//   });

//   const registerHandler = async (data) => {
//     console.log("Register click");
//     dispatch(registerNewUser(data, toast, reset, navigate, setLoader));
//   };
//   return (
//     <div className="min-h-[calc(100vh-64px)] flex justify-center items-center ]">
//       <form
//         onClick={handleSubmit(registerHandler)}
//         className="sm:w-112.5 w-90 shadow-[0_4px_12px_rgba(0,0,0,0.15)] py-8  sm:px-8 px-4 rounded-md"
//       >
//         <div className="flex flex-col items-center justify-center space-y-4">
//           <FaUserPlus className="text-slate-800 text-5xl" />
//           <h1 className="text-slate-800 text-center text-montserrat lg:text-3xl text-3xl font-bold">
//             Register Here
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
//             label="Email"
//             required
//             id="email"
//             type="email"
//             message="*Email is required"
//             placeholder="Enter your email"
//             register={register}
//             errors={errors}
//           />
//           <InputField
//             label="Password"
//             required
//             id="password"
//             type="password"
//             message="*Password is required"
//             placeholder="Enter your password"
//             min={6}
//             register={register}
//             errors={errors}
//           />
//         </div>
//         <button
//           disabled={loader}
//           type="submit"
//           className="bg-linear-to-r from-purple-500 to-pink-600 flex gap-2 justify-center items-center text-white font-semibold w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-xs my-3"
//         >
//           {loader ? <> <Spinners /> Loading...</> : <>Register</>}
//         </button>
//         <p className="text-slate-800 text-center mt-6 text-sm">
//           Already have an account?
//           <Link
//             className="font-semibold underline hover:text-black "
//             to="/login"
//           >
//             <span>Login</span>
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Register;


import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../shared/InputField";
import { useDispatch } from "react-redux";
import { registerNewUser } from "../../store/actions";
import toast from "react-hot-toast";
import { FaUserPlus } from "react-icons/fa";
import Spinners from "../shared/Spinners";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const registerHandler = async (data) => {
    console.log("Register click");
    dispatch(registerNewUser(data, toast, reset, navigate, setLoader));
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex justify-center items-center bg-black font-bodyFont text-white py-12 px-6 sm:px-12">
      <div className="w-full max-w-[480px] border border-[#222] bg-[#0A0A0A] p-8 sm:p-10 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
        
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold mb-3 tracking-tight">Sign Up Account</h2>
          <p className="text-gray-400 text-base">Enter your personal data to create your account.</p>
        </div>

        <div className="grid grid-cols-2 gap-5 mb-8">
          <button className="flex items-center justify-center gap-3 border border-[#333] hover:bg-[#111] transition-colors rounded-xl py-3 text-base font-medium">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
            Google
          </button>
          <button className="flex items-center justify-center gap-3 border border-[#333] hover:bg-[#111] transition-colors rounded-xl py-3 text-base font-medium">
            <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" className="w-5 h-5" />
            Facebook
          </button>
        </div>

        <div className="relative flex items-center py-4 mb-6">
          <div className="flex-grow border-t border-[#222]"></div>
          <span className="shrink-0 px-4 text-gray-500 text-sm font-medium uppercase tracking-wider">Or</span>
          <div className="flex-grow border-t border-[#222]"></div>
        </div>

        <form onSubmit={handleSubmit(registerHandler)} className="flex flex-col gap-5">
          
          {/* Split row for name representation (Username effectively fits here) */}
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-sm font-semibold text-gray-300">
              Username
            </label>
            <input
              {...register("username", { required: true })}
              id="username"
              type="text"
              placeholder="eg. John Francisco"
              className="w-full bg-[#1A1A1A] border border-transparent focus:border-[#4C1D95] rounded-xl px-5 py-3.5 outline-none transition-colors placeholder:text-gray-500 text-base text-white"
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">*Username is required</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-semibold text-gray-300">
              Email
            </label>
            <input
              {...register("email", { required: true })}
              id="email"
              type="email"
              placeholder="eg. johnfrans@gmail.com"
              className="w-full bg-[#1A1A1A] border border-transparent focus:border-[#4C1D95] rounded-xl px-5 py-3.5 outline-none transition-colors placeholder:text-gray-500 text-base text-white"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">*Email is required</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-semibold text-gray-300">
              Password
            </label>
            <div className="relative">
              <input
                {...register("password", { required: true, minLength: 6 })}
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full bg-[#1A1A1A] border border-transparent focus:border-[#4C1D95] rounded-xl px-5 py-3.5 outline-none transition-colors placeholder:text-gray-500 text-base text-white"
              />
            </div>
            <p className="text-gray-500 text-[13px]">Must be at least 6 characters.</p>
            {errors.password && <p className="text-red-500 text-sm mt-1">*Password is required</p>}
          </div>

          <button
            disabled={loader}
            type="submit"
            className="mt-4 bg-white hover:bg-gray-100 text-black flex gap-2 justify-center items-center font-bold w-full py-3.5 rounded-xl shadow-lg transition-colors text-lg"
          >
            {loader ? (
              <>
                <Spinners />
                Creating...
              </>
            ) : (
              "Sign Up"
            )}
          </button>

          <p className="text-gray-400 text-center mt-6 text-base font-medium">
            Already have an account?{" "}
            <Link
              className="text-white hover:text-gray-300 font-bold transition-colors"
              to="/login"
            >
              Log In
            </Link>
          </p>
        </form>

      </div>
    </div>
  );
};

export default Register;
