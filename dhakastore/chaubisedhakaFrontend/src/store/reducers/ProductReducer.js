const initialState = {
  products: null,
  categories: null,
  pagination: {},
  filters: {
    colors: [],
    sizes: [],
    brands: [],
  },
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
      case "FETCH_PRODUCTS":
      return {
        ...state,
        products: action.payload,
        pagination: {
          ...state.pagination,
          pageNumber: action.pageNumber,
          pageSize: action.pageSize,
          totalElements: action.totalElements,
          totalPages: action.totalPages,
          lastPage: action.lastPage,
        },
      };

    case "FETCH_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
        pagination: {
          ...state.pagination,
          pageNumber: action.pageNumber,
          pageSize: action.pageSize,
          totalElements: action.totalElements,
          totalPages: action.totalPages,
          lastPage: action.lastPage,
        },
      };

      case "FETCH_PRODUCT_DETAILS":
      return {
        ...state,
        productDetails: action.payload,
      };
    case "FETCH_FILTERS":
      return {
        ...state,
        filters: {
          colors: action.payload.colors,
          sizes: action.payload.sizes,
          brands: action.payload.brands,
        },
      };

    default:
      return state;
  }
};
