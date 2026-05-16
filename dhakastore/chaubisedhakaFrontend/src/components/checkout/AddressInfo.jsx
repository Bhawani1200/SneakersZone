import React, { useState } from "react";
import Skeleton from "../shared/Skeleton";
import { FaAddressBook } from "react-icons/fa";
import AddressInfoModal from "./AddressInfoModal";
import AddAddressForm from "./AddAddressForm";
import { useDispatch, useSelector } from "react-redux";
import AddressList from "./AddressList";
import DeleteModal from "./DeleteModal";
import toast from "react-hot-toast";
import { deleteUserAddress } from "../../store/actions";

const AddressInfo = ({ address }) => {
  const dispatch = useDispatch();

  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");

  const addNewAddressHandler = () => {
    setSelectedAddress("");
    setOpenAddressModal(true);
  };

  const deleteAddressHandler = () => {
    dispatch(
      deleteUserAddress(toast, selectedAddress?.addressId, setOpenDeleteModal),
    );
  };

  const noAddressExist = !address || address.length === 0;
  const { isLoading, btnLoader } = useSelector((state) => state.auth);

  return (
    <div className="w-full">
      {noAddressExist ? (
        <div className="p-6 rounded-lg max-w-3xl mx-auto flex flex-col items-center justify-center">
          <FaAddressBook size={50} className="text-gray-500 mb-4" />
          <h1 className="mb-2 text-slate-900 dark:text-white text-center font-semibold text-2xl">
            No Address Added Yet.
          </h1>
          <p className="mb-6 text-slate-800 dark:text-zinc-400 text-center">
            Please add your address to complete the purchase.
          </p>

          <button
            onClick={addNewAddressHandler}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-sm hover:text-blue-700 transition-all "
          >
            Add Address
          </button>
        </div>
      ) : (
        <div className="relative p-6 rounded-lg max-w-3xl mx-auto">
          <h1 className="w-full text-slate-800 dark:text-white text-center font-bold text-3xl mb-10">
            Select Address
          </h1>
          {isLoading ? (
            <div className="w-full max-w-md mx-auto py-8">
              <Skeleton />
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center space-y-8 pt-6 w-full">
                <AddressList
                  addresses={address}
                  setSelectedAddress={setSelectedAddress}
                  setOpenAddressModal={setOpenAddressModal}
                  setOpenDeleteModal={setOpenDeleteModal}
                />
              </div>
              {address.length > 0 && (
                <div className="mt-4">
                  <button
                    onClick={addNewAddressHandler}
                    className="px-4 py-2 bg-blue-600 text-white font-medium rounded-sm hover:text-blue-700 transition-all "
                  >
                    Add More
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      <AddressInfoModal open={openAddressModal} setOpen={setOpenAddressModal}>
        <AddAddressForm
          address={selectedAddress}
          setOpenAddressModal={setOpenAddressModal}
        />
      </AddressInfoModal>

      <DeleteModal
        open={openDeleteModal}
        loader={btnLoader}
        setOpen={setOpenDeleteModal}
        title="Delete Address"
        onDeleteHandler={deleteAddressHandler}
      />
    </div>
  );
};

export default AddressInfo;
