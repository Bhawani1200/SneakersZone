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
  fetchFiltersAction,
  updateProductFromDashboard,
} from "../../../store/actions";
import toast from "react-hot-toast";
import SelectTextField from "../../shared/SelectTextField";
import ErrorPage from "../../shared/ErrorPage";
import Skeleton from "../../shared/Skeleton";

const GENDERS = ["MEN", "WOMEN", "KIDS", "UNISEX"];
const STANDARD_SIZES = [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
const STANDARD_COLORS = ["Black", "White"];

const AddProductForm = ({ setOpen, product, update = false }) => {
  const [loader, setLoader] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(false);
  const [selectedGender, setSelectedGender] = useState("UNISEX");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [newColorInput, setNewColorInput] = useState("");
  const [inStock, setInStock] = useState(true);
  const dispatch = useDispatch();
  const { categories, filters } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");
  const { errorMessage, categoryLoader } = useSelector((state) => state.errors);

  const availableColorsFromRedux = filters?.colors || [];
  const availableSizesFromRedux = filters?.sizes || [];

  const [dynamicColors, setDynamicColors] = useState([]);
  const [dynamicSizes, setDynamicSizes] = useState([]);

  useEffect(() => {
    const mergedColors = [
      ...new Set([...STANDARD_COLORS, ...availableColorsFromRedux]),
    ];
    setDynamicColors(mergedColors);
  }, [availableColorsFromRedux]);

  useEffect(() => {
    const mergedSizes = [
      ...new Set([...STANDARD_SIZES, ...availableSizesFromRedux.map(Number)]),
    ].sort((a, b) => a - b);
    setDynamicSizes(mergedSizes);
  }, [availableSizesFromRedux]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const watchedImage = watch("image");

  const saveProductHandler = (data) => {
    if (!selectedCategory?.categoryId) {
      toast.error("Please select a category");
      return;
    }

    if (!data.productName) {
      toast.error("Product name is required");
      return;
    }

    if (!data.price) {
      toast.error("Price is required");
      return;
    }

    if (!data.quantity) {
      toast.error("Quantity is required");
      return;
    }

    const stringSizes = selectedSizes.map((size) => size.toString());

    const sendData = {
      productName: data.productName,
      description: data.description,
      quantity: parseInt(data.quantity),
      price: parseFloat(data.price),
      discount: parseFloat(data.discount || 0),
      specialPrice: parseFloat(data.specialPrice) || parseFloat(data.price),
      image: data.image || "",
      images: data.image ? [data.image] : [],
      gender: selectedGender,
      sizes: stringSizes,
      colors: selectedColors,
      inStock: inStock,
      brand: data.brand || "",
      categoryId: selectedCategory?.categoryId,
      categoryName: selectedCategory?.categoryName,
      sellerName: data.sellerName || "admin",
    };

    console.log("Sending product data to backend:", sendData);

    if (update) {
      dispatch(
        updateProductFromDashboard(
          { ...sendData, id: product?.id || product?.productId },
          toast,
          reset,
          setLoader,
          setOpen,
          isAdmin,
        ),
      );
    } else {
      dispatch(
        addNewProductFromDashboard(
          sendData,
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

    if (!selectedColors.includes(capitalizedColor)) {
      setSelectedColors([...selectedColors, capitalizedColor]);
    }
    setNewColorInput("");
  };

  const toggleSize = (s) => {
    if (selectedSizes.includes(s)) {
      setSelectedSizes(selectedSizes.filter((sz) => sz !== s));
    } else {
      setSelectedSizes([...selectedSizes, s]);
    }
  };

  const toggleColor = (c) => {
    if (selectedColors.includes(c)) {
      setSelectedColors(selectedColors.filter((clr) => clr !== c));
    } else {
      setSelectedColors([...selectedColors, c]);
    }
  };

  useEffect(() => {
    if (update && product) {
      setValue("productName", product?.productName);
      setValue("brand", product?.brand);
      setValue("sellerName", product?.sellerName);
      setValue("image", product?.image);
      setValue("price", product?.price);
      setValue("quantity", product?.quantity);
      setValue("discount", product?.discount);
      setValue("specialPrice", product?.specialPrice);
      setValue("description", product?.description);
      setSelectedGender(product?.gender || "UNISEX");
      setInStock(product?.inStock ?? true);

      const pSizes = product?.sizes || (product?.size ? [product.size] : []);
      setSelectedSizes(pSizes);

      const pColors =
        product?.colors || (product?.color ? [product.color] : []);
      setSelectedColors(pColors);

      const newColors = pColors.filter((c) => !dynamicColors.includes(c));
      if (newColors.length > 0) {
        setDynamicColors([...dynamicColors, ...newColors]);
      }

      if (product?.categoryId && categories?.length > 0) {
        const pCat = categories.find(
          (c) => c.categoryId === product.categoryId,
        );
        if (pCat) setSelectedCategory(pCat);
      }
    }
  }, [product, update, categories]);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchFiltersAction());
  }, [dispatch]);

  useEffect(() => {
    if (!categoryLoader && categories?.length > 0) {
      if (!selectedCategory && (!update || !product?.categoryId)) {
        setSelectedCategory(categories[0]);
      }
    }
  }, [categories, categoryLoader, update, product]);

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

        {/* Row 2 — Brand + Seller Name */}
        <div className="flex md:flex-row flex-col gap-4 w-full">
          <InputField
            label="Brand"
            id="brand"
            type="text"
            message="Brand name is required*"
            placeholder="Brand Name"
            register={register}
            errors={errors}
          />
          <InputField
            label="Seller Name"
            id="sellerName"
            type="text"
            message="Seller name is required*"
            register={register}
            placeholder="Seller Name"
            errors={errors}
          />
        </div>

        {/* Row 3 — Price + Quantity */}
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

        {/* Row 4 — Discount + Special Price */}
        <div className="flex md:flex-row flex-col gap-4 w-full">
          <InputField
            label="Discount (%)"
            id="discount"
            type="number"
            placeholder="Product Discount"
            register={register}
            errors={errors}
          />
          <InputField
            label="Special Price"
            id="specialPrice"
            type="number"
            placeholder="Special Price"
            register={register}
            errors={errors}
          />
        </div>

        {/* Row 5 — Main Image URL + In Stock + Preview */}
        <div className="flex flex-col gap-4 w-full">
          <div className="flex md:flex-row flex-col gap-4 w-full items-end">
            <InputField
              label="Image URL"
              id="image"
              type="text"
              register={register}
              placeholder="Main Product Image URL"
              errors={errors}
            />
            <div className="flex flex-col gap-2 w-full md:w-1/2">
              <label className="font-semibold text-sm text-slate-800">
                Availability
              </label>
              <div className="flex items-center gap-2 h-[42px]">
                <input
                  type="checkbox"
                  id="inStock"
                  checked={inStock}
                  onChange={(e) => setInStock(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-600 cursor-pointer"
                />
                <label
                  htmlFor="inStock"
                  className="text-sm font-medium text-slate-700 cursor-pointer"
                >
                  In Stock
                </label>
              </div>
            </div>
          </div>
          {watchedImage && (
            <div className="flex flex-col gap-2 w-full mt-2">
              <p className="text-sm font-semibold text-slate-800">
                Image Preview:
              </p>
              <img
                src={
                  watchedImage.startsWith("http")
                    ? watchedImage
                    : `http://localhost:8080/images/${watchedImage}`
                }
                alt="Preview"
                className="h-40 w-auto object-contain rounded-md border border-slate-300 p-1"
                onError={(e) => {
                  e.target.src = "/placeholder-product.png";
                }}
              />
            </div>
          )}
        </div>

        {/* Row 6 — Gender Toggle */}
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

        {/* Row 7 — Sizes Picker (Multi) */}
        <div className="flex flex-col gap-2 w-full">
          <label className="font-semibold text-sm text-slate-800">
            Available Sizes{" "}
            <span className="text-slate-400 font-normal">(EU)</span>
          </label>
          <div className="flex gap-2 flex-wrap">
            {dynamicSizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => toggleSize(s)}
                className={`w-12 h-10 rounded-md text-sm font-semibold border transition-all duration-200
                  ${
                    selectedSizes.includes(s)
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-slate-700 border-slate-300 hover:border-blue-400 hover:text-blue-500"
                  }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Row 8 — Color Picker (Multi) */}
        <div className="flex flex-col gap-2 w-full">
          <label className="font-semibold text-sm text-slate-800">
            Available Colors
          </label>
          <div className="flex gap-3 flex-wrap items-center">
            {/* Dynamic Color Buttons */}
            {dynamicColors.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => toggleColor(c)}
                className={`px-4 py-2 rounded-md text-sm font-semibold border transition-all duration-200
                  ${
                    selectedColors.includes(c)
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

        {/* Row 9 — Description */}
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

          <div className="flex w-full justify-between items-center absolute bottom-14 pt-4">
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
