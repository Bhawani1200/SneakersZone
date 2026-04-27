import React, { useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import Loader from "../../shared/Loader";
import { FaBoxOpen } from "react-icons/fa";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { shoeCleanerTableColumn } from "../../helper/tableColumn";
import { useShoeCleanerFilter } from "../../../hook/useShoeCleanerFilter";
import AddShoeCleanerForm from "./AddShoeCleanerForm";
import Modal from "../../shared/Modal";
import DeleteModal from "../../shared/DeleteModal";
import { deleteProduct } from "../../../store/actions";
import toast from "react-hot-toast";
import ImageUploadForm from "./ImageUploadForm";
import ProductViewModal from "../../shared/ProductViewModal";

const ShoeCleaner = () => {
  const { products, pagination } = useSelector((state) => state.products);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");

  const [selectedProduct, setSelectedProduct] = useState("");
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openProductViewModal, setOpenProductViewModal] = useState(false);
  const [openImageUploadModal, setOpenImageUploadModal] = useState(false);
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const pathname = useLocation().pathname;
  const params = new URLSearchParams(searchParams);

  useShoeCleanerFilter();

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setOpenUpdateModal(true);
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setOpenDeleteModal(true);
  };

  const handleImageUpload = (product) => {
    setSelectedProduct(product);
    setOpenImageUploadModal(true);
  };

  const handleProductView = (product) => {
    setSelectedProduct(product);
    setOpenProductViewModal(true);
  };

  const handlePaginationChange = ({ page, pageSize }) => {
    params.set("page", (page + 1).toString());
    params.set("pageSize", pageSize.toString());
    navigate(`${pathname}?${params}`);
  };

  const onDeleteHandler = () => {
    dispatch(
      deleteProduct(
        setLoader,
        selectedProduct?.id,
        toast,
        setOpenDeleteModal,
        isAdmin,
      ),
    );
  };

  const productTableRecords = products?.map((item) => ({
    id: item.productId || item.id,
    productName: item.productName,
    description: item.description,
    discount: item.discount,
    image: item.image,
    price: item.price,
    quantity: item.quantity,
    specialPrice: item.specialPrice,
    gender: item.gender,
    categoryId: item.categoryId || item.category?.categoryId,
    brand: item.brand,
    sellerName: item.sellerName,
    inStock: item.inStock,
    sizes: item.sizes,
    colors: item.colors,
    sections: item.sections || item.productSections || item.tags || null,
  }));

  const emptyProduct = !products || products?.length === 0;

  return (
    <div className="p-4">
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setOpenAddModal(true)}
          className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-4 flex items-center gap-2 rounded-md shadow-md transition-colors"
        >
          <MdAddShoppingCart className="text-xl" />
          Add Shoe Cleaner
        </button>
      </div>

      <h1 className="text-slate-800 text-3xl text-center font-bold pb-6 uppercase">
        Shoe Cleaner Products
      </h1>

      {isLoading ? (
        <Loader />
      ) : emptyProduct ? (
        <div className="flex flex-col items-center justify-center text-gray-600 py-10">
          <FaBoxOpen size={50} className="mb-3" />
          <h2 className="text-2xl font-semibold">No shoe cleaner products found</h2>
        </div>
      ) : (
        <div className="max-w-full">
          <DataGrid
            rows={productTableRecords || []}
            columns={shoeCleanerTableColumn(
              handleEdit,
              handleDelete,
              handleImageUpload,
              handleProductView,
            )}
            paginationMode="server"
            rowCount={pagination?.totalElements || 0}
            paginationModel={{
              page: pagination?.pageNumber ?? 0,
              pageSize: pagination?.pageSize ?? 10,
            }}
            onPaginationModelChange={handlePaginationChange}
            disableRowSelectionOnClick
          />
        </div>
      )}

      <Modal
        open={openUpdateModal || openAddModal}
        setOpen={openUpdateModal ? setOpenUpdateModal : setOpenAddModal}
        title={openUpdateModal ? "Update Shoe Cleaner" : "Add Shoe Cleaner"}
      >
        <AddShoeCleanerForm
          setOpen={openUpdateModal ? setOpenUpdateModal : setOpenAddModal}
          product={selectedProduct}
          update={openUpdateModal}
        />
      </Modal>

      <Modal
        open={openImageUploadModal}
        setOpen={setOpenImageUploadModal}
        title="Add Shoe Cleaner Image"
      >
        <ImageUploadForm
          setOpen={setOpenImageUploadModal}
          product={selectedProduct}
        />
      </Modal>

      <ProductViewModal
        open={openProductViewModal}
        setOpen={setOpenProductViewModal}
        product={selectedProduct}
      />

      <DeleteModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        loader={loader}
        title="Delete Shoe Cleaner"
        onDeleteHandler={onDeleteHandler}
      />
    </div>
  );
};

export default ShoeCleaner;
