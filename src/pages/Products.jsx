import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
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

const Products = () => {
  const [favourites, setFavourites] = useState([]);
  const navigate = useNavigate();

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

  return (
    <div className="mt-4 sm:mt-6 lg:mt-[30px] px-4 sm:px-6 lg:px-[30px] bg-gray-100 min-h-screen pb-8 dark:bg-slate-950 [--base-color:#e5e7eb] [--highlight-color:#f3f4f6] dark:[--base-color:#1f2937] dark:[--highlight-color:#334155]">
      <h2 className="text-2xl sm:text-[28px] lg:text-[32px] font-bold text-gray-800 mb-4 dark:text-slate-100">
        Products
      </h2>

      <ProductsBanner slides={bannerSlides} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-7 mt-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            rating={product.rating}
            reviews={product.reviews}
            images={product.images}
            actionText="View Product"
            isLiked={favourites.some(
              (item) => Number(item.productId) === Number(product.id),
            )}
            onLike={() => handleLike(product)}
            onEdit={() => navigate(`/products/${product.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
