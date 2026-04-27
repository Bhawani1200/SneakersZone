import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { dashboardProductsAction } from "../store/actions";

export const useShoeCleanerFilter = () => {
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
    
    // Specifically filter for Shoe Cleaners category
    params.set("category", "Shoe Cleaners");

    const queryString = params.toString();
    dispatch(dashboardProductsAction(isAdmin, queryString));
  }, [dispatch, searchParams, isAdmin]);
};
