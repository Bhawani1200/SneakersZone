import Button from "@mui/material/Button";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Spinners from "../../shared/Spinners";
import { updateProductImageFromDashboard } from "../../../store/actions";

const ImageUploadForm = ({ setOpen, product }) => {
  const [loader, setLoader] = useState(false);
  const fileInputRef = useRef();
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");

  const onHandleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && ["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      setSelectedFile(file);
    } else {
      toast.error("Please select a valid image file (.jpeg, .jpg, .png)");
      setPreviewImage(null);
      setSelectedFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    }
  };

  const addNewImageHandler = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      toast.error("Please select an image before saving.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    console.log("Uploading image for shoe cleaner ID:", product?.id);

    dispatch(
      updateProductImageFromDashboard(
        formData,
        product?.id,
        toast,
        setLoader,
        setOpen,
        isAdmin,
      ),
    );
  };

  const handleClearImage = () => {
    setPreviewImage(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  return (
    <div className="py-5 relative h-full min-h-[300px]">
      <form className="space-y-4" onSubmit={addNewImageHandler}>
        <div className="flex flex-col gap-4 w-full">
          <label className="flex items-center gap-2 cursor-pointer text-blue-600 border border-dashed border-blue-600 rounded-md p-3 w-full justify-center hover:bg-blue-50 transition-colors">
            <FaCloudUploadAlt size={24} />
            <span>Upload Shoe Cleaner Image</span>
            <input
              type="file"
              ref={fileInputRef}
              onChange={onHandleImageChange}
              className="hidden"
              accept=".jpeg, .jpg, .png"
            />
          </label>

          {previewImage && (
            <div className="flex flex-col items-center gap-3">
              <img
                src={previewImage}
                alt="Image Preview"
                className="h-48 rounded-md object-cover border-2 border-blue-500"
              />
              <button
                type="button"
                onClick={handleClearImage}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-md text-sm transition-colors"
              >
                Clear Image
              </button>
            </div>
          )}

          {!previewImage && product?.image && (
            <div className="flex flex-col items-center gap-3">
              <p className="text-sm text-gray-500">Current Image:</p>
              <img
                src={
                  product.image.startsWith("http")
                    ? product.image
                    : `http://localhost:8080/images/${product.image}`
                }
                alt="Current Shoe Cleaner"
                className="h-48 rounded-md object-cover border"
                onError={(e) => {
                  e.target.src = "/placeholder-product.png";
                }}
              />
            </div>
          )}
        </div>

        <div className="flex w-full justify-between items-center absolute bottom-6 left-0 right-0 px-6">
          <Button
            disabled={loader}
            onClick={() => setOpen(false)}
            variant="outlined"
            className="text-gray-700 py-2.5 px-4 text-sm font-medium border-gray-300"
          >
            Cancel
          </Button>

          <Button
            disabled={loader || !selectedFile}
            type="submit"
            variant="contained"
            color="primary"
            className="bg-blue-600 text-white py-2.5 px-4 text-sm font-medium hover:bg-blue-700"
          >
            {loader ? (
              <div className="flex gap-2 items-center">
                <Spinners /> Uploading...
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ImageUploadForm;
