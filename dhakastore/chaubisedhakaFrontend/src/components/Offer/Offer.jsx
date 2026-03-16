import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const PRODUCTS = [
  {
    id: "p1",
    title: "Crimson Luxe Gown – Elegant full-length dress",
    price: 100,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&h=900&w=900&auto=format&fit=crop",
  },
  {
    id: "p2",
    title: "Emerald Draped Dress – Flowing cape-style gown",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&h=900&w=900&auto=format&fit=crop",
  },
  {
    id: "p3",
    title: "Minimalist Leather Tee Look – Modern streetwear",
    price: 140,
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&h=900&w=900&auto=format&fit=crop",
  },
  {
    id: "p4",
    title: "Urban Knit Style – Casual street look with hoodie",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&h=900&w=900&auto=format&fit=crop",
  },
  {
    id: "p5",
    title: "Bold Print Winter Set – Statement coat outfit",
    price: 150,
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&h=900&w=900&auto=format&fit=crop",
  },
  {
    id: "p6",
    title: "Floral Puff Sleeve Dress – Feminine and casual",
    price: 140,
    image:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&h=900&w=900&auto=format&fit=crop",
  },
  {
    id: "p7",
    title: "Striped Tee & Blazer – Smart-casual streetwear",
    price: 140,
    image:
      "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?q=80&h=900&w=900&auto=format&fit=crop",
  },
  {
    id: "p8",
    title: "Tank Top & Denim – Everyday stylish look",
    price: 140,
    image:
      "https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&h=900&w=900&auto=format&fit=crop",
  },
  {
    id: "p9",
    title: "Classic Street Jacket – Timeless everyday wear",
    price: 160,
    image:
      "https://images.unsplash.com/photo-1585687501119-273d1a1d028a?q=80&h=900&w=900&auto=format&fit=crop",
  },
  {
    id: "p10",
    title: "Monochrome Set – Clean minimal layering",
    price: 130,
    image:
      "https://images.unsplash.com/photo-1542652694-40abf526446e?q=80&h=900&w=900&auto=format&fit=crop",
  },
  {
    id: "p11",
    title: "Denim Essentials – Everyday casual fit",
    price: 110,
    image:
      "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&h=900&w=900&auto=format&fit=crop",
  },
  {
    id: "p12",
    title: "Weekend Hoodie – Cozy relaxed style",
    price: 90,
    image:
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&h=900&w=900&auto=format&fit=crop",
  },
];

function HeartIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      className="fill-slate-800 w-5 h-5 inline-block"
      aria-hidden="true"
      {...props}
    >
      <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z" />
    </svg>
  );
}

function CartIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className="fill-slate-800 w-5 h-5 inline-block"
      aria-hidden="true"
      {...props}
    >
      <path d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15z" />
    </svg>
  );
}

export default function Offer() {
  const pageSize = 8;
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(PRODUCTS.length / pageSize));
  const safePage = Math.min(Math.max(page, 1), totalPages);

  const pageItems = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return PRODUCTS.slice(start, start + pageSize);
  }, [safePage]);

  const pages = useMemo(() => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }, [totalPages]);

  return (
    <section className="w-full bg-white py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-full mx-auto">
        <div className="flex items-center justify-between gap-3 mb-6 md:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            Special Offer
          </h2>

          <Link
            to="/shop"
            className="text-sm sm:text-base font-semibold text-slate-900 hover:text-slate-700 underline underline-offset-4"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {pageItems.map((p) => (
            <div key={p.id} className="group overflow-hidden relative">
              <Link to="/shop" className="block">
                <div className="relative aspect-[4/5] bg-slate-100 w-full overflow-hidden rounded-lg">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* In-card actions (inside image) */}
                  <div className="absolute inset-x-3 bottom-3 z-10 flex items-center gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      type="button"
                      title="Add to wishlist"
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 backdrop-blur border border-slate-200 shadow-sm flex items-center justify-center hover:bg-white"
                    >
                      <HeartIcon />
                    </button>
                    <button
                      type="button"
                      title="Add to cart"
                      className="flex-1 h-4 sm:h-10 px-3 rounded-full bg-white/90 backdrop-blur border border-slate-200 shadow-sm text-xs sm:text-sm font-semibold text-slate-900 hover:bg-white"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </Link>

              <div className="p-3 sm:p-4 relative">
                <div className="z-20 relative bg-white">
                  <h6 className="text-sm sm:text-[15px] font-semibold text-slate-900 line-clamp-2">
                    {p.title}
                  </h6>
                  <h6 className="text-sm text-slate-600 font-medium mt-2">
                    ${p.price.toFixed(2)}
                  </h6>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            type="button"
            onClick={() => setPage((v) => Math.max(1, v - 1))}
            disabled={safePage === 1}
            className="px-3 py-2 text-sm font-semibold rounded-md border border-slate-200 text-slate-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
          >
            Prev
          </button>

          <div className="flex items-center gap-1 flex-wrap justify-center">
            {pages.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setPage(n)}
                aria-current={n === safePage ? "page" : undefined}
                className={[
                  "min-w-10 h-10 px-3 text-sm font-semibold rounded-md border transition-colors",
                  n === safePage
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 text-slate-800 hover:bg-slate-50",
                ].join(" ")}
              >
                {n}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setPage((v) => Math.min(totalPages, v + 1))}
            disabled={safePage === totalPages}
            className="px-3 py-2 text-sm font-semibold rounded-md border border-slate-200 text-slate-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}

