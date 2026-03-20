import React, { useState } from "react";
import { featuredProducts } from "./dashboardData";
import Button from "../common/Button";

const FeaturedProductCard = ({ products = featuredProducts }) => {
  const [idx, setIdx] = useState(0);
  const safeProducts = Array.isArray(products) ? products : [];
  const hasProducts = safeProducts.length > 0;
  const product = hasProducts ? safeProducts[idx] : null;
  const isFirst = idx === 0;
  const isLast = hasProducts ? idx === safeProducts.length - 1 : true;

  return (
    <div className="bg-white rounded-2xl shadow-sm pt-6 px-6 pb-8 flex flex-col dark:bg-slate-900 dark:border dark:border-slate-800">
      <span className="font-bold text-[18px] text-gray-800 mb-4 dark:text-slate-100">
        Featured Product
      </span>
      <div className="flex flex-col items-center n h-full">
        {hasProducts ? (
          <>
            <div className="flex items-center mt-[23px]  w-full">
              <Button
                text="❮"
                type="button"
                onClick={() => setIdx((i) => Math.max(i - 1, 0))}
                disabled={isFirst}
                variant="icon"
                useColorClasses={false}
                className={`w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 transition dark:border-slate-700 dark:text-slate-300 ${
                  isFirst
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-gray-50 dark:hover:bg-slate-800"
                }`}
              />
              <div className="flex-1 flex justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-[130px] object-contain"
                />
              </div>
              <Button
                text="❯"
                type="button"
                onClick={() => setIdx((i) => Math.min(i + 1, safeProducts.length - 1))}
                disabled={isLast}
                variant="icon"
                useColorClasses={false}
                className={`w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 transition dark:border-slate-700 dark:text-slate-300 ${
                  isLast
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-gray-50 dark:hover:bg-slate-800"
                }`}
              />
            </div>
            <p className="font-bold text-[15px] text-gray-800 mt-[60px] text-center dark:text-slate-100">
              {product.name}
            </p>
            <p className="text-blue-500 font-semibold text-sm mt-2 dark:text-blue-400">
              {product.price}
            </p>
          </>
        ) : (
          <div className="mt-8 w-full rounded-xl border border-dashed border-slate-200 px-6 py-10 text-center text-sm font-medium text-slate-500 dark:border-slate-700 dark:text-slate-400">
            No data available
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedProductCard;
