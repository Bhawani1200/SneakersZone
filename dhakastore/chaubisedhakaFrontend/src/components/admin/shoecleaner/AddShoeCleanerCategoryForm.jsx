import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
  createCategoryDashboardAction,
  updateCategoryDashboardAction,
} from "../../../store/actions";
import InputField from "../../shared/InputField";

const AddShoeCleanerCategoryForm = ({ setOpen, open, category, update = false }) => {
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
    if (!update) {
      dispatch(createCategoryDashboardAction(data, setOpen, reset, toast));
    } else {
      dispatch(
        updateCategoryDashboardAction(data, setOpen, category.id, reset, toast),
      );
    }
  };

  useEffect(() => {
    if (update && category) {
      setValue("categoryName", category?.categoryName);
    }
  }, [update, category, setValue]);

  return (
    <div className="py-5 relative h-full">
      <form
        className="space-y-4"
        onSubmit={handleSubmit(addNewCategoryHandler)}
      >
        <div className="flex flex-col gap-4 w-full">
          <InputField
            label="Shoe Cleaner Category Name"
            required
            id="categoryName"
            type="text"
            message="This field is required*"
            placeholder="e.g. Brushes, Kits, Sprays"
            register={register}
            errors={errors}
          />
        </div>

        <div className="flex w-full justify-between items-center pt-8 mt-4 border-t border-gray-100">
          <button
            disabled={open}
            onClick={() => setOpen(false)}
            type="button"
            className="border border-gray-300 rounded-[5px] text-gray-700 py-2.5 px-6 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            disabled={open}
            type="submit"
            className="rounded-[5px] bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-8 text-sm font-medium shadow-md transition-colors"
          >
            {open ? "Loading.." : update ? "Update Category" : "Save Category"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddShoeCleanerCategoryForm;
