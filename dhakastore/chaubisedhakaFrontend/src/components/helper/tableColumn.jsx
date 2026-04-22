import { FaEdit, FaEye, FaImage, FaTrashAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

export const adminProductTableColumn = (
  handleEdit,
  handleDelete,
  handleImageUpload,
  handleProductView,
) => [
  {
    disableColumnMenu: true,
    sortable: false,
    field: "id",
    headerName: "ID",
    minWidth: 150,
    headerAlign: "center",
    align: "center",
    editable: false,
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border",
    renderHeader: (params) => <span className="text-center">Product ID</span>,
  },
  {
    disableColumnMenu: true,
    field: "productName",
    headerName: "Product Name",
    align: "center",
    width: 200,
    editable: false,
    sortable: false,
    headerAlign: "center",
    headerClassName: "text-black font-semibold text-center border ",
    cellClassName: "text-slate-700 font-normal border text-center",
    renderHeader: (params) => <span>Product Name</span>,
  },

  {
    disableColumnMenu: true,
    field: "price",
    headerName: "Price",
    minWidth: 180,
    headerAlign: "center",
    align: "center",
    editable: false,
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border",
    renderHeader: (params) => <span className="text-center">Price</span>,
  },
  // {
  //   disableColumnMenu: true,
  //   field: "quantity",
  //   headerName: "Quantity",
  //   minWidth: 180,
  //   headerAlign: "center",
  //   align: "center",
  //   editable: false,
  //   headerClassName: "text-black font-semibold border",
  //   cellClassName: "text-slate-700 font-normal border",
  //   renderHeader: (params) => <span className="text-center">Quantity</span>,
  // },
  {
    disableColumnMenu: true,
    field: "specialPrice",
    headerName: "Price",
    minWidth: 180,
    headerAlign: "center",
    align: "center",
    editable: false,
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border",
    renderHeader: (params) => (
      <span className="text-center">Special Price</span>
    ),
  },
  {
    sortable: false,
    field: "description",
    headerName: "Description",
    headerAlign: "center",
    align: "center",
    width: 200,
    editable: false,
    disableColumnMenu: true,
    headerClassName: "text-black font-semibold border ",
    cellClassName: "text-slate-700 font-normal border",
    renderHeader: (params) => <span className="ps-10">Description</span>,
  },
  {
    disableColumnMenu: true,
    field: "brand",
    headerName: "Brand",
    align: "center",
    width: 150,
    editable: false,
    sortable: false,
    headerAlign: "center",
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border text-center",
    renderHeader: (params) => <span>Brand</span>,
  },
  {
    disableColumnMenu: true,
    field: "inStock",
    headerName: "In Stock",
    align: "center",
    width: 120,
    editable: false,
    sortable: false,
    headerAlign: "center",
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border text-center",
    renderHeader: (params) => <span>In Stock</span>,
    renderCell: (params) => (
      <span
        className={
          params.value !== false
            ? "text-green-600 font-semibold"
            : "text-red-600 font-semibold"
        }
      >
        {params.value !== false ? "Yes" : "No"}
      </span>
    ),
  },
  {
    sortable: false,
    field: "image",
    headerName: "Image",
    headerAlign: "center",
    align: "center",
    width: 100,
    editable: false,
    disableColumnMenu: true,
    headerClassName: "text-black font-semibold border ",
    cellClassName: "text-slate-700 font-normal border",
    renderHeader: (params) => <span>Image</span>,
    renderCell: (params) => {
      const imageUrl = params.value?.startsWith("http")
        ? params.value
        : params.value
          ? `http://localhost:8080/images/${params.value}`
          : "/placeholder-product.png";

      return (
        <div className="flex items-center justify-center h-full py-1">
          <img
            src={imageUrl}
            alt="product"
            className="w-10 h-10 object-cover rounded-md border"
            onError={(e) => {
              e.target.src = "/placeholder-product.png";
            }}
          />
        </div>
      );
    },
  },
  {
    disableColumnMenu: true,
    field: "sections",
    headerName: "Sections",
    align: "center",
    width: 200,
    editable: false,
    sortable: false,
    headerAlign: "center",
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border text-center",
    renderHeader: (params) => <span>Sections</span>,
    renderCell: (params) => {
      const displaySections = {
        newLaunches: "New Launches",
        offer: "Offer",
        featured: "Featured",
      };

      const sections = params.value;
      if (!sections || !Array.isArray(sections) || sections.length === 0) {
        return <span className="text-gray-400 text-xs italic">None</span>;
      }

      return (
        <div className="flex flex-wrap items-center justify-center gap-1 h-full py-1">
          {sections.map((sec, idx) => (
            <span
              key={idx}
              className="bg-blue-50 text-blue-600 text-[10px] px-1.5 py-0.5 rounded-sm font-semibold border border-blue-200"
            >
              {displaySections[sec] || sec}
            </span>
          ))}
        </div>
      );
    },
  },

  {
    field: "action",
    headerName: "Action",
    headerAlign: "center",
    editable: false,
    headerClassName: "text-black font-semibold text-center",
    cellClassName: "text-slate-700 font-normal",
    sortable: false,
    width: 400,
    renderHeader: (params) => <span>Action</span>,
    renderCell: (params) => {
      return (
        <div className="flex justify-center items-center space-x-2 h-full pt-2">
          <button
            onClick={() => handleImageUpload(params.row)}
            className="flex items-center bg-green-500 hover:bg-green-600 text-white px-4 h-9 rounded-md"
          >
            <FaImage className="mr-2" />
            Image
          </button>
          <button
            onClick={() => handleEdit(params.row)}
            className="flex items-center bg-blue-500 text-white px-4 h-9 rounded-md "
          >
            <FaEdit className="mr-2" />
            Edit
          </button>

          <button
            onClick={() => handleDelete(params.row)}
            className="flex items-center bg-red-500 text-white px-4   h-9 rounded-md"
          >
            <FaTrashAlt className="mr-2" />
            Delete
          </button>
          <button
            onClick={() => handleProductView(params.row)}
            className="flex items-center bg-slate-800 text-white px-4   h-9 rounded-md"
          >
            <FaEye className="mr-2" />
            View
          </button>
        </div>
      );
    },
  },
];

export const adminOrderTableColumn = (handleEdit, handleDelete) => [
  {
    sortable: false,
    disableColumnMenu: true,
    field: "id",
    headerName: "orderId",
    headerAlign: "center",
    minWidth: 180,
    editable: false,
    headerClassName: "text-black font-semibold border text-center",
    cellClassName: "font-normal text-slate-700 border text-center",
    renderHeader: (params) => <span>Order ID</span>,
  },
  {
    sortable: false,
    disableColumnMenu: true,
    field: "email",
    headerName: "Email",
    headerAlign: "center",
    minWidth: 200,
    editable: false,
    headerClassName: "text-black font-semibold border text-center",
    cellClassName: "font-normal text-slate-700 border text-center",
    renderHeader: (params) => <span>Email</span>,
  },
  {
    sortable: true,
    disableColumnMenu: true,
    field: "totalAmount",
    headerName: "Total Amount",
    headerAlign: "center",
    minWidth: 200,
    editable: false,
    headerClassName: "text-black font-semibold border text-center",
    cellClassName: "font-normal text-slate-700 border text-center",
    renderHeader: (params) => <span>Total Amount</span>,
  },
  {
    sortable: false,
    disableColumnMenu: true,
    field: "status",
    headerName: "Status",
    headerAlign: "center",
    minWidth: 200,
    editable: false,
    headerClassName: "text-black font-semibold  text-center",
    cellClassName: "font-normal text-slate-700 border text-center",
    renderHeader: (params) => <span>Status</span>,
  },
  {
    sortable: false,
    disableColumnMenu: true,
    field: "orderDate",
    headerName: "Order Date",
    headerAlign: "center",
    minWidth: 200,
    editable: false,
    headerClassName: "text-black font-semibold border text-center",
    cellClassName: "font-normal text-slate-700 border text-center",
    renderHeader: (params) => <span>Order Date</span>,
  },
  {
    sortable: false,
    disableColumnMenu: true,
    field: "action",
    headerName: "Action",
    headerAlign: "center",
    minWidth: 300,
    editable: false,
    headerClassName: "text-black font-semibold text-center border",
    cellClassName: "font-normal text-slate-700 border text-center",
    renderHeader: (params) => <span>Action</span>,
    renderCell: (params) => {
      return (
        <div className="flex justify-start items-center pt-2 space-x-2 h-full">
          <button
            onClick={() => handleEdit(params.row)}
            className="flex items-center bg-blue-500 text-white px-4 h-9 rounded-md "
          >
            <FaEdit className="mr-2" />
            Edit
          </button>

          <button
            onClick={() => handleDelete(params.row)}
            className="flex items-center bg-red-500 text-white px-4 h-9 rounded-md "
          >
            <FaTrashAlt className="mr-2" />
            Delete
          </button>
        </div>
      );
    },
  },
];

export const categoryTableColumns = (handleEdit, handleDelete) => [
  {
    sortable: false,
    disableColumnMenu: true,
    field: "id",
    headerName: "CategoryId",
    minWidth: 300,
    headerAlign: "center",
    align: "center",
    editable: false,
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border",
    renderHeader: (params) => <span className="text-center">CategoryId</span>,
  },
  {
    disableColumnMenu: true,
    field: "categoryName",
    headerName: "Category Name",
    align: "center",
    width: 400,
    editable: false,
    sortable: false,
    headerAlign: "center",
    headerClassName: "text-black font-semibold text-center border ",
    cellClassName: "text-slate-700 font-normal border text-center",
    renderHeader: (params) => <span>Category Name</span>,
  },

  {
    field: "action",
    headerName: "Action",
    headerAlign: "center",
    editable: false,
    headerClassName: "text-black font-semibold text-center",
    cellClassName: "text-slate-700 font-normal",
    sortable: false,
    width: 400,
    renderHeader: (params) => <span>Action</span>,
    renderCell: (params) => {
      return (
        <div className="flex justify-center space-x-2 h-full pt-2">
          <button
            onClick={() => handleEdit(params.row)}
            className="flex items-center bg-blue-500 text-white px-4 h-9 rounded-md "
          >
            <FaEdit className="mr-2" />
            Edit
          </button>
          <button
            onClick={() => handleDelete(params.row)}
            className="flex items-center bg-red-500 text-white px-4 h-9 rounded-md "
          >
            <FaTrashAlt className="mr-2" />
            Delete
          </button>
        </div>
      );
    },
  },
];

//table column for seller in admin panel
export const sellerTableColumns = [
  {
    disableColumnMenu: true,
    field: "id",
    headerName: "ID",
    minWidth: 400,
    headerAlign: "center",
    align: "center",
    editable: false,

    headerClassName: "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border",
    renderHeader: (params) => <span className="text-center">SellerID</span>,
  },
  {
    disableColumnMenu: true,
    field: "username",
    headerName: "UserName",
    minWidth: 400,
    headerAlign: "center",
    align: "center",
    editable: false,
    sortable: false,
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border",
    renderHeader: (params) => <span className="text-center">UserName</span>,
  },
  {
    disableColumnMenu: true,
    field: "email",
    headerName: "Email",
    align: "center",
    width: 400,
    editable: false,
    sortable: false,
    headerAlign: "center",
    headerClassName: "text-black font-semibold text-center border ",
    cellClassName: "text-slate-700 font-normal border text-center",
    renderHeader: (params) => <span>Email</span>,
    renderCell: (params) => {
      return (
        <div className="flex items-center justify-center gap-1">
          <span>
            <MdOutlineEmail className="text-slate-700 text-lg" />
          </span>
          <span>{params?.row?.email}</span>
        </div>
      );
    },
  },
];
