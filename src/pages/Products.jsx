import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import { Button } from "../components/common";
import { ProductCard, ProductsBanner } from "../components/products";
import { products } from "../data/products";
import { api } from "../utils/api";

const bannerSlides = [
  {
    dateRange: "September 12–22",
    titleLines: ["Enjoy free home delivery in this summer"],
    subtitle: "Designer Dresses - Pick from trendy Designer Dress.",
    buttonText: "Get Started",
  },
  {
    dateRange: "September 11–22",
    titleLines: ["Enjoy free home delivery in this summer"],
    subtitle: "Designer Dresses - Pick from trendy Designer Dress.",
    buttonText: "Get Started",
  },
];

const discountOptions = [
  { id: "10", label: "10% and above", minDiscount: 10 },
  { id: "20", label: "20% and above", minDiscount: 20 },
  { id: "30", label: "30% and above", minDiscount: 30 },
  { id: "40", label: "40% and above", minDiscount: 40 },
];

const INITIAL_BRAND_COUNT = 4;
const PRODUCTS_BATCH_SIZE = 9;
const MIN_PRICE_GAP = 30;
const categoryQueryMap = {
  men: "male",
  women: "female",
  kids: "kids",
};

const getDiscountPercent = (product) =>
  Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

const getProductsScrollContainer = () =>
  document.querySelector('[data-app-scroll-container="true"]');

const Products = () => {
  const [favourites, setFavourites] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_BATCH_SIZE);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const loadMoreRef = useRef(null);
  const hasRestoredPositionRef = useRef(false);

  console.log(location)
  const minProductPrice = Math.min(...products.map((product) => product.price));
  const maxProductPrice = Math.max(...products.map((product) => product.price));

  const [priceRange, setPriceRange] = useState({
    min: minProductPrice,
    max: maxProductPrice,
  });

  useEffect(() => {
    let isMounted = true;
    const loadFavourites = async () => {
      try {
        const response = await api.get("/favourites");
        if (isMounted) {
          setFavourites(response.data || []);
        }
      } catch (error) {
        console.error("Failed to load favourites:", error);
      }
    };

    loadFavourites();
    return () => {
      isMounted = false;
    };
  }, []);

  const brands = useMemo(() => {
    const counts = products.reduce((acc, product) => {
      acc[product.brand] = (acc[product.brand] ?? 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const visibleBrands = showAllBrands
    ? brands
    : brands.slice(0, INITIAL_BRAND_COUNT);

  const selectedCategoryQuery = (searchParams.get("product") ?? "").toLowerCase();
  const searchQuery = (searchParams.get("search") ?? "").trim().toLowerCase();
  const selectedGender = categoryQueryMap[selectedCategoryQuery] ?? null;

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const matchesHeaderCategory =
          !selectedGender ||
          product.gender?.some(
            (gender) => gender.toLowerCase() === selectedGender,
          );
        const inPriceRange =
          product.price >= priceRange.min && product.price <= priceRange.max;
        const inBrandRange =
          !selectedBrands.length || selectedBrands.includes(product.brand);
        const productDiscount = getDiscountPercent(product);
        const inDiscountRange =
          !selectedDiscounts.length ||
          selectedDiscounts.some((discountId) => {
            const option = discountOptions.find((item) => item.id === discountId);
            return option ? productDiscount >= option.minDiscount : true;
          });
        const matchesSearch =
          !searchQuery ||
          [product.name, product.brand, product.description]
            .filter(Boolean)
            .some((value) => value.toLowerCase().includes(searchQuery));

        return (
          matchesHeaderCategory &&
          inPriceRange &&
          inBrandRange &&
          inDiscountRange &&
          matchesSearch
        );
      }),
    [priceRange, selectedBrands, selectedDiscounts, searchQuery, selectedGender],
  );
  const visibleProducts = useMemo(
    () => filteredProducts.slice(0, visibleCount),
    [filteredProducts, visibleCount],
  );
  const restoreProductId = Number(location.state?.restoreProductId);
  const restoreScrollTop = location.state?.restoreScrollTop;

  useEffect(() => {
    if (!restoreProductId || hasRestoredPositionRef.current) {
      return;
    }

    const targetIndex = filteredProducts.findIndex(
      (product) => Number(product.id) === restoreProductId,
    );

    if (targetIndex < 0) {
      hasRestoredPositionRef.current = true;
      return;
    }

    const requiredVisibleCount = Math.ceil((targetIndex + 1) / PRODUCTS_BATCH_SIZE)
      * PRODUCTS_BATCH_SIZE;

    if (visibleCount < requiredVisibleCount) {
      setVisibleCount(requiredVisibleCount);
    }
  }, [filteredProducts, restoreProductId, visibleCount]);

  useEffect(() => {
    if (restoreProductId && !hasRestoredPositionRef.current) {
      return;
    }

    setVisibleCount(PRODUCTS_BATCH_SIZE);
  }, [filteredProducts, restoreProductId]);

  useEffect(() => {
    const loadMoreNode = loadMoreRef.current;

    if (!loadMoreNode || visibleProducts.length >= filteredProducts.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (!entry?.isIntersecting) {
          return;
        }

        setVisibleCount((current) =>
          Math.min(current + PRODUCTS_BATCH_SIZE, filteredProducts.length),
        );
      },
      {
        rootMargin: "180px 0px",
      },
    );

    const observerData = new IntersectionObserver(
      (entries)=>{
        const [entry] =entries;

        if(!entry?.isIntersecting){
          return ;
        }
        setVisibleCount((current)=>
          Math.min(current+PRODUCTS_BATCH_SIZE,filteredProducts.length)
        )
      }
    )

    observer.observe(loadMoreNode);

    return () => {
      observer.disconnect();
    };
  }, [filteredProducts.length, visibleProducts.length]);

  useEffect(() => {
    if (!restoreProductId || hasRestoredPositionRef.current) {
      return;
    }

    const targetIndex = visibleProducts.findIndex(
      (product) => Number(product.id) === restoreProductId,
    );

    if (targetIndex < 0) {
      return;
    }

    const scrollContainer = getProductsScrollContainer();

    requestAnimationFrame(() => {
        scrollContainer.scrollTo({
          top: restoreScrollTop,
          behavior: "auto",
        });
      
      hasRestoredPositionRef.current = true;
    });
  }, [restoreProductId, restoreScrollTop, visibleProducts]);

  const handleOpenProduct = (product) => {
    const scrollContainer = getProductsScrollContainer();

    navigate(`/products/${product.id}`, {
      state: {
        restoreProductId: product.id,
        restoreScrollTop: scrollContainer?.scrollTop ?? 0,
      },
    });

      navigate(`/products/${product.id}`,{
        state:{
          restoreProductId:product.id,
          restoreScrollTop:scrollContainer?.scrollTop ?? 0 ,
        }
      })
  };



  const handleLike = (product) => {
    const productId = Number(product.id);
    const existing = favourites.find(
      (item) => Number(item.productId) === productId,
    );

    if (existing) {
      api
        .delete(`/favourites/${existing.id}`)
        .then(() => {
          setFavourites((prev) =>
            prev.filter((item) => String(item.id) !== String(existing.id)),
          );
        })
        .catch((error) => {
          console.error("Failed to remove favourite:", error);
        });
      return;
    }

    api
      .post("/favourites", {
        productId,
        name: product.name,
        price: product.price,
        rating: product.rating,
        reviews: product.reviews,
        images: product.images,
      })
      .then((response) => {
        setFavourites((prev) => [...prev, response.data]);
      })
      .catch((error) => {
        console.error("Failed to add favourite:", error);
      });
  };

  const handleMinPriceChange = (event) => {
    const nextMin = Number(event.target.value);
    setPriceRange((current) => ({
      min: Math.min(nextMin, current.max - MIN_PRICE_GAP),
      max: current.max,
    }));
  };

  const handleMaxPriceChange = (event) => {
    const nextMax = Number(event.target.value);
    setPriceRange((current) => ({
      min: current.min,
      max: Math.max(nextMax, current.min + MIN_PRICE_GAP),
    }));
  };

  const handleBrandToggle = (brandName) => {
    setSelectedBrands((current) =>
      current.includes(brandName)
        ? current.filter((brand) => brand !== brandName)
        : [...current, brandName],
    );
  };

  const handleDiscountToggle = (discountId) => {
    setSelectedDiscounts((current) =>
      current.includes(discountId)
        ? current.filter((item) => item !== discountId)
        : [...current, discountId],
    );
  };

  const resetFilters = () => {
    setPriceRange({
      min: minProductPrice,
      max: maxProductPrice,
    });
    setSelectedBrands([]);
    setSelectedDiscounts([]);
    setShowAllBrands(false);
  };

  const rangeTrackLeft =
    ((priceRange.min - minProductPrice) / (maxProductPrice - minProductPrice)) *
    100;
  const rangeTrackRight =
    ((priceRange.max - minProductPrice) / (maxProductPrice - minProductPrice)) *
    100;

  return (
    <div className="mt-4 bg-gray-100 px-4 pb-8 sm:mt-6 sm:px-6 lg:mt-[30px] lg:px-[30px] dark:bg-slate-950 dark:text-slate-100 [--base-color:#e5e7eb] [--highlight-color:#f3f4f6] dark:[--base-color:#1f2937] dark:[--highlight-color:#334155]">
      <h2 className="mb-4 text-2xl font-bold text-gray-800 sm:text-[28px] lg:text-[32px] dark:text-slate-100">
        Products
      </h2>

      <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="h-fit rounded-xl border border-white/70 bg-white/95 p-5 shadow-sm xl:sticky xl:top-6 dark:border-slate-800 dark:bg-slate-900/95">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xl font-bold uppercase tracking-[0.22em] text-[#4880FF]">
              Filter
            </p>

            <Button
              text="Reset"
              variant="custom"
              useColorClasses={false}
              className="cursor-pointer rounded-[14px] bg-[#EDF4FF] px-4 py-2 text-sm font-bold text-[#356DFF] transition-colors duration-150 hover:opacity-80 dark:bg-slate-800 dark:text-slate-100"
              onClick={resetFilters}
            />
          </div>

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between text-sm font-semibold text-gray-700 dark:text-slate-200">
              <span className="font-bold">Price</span>
              <span className="text-[color:var(--color-text-secondary)] dark:text-slate-400">
                ${priceRange.min} - ${priceRange.max}
              </span>
            </div>

            <div className="relative h-8">
              <div className="absolute top-1/2 h-2 w-full -translate-y-1/2 rounded-full bg-[#E4ECFA] dark:bg-slate-800" />
              <div
                className="absolute top-1/2 h-2 -translate-y-1/2 rounded-full bg-[#4880FF]"
                style={{
                  left: `${rangeTrackLeft}%`,
                  width: `${Math.max(rangeTrackRight - rangeTrackLeft, 0)}%`,
                }}
              />

              <input
                type="range"
                min={minProductPrice}
                max={maxProductPrice}
                value={priceRange.min}
                onChange={handleMinPriceChange}
                className="pointer-events-none absolute left-0 top-1/2 z-20 h-2 w-full -translate-y-1/2 appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-[#4880FF] [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-[#4880FF]"
              />
              <input
                type="range"
                min={minProductPrice}
                max={maxProductPrice}
                value={priceRange.max}
                onChange={handleMaxPriceChange}
                className="pointer-events-none absolute left-0 top-1/2 z-10 h-2 w-full -translate-y-1/2 appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-[#4880FF] [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-[#4880FF]"
              />
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-sm font-bold">Brand</p>
              <span className="text-xs font-semibold text-[color:var(--color-text-secondary)] dark:text-slate-400">
                {selectedBrands.length} selected
              </span>
            </div>

            <ul className="space-y-2">
              {visibleBrands.map((brand) => {
                const isChecked = selectedBrands.includes(brand.name);

                return (
                  <li
                    key={brand.name}
                    onClick={()=>handleBrandToggle(brand.name)}
                    className="flex cursor-pointer items-center justify-between rounded-[14px] border border-transparent px-3 py-2 hover:border-[#E5ECFA] hover:bg-[#F7FAFF] dark:hover:border-slate-700 dark:hover:bg-slate-800/70"
                  >
                    <label className="flex cursor-pointer items-center gap-3 text-sm font-medium text-gray-700 dark:text-slate-200">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        className="h-4 w-4 cursor-pointer rounded accent-[#4880FF]"
                      />
                      <span onClick={()=>handleBrandToggle(brand.name)}>{brand.name}</span>
                    </label>
                    <span className="text-xs font-semibold text-[color:var(--color-text-secondary)] dark:text-slate-400">
                      ({brand.count})
                    </span>
                  </li>
                );
              })}
            </ul>

            {brands.length > INITIAL_BRAND_COUNT ? (
              <button
                type="button"
                onClick={() => setShowAllBrands((current) => !current)}
                className="mt-3 cursor-pointer text-sm font-bold text-[#4880FF] transition hover:opacity-80"
              >
                {showAllBrands ? "Show less brands -" : "Load more brands +"}
              </button>
            ) : null}
          </div>

          <div className="mt-6">
            <p className="mb-3 text-sm font-bold">Discount Range</p>
            <ul className="space-y-2">
              {discountOptions.map((option) => {
                const isChecked = selectedDiscounts.includes(option.id);
                return (
                  <li
                    key={option.id}
                    className="rounded-[14px] border border-transparent px-3 py-2 hover:border-[#E5ECFA] hover:bg-[#F7FAFF] dark:hover:border-slate-700 dark:hover:bg-slate-800/70"
                  >
                    <label className="flex cursor-pointer items-center gap-3 text-sm font-medium text-gray-700 dark:text-slate-200">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleDiscountToggle(option.id)}
                        className="h-4 w-4 cursor-pointer rounded accent-[#4880FF]"
                      />
                      <span>{option.label}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        <section className="min-w-0">
          <ProductsBanner slides={bannerSlides} />

          {selectedGender ? (
            <div className="mt-5 flex items-center justify-between gap-3 rounded-[18px] border border-[#D8E7FF] bg-[#F4F8FF] px-4 py-3 dark:border-slate-700 dark:bg-slate-900/95">
              <div>
                <p className="mt-1 text-sm font-semibold text-gray-700 dark:text-slate-200">
                  Showing {selectedCategoryQuery} products
                </p>
              </div>
              <Button
                text="Clear"
                variant="custom"
                useColorClasses={false}
                className="rounded-[12px] bg-white px-4 py-2 text-sm font-bold text-[#356DFF] dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                onClick={() => navigate("/products")}
              />
            </div>
          ) : null}

          {searchQuery ? (
            <div className="mt-5 flex items-center justify-between gap-3 rounded-[18px] border border-[#E7ECF7] bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900/95">
              <p className="text-sm font-semibold text-gray-700 dark:text-slate-200">
                Search results for "{searchParams.get("search")}"
              </p>
              <Button
                text="Clear search"
                variant="custom"
                useColorClasses={false}
                className="rounded-[12px] bg-[#EDF4FF] px-4 py-2 text-sm font-bold text-[#356DFF] dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                onClick={() => {
                  const nextSearchParams = new URLSearchParams(searchParams);
                  nextSearchParams.delete("search");
                  navigate(
                    nextSearchParams.toString()
                      ? `/products?${nextSearchParams.toString()}`
                      : "/products",
                  );
                }}
              />
            </div>
          ) : null}

          <div className="mt-5 grid grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3 lg:gap-7">
            {visibleProducts.map((product) => (
              <div key={product.id} data-product-card-id={product.id}>
                <ProductCard
                  name={product.name}
                  price={product.price}
                  rating={product.rating}
                  reviews={product.reviews}
                  images={product.images}
                  showImageSlider={false}
                  actionText="View Product"
                  isLiked={favourites.some(
                    (item) => Number(item.productId) === Number(product.id),
                  )}
                  onLike={() => handleLike(product)}
                  onEdit={() => handleOpenProduct(product)}
                />
              </div>
            ))}
          </div>

          {visibleProducts.length > 0 ? (
            <div className="mt-6 flex flex-col items-center gap-3">
              <p className="text-sm font-medium text-[color:var(--color-text-secondary)] dark:text-slate-400">
                Showing {visibleProducts.length} of {filteredProducts.length} products
              </p>
              {visibleProducts.length < filteredProducts.length ? (
                <div
                  ref={loadMoreRef}
                  className="flex min-h-12 items-center justify-center rounded-full border border-white/60 bg-white/80 px-5 py-3 text-sm font-semibold text-[#4880FF] shadow-sm dark:border-slate-700 dark:bg-slate-900/95 dark:text-blue-300"
                >
                  Scroll to load more products
                </div>
              ) :null}
            </div>
          ) : null}

          {!filteredProducts.length ? (
            <div className="mt-6 rounded-[28px] border border-dashed border-[#C8D8F0] bg-white/80 p-8 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900/95">
              <h4 className="text-xl font-semibold text-gray-800 dark:text-slate-100">
                No products available for these filters
              </h4>
              <Button
                text="Reset"
                variant="custom"
                useColorClasses={false}
                className="mt-5 rounded-[14px] bg-[#4880FF] px-5 py-3 text-sm font-bold text-white transition-colors duration-150 dark:hover:bg-[#3b6fe0]"
                onClick={resetFilters}
              />
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
};

export default Products;
