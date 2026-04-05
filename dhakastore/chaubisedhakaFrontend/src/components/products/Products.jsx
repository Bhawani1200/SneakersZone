// import React from "react";
// import { useEffect } from "react";
// import { FaExclamationTriangle } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCategories } from "../../store/actions";
// import Filter from "./Filter";
// import useProductFilter from "../../hook/useProductFilter";
// import Loader from "../shared/Loader";

// import LaunchCard from "../shared/LaunchCard";
// import PaginationForProduct from "../shared/PaginationForProducts";
// import ProductSidebar from "./ProductSidebar";
// import Image from "../designLayouts/Image";
// import { bannerImgOne, bannerImgTwo } from "../../assets/images";
// import ProductsLayout from "./ProductsLayout";

// const Products = () => {
//   const { isLoading, errorMessage } = useSelector((state) => state.errors);

//   const { products, categories, pagination } = useSelector(
//     (state) => state.products,
//   );

//   const dispatch = useDispatch();
//   useProductFilter();

//   useEffect(() => {
//     dispatch(fetchCategories());
//   }, [dispatch]);

//   return (
//     <>
//       <ProductsLayout />
//       <div className="max-w-[1600px] mx-auto lg:px-14 sm:px-8 px-4 py-14 flex flex-col lg:flex-row gap-10">
//         {/* Sidebar Filter */}
//         <ProductSidebar />

//         <div className="flex-1">
//           <Filter categories={categories ? categories : []} />
//           {isLoading ? (
//             <Loader />
//           ) : errorMessage ? (
//             <div className="flex justify-center items-center h-50">
//               <FaExclamationTriangle className="text-slate-800 text-3xl mr-2" />
//               <span className="text-slate-800 text-l font-medium">
//                 {errorMessage}
//               </span>
//             </div>
//           ) : (
//             <div className="min-h-[700]">
//               <div className="pb-6 pt-10 grid 2xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-2 gap-y-10 gap-x-8">
//                 {products &&
//                   products.map((item, i) => (
//                     <React.Fragment key={item.productId || i}>
//                       {/* Insert Photo Section 1 after 4th product */}
//                       {i === 4 && (
//                         <div className="col-span-full h-[400px] rounded-3xl overflow-hidden relative group cursor-pointer mb-6">
//                           <Image
//                             imgSrc={bannerImgOne}
//                             className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//                           />
//                           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-10">
//                             <h2 className="text-white text-4xl font-black uppercase tracking-tighter">
//                               New Arrivals
//                             </h2>
//                             <p className="text-white/80 font-medium">
//                               Explore the latest in fashion
//                             </p>
//                           </div>
//                         </div>
//                       )}

//                       <LaunchCard
//                         productId={item.productId}
//                         productName={item.productName}
//                         image={item.image}
//                         description={item.description}
//                         quantity={item.quantity}
//                         price={item.price}
//                         discount={item.discount}
//                         specialPrice={item.specialPrice}
//                         rating={item.rating || 0}
//                         reviewCount={item.reviewCount || 0}
//                         colors={item.colors || []}
//                       />

//                       {/* Insert Photo Section 2 after 8th product */}
//                       {i === 8 && (
//                         <div className="col-span-full lg:col-span-2 h-[400px] rounded-3xl overflow-hidden relative group cursor-pointer my-6">
//                           <Image
//                             imgSrc={bannerImgTwo}
//                             className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//                           />
//                           <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center p-10">
//                             <h2 className="text-white text-4xl font-black uppercase tracking-tighter max-w-md">
//                               Collections | Exclusive
//                             </h2>
//                             <button className="bg-white text-black px-6 py-2.5 rounded-full font-bold w-fit mt-4">
//                               Discover More
//                             </button>
//                           </div>
//                         </div>
//                       )}
//                     </React.Fragment>
//                   ))}
//               </div>
//               <div className="flex justify-center pt-10">
//                 <PaginationForProduct
//                   numberOfPage={pagination?.totalPages}
//                   totalProducts={pagination?.totalElements}
//                 />
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Products;

import { FaExclamationTriangle } from "react-icons/fa";
import LaunchCard from "../shared/LaunchCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategories, fetchProductsByGender } from "../../store/actions";
import Filter from "./Filter";
import Loader from "../shared/Loader";
import useProductFilter from "../../hook/useProductFilter";
import PaginationForProduct from "../shared/PaginationForProducts";
import { useSearchParams } from "react-router-dom";
import ProductSidebar from "./ProductSidebar";

const Products = () => {
  const [searchParams] = useSearchParams();
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const { products, categories, pagination } = useSelector(
    (state) => state.products,
  );
  const dispatch = useDispatch();

  const genderFilter = searchParams.get("gender");
  const categoryFilter = searchParams.get("category");

  // ✅ Only run useProductFilter when NO gender filter is active
  useProductFilter(!genderFilter && !categoryFilter);

  useEffect(() => {
    if (genderFilter) {
      dispatch(fetchProductsByGender(genderFilter));
    }
  }, [genderFilter, dispatch]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:mx-auto">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="lg:w-1/4">
          <ProductSidebar />
        </div>

        <div className="flex-1">
          {/* ✅ Active filter badge */}
          {(genderFilter || categoryFilter) && (
            <div className="mb-4 flex items-center gap-2">
              <span className="text-sm text-gray-500">Filtering by:</span>
              <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full uppercase">
                {genderFilter || categoryFilter}
              </span>
            </div>
          )}

          <Filter categories={categories || []} />

          {isLoading ? (
            <Loader />
          ) : errorMessage ? (
            <div className="flex justify-center items-center h-[200px]">
              <FaExclamationTriangle className="text-slate-800 text-3xl mr-2" />
              <span className="text-slate-800 text-lg font-medium">
                {errorMessage}
              </span>
            </div>
          ) : (
            <div className="min-h-[700px]">
              {products?.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[400px] gap-3">
                  <span className="text-5xl">👟</span>
                  <p className="text-gray-500 font-medium text-lg">
                    No products found for{" "}
                    <span className="text-blue-600 font-bold capitalize">
                      {genderFilter || categoryFilter}
                    </span>
                  </p>
                </div>
              ) : (
                <div className="pb-6 pt-14 grid xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-2 gap-y-6 gap-x-6">
                  {products?.map((item, i) => (
                    <LaunchCard key={item.productId || i} {...item} />
                  ))}
                </div>
              )}
              <div className="flex justify-center pt-10">
                <PaginationForProduct
                  numberOfPage={pagination?.totalPages}
                  totalProducts={pagination?.totalElements}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
