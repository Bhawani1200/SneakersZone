import { Pagination } from "@mui/material";
import React from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const PaginationForProduct = ({ numberOfPage, totalProducts }) => {
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = useLocation();
  const navigate = useNavigate();

  const paramValue = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  const onChangeHandler = (event, value) => {
    params.set("page", value.toString());
    navigate(`${pathname}?${params}`);
  };

  return (
    <Pagination
      count={numberOfPage}
      page={paramValue}
      defaultPage={10}
      siblingCount={0}
      boundaryCount={2}
      shape="rounded"
      onChange={onChangeHandler}
    />
  );
};

export default PaginationForProduct;
