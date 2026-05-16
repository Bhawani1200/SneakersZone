import React from "react";
import { useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import Loader from "../../shared/Loader";
import { FaBoxOpen, FaTag } from "react-icons/fa";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { specialOfferTableColumn } from "../../helper/tableColumn";
import { useDashboardProductFilter } from "../../../hook/useProductFilter";
import AddProductForm from "../product/AddProductForm";
import Modal from "../../shared/Modal";
import DeleteModal from "../../shared/DeleteModal";
import { deleteProduct, updateProductFromDashboard } from "../../../store/actions";
import toast from "react-hot-toast";
import ImageUploadForm from "../product/ImageUploadForm";
import ProductViewModal from "../../shared/ProductViewModal";

const Offers = () => {
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

  useDashboardProductFilter();

  const handleToggleSection = (product, sectionId) => {
    const currentSections = Array.isArray(product.sections)
      ? product.sections
      : typeof product.sections === "string"
        ? product.sections
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [];

    let newSections;
    if (currentSections.includes(sectionId)) {
      newSections = currentSections.filter((s) => s !== sectionId);
    } else {
      newSections = [...currentSections, sectionId];
    }

    const updateData = {
      ...product,
      id: product.id || product.productId,
      sections: newSections,
    };

    dispatch(
      updateProductFromDashboard(
        updateData,
        toast,
        () => {}, 
        setLoader,
        () => {}, 
        isAdmin,
      ),
    );
  };

  // Filter products that belong to the 'offer' section
  const offerProducts = products?.filter((item) => {
    const sections = item.sections || item.productSections || item.tags || [];
    if (Array.isArray(sections)) {
      return sections.includes("offer");
    } else if (typeof sections === "string") {
      return sections.split(",").map(s => s.trim()).includes("offer");
    }
    return false;
  }) || [];

  const emptyProduct = offerProducts.length === 0;

  const tableRecords = offerProducts.map((item) => {
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
    params.set("page", "1");
    navigate(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <div className="pt-6 pb-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 rounded-lg">
                <FaTag className="text-2xl text-red-600" />
            </div>
            <div>
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Special Offers</h1>
                <p className="text-sm text-slate-500 font-medium italic">Manage "Deals of the Day" products</p>
            </div>
        </div>

        <form
          onSubmit={handleSearchSubmit}
          className="relative w-full max-w-md group"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search offers..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent shadow-sm transition-all duration-300"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors">
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
        </form>

        <button
          onClick={() => setOpenAddModal(true)}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-6 flex items-center gap-2 rounded-lg shadow-lg hover:shadow-red-500/30 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <MdAddShoppingCart className="text-xl" />
          <span>Add Offer Product</span>
        </button>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {emptyProduct ? (
            <div className="flex flex-col items-center justify-center text-gray-600 py-20 bg-white rounded-2xl border-2 border-dashed border-slate-200 shadow-xs">
              <FaTag size={60} className="mb-4 text-slate-200" />
              <h2 className="text-2xl font-bold text-slate-800">
                No active offers found
              </h2>
              <p className="text-slate-500 mt-2">Assign the "Offer" section to products to see them here.</p>
            </div>
          ) : (
            <div className="max-w-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <DataGrid
                className="w-full"
                rows={tableRecords}
                columns={specialOfferTableColumn(
                  handleEdit,
                  handleDelete,
                  handleImageUpload,
                  handleProductView,
                  handleToggleSection,
                )}
                autoHeight
                disableRowSelectionOnClick
                disableColumnResize
                hideFooter
              />
            </div>
          )}
        </>
      )}

      <Modal
        open={openUpdateModal || openAddModal}
        setOpen={openUpdateModal ? setOpenUpdateModal : setOpenAddModal}
        title={openUpdateModal ? "Update Offer" : "Add Product to Offers"}
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
        title="Remove from Offers"
        onDeleteHandler={onDeleteHandler}
      />
    </div>
  );
};

export default Offers;
