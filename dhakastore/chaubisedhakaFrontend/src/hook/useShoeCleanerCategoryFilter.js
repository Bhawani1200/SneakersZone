import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchShoeCleanerCategories } from "../store/actions";

const useShoeCleanerCategoryFilter = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const page = params.get("page") || "1";
    const pageSize = params.get("pageSize") || "10";

    const queryString = `pageNumber=${parseInt(page) - 1}&pageSize=${pageSize}`;
    dispatch(fetchShoeCleanerCategories(queryString));
  }, [dispatch, searchParams]);
};

export default useShoeCleanerCategoryFilter;
