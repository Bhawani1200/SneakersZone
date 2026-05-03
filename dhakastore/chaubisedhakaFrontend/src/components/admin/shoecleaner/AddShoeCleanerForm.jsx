import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../shared/InputField";
import Button from "@mui/material/Button";
import Spinners from "../../shared/Spinners";
import { useDispatch, useSelector } from "react-redux";
import {
  createShoeCleanerProduct,
  fetchShoeCleanerCategories,
  updateShoeCleanerProduct,
} from "../../../store/actions";
import toast from "react-hot-toast";
import SelectTextField from "../../shared/SelectTextField";
import ErrorPage from "../../shared/ErrorPage";
import Skeleton from "../../shared/Skeleton";

const PRODUCT_SECTIONS = [
  { id: "newLaunches", label: "New Launches" },
  { id: "offer", label: "Offer" },
  { id: "featured", label: "Featured Products" },
];

const AddShoeCleanerForm = ({ setOpen, product, update = false }) => {
  const [loader, setLoader] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [inStock, setInStock] = useState(true);
  const [selectedSections, setSelectedSections] = useState([]);
  const dispatch = useDispatch();
  const {
    shoeCleanerCategories,
    loading: categoryLoader,
    error: errorMessage,
  } = useSelector((state) => state.shoeCleaner);
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");

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

    const sendData = {
      productName: data.productName,
      quantity: 1,
      discount: parseFloat(data.discount || 0),
      description: data.description,
      price: parseFloat(data.price),
      specialPrice: parseFloat(data.specialPrice) || parseFloat(data.price),
      image: data.image || "",
      images: data.image ? [data.image] : [],
      gender: "UNISEX",
      sizes: [],
      colors: [],
      inStock: inStock,
      brand: data.brand || "",
      categoryId: selectedCategory?.categoryId,
      categoryName: selectedCategory?.categoryName,
      sellerName: data.sellerName || "admin",
      sections: selectedSections,
      rating: parseFloat(data.rating || 0),
      reviewCount: parseInt(data.reviewCount || 0),
    };

    if (update) {
      dispatch(
        updateShoeCleanerProduct(
          { ...sendData, id: product?.id || product?.productId },
          setOpen,
          reset,
          toast,
          setLoader,
        ),
      );
    } else {
      dispatch(
        createShoeCleanerProduct(sendData, setOpen, reset, toast, setLoader),
      );
    }
  };

  useEffect(() => {
    if (update && product) {
      setValue("productName", product?.productName);
      setValue("brand", product?.brand);
      setValue("sellerName", product?.sellerName);
      setValue("image", product?.image);
      setValue("price", product?.price);
      setValue("discount", product?.discount);
      setValue("specialPrice", product?.specialPrice);
      setValue("description", product?.description);
      setValue("rating", product?.rating);
      setValue("reviewCount", product?.reviewCount);
      setInStock(product?.inStock ?? true);

      if (product.sections) {
        if (Array.isArray(product.sections)) {
          const sectionIds = product.sections.map((sec) =>
            typeof sec === "object" ? sec.id : sec,
          );
          setSelectedSections(sectionIds);
        } else if (typeof product.sections === "string") {
          setSelectedSections(product.sections.split(",").map((s) => s.trim()));
        }
      } else {
        setSelectedSections([]);
      }

      if (product?.categoryId && shoeCleanerCategories?.length > 0) {
        const pCat = shoeCleanerCategories.find(
          (c) => c.categoryId === product.categoryId,
        );
        if (pCat) setSelectedCategory(pCat);
      }
    } else if (!update) {
      reset();
      setInStock(true);
      setSelectedSections([]);
      if (shoeCleanerCategories && shoeCleanerCategories.length > 0) {
        setSelectedCategory(shoeCleanerCategories[0]);
      }
    }
  }, [product, update, shoeCleanerCategories, reset, setValue]);

  useEffect(() => {
    dispatch(fetchShoeCleanerCategories());
  }, [dispatch]);

  useEffect(() => {
    if (!categoryLoader && shoeCleanerCategories?.length > 0) {
      if (!selectedCategory && (!update || !product?.categoryId)) {
        setSelectedCategory(shoeCleanerCategories[0]);
      }
    }
  }, [
    shoeCleanerCategories,
    categoryLoader,
    update,
    product,
    selectedCategory,
  ]);

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
            lists={shoeCleanerCategories || []}
            loading={categoryLoader}
          />
        </div>

        {/* Row 2 — Price + Brand + Sections */}
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
            label="Brand"
            id="brand"
            type="text"
            placeholder="Brand Name"
            register={register}
            errors={errors}
          />
          {/* <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold text-sm text-slate-800">
              Show Product In
            </label>
            <div className="flex gap-4 flex-wrap mt-[2px]">
              {PRODUCT_SECTIONS.map((section) => (
                <label
                  key={section.id}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedSections.includes(section.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedSections([...selectedSections, section.id]);
                      } else {
                        setSelectedSections(
                          selectedSections.filter((s) => s !== section.id),
                        );
                      }
                    }}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-700">
                    {section.label}
                  </span>
                </label>
              ))}
            </div>
          </div> */}
        </div>

        {/* Row 3 — Discount + Special Price */}
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

        {/* Row 4 — Main Image URL + In Stock + Preview */}
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

        {/* Row 5 — Description */}
        <div className="flex flex-col gap-2 w-full pb-20">
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

          <div className="flex w-full justify-between items-center absolute bottom-5">
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

export default AddShoeCleanerForm;
