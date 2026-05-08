import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { PiCityFill } from "react-icons/pi";
import {
  FaCheckCircle,
  FaEdit,
  FaLaptopCode,
  FaStreetView,
  FaTrash,
} from "react-icons/fa";
import { FaLocationCrosshairs, FaMapLocationDot } from "react-icons/fa6";
import { IoFlagSharp } from "react-icons/io5";
import { MdPlace } from "react-icons/md";
import {
  selectUserCheckoutAddress,
  clearCheckoutAddress,
} from "../../store/actions";

const AddressList = ({
  addresses,
  setSelectedAddress,
  setOpenAddressModal,
  setOpenDeleteModal,
}) => {
  const dispatch = useDispatch();
  const { selectedUserCheckoutAddress } = useSelector((state) => state.auth);

  const handleAddressSelection = (addresses) => {
    dispatch(selectUserCheckoutAddress(addresses));
  };

  const handleAddressDeselection = () => {
    dispatch(clearCheckoutAddress());
  };

  const onEditButtonHandler = (addresses) => {
    setSelectedAddress(addresses);
    setOpenAddressModal(true);
  };

  const onDeleteButtonHandler = (addresses) => {
    setSelectedAddress(addresses);
    setOpenDeleteModal(true);
  };

  const addressFields = [
    { Icon: PiCityFill, label: "City", key: "city" },
    { Icon: FaStreetView, label: "Street", key: "street" },
    { Icon: FaMapLocationDot, label: "State", key: "state" },
    { Icon: IoFlagSharp, label: "Country", key: "country" },
    { Icon: MdPlace, label: "Area", key: "nagarOrGaupalika" },
    { Icon: FaLocationCrosshairs, label: "Ward No.", key: "wardNo" },
    { Icon: FaLaptopCode, label: "Pincode", key: "pincode" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {addresses.map((address) => (
        <div
          key={address.addressId}
          onClick={() => handleAddressSelection(address)}
          onDoubleClick={handleAddressDeselection}
          className={`group relative rounded-xl transition-all duration-200 cursor-pointer overflow-hidden
            ${
              selectedUserCheckoutAddress?.addressId === address.addressId
                ? "ring-2 ring-green-500 shadow-lg"
                : "hover:shadow-md hover:scale-[1.02]"
            }`}
        >
          {/* Card Content */}
          <div
            className={`p-5 h-full ${
              selectedUserCheckoutAddress?.addressId === address.addressId
                ? "bg-gradient-to-br from-green-50 to-green-100"
                : "bg-white border border-gray-200"
            }`}
          >
            {/* Header with City and Selection Badge */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <PiCityFill className="text-green-600" size={24} />
                <h3 className="text-lg font-bold text-gray-800">
                  {address.city}
                </h3>
              </div>
              {selectedUserCheckoutAddress?.addressId === address.addressId && (
                <div className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  <FaCheckCircle size={14} />
                  <span>Selected</span>
                </div>
              )}
            </div>

            {/* Address Details Grid */}
            <div className="space-y-3">
              {addressFields.map(({ Icon, label, key }) => (
                <div key={key} className="flex items-start group/item">
                  <div className="flex-shrink-0 w-8 mt-0.5">
                    <Icon
                      size={18}
                      className="text-gray-400 group-hover/item:text-gray-600 transition-colors"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs text-gray-400 uppercase tracking-wide">
                      {label}
                    </span>
                    <p className="text-gray-700 font-medium text-sm mt-0.5">
                      {address[key] || "—"}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 mt-5 pt-3 border-t border-gray-100">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEditButtonHandler(address);
                }}
                className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors duration-200"
                title="Edit Address"
              >
                <FaEdit size={18} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteButtonHandler(address);
                }}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                title="Delete Address"
              >
                <FaTrash size={16} />
              </button>
            </div>
          </div>

          {/* Selection Indicator */}
          {selectedUserCheckoutAddress?.addressId === address.addressId && (
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-green-400 to-green-600"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AddressList;
