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

const AddProductForm = ({ setOpen, product, update = false }) => {
  const [loader, setLoader] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(false);
  const [selectedGender, setSelectedGender] = useState("UNISEX"); // ✅
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
    if (!update) {
      const sendData = {
        ...data,
        categoryId: selectedCategory.categoryId,
        gender: selectedGender,
      };
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
    } else {
      const sendData = {
        ...data,
        id: product.id,
        gender: selectedGender,
        categoryId: selectedCategory?.categoryId,
      };
      dispatch(
        updateProductFromDashboard(
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

  useEffect(() => {
    if (update && product) {
      setValue("productName", product?.productName);
      setValue("price", product?.price);
      setValue("quantity", product?.quantity);
      setValue("discount", product?.discount);
      setValue("specialPrice", product?.specialPrice);
      setValue("description", product?.description);
      setSelectedGender(product?.gender || "UNISEX");
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

        {/* Row 4 — Gender Toggle  */}
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

        {/* Row 5 — Description */}
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
