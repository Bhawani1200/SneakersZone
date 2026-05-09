import React from "react";
import { useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import Loader from "../../shared/Loader";
import { FaBoxOpen } from "react-icons/fa";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { adminProductTableColumn } from "../../helper/tableColumn";
import { useDashboardProductFilter } from "../../../hook/useProductFilter";
import AddProductForm from "./AddProductForm";
import Modal from "../../shared/Modal";
import DeleteModal from "../../shared/DeleteModal";
import { deleteProduct } from "../../../store/actions";
import toast from "react-hot-toast";
import ImageUploadForm from "./ImageUploadForm";
import ProductViewModal from "../../shared/ProductViewModal";

const AdminProduct = () => {
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

  const [currentPage, setCurrentPage] = useState(
    pagination?.pageNumber + 1 || 1,
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const pathname = useLocation().pathname;
  const params = new URLSearchParams(searchParams);

  useDashboardProductFilter();

  const emptyProduct = !products || products?.length === 0;
  const tableRecords = products?.map((item) => {
    return {
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
    };
  });
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

  const [searchTerm, setSearchTerm] = useState(searchParams.get("keyword") || "");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      params.set("keyword", searchTerm);
    } else {
      params.delete("keyword");
    }
    params.set("page", "1"); // Reset to first page on search
    navigate(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <div className="pt-6 pb-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <form
          onSubmit={handleSearchSubmit}
          className="relative w-full max-w-md group"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search products by name, brand or category..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-300"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          {searchTerm && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                params.delete("keyword");
                navigate(`${pathname}?${params.toString()}`);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </form>

        <button
          onClick={() => setOpenAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 flex items-center gap-2 rounded-lg shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <MdAddShoppingCart className="text-xl" />
          <span>Add New Product</span>
        </button>
      </div>

      {!emptyProduct && (
        <h1 className="text-slate-800 text-3xl text-center font-bold pb-6 uppercase">
          All Products
        </h1>
      )}

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {emptyProduct ? (
            <div className="flex flex-col items-center justify-center text-gray-600 py-10">
              <FaBoxOpen size={50} className="mb-3" />
              <h2 className="text-2xl font-semibold">
                No products created yet
              </h2>
            </div>
          ) : (
            <div className="max-w-full">
              <DataGrid
                className="w-full"
                rows={tableRecords}
                columns={adminProductTableColumn(
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
                disableColumnResize
                pageSizeOptions={[pagination?.pageSize || 10]}
                pagination
                paginationOptions={{
                  showFirstButton: true,
                  showLastButton: true,
                  hideNextButton: currentPage === pagination?.totalPages,
                }}
              />
            </div>
          )}
        </>
      )}

      <Modal
        open={openUpdateModal || openAddModal}
        setOpen={openUpdateModal ? setOpenUpdateModal : setOpenAddModal}
        title={openUpdateModal ? "Update Modal" : "Add Modal"}
      >
        <AddProductForm
          setOpen={openUpdateModal ? setOpenUpdateModal : setOpenAddModal}
          product={selectedProduct}
          update={openUpdateModal}
        />
      </Modal>

      <Modal
        open={openImageUploadModal}
        setOpen={setOpenImageUploadModal}
        title="Add Product Image"
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
        title="Delete Product"
        onDeleteHandler={onDeleteHandler}
      />
    </div>
  );
};

export default AdminProduct;
