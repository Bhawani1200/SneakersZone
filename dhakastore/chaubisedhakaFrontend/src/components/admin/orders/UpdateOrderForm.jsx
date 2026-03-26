import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import Spinners from "../../shared/Spinners";
import toast from "react-hot-toast";
import { updateOrderStatusFromDashboard } from "../../../store/actions";

const ORDER_STATUSES = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
  "Accepted",
];

const UpdateOrderForm = ({
  setOpen,
  selectedId,
  selectedItem,
  loader,
  setLoader,
}) => {
  const [orderStatus, setOrderStatus] = useState(
    selectedItem?.status || "Accepted",
  );
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");

  const updateOrderStatus = (e) => {
    e.preventDefault();
    if (!orderStatus) {
      setError("Order status is required");
      return;
    }
    dispatch(
      updateOrderStatusFromDashboard(
        selectedId,
        orderStatus,
        toast,
        setLoader,
        isAdmin,
      ),
    );
  };
  return (
    <div className="py-5 relative h-full">
      <form className="space-y-4" onSubmit={updateOrderStatus}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="order-status-label">Order Status</InputLabel>
          <Select
            labelId="order-status-label"
            label="Order Status"
            value={orderStatus}
            onChange={(e) => {
              setOrderStatus(e.target.value);
              setError("");
            }}
          >
            {ORDER_STATUSES.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
          {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>

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
              "Update"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateOrderForm;
