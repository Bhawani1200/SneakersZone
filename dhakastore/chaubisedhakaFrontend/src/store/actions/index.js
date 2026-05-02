import { data } from "react-router-dom";
import api from "../../api/api";
import { useSelector } from "react-redux";

export const fetchProducts = (queryString) => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    console.log("Fetching products with query:", queryString);
    const { data } = await api.get(`/user/public/products?${queryString}`);
    console.log("Products API response:", data);
    dispatch({
      type: "FETCH_PRODUCTS",
      payload: data.content,
      pageNumber: data.pageNumber,
      pgeSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.lastPage,
    });
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch products ",
    });
  }
};

// export const fetchProductsByFilter = (filters) => (dispatch) => {
//   const params = new URLSearchParams();
//   Object.entries(filters).forEach(([key, value]) => {
//     if (value !== null && value !== undefined && value !== "") {
//       if (Array.isArray(value)) {
//         value.forEach(v => params.append(key, v));
//       } else {
//         params.append(key, value);
//       }
//     }
//   });
//   const queryString = params.toString();
//   dispatch(fetchProducts(queryString));
// };
export const fetchProductsByFilter = (filterParams) => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    
    const queryString = new URLSearchParams(filterParams).toString();
    const { data } = await api.get(`/user/public/products?${queryString}`);
    
    dispatch({
      type: "FETCH_PRODUCTS",
      payload: data.content,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.lastPage,
    });
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    console.error("Error fetching products:", error);
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch products",
    });
  }
};

export const fetchCategories = () => async (dispatch) => {
  try {
    dispatch({ type: "CATEGORY_LOADER" });
    const { data } = await api.get(`/public/categories`);
    dispatch({
      type: "FETCH_CATEGORIES",
      payload: data.content,
      pageNumber: data.pageNumber,
      pgeSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.lastPage,
    });
    dispatch({ type: "CATEGORY_SUCCESS" });
  } catch (error) {
    console.log(error);
    dispatch({ type: "IS_ERROR", payload: error?.response?.data?.message || "Failed to fetch categories ", });
  }
};

export const fetchProductById = (productId) => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get(`/user/public/products/${productId}`);
    dispatch({
      type: "FETCH_PRODUCT_DETAILS",
      payload: data,
    });
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch product details",
    });
  }
};

export const addToCart =
  (data, qty = 1, toast) =>
  (dispatch, getState) => {
    const { products } = getState().products; // ✅ get from state

    const getProduct = products?.find(
      (item) => item.productId === data.productId
    );

    const isInStock = getProduct ? getProduct.inStock !== false : data.inStock !== false;
    // const isQuantityExist = getProduct 
    //     ? getProduct.quantity >= qty 
    //     : (data.quantity === undefined || data.quantity >= qty);

    if (isInStock) { // && isQuantityExist
      dispatch({ type: "ADD_CART", payload: { ...data, quantity: qty } });
      toast.success(`${data?.productName} added to cart successfully`);
      localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    } else {
      toast.error("Out of stock");
    }
  };

  
// export const addToCart =
//   (data, qty = 1, toast) =>
//   (dispatch, getState) => {
//     const getProduct = products?.find(
//       (item) => item.productId === data.productId
//     );

//     const isQuantityExist = getProduct ? getProduct.quantity >= qty : true;

//     if (isQuantityExist) {
//       dispatch({ type: "ADD_CART", payload: { ...data, quantity: qty } });
//       toast.success(`${data?.productName} added to cart successfully`);
//       localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
//     } else {
//       toast.error("Out of stock");
//     }
//   };

// export const increaseCartQuantity =
//   (data, toast, currentQuantity, setCurrentQuantity) =>
//   (dispatch, getState) => {
//     const { products } = getState().products;

//     const getProduct = products.find(
//       (item) => item.productId === data.productId
//     );

//     if (!getProduct) {
//       toast.error("Product not found");
//     }

//     const isQuantityExist = getProduct.quantity >= currentQuantity + 1;

//     if (isQuantityExist) {
//       const newQuantity = currentQuantity + 1;
//       setCurrentQuantity(newQuantity);

//       dispatch({
//         type: "ADD_CART",
//         payload: { ...data, quantity: newQuantity + 1 },
//       });
//       localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
//     } else {
//       toast.error("Quantity Reached to Limit");
//     }
//   };
export const increaseCartQuantity =
  (data, toast, currentQuantity, setCurrentQuantity) =>
  (dispatch, getState) => {
    const state = getState();

    // Get cart items from various possible state structures
    const cartItems =
      state?.carts?.cartItems ||
      state?.carts?.cart ||
      state?.cartItems ||
      state?.cart ||
      [];

    console.log("Cart items found:", cartItems);
    console.log("Data received:", data);

    // Find the product in cart
    const getProduct = cartItems.find(
      (item) => item.productId === data.productId
    );

    if (!getProduct) {
      toast.error("Product not found in cart");
      return;
    }

    const newQuantity = currentQuantity + 1;

    // Check store for actual stock bounds
    const { products } = getState().products;
    const storeProduct = products?.find(p => p.productId === data.productId);
    
    if (storeProduct && (storeProduct.inStock === false)) { // || storeProduct.quantity < newQuantity
       toast.error("Requested quantity not available in stock");
       return;
    }
    
    // Check incoming data bounds if not in store
    if (!storeProduct && (data.inStock === false)) { // || (data.quantity !== undefined && data.quantity < newQuantity)
       toast.error("Requested quantity not available");
       return;
    }

    // Set a reasonable limit
    if (newQuantity > 10) {
      toast.error("Maximum quantity reached (10 items)");
      return;
    }

    setCurrentQuantity(newQuantity);

    dispatch({
      type: "ADD_CART",
      payload: { ...data, quantity: newQuantity },
    });

    const updatedCartItems =
      getState()?.carts?.cartItems ||
      getState()?.carts?.cart ||
      getState()?.cartItems ||
      getState()?.cart ||
      [];

    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

export const decreaseCartQuantity =
  (data, newQuantity) => (dispatch, getState) => {
    dispatch({
      type: "ADD_CART",
      payload: { ...data, quantity: newQuantity },
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
  };

export const removeFromCart = (data, toast) => (dispatch, getState) => {
  dispatch({
    type: "REMOVE_CART",
    payload: data,
  });
  toast.success(`${data.productName} removed from the cart`);
  localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
};

export const authenticateLoginUser =
  (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
    try {
      setLoader(true);
      const { data } = await api.post("/auth/signin", sendData);
      dispatch({ type: "LOGIN_USER", payload: data });
      localStorage.setItem("auth", JSON.stringify(data));
      reset();
      toast.success("Login success");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Internal server error");
    } finally {
      setLoader(false);
    }
  };

export const registerNewUser =
  (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
    try {
      setLoader(true);
      const { data } = await api.post("/auth/signup", sendData);
      reset();
      toast.success(data?.message || "User registered successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.password ||
          "Internal server error"
      );
    } finally {
      setLoader(false);
    }
  };

export const logOutUser = (navigate) => (dispatch) => {
  dispatch({ type: "LOG_OUT" });
  localStorage.removeItem("auth");
  navigate("/login");
};

export const addUpdateUserAddress =
  (sendData, toast, addressId, setOpenAddressModal) => async (dispatch) => {
    // const { user } = getState().auth;
    // await api.post("/addresses", sendData, {
    //   headers: { Authorization: "Bearer " + user.jwtToken },
    // });

    dispatch({ type: "BUTTON_LOADER" });
    try {
      if (!addressId) {
        const { data } = await api.post("/addresses", sendData);
      } else {
        await api.put(`/addresses/${addressId}`, sendData);
      }
      dispatch(getUserAddresses());
      toast.success("Address saved successfully");
      dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Internal server error");
      dispatch({ type: "IS_ERROR", payload: null });
    } finally {
      setOpenAddressModal(false);
    }
  };

export const getUserAddresses = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get(`/addresses`);
    dispatch({ type: "USER_ADDRESS", payload: data });
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "IS_ERROR",
      payload:
        error?.response?.data?.message || "Failed to fetch users addresses ",
    });
  }
};

export const selectUserCheckoutAddress = (address) => {
  return {
    type: "SELECT_CHECKOUT_ADDRESS",
    payload: address,
  };
};

export const deleteUserAddress =
  (toast, addressId, setOpenDeleteModal) => async (dispatch) => {
    try {
      dispatch({ type: "BUTTON_LOADER" });
      dispatch(getUserAddresses());
      dispatch(clearCheckoutAddress());
      await api.delete(`/addresses/${addressId}`);
      toast.success("Address deleted successfully");
      dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
      console.log(error);
      dispatch({
        type: "IS_ERROR",
        payload: error?.response?.data?.message || "Internal server error",
      });
    } finally {
      setOpenDeleteModal(false);
    }
  };

export const clearCheckoutAddress = () => {
  return {
    type: "REMOVE_CHECKOUT_ADDRESS",
  };
};

export const addPaymentMethod = (method) => {
  return {
    type: "ADD_PAYMENT_METHOD",
    payload: method,
  };
};

export const createUserCart = (sendCartItems) => async (dispatch, getState) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    await api.post("/cart/create", sendCartItems);
    await dispatch(getUserCart());
  } catch (error) {
    console.log(error);
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to create user items",
    });
  }
};

export const getUserCart = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get("/carts/users/cart");

    dispatch({
      type: "GET_USER_CART_PRODUCTS",
      payload: data.products,
      totalPrice: data.totalPrice,
      cartId: data.cartId,
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    dispatch({
      type: "IS_SUCCESS",
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "IS_ERROR",
      payload:
        error?.response?.data?.message || "Failed to fetch user cart items",
    });
  }
};

export const analyticsAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get("/admin/app/analytics");
    dispatch({
      type: "FETCH_ANALYTICS",
      payload: data,
    });
    dispatch({
      type: "IS_SUCCESS",
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "IS_ERROR",
      payload:
        error?.response?.data?.message || "Failed to fetch analytics data",
    });
  }
};

export const getOrdersForDashboard =
  (queryString, isAdmin) => async (dispatch) => {
    try {
      dispatch({ type: "IS_FETCHING" });
      const endpoint = isAdmin ? "/admin/orders" : "/seller/orders";
      const { data } = await api.get(`${endpoint}?${queryString}`);
      dispatch({
        type: "GET_ADMIN_ORDERS",
        payload: data.content,
        pageNumber: data.pageNumber,
        pageSize: data.pageSize,
        totalElements: data.totalElements,
        totalPages: data.totalPages,
        lastPage: data.lastPage,
      });
      dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
      console.log(error);
      dispatch({
        type: "IS_ERROR",
        payload:
          error?.response?.data?.message || "Failed to fetch orders data",
      });
    }
  };

export const updateOrderStatusFromDashboard =
  (orderId, orderStatus, toast, setLoader, isAdmin) =>
  async (dispatch, getState) => {
    try {
      setLoader(true);
      const endpoint = isAdmin ? "/admin/orders/" : "/seller/orders/";
      const { data } = await api.put(`${endpoint}${orderId}/status`, {
        status: orderStatus,
      });
      toast.success(data.message || "Order updated successfully");
      await dispatch(getOrdersForDashboard("", isAdmin));
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Internal Server Error");
    } finally {
      setLoader(false);
    }
  };

// export const dashboardProductsAction = (isAdmin, queryString) => async (dispatch) => {
//   try {
//     dispatch({ type: "IS_FETCHING" });
    
//     let url;
//     if (isAdmin) {
//       url = `/admin/products${queryString ? `?${queryString}` : ""}`;
//     } else {
//       url = `/seller/products${queryString ? `?${queryString}` : ""}`;
//     }
    
//     const { data } = await api.get(url);
    
//     dispatch({
//       type: "FETCH_PRODUCTS",
//       payload: data.content,
//       pageNumber: data.pageNumber,
//       pageSize: data.pageSize,
//       totalElements: data.totalElements,
//       totalPages: data.totalPages,
//       lastPage: data.lastPage,
//     });
//     dispatch({ type: "IS_SUCCESS" });
//   } catch (error) {
//     console.error("Error fetching dashboard products:", error);
//     dispatch({
//       type: "IS_ERROR",
//       payload: error?.response?.data?.message || "Failed to fetch products",
//     });
//   }
// };

// export const updateProductFromDashboard =
//   (sendData, toast, reset, setLoader, setOpen, isAdmin) => async (dispatch) => {
//     try {
//       setLoader(true);
//       const endpoint = isAdmin ? "/admin/products/" : "/seller/products/";
//       await api.put(`${endpoint}${sendData.id}`, sendData);
//       toast.success("Product update successful");
//       reset();
//       setLoader(false);
//       setOpen(false);
//       await dispatch(dashboardProductsAction(isAdmin));
//       await dispatch(fetchFiltersAction());
//     } catch (error) {
//       toast.error(
//         error?.response?.data?.description || "Product update failed"
//       );
//     }
//   };
export const dashboardProductsAction = (isAdmin, queryString) => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    
    let url;
    if (isAdmin) {
      url = `/admin/products${queryString ? `?${queryString}` : ""}`;
    } else {
      url = `/seller/products${queryString ? `?${queryString}` : ""}`;
    }
    
    console.log("Fetching products from:", url);
    
    const { data } = await api.get(url);
    
    console.log("Products fetched:", data.content);
    if (data.content && data.content.length > 0) {
      console.log("First product keys:", Object.keys(data.content[0]));
      console.log("First product full data:", data.content[0]);
    }
    
    dispatch({
      type: "FETCH_PRODUCTS",
      payload: data.content,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.lastPage,
    });
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    console.error("Error fetching dashboard products:", error);
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch products",
    });
  }
};

export const updateProductFromDashboard =
  (sendData, toast, reset, setLoader, setOpen, isAdmin) => async (dispatch) => {
    try {
      setLoader(true);
      const endpoint = isAdmin ? "/admin/products/" : "/seller/products/";
      
      // Make sure sections is included and properly formatted
      const updateData = {
        ...sendData,
        sections: sendData.sections || [] // Ensure sections is always an array
      };
      
      console.log("Updating product with data:", updateData);
      
      const response = await api.put(`${endpoint}${sendData.id}`, updateData);
      
      console.log("Update response:", response.data);
      
      toast.success("Product update successful");
      reset();
      setLoader(false);
      setOpen(false);
      
  
      await dispatch(dashboardProductsAction(isAdmin, ""));
      await dispatch(fetchFiltersAction());
      
    } catch (error) {
      console.error("Update error:", error);
      toast.error(
        error?.response?.data?.description || 
        error?.response?.data?.message || 
        "Product update failed"
      );
      setLoader(false);
    }
  };

// export const addNewProductFromDashboard =
//   (sendData, toast, reset, setLoader, setOpen, isAdmin) =>
//   async (dispatch, getState) => {
//     try {
//       setLoader(true);
      
//       const endpoint = isAdmin ? "/admin/products" : "/seller/products";
      
//       console.log("Sending to endpoint:", endpoint);
//       console.log("Product data:", JSON.stringify(sendData, null, 2));
      
//       const response = await api.post(endpoint, sendData);
      
//       toast.success("Product created successfully");
//       reset();
//       setOpen(false);
//       await dispatch(dashboardProductsAction(isAdmin));
//       await dispatch(fetchFiltersAction());
      
//     } catch (error) {
//       console.error("Product creation error:", error);
      
    
//       if (error.response) {
//         console.error("Error status:", error.response.status);
//         console.error("Error data:", error.response.data);
//         console.error("Error headers:", error.response.headers);
        
       
//         const errorMessage = error.response.data?.description || 
//                            error.response.data?.message ||
//                            error.response.data?.error ||
//                            JSON.stringify(error.response.data) ||
//                            "Product creation failed";
//         toast.error(errorMessage);
//       } else if (error.request) {
//         console.error("No response received:", error.request);
//         toast.error("No response from server");
//       } else {
//         console.error("Error message:", error.message);
//         toast.error(error.message);
//       }
      
//     } finally {
//       setLoader(false);
//     }
//   };
export const addNewProductFromDashboard =
  (sendData, toast, reset, setLoader, setOpen, isAdmin) =>
  async (dispatch, getState) => {
    try {
      setLoader(true);
      
      const endpoint = isAdmin ? "/admin/products" : "/seller/products";
      
      // Ensure sections is an array
      const productData = {
        ...sendData,
        sections: sendData.sections || []
      };
      
      console.log("Sending to endpoint:", endpoint);
      console.log("Product data:", JSON.stringify(productData, null, 2));
      
      const response = await api.post(endpoint, productData);
      
      console.log("Create response:", response.data);
      
      toast.success("Product created successfully");
      reset();
      setOpen(false);
      await dispatch(dashboardProductsAction(isAdmin, ""));
      await dispatch(fetchFiltersAction());
      
    } catch (error) {
      console.error("Product creation error:", error);
      
      if (error.response) {
        console.error("Error status:", error.response.status);
        console.error("Error data:", error.response.data);
        
        const errorMessage = error.response.data?.description || 
                           error.response.data?.message ||
                           error.response.data?.error ||
                           "Product creation failed";
        toast.error(errorMessage);
      } else if (error.request) {
        console.error("No response received:", error.request);
        toast.error("No response from server");
      } else {
        console.error("Error message:", error.message);
        toast.error(error.message);
      }
      
    } finally {
      setLoader(false);
    }
  };

export const deleteProduct =
  (setLoader, productId, toast, setOpenDeleteModal, isAdmin) =>
  async (dispatch, getState) => {
    try {
      setLoader(true);
      const endpoint = isAdmin ? "/admin/products/" : "/seller/products/";
      await api.delete(`${endpoint}${productId}`);
      toast.success("Product deleted successfully");
      setLoader(false);
      setOpenDeleteModal(false);
      await dispatch(dashboardProductsAction());
      await dispatch(fetchFiltersAction());
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Some Error Occured");
    }
  };


//   (formData, productId, toast, setLoader, setOpen, isAdmin) =>
//   async (dispatch) => {
//     try {
//       setLoader(true);
//       const endpoint = isAdmin ? "/admin/products/" : "/seller/products/";
//       await api.put(`${endpoint}${productId}/image`, formData);
//       toast.success("Image upload successful");
//       setLoader(false);
//       setOpen(false);
//       await dispatch(dashboardProductsAction());
//     } catch (error) {
//       toast.error(
//         error?.response?.data?.description || "Product Image upload failed"
//       );
//     }
//   };

// In your store/actions/index.js or wherever this action is defined

// export const updateProductImageFromDashboard =
//   (formData, productId, toast, setLoader, setOpen, isAdmin) =>
//   async (dispatch) => {
//     try {
//       setLoader(true);
//       const endpoint = isAdmin ? "/api/admin/products/" : "/seller/products/";
//       const response = await api.put(`${endpoint}${productId}/image`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
      
//       toast.success("Image upload successful");
//       setLoader(false);
//       setOpen(false);
      
//       // Refresh the products list
//       await dispatch(dashboardProductsAction());
      
//       return response.data;
//     } catch (error) {
//       console.error("Image upload error:", error);
//       toast.error(
//         error?.response?.data?.description || 
//         error?.response?.data?.message || 
//         "Product Image upload failed"
//       );
//       setLoader(false);
//     }
//   };
export const updateProductImageFromDashboard =
  (formData, productId, toast, setLoader, setOpen, isAdmin, queryString = "") =>
  async (dispatch) => {
    try {
      setLoader(true);
      
      // Construct URL correctly - no extra slash issues
      const baseUrl = isAdmin ? "/admin/products" : "/api/seller/products";
      const url = `${baseUrl}/${productId}/image`;
      
      console.log("Uploading to URL:", url);
      console.log("Product ID:", productId);
      console.log("FormData:", formData);
      
      const response = await api.put(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log("Upload response:", response.data);
      
      toast.success("Image upload successful");
      setLoader(false);
      setOpen(false);
      
      // Refresh the dashboard products
      await dispatch(dashboardProductsAction(isAdmin, queryString));
      
    } catch (error) {
      console.error("Image upload error:", error);
      console.error("Error response:", error.response?.data);
      
      toast.error(
        error?.response?.data?.description || 
        error?.response?.data?.message || 
        "Product Image upload failed"
      );
      setLoader(false);
    }
  };

  
export const getAllCategoriesDashboard = (queryString) => async (dispatch) => {
  dispatch({ type: "CATEGORY_LOADER" });
  try {
    const { data } = await api.get(`/public/categories?${queryString}`);
    dispatch({
      type: "FETCH_CATEGORIES",
      payload: data["content"],
      pageNumber: data["pageNumber"],
      pageSize: data["pageSize"],
      totalElements: data["totalElements"],
      totalPages: data["totalPages"],
      lastPage: data["lastPage"],
    });

    dispatch({ type: "CATEGORY_SUCCESS" });
  } catch (err) {
    console.log(err);

    dispatch({
      type: "IS_ERROR",
      payload: err?.response?.data?.message || "Failed to fetch categories",
    });
  }
};

export const createCategoryDashboardAction =
  (sendData, setOpen, reset, toast) => async (dispatch, getState) => {
    try {
      dispatch({ type: "CATEGORY_LOADER" });
      await api.post("/admin/categories", {
        ...sendData,
        categoryType: sendData.categoryType || "REGULAR",
      });
      dispatch({ type: "CATEGORY_SUCCESS" });
      reset();
      toast.success("Category Created Successful");
      setOpen(false);
      await dispatch(getAllCategoriesDashboard());
    } catch (err) {
      console.log(err);
      toast.error(
        err?.response?.data?.categoryName || "Failed to create new category"
      );

      dispatch({
        type: "IS_ERROR",
        payload: err?.response?.data?.message || "Internal Server Error",
      });
    }
  };

export const updateCategoryDashboardAction =
  (sendData, setOpen, categoryID, reset, toast) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: "CATEGORY_LOADER" });

      await api.put(`/admin/categories/${categoryID}`, {
        ...sendData,
        categoryType: sendData.categoryType || "REGULAR",
      });

      dispatch({ type: "CATEGORY_SUCCESS" });

      reset();
      toast.success("Category Update Successful");
      setOpen(false);
      await dispatch(getAllCategoriesDashboard());
    } catch (err) {
      console.log(err);
      toast.error(
        err?.response?.data?.categoryName || "Failed to update category"
      );

      dispatch({
        type: "IS_ERROR",
        payload: err?.response?.data?.message || "Internal Server Error",
      });
    }
  };

export const deleteCategoryDashboardAction =
  (setOpen, categoryID, toast) => async (dispatch, getState) => {
    try {
      dispatch({ type: "CATEGORY_LOADER" });

      await api.delete(`/admin/categories/${categoryID}`);

      dispatch({ type: "CATEGORY_SUCCESS" });

      toast.success("Category Delete Successful");
      setOpen(false);
      await dispatch(getAllCategoriesDashboard());
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Failed to delete category");
      dispatch({
        type: "IS_ERROR",
        payload: err?.response?.data?.message || "Internal Server Error",
      });
    }
  };

export const getAllSellersDashboard =
  (queryString) => async (dispatch, getState) => {
    const { user } = getState().auth;
    try {
      dispatch({ type: "IS_FETCHING" });
      const { data } = await api.get(`/auth/sellers?${queryString}`);
      dispatch({
        type: "GET_SELLERS",
        payload: data["content"],
        pageNumber: data["pageNumber"],
        pageSize: data["pageSize"],
        totalElements: data["totalElements"],
        totalPages: data["totalPages"],
        lastPage: data["lastPage"],
      });

      dispatch({ type: "IS_SUCCESS" });
    } catch (err) {
      console.log(err);
      dispatch({
        type: "IS_ERROR",
        payload: err?.response?.data?.message || "Failed to fetch sellers data",
      });
    }
  };

export const addNewDashboardSeller =
  (sendData, toast, reset, setOpen, setLoader) => async (dispatch) => {
    try {
      setLoader(true);
      await api.post("/auth/signup", sendData);
      reset();
      toast.success("Seller registered successfully!");

      await dispatch(getAllSellersDashboard());
    } catch (err) {
      console.log(err);
      toast.error(
        err?.response?.data?.message ||
          err?.response?.data?.password ||
          "Internal Server Error"
      );
    } finally {
      setLoader(false);
      setOpen(false);
    }
  };

export const deleteOrderFromDashboard =
  (orderId, toast, setLoader, setOpenDeleteModal, isAdmin) =>
  async (dispatch) => {
    try {
      setLoader(true);
      const endpoint = isAdmin ? "/admin/orders" : "/seller/orders";

      await api.delete(`${endpoint}/${orderId}`);

      toast.success("Order deleted successfully");

      // re-fetch orders after deletion
      await dispatch(getOrdersForDashboard("", isAdmin));
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to delete order");
    } finally {
      setLoader(false);
      setOpenDeleteModal(false);
    }
  };


  export const fetchProductsByGender =
  (gender, pageNumber = 0, pageSize = 10) =>
  async (dispatch) => {
    try {
      dispatch({ type: "IS_FETCHING" });
      const { data } = await api.get(
        `/public/products/gender/${gender}?pageNumber=${pageNumber}&pageSize=${pageSize}`
      );
      dispatch({ type: "FETCH_PRODUCTS", payload: data.content });
      dispatch({
        type: "SET_PAGINATION",
        payload: {
          pageNumber: data.pageNumber,
          pageSize: data.pageSize,
          totalElements: data.totalElements,
          totalPages: data.totalPages,
        },
      });
      dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
      dispatch({
        type: "IS_ERROR",
        payload: error?.response?.data?.message || "Failed to fetch products",
      });
    }
  };

export const fetchFiltersAction = () => async (dispatch) => {
  try {
    const [sizesRes, colorsRes, brandsRes] = await Promise.all([
      api.get("/user/public/filters/sizes"),
      api.get("/user/public/filters/colors"),
      api.get("/user/public/filters/brands"),
    ]);

    dispatch({
      type: "FETCH_FILTERS",
      payload: {
        sizes: sizesRes.data,
        colors: colorsRes.data,
        brands: brandsRes.data,
      },
    });
  } catch (error) {
    console.error("Error fetching filters:", error);
  }
};

// Shoe Cleaner Category Actions
export const fetchShoeCleanerCategories = (queryString = "") => async (dispatch) => {
  try {
    dispatch({ type: "SHOE_CLEANER_CATEGORY_LOADER" });
    const { data } = await api.get(`/admin/shoe-cleaner/categories?${queryString}`);
    dispatch({
      type: "FETCH_SHOE_CLEANER_CATEGORIES",
      payload: data.content || data,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.lastPage,
    });
    dispatch({ type: "SHOE_CLEANER_CATEGORY_SUCCESS" });
  } catch (error) {
    console.log(error);
    dispatch({ 
      type: "SHOE_CLEANER_CATEGORY_ERROR", 
      payload: error?.response?.data?.message || "Failed to fetch shoe cleaner categories" 
    });
  }
};

export const createShoeCleanerCategory = (sendData, setOpen, reset, toast) => async (dispatch) => {
  try {
    dispatch({ type: "SHOE_CLEANER_CATEGORY_LOADER" });
    await api.post("/admin/shoe-cleaner/categories", sendData);
    dispatch({ type: "SHOE_CLEANER_CATEGORY_SUCCESS" });
    reset();
    toast.success("Shoe Cleaner Category Created Successfully");
    setOpen(false);
    await dispatch(fetchShoeCleanerCategories());
  } catch (err) {
    console.log(err);
    toast.error(err?.response?.data?.message || "Failed to create shoe cleaner category");
    dispatch({
      type: "SHOE_CLEANER_CATEGORY_ERROR",
      payload: err?.response?.data?.message || "Internal Server Error",
    });
  }
};

export const updateShoeCleanerCategory = (sendData, setOpen, categoryId, reset, toast) => async (dispatch) => {
  try {
    dispatch({ type: "SHOE_CLEANER_CATEGORY_LOADER" });
    await api.put(`/admin/shoe-cleaner/categories/${categoryId}`, sendData);
    dispatch({ type: "SHOE_CLEANER_CATEGORY_SUCCESS" });
    reset();
    toast.success("Shoe Cleaner Category Updated Successfully");
    setOpen(false);
    await dispatch(fetchShoeCleanerCategories());
  } catch (err) {
    console.log(err);
    toast.error(err?.response?.data?.message || "Failed to update shoe cleaner category");
    dispatch({
      type: "SHOE_CLEANER_CATEGORY_ERROR",
      payload: err?.response?.data?.message || "Internal Server Error",
    });
  }
};

export const deleteShoeCleanerCategory = (setOpen, categoryId, toast) => async (dispatch) => {
  try {
    dispatch({ type: "SHOE_CLEANER_CATEGORY_LOADER" });
    await api.delete(`/admin/shoe-cleaner/categories/${categoryId}`);
    dispatch({ type: "SHOE_CLEANER_CATEGORY_SUCCESS" });
    toast.success("Shoe Cleaner Category Deleted Successfully");
    setOpen(false);
    await dispatch(fetchShoeCleanerCategories());
  } catch (err) {
    console.log(err);
    toast.error(err?.response?.data?.message || "Failed to delete shoe cleaner category");
    dispatch({
      type: "SHOE_CLEANER_CATEGORY_ERROR",
      payload: err?.response?.data?.message || "Internal Server Error",
    });
  }
};

// Shoe Cleaner Products Actions
export const fetchShoeCleanerProducts = (queryString = "") => async (dispatch) => {
  try {
    dispatch({ type: "SHOE_CLEANER_PRODUCTS_LOADER" });
    const { data } = await api.get(`/admin/shoe-cleaner/products?${queryString}`);
    dispatch({
      type: "FETCH_SHOE_CLEANER_PRODUCTS",
      payload: data.content || data,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.lastPage,
    });
    dispatch({ type: "SHOE_CLEANER_PRODUCTS_SUCCESS" });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "SHOE_CLEANER_PRODUCTS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch shoe cleaner products",
    });
  }
};

export const createShoeCleanerProduct = (sendData, setOpen, reset, toast) => async (dispatch) => {
  try {
    dispatch({ type: "SHOE_CLEANER_PRODUCTS_LOADER" });
    await api.post("/admin/shoe-cleaner/products", sendData);
    dispatch({ type: "SHOE_CLEANER_PRODUCTS_SUCCESS" });
    reset();
    toast.success("Shoe Cleaner Product Created Successfully");
    setOpen(false);
    await dispatch(fetchShoeCleanerProducts());
  } catch (err) {
    console.log(err);
    toast.error(err?.response?.data?.message || "Failed to create shoe cleaner product");
    dispatch({
      type: "SHOE_CLEANER_PRODUCTS_ERROR",
      payload: err?.response?.data?.message || "Internal Server Error",
    });
  }
};