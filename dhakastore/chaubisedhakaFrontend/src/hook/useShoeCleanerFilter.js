import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { fetchShoeCleanerProducts } from "../store/actions";

export const useShoeCleanerFilter = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");

  useEffect(() => {
    if (!isAdmin) return;

    const params = new URLSearchParams(searchParams);
    const page = params.get("page") || "1";
    const pageSize = params.get("pageSize") || "10";

    const queryString = `pageNumber=${parseInt(page) - 1}&pageSize=${pageSize}`;
    dispatch(fetchShoeCleanerProducts(queryString));
  }, [dispatch, location.search, isAdmin]);
};
