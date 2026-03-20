import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductCard } from "../components/products";
import { getProductById } from "../data/products";
import { api } from "../utils/api";

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const loadFavourites = async () => {
      try {
        const response = await api.get("/favourites");
        if (isMounted) {
          const nextFavourites = (response.data || []).map((item) => ({
            ...item,
            ...(getProductById(item.productId) ?? {}),
            isLiked: true,
          }));
          setFavourites(nextFavourites);
        }
      } catch (error) {
        console.error("Failed to load favourites:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadFavourites();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleLike = (product) => {
    const productId = Number(product.productId ?? product.id);
    const existing = favourites.find(
      (item) => Number(item.productId ?? item.id) === productId,
    );

    if (!existing) return;

    api
      .delete(`/favourites/${existing.id}`)
      .then(() => {
        setFavourites((prev) =>
          prev.map((item) =>
            String(item.id) === String(existing.id)
              ? { ...item, isLiked: false }
              : item,
          ),
        );
      })
      .catch((error) => {
        console.error("Failed to remove favourite:", error);
      });
  };

  return (
    <div className="pt-[30px] flex flex-col pl-[31px] pr-[33px] bg-theme-white min-h-screen dark:bg-slate-950">
      <h1 className="font-[700] text-[29.5px] tracking-[-0.2px] text-gray-900 dark:text-slate-100">
        Favourites
      </h1>
      <div className="mt-6">
        {!loading && favourites.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7">
            {favourites.map((product) => (
              <ProductCard
                key={product.productId ?? product.id}
                name={product.name}
                price={product.price}
                rating={product.rating}
                reviews={product.reviews}
                images={product.images}
                actionText="View Product"
                isLiked={product.isLiked !== false}
                onLike={() => handleLike(product)}
                onEdit={() =>
                  navigate(`/products/${product.productId ?? product.id}`)
                }
                slidesPerView={1}
                centerImages
              />
            ))}
          </div>
        ) : (
          <div className="rounded-[14px] bg-white p-6 text-[color:var(--color-text-body)] dark:bg-slate-900 dark:text-slate-100 dark:border dark:border-slate-700">
            <p className="text-base">
              {loading ? "Loading favourites..." : "No favourites yet."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourites;
