import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { dashboardProductsAction, fetchProducts } from "../store/actions";

const useProductFilter = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  return useEffect(() => {
    const params = new URLSearchParams();

    const currentPage = searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 1;
    params.set("pageNumber", currentPage - 1);

    const sortOrder = searchParams.get("sortby") || "asc";
    const categoryParams = searchParams.get("category") || null;
    const genderParams = searchParams.get("gender") || null;
    const keyword = searchParams.get("keyword") || null;
    params.set("sortBy", "price");
    params.set("sortOrder", sortOrder);

    if (categoryParams) {
      params.set("category", categoryParams);
    }
    if (genderParams) {
      params.set("gender", genderParams);
    }
    if (keyword) {
      params.set("keyword", keyword);
    }

    const queryString = params.toString();
    console.log("Query string", queryString);
    dispatch(fetchProducts(queryString));
  }, [searchParams, dispatch]);
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
