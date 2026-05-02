const initialState = {
  shoeCleanerCategories: [],
  shoeCleanerProducts: [],
  pagination: {
    pageNumber: 0,
    pageSize: 10,
    totalElements: 0,
    totalPages: 0,
  },
  loading: false,
  error: null,
};

export const shoeCleanerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_SHOE_CLEANER_PRODUCTS":
      return {
        ...state,
        shoeCleanerProducts: action.payload,
        pagination: {
          pageNumber: action.pageNumber,
          pageSize: action.pageSize,
          totalElements: action.totalElements,
          totalPages: action.totalPages,
          lastPage: action.lastPage,
        },
        loading: false,
      };
    
    case "FETCH_SHOE_CLEANER_CATEGORIES":
      return {
        ...state,
        shoeCleanerCategories: action.payload,
        loading: false,
      };
    
    case "SHOE_CLEANER_LOADING":
      return { ...state, loading: true, error: null };
    
    case "SHOE_CLEANER_ERROR":
      return { ...state, loading: false, error: action.payload };
    
    default:
      return state;
  }
};
