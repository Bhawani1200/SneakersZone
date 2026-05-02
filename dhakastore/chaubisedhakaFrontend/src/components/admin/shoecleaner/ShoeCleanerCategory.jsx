import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { FaThList } from "react-icons/fa";
import toast from "react-hot-toast";

import {
  categoryTableColumns,
} from "../../helper/tableColumn";
import useShoeCleanerCategoryFilter from "../../../hook/useShoeCleanerCategoryFilter";
import { deleteShoeCleanerCategory } from "../../../store/actions";
import ErrorPage from "../../shared/ErrorPage";
import Loader from "../../shared/Loader";
import AddShoeCleanerCategoryForm from "./AddShoeCleanerCategoryForm";
import { DeleteModal } from "../../../components/shared/DeleteModal";
import Modal from "../../shared/Modal";

const ShoeCleanerCategory = () => {
  const [searchParams] = useSearchParams();
  const pathname = useLocation().pathname;
  const params = new URLSearchParams(searchParams);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { shoeCleanerCategories, pagination, loading, error } = useSelector((state) => state.shoeCleaner);

  useShoeCleanerCategoryFilter();

  const tableRecords = shoeCleanerCategories?.map((item) => ({
    ...item,
    id: item.categoryId,
  }));

  const handleEdit = (category) => {
    setOpenUpdateModal(true);
    setSelectedCategory(category);
  };

  const handleDelete = (category) => {
    setSelectedCategory(category);
    setOpenDeleteModal(true);
  };

  const onDeleteHandler = () => {
    dispatch(
      deleteShoeCleanerCategory(
        setOpenDeleteModal,
        selectedCategory?.categoryId || selectedCategory?.id,
        toast,
      ),
    );
  };

  const handlePaginationChange = ({ page, pageSize }) => {
    params.set("page", (page + 1).toString());
    params.set("pageSize", pageSize.toString());
    navigate(`${pathname}?${params}`);
  };

  const emptyCategories = !shoeCleanerCategories || shoeCleanerCategories?.length === 0;

  return (
    <div>
      <div className="pt-6 pb-10 flex justify-end">
        <button
          onClick={() => setOpenModal(true)}
          className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-4 flex items-center gap-2 rounded-md shadow-md transition-colors"
        >
          <FaThList className="text-xl" />
          Add Shoe Cleaner Category
        </button>
      </div>

      {error ? (
        <ErrorPage message={error} />
      ) : loading ? (
        <Loader />
      ) : (
        <>
          {!emptyCategories && (
            <>
              <h1 className="text-slate-800 text-3xl text-center font-bold pb-6 uppercase">
                Shoe Cleaner Categories
              </h1>
              <div className="max-w-fit mx-auto">
                <DataGrid
                  className="w-full"
                  rows={tableRecords}
                  columns={categoryTableColumns(handleEdit, handleDelete)}
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
                />
              </div>
            </>
          )}
        </>
      )}

      <Modal
        open={openUpdateModal || openModal}
        setOpen={openUpdateModal ? setOpenUpdateModal : setOpenModal}
        title={openUpdateModal ? "Update Shoe Cleaner Category" : "Add Shoe Cleaner Category"}
      >
        <AddShoeCleanerCategoryForm
          setOpen={openUpdateModal ? setOpenUpdateModal : setOpenModal}
          open={loading}
          category={selectedCategory}
          update={openUpdateModal}
        />
      </Modal>

      <DeleteModal
        open={openDeleteModal}
        loader={loading}
        setOpen={setOpenDeleteModal}
        title="Are you sure you want to delete this category?"
        onDeleteHandler={onDeleteHandler}
      />
    </div>
  );
};

export default ShoeCleanerCategory;
