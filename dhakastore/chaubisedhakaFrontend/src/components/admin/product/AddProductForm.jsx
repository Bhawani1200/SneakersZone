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

const AddProductForm = ({ setOpen, product, update = false }) => {
  const [loader, setLoader] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(false);
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.products);

  const { user } = useSelector((state) => state.auth);

  const isAdmin = user && user?.role?.includes("ROLE_ADMIN");

  const { errorMessage, categoryLoader } = useSelector((state) => state.errors);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const saveProductHandler = (data) => {
    if (!update) {
      const sendData = {
        ...data,
        categoryId: selectedCategory.categoryId,
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
      };
      dispatch(
        updateProductFromDashboard(
          sendData,
          reset,
          toast,
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
    }
  }, [product, update]);

  useEffect(() => {
    if (!update) {
      dispatch(fetchCategories());
    }
  }, [dispatch, update]);

  useEffect(() => {
    if (!categoryLoader && categories) {
      setSelectedCategory(categories[0]);
    }
  }, [categories, categoryLoader]);

  if (categoryLoader) {
    return <Skeleton />;
  }

  if (errorMessage) {
    return <ErrorPage />;
  }

  return (
    <div className="py-5 relative h-full">
      <form className="space-y-4" onSubmit={handleSubmit(saveProductHandler)}>
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

          {!update && (
            <SelectTextField
              label="Select Categories"
              select={selectedCategory}
              setSelect={setSelectedCategory}
              lists={categories}
            />
          )}
        </div>
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
            className="text-slate-800"
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
            placeholder="Product Discount"
            register={register}
            errors={errors}
          />
        </div>
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
            className={`px-4 py-2 w-full border outline-hidden bg-transparent text-slate-800 rounded-md ${
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
              className="text-white py-2.5 px-4 text-sm font-medium"
            >
              Cancel
            </Button>

            <Button
              disabled={loader}
              type="submit"
              variant="contained"
              color="primary"
              className="bg-custom-blue text-white  py-2.5 px-4 text-sm font-medium"
            >
              {loader ? (
                <div className="flex gap-2 items-center">
                  <Spinners /> Loading...
                </div>
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
