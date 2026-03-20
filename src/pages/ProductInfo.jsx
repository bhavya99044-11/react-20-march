import React, { useEffect, useMemo, useState } from "react";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Select } from "../components/common";
import { addToCart } from "../features/cartSlice";
import { Rating } from "../components/products";
import { getProductById } from "../data/products";
import { successToast } from "../utils/toastMessage";

const accordionSections = [
  { id: "returns", title: "Returns Policy" },
  { id: "materials", title: "Materials And Care" },
  { id: "shipping", title: "Shipping And Delivery" },
];

const ProductInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = getProductById(id);

  const sizeDefault = useMemo(
    () => product?.sizeOptions?.[0] ?? null,
    [product],
  );
  const colorDefault = useMemo(() => product?.colors?.[0] ?? null, [product]);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(sizeDefault);
  const [selectedColor, setSelectedColor] = useState(colorDefault);
  const [openSection, setOpenSection] = useState("materials");

  useEffect(() => {
    setSelectedImage(0);
    setQuantity(1);
    setSelectedSize(sizeDefault);
    setSelectedColor(colorDefault);
    setOpenSection("materials");
  }, [sizeDefault, colorDefault]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-100 px-4 py-8 dark:bg-slate-950">
        <div className="mx-auto max-w-3xl rounded-[20px] border border-[color:var(--color-border-subtle)] bg-white p-8 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <h1 className="text-2xl font-bold text-[color:var(--color-text-primary)]">
            Product not found
          </h1>
          <p className="mt-3 text-sm text-[color:var(--color-text-secondary)]">
            The product you requested does not exist or the link is invalid.
          </p>
          <Button
            text="Back to Products"
            className="mt-6 px-6"
            onClick={() => navigate("/products")}
          />
        </div>
      </div>
    );
  }

  const mainImage = product.images[selectedImage] ?? product.images[0];

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: mainImage,
        quantity,
        selectedColor,
        selectedSize,
      }),
    );
    successToast(`${product.name} added to cart`);
  };

  return (
    <div className="bg-white dark:bg-slate-950">
      <div className="relative h-[calc(100vh-8vh)] px-[31px] pt-[30px] pb-[30px] pr-[33px]">
        <button
          type="button"
          onClick={() => navigate("/products")}
          className="absolute top-[40px] left-[40px] inline-flex cursor-pointer items-center text-sm font-semibold transition hover:opacity-80"
          aria-label="Back to products"
        >
          <IoArrowBackCircleSharp size={30} />
        </button>

        <div className="flex flex-col gap-10 xl:flex-row">
          <div className="flex w-full flex-col gap-3 xl:w-[52%]">
            <div className="flex h-[580px] items-center justify-center rounded-2xl bg-[#ddf0f7] dark:bg-slate-900">
              <img
                src={mainImage}
                alt={product.name}
                className="h-[400px] max-w-full object-contain drop-shadow-xl"
              />
            </div>

            <div className="flex gap-3 overflow-x-auto">
              {product.images.map((image, index) => {
                const isActive = index === selectedImage;

                return (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    className={`flex h-[160px] w-[160px] shrink-0 items-center justify-center rounded-xl border transition lg:h-[180px] lg:w-[180px] ${
                      isActive
                        ? "border-[color:var(--color-secondary)] bg-[#ddf0f7] dark:bg-slate-800"
                        : "border-transparent bg-[#f5f7fb] hover:border-[color:var(--color-secondary)]/50 dark:bg-slate-900"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} preview ${index + 1}`}
                      className="h-32 object-contain lg:h-40"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="w-full xl:w-[48%]">
            <div className="mx-auto max-w-[560px] xl:max-w-none">
              <h1 className="text-[42px] leading-[1.3] font-[800] text-gray-900 dark:text-slate-100">
                {product.name}
              </h1>
              <p className="mt-6 text-gray-600 dark:text-slate-400">
                {product.description}
              </p>

              <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-wrap gap-3">
                  <div className="text-[28px] font-semibold text-gray-900 dark:text-slate-100">
                    ${product.price.toFixed(2)}
                  </div>
                  <div className="text-[28px] font-semibold text-gray-400 line-through dark:text-slate-500">
                    ${product.originalPrice.toFixed(2)}
                  </div>
                </div>

                <div className="mt-1">
                  <Rating value={product.rating} count={product.reviews} />
                </div>
              </div>

              <div className="mt-8">
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-slate-400">
                  Colour:
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  {product.colors.map((color) => {
                    const isActive = selectedColor?.id === color.id;

                    return (
                      <button
                        key={color.id}
                        type="button"
                        aria-label={color.name}
                        title={color.name}
                        className={`h-7 w-7 cursor-pointer rounded-full border-2 transition ${''
                          // isActive
                          //   ? "scale-110 border-gray-900 ring-2 ring-blue-200 dark:border-slate-100 dark:ring-slate-700"
                          //   : "border-white/70 hover:scale-105"
                        }`}
                        style={{ backgroundColor: color.hex }}
                      >
                        <span className="sr-only">{color.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="inline-flex items-center overflow-hidden rounded-lg border border-gray-200 dark:border-slate-700">
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((current) => Math.max(1, current - 1))
                    }
                    className="px-3 cursor-pointer text-lg text-gray-600 transition hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-sm font-semibold text-gray-800 dark:text-slate-100">
                    {String(quantity).padStart(2, "0")}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((current) => current + 1)}
                    className="px-3 text-lg cursor-pointer text-gray-600 transition hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    +
                  </button>
                </div>

                <Button
                  text="ADD TO CART"
                  className="flex-1 !bg-[#4880FF] rounded-xl px-6 py-3 text-sm tracking-wide"
                  onClick={handleAddToCart}
                />
              </div>

              <hr className="mt-8 border-gray-100 dark:border-slate-800" />

              {/* <div className="mt-2 divide-y divide-gray-100 dark:divide-slate-800">
                {accordionSections.map((section) => {
                  const isOpen = openSection === section.id;

                  return (
                    <div key={section.id}>
                      <button
                        type="button"
                        onClick={() =>
                          setOpenSection((current) =>
                            current === section.id ? "" : section.id,
                          )
                        }
                        className="flex w-full items-center justify-between py-3 text-left text-sm font-semibold text-gray-800 transition hover:text-blue-600 dark:text-slate-100 dark:hover:text-blue-400"
                      >
                        <span>{section.title}</span>
                        <span className="text-lg text-gray-400 dark:text-slate-500">
                          {isOpen ? "-" : "+"}
                        </span>
                      </button>

                      {isOpen ? (
                        <div className="pb-3 text-sm leading-relaxed text-gray-500 dark:text-slate-400">
                          {section.id === "materials" ? (
                            <ul className="space-y-1.5">
                              {product.specifications.map((item) => (
                                <li key={item} className="flex items-start gap-2">
                                  <span className="mt-0.5 text-gray-300">•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          ) : section.id === "returns" ? (
                            <p>{product.returns}</p>
                          ) : (
                            <p>{product.shipping}</p>
                          )}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
