// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import InputField from "../../shared/InputField";
// import Button from "@mui/material/Button";
// import Spinners from "../../shared/Spinners";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   addNewProductFromDashboard,
//   fetchCategories,
//   updateProductFromDashboard,
// } from "../../../store/actions";
// import toast from "react-hot-toast";
// import SelectTextField from "../../shared/SelectTextField";
// import ErrorPage from "../../shared/ErrorPage";
// import Skeleton from "../../shared/Skeleton";

// const GENDERS = ["MEN", "WOMEN", "KIDS", "UNISEX"];

// const AddProductForm = ({ setOpen, product, update = false }) => {
//   const [loader, setLoader] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState(false);
//   const [selectedGender, setSelectedGender] = useState("UNISEX"); // ✅
//   const dispatch = useDispatch();

//   const { categories } = useSelector((state) => state.products);
//   const { user } = useSelector((state) => state.auth);
//   const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");
//   const { errorMessage, categoryLoader } = useSelector((state) => state.errors);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     setValue,
//     formState: { errors },
//   } = useForm({ mode: "onTouched" });

//   const saveProductHandler = (data) => {
//     if (!update) {
//       const sendData = {
//         ...data,
//         categoryId: selectedCategory.categoryId,
//         gender: selectedGender,
//       };
//       dispatch(
//         addNewProductFromDashboard(
//           sendData,
//           toast,
//           reset,
//           setLoader,
//           setOpen,
//           isAdmin,
//         ),
//       );
//     } else {
//       const sendData = {
//         ...data,
//         id: product.id,
//         gender: selectedGender,
//         categoryId: selectedCategory?.categoryId,
//       };
//       dispatch(
//         updateProductFromDashboard(
//           sendData,
//           toast,
//           reset,
//           setLoader,
//           setOpen,
//           isAdmin,
//         ),
//       );
//     }
//   };

//   useEffect(() => {
//     if (update && product) {
//       setValue("productName", product?.productName);
//       setValue("price", product?.price);
//       setValue("quantity", product?.quantity);
//       setValue("discount", product?.discount);
//       setValue("specialPrice", product?.specialPrice);
//       setValue("description", product?.description);
//       setSelectedGender(product?.gender || "UNISEX");
//     }
//   }, [product, update]);

//   useEffect(() => {
//     if (!update) dispatch(fetchCategories());
//   }, [dispatch, update]);

//   useEffect(() => {
//     if (!categoryLoader && categories) setSelectedCategory(categories[0]);
//   }, [categories, categoryLoader]);

//   if (categoryLoader) return <Skeleton />;
//   if (errorMessage) return <ErrorPage />;

//   return (
//     <div className="py-5 relative h-full">
//       <form className="space-y-4" onSubmit={handleSubmit(saveProductHandler)}>
//         {/* Row 1 — Product Name + Category */}
//         <div className="flex md:flex-row flex-col gap-4 w-full">
//           <InputField
//             label="Product Name"
//             required
//             id="productName"
//             type="text"
//             message="This field is required*"
//             register={register}
//             placeholder="Product Name"
//             errors={errors}
//           />
//           <SelectTextField
//             label="Select Categories"
//             select={selectedCategory}
//             setSelect={setSelectedCategory}
//             lists={categories || []}
//             loading={categoryLoader}
//           />
//         </div>

//         {/* Row 2 — Price + Quantity */}
//         <div className="flex md:flex-row flex-col gap-4 w-full">
//           <InputField
//             label="Price"
//             required
//             id="price"
//             type="number"
//             message="This field is required*"
//             placeholder="Product Price"
//             register={register}
//             errors={errors}
//           />
//           <InputField
//             label="Quantity"
//             required
//             id="quantity"
//             type="number"
//             message="This field is required*"
//             register={register}
//             placeholder="Product Quantity"
//             errors={errors}
//           />
//         </div>

//         {/* Row 3 — Discount + Special Price */}
//         <div className="flex md:flex-row flex-col gap-4 w-full">
//           <InputField
//             label="Discount"
//             id="discount"
//             type="number"
//             message="This field is required*"
//             placeholder="Product Discount"
//             register={register}
//             errors={errors}
//           />
//           <InputField
//             label="Special Price"
//             id="specialPrice"
//             type="number"
//             message="This field is required*"
//             placeholder="Special Price"
//             register={register}
//             errors={errors}
//           />
//         </div>

//         {/* Row 4 — Gender Toggle  */}
//         <div className="flex flex-col gap-2 w-full">
//           <label className="font-semibold text-sm text-slate-800">Gender</label>
//           <div className="flex gap-2 flex-wrap">
//             {GENDERS.map((g) => (
//               <button
//                 key={g}
//                 type="button"
//                 onClick={() => setSelectedGender(g)}
//                 className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200
//                   ${
//                     selectedGender === g
//                       ? "bg-blue-600 text-white border-blue-600"
//                       : "bg-white text-slate-700 border-slate-300 hover:border-blue-400 hover:text-blue-500"
//                   }`}
//               >
//                 {g}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Row 5 — Description */}
//         <div className="flex flex-col gap-2 w-full">
//           <label
//             htmlFor="desc"
//             className="font-semibold text-sm text-slate-800"
//           >
//             Description
//           </label>
//           <textarea
//             rows={5}
//             placeholder="Add product description...."
//             className={`px-4 py-2 w-full border outline-hidden bg-white text-slate-800 rounded-md ${
//               errors["description"]?.message
//                 ? "border-red-500"
//                 : "border-slate-700"
//             }`}
//             maxLength={255}
//             {...register("description", {
//               required: { value: true, message: "Description is required" },
//             })}
//           />

//           <div className="flex w-full justify-between items-center absolute bottom-14">
//             <Button
//               disabled={loader}
//               onClick={() => setOpen(false)}
//               variant="outlined"
//               className="text-slate-700 py-2.5 px-4 text-sm font-medium border-slate-300"
//             >
//               Cancel
//             </Button>
//             <Button
//               disabled={loader}
//               type="submit"
//               variant="contained"
//               color="primary"
//               className="bg-blue-600 text-white py-2.5 px-4 text-sm font-medium"
//             >
//               {loader ? (
//                 <div className="flex gap-2 items-center">
//                   <Spinners /> Loading...
//                 </div>
//               ) : update ? (
//                 "Update"
//               ) : (
//                 "Save"
//               )}
//             </Button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddProductForm;

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../shared/InputField";
import Button from "@mui/material/Button";
import Spinners from "../../shared/Spinners";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProductFromDashboard,
  fetchCategories,
  updateProductFromDashboard,
} from "../../../store/actions";
import toast from "react-hot-toast";
import SelectTextField from "../../shared/SelectTextField";
import ErrorPage from "../../shared/ErrorPage";
import Skeleton from "../../shared/Skeleton";

const GENDERS = ["MEN", "WOMEN", "KIDS", "UNISEX"];
const SIZES = [38, 39, 40, 41, 42, 43, 44, 45];
const DEFAULT_COLORS = ["Red", "Blue", "Green", "Yellow", "Black", "White"];

const AddProductForm = ({ setOpen, product, update = false }) => {
  const [loader, setLoader] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(false);
  const [selectedGender, setSelectedGender] = useState("UNISEX");
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [dynamicColors, setDynamicColors] = useState(DEFAULT_COLORS);
  const [newColorInput, setNewColorInput] = useState("");

  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");
  const { errorMessage, categoryLoader } = useSelector((state) => state.errors);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const saveProductHandler = (data) => {
    const baseData = {
      ...data,
      gender: selectedGender,
      size: selectedSize,
      color: selectedColor,
      categoryId: selectedCategory?.categoryId,
    };

    if (!update) {
      dispatch(
        addNewProductFromDashboard(
          baseData,
          toast,
          reset,
          setLoader,
          setOpen,
          isAdmin,
        ),
      );
    } else {
      dispatch(
        updateProductFromDashboard(
          { ...baseData, id: product.id },
          toast,
          reset,
          setLoader,
          setOpen,
          isAdmin,
        ),
      );
    }
  };

  const handleAddColor = () => {
    if (!newColorInput.trim()) return;

    const formattedColor = newColorInput.trim();
    const capitalizedColor =
      formattedColor.charAt(0).toUpperCase() + formattedColor.slice(1);

    if (!dynamicColors.includes(capitalizedColor)) {
      setDynamicColors([...dynamicColors, capitalizedColor]);
    }
    setSelectedColor(capitalizedColor);
    setNewColorInput("");
  };

  useEffect(() => {
    if (update && product) {
      setValue("productName", product?.productName);
      setValue("price", product?.price);
      setValue("quantity", product?.quantity);
      setValue("discount", product?.discount);
      setValue("specialPrice", product?.specialPrice);
      setValue("description", product?.description);
      setSelectedGender(product?.gender || "UNISEX");
      setSelectedSize(product?.size || null); // NEW
      setSelectedColor(product?.color || null); // NEW

      // Ensure product's color is in the dynamic list if it's there
      if (product?.color && !dynamicColors.includes(product.color)) {
        setDynamicColors([...dynamicColors, product.color]);
      }
    }
  }, [product, update]);

  useEffect(() => {
    if (!update) dispatch(fetchCategories());
  }, [dispatch, update]);

  useEffect(() => {
    if (!categoryLoader && categories) setSelectedCategory(categories[0]);
  }, [categories, categoryLoader]);

  if (categoryLoader) return <Skeleton />;
  if (errorMessage) return <ErrorPage />;

  return (
    <div className="py-5 relative h-full">
      <form className="space-y-4" onSubmit={handleSubmit(saveProductHandler)}>
        {/* Row 1 — Product Name + Category */}
        <div className="flex md:flex-row flex-col gap-4 w-full">
          <InputField
            label="Product Name"
            required
            id="productName"
            type="text"
            message="This field is required*"
            register={register}
            placeholder="Product Name"
            errors={errors}
          />
          <SelectTextField
            label="Select Categories"
            select={selectedCategory}
            setSelect={setSelectedCategory}
            lists={categories || []}
            loading={categoryLoader}
          />
        </div>

        {/* Row 2 — Price + Quantity */}
        <div className="flex md:flex-row flex-col gap-4 w-full">
          <InputField
            label="Price"
            required
            id="price"
            type="number"
            message="This field is required*"
            placeholder="Product Price"
            register={register}
            errors={errors}
          />
          <InputField
            label="Quantity"
            required
            id="quantity"
            type="number"
            message="This field is required*"
            register={register}
            placeholder="Product Quantity"
            errors={errors}
          />
        </div>

        {/* Row 3 — Discount + Special Price */}
        <div className="flex md:flex-row flex-col gap-4 w-full">
          <InputField
            label="Discount"
            id="discount"
            type="number"
            message="This field is required*"
            placeholder="Product Discount"
            register={register}
            errors={errors}
          />
          <InputField
            label="Special Price"
            id="specialPrice"
            type="number"
            message="This field is required*"
            placeholder="Special Price"
            register={register}
            errors={errors}
          />
        </div>

        {/* Row 4 — Gender Toggle */}
        <div className="flex flex-col gap-2 w-full">
          <label className="font-semibold text-sm text-slate-800">Gender</label>
          <div className="flex gap-2 flex-wrap">
            {GENDERS.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setSelectedGender(g)}
                className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200
                  ${
                    selectedGender === g
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-slate-700 border-slate-300 hover:border-blue-400 hover:text-blue-500"
                  }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Row 5 — Size Picker (NEW) */}
        <div className="flex flex-col gap-2 w-full">
          <label className="font-semibold text-sm text-slate-800">
            Size <span className="text-slate-400 font-normal">(EU)</span>
          </label>
          <div className="flex gap-2 flex-wrap">
            {SIZES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSelectedSize(s === selectedSize ? null : s)}
                className={`w-12 h-10 rounded-md text-sm font-semibold border transition-all duration-200
                  ${
                    selectedSize === s
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-slate-700 border-slate-300 hover:border-blue-400 hover:text-blue-500"
                  }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Row 6 — Color Picker (DYNAMIC) */}
        <div className="flex flex-col gap-2 w-full">
          <label className="font-semibold text-sm text-slate-800">
            Color
            {selectedColor && (
              <span className="ml-2 font-normal text-slate-500">
                — {selectedColor}
              </span>
            )}
          </label>
          <div className="flex gap-3 flex-wrap items-center">
            {/* Existing/Dynamic Color Buttons */}
            {dynamicColors.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setSelectedColor(c === selectedColor ? null : c)}
                className={`px-4 py-2 rounded-md text-sm font-semibold border transition-all duration-200
                  ${
                    selectedColor === c
                      ? "bg-blue-600 text-white border-blue-600 shadow-md"
                      : "bg-white text-slate-700 border-slate-300 hover:border-blue-400 hover:text-blue-500"
                  }`}
              >
                {c}
              </button>
            ))}

            {/* Dynamic Add Color Input */}
            <div className="flex items-center gap-2 ml-2 border-l pl-4 border-slate-200">
              <input
                type="text"
                value={newColorInput}
                onChange={(e) => setNewColorInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddColor();
                  }
                }}
                placeholder="Custom color..."
                className="w-32 px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:outline-hidden focus:border-blue-500 transition-colors"
              />
              <button
                type="button"
                onClick={handleAddColor}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-blue-600 hover:text-white transition-all border border-slate-200"
                title="Add custom color"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Row 7 — Description */}
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="desc"
            className="font-semibold text-sm text-slate-800"
          >
            Description
          </label>
          <textarea
            rows={5}
            placeholder="Add product description...."
            className={`px-4 py-2 w-full border outline-hidden bg-white text-slate-800 rounded-md ${
              errors["description"]?.message
                ? "border-red-500"
                : "border-slate-700"
            }`}
            maxLength={255}
            {...register("description", {
              required: { value: true, message: "Description is required" },
            })}
          />

          <div className="flex w-full justify-between items-center absolute bottom-14">
            <Button
              disabled={loader}
              onClick={() => setOpen(false)}
              variant="outlined"
              className="text-slate-700 py-2.5 px-4 text-sm font-medium border-slate-300"
            >
              Cancel
            </Button>
            <Button
              disabled={loader}
              type="submit"
              variant="contained"
              color="primary"
              className="bg-blue-600 text-white py-2.5 px-4 text-sm font-medium"
            >
              {loader ? (
                <div className="flex gap-2 items-center">
                  <Spinners /> Loading...
                </div>
              ) : update ? (
                "Update"
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
