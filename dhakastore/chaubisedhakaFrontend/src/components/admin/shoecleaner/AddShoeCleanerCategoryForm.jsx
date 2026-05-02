import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
  createShoeCleanerCategory,
  updateShoeCleanerCategory,
} from "../../../store/actions";
import InputField from "../../shared/InputField";

const AddShoeCleanerCategoryForm = ({
  setOpen,
  open,
  category,
  update = false,
}) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const addNewCategoryHandler = (data) => {
    const sendData = {
      categoryName: data.categoryName,
      description: data.description || "",
    };

    if (!update) {
      dispatch(createShoeCleanerCategory(sendData, setOpen, reset, toast));
    } else {
      dispatch(
        updateShoeCleanerCategory(
          sendData,
          setOpen,
          category.categoryId || category.id,
          reset,
          toast,
        ),
      );
    }
  };

  useEffect(() => {
    if (update && category) {
      setValue("categoryName", category?.categoryName);
      setValue("description", category?.description);
    }
  }, [update, category, setValue]);

  return (
    <div className="py-5 relative h-full ">
      <form
        className="space-y-4 "
        onSubmit={handleSubmit(addNewCategoryHandler)}
      >
        <div className="flex md:flex-row flex-col gap-4 w-full ">
          <InputField
            label="Shoe Cleaner Category Name"
            required
            id="categoryName"
            type="text"
            message="This field is required*"
            placeholder="Category Name"
            register={register}
            errors={errors}
          />
        </div>

        {/* <div className="flex md:flex-row flex-col gap-4 w-full ">
          <div className="flex flex-col gap-1 w-full">
            <label className="font-semibold text-sm text-slate-800">
              Description
            </label>
            <textarea
              placeholder="Category Description"
              className={`w-full px-2 py-2 border bg-white rounded-md text-slate-800 outline-hidden ${
                errors["description"] ? "border-red-500" : "border-slate-700"
              }`}
              {...register("description")}
            />
          </div>
        </div> */}

        <div className="flex w-full justify-between items-center pt-8 mt-4 border-t border-gray-100">
          <button
            disabled={open}
            onClick={() => setOpen(false)}
            type="button"
            className="border border-borderColor rounded-[5px] font-metropolis text-textColor py-2.5 px-6 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            disabled={open}
            type="submit"
            className="font-metropolis rounded-[5px] bg-blue-700 hover:bg-blue-800 text-white py-2.5 px-8 text-sm font-medium shadow-md transition-colors"
          >
            {open ? "Loading.." : update ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddShoeCleanerCategoryForm;
