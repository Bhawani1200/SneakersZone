import { DataGrid } from "@mui/x-data-grid";
import { adminOrderTableColumn } from "../../helper/tableColumn";
import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Modal from "../../shared/Modal";
import UpdateOrderForm from "./UpdateOrderForm";
import DeleteModal from "../../shared/DeleteModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrderFromDashboard } from "../../../store/actions";
import toast from "react-hot-toast";

const OrderTable = ({ adminOrder, pagination }) => {
  const [updateOpenModal, setUpdateOpenModal] = useState(false);
  const [deleteOpenModal, setDeleteOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");

  const [currentPage, setCurrentPage] = useState(
    pagination?.pageNumber + 1 || 1,
  );

  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = useLocation().pathname;

  const tableRecords = adminOrder?.map((item) => {
    return {
      id: item.orderId,
      email: item.email,
      totalAmount: item.totalAmount,
      status: item.orderStatus,
      date: item.orderDate,
    };
  });

  const handlePaginationChange = ({ page, pageSize }) => {
    params.set("page", (page + 1).toString());
    params.set("pageSize", pageSize.toString());
    navigate(`${pathname}?${params}`);
  };

  const handleEdit = (order) => {
    setSelectedItem(order);
    setUpdateOpenModal(true);
  };

  const handleDelete = (order) => {
    setSelectedItem(order);
    setDeleteOpenModal(true);
  };

  const confirmDelete = () => {
    dispatch(
      deleteOrderFromDashboard(
        selectedItem.id,
        toast,
        setLoader,
        setDeleteOpenModal,
        isAdmin,
      ),
    );
  };

  return (
    <div>
      <h1 className="text-slate-800 text-3xl text-center font-bold pb-6 uppercase">
        All Orders
      </h1>

      <div>
        <DataGrid
          className="w-full"
          rows={tableRecords}
          columns={adminOrderTableColumn(handleEdit, handleDelete)}
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

      <Modal
        open={updateOpenModal}
        setOpen={setUpdateOpenModal}
        title="Update Order Status"
      >
        <UpdateOrderForm
          setOpen={setUpdateOpenModal}
          open={updateOpenModal}
          loader={loader}
          setLoader={setLoader}
          selectedId={selectedItem.id}
          selectedItem={selectedItem}
        />
      </Modal>

      <DeleteModal
        open={deleteOpenModal}
        loader={loader}
        setOpen={setDeleteOpenModal}
        title="Delete Order"
        onDeleteHandler={confirmDelete}
      />
    </div>
  );
};

export default OrderTable;
