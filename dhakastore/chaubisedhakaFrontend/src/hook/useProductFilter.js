import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { dashboardProductsAction ,fetchProducts} from "../store/actions";
import api from "../api/api";

const useProductFilter = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams();
   
    const page = searchParams.get("page") || 1;
    params.set("pageNumber", Number(page) - 1);
    
    const pageSize = searchParams.get("pageSize") || 12; 
    params.set("pageSize", pageSize);

    const sortBy = searchParams.get("sortBy") || "productId";
    const sortOrder = searchParams.get("sortOrder") || "desc";
    params.set("sortBy", sortBy);
    params.set("sortOrder", sortOrder);


    const keyword = searchParams.get("keyword");
    const category = searchParams.get("category");
    const gender = searchParams.get("gender");
    const size = searchParams.get("size");
    const color = searchParams.get("color");
    const brand = searchParams.get("brand");
    const minPrice = searchParams.get("minPrice") || "0";
    const maxPrice = searchParams.get("maxPrice") || "999999"; 
    const minDiscount = searchParams.get("minDiscount") || searchParams.get("discount");
    const inStock = searchParams.get("inStock");

    if (keyword) params.set("keyword", keyword);
    if (category) params.set("category", category);
    if (gender) params.set("gender", gender);
    if (size) params.set("size", size);
    if (color) params.set("color", color);
    if (brand) params.set("brand", brand);
    params.set("minPrice", minPrice);
    params.set("maxPrice", maxPrice);
    if (minDiscount) params.set("minDiscount", minDiscount);
    if (inStock !== null && inStock !== undefined && inStock !== "") {
      params.set("inStock", inStock);
    }

    const queryString = params.toString();
    console.log("Filtered Query String:", queryString);
    dispatch(fetchProducts(queryString));
  }, [searchParams, dispatch]);
};

export const fetchProductsDashboard = (queryString) => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    
      const { data } = await api.get(`/api/user/public/products?${queryString}`);
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
    console.log(error);
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch products ",
    });
  }
};


export const useDashboardProductFilter = () => {
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");

  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams();

    const currentPage = searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 1;
    const pageSize = searchParams.get("pageSize")
      ? Number(searchParams.get("pageSize"))
      : 10;

    params.set("pageNumber", currentPage - 1);
    params.set("pageSize", pageSize);

    const queryString = params.toString();
    dispatch(dashboardProductsAction(isAdmin, queryString));
  }, [dispatch, searchParams]);
};

export default useProductFilter;
