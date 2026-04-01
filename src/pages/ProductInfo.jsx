import React, { useEffect, useMemo, useRef, useState } from "react";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { MdLocalShipping, MdOutlineReplay, MdSecurity } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/common";
import { addToCart } from "../features/cartSlice";
import { Rating } from "../components/products";
import { getProductById } from "../data/products";

const accordionSections = [
  { id: "materials", title: "Materials And Care" },
  { id: "returns", title: "Returns Policy" },
  { id: "shipping", title: "Shipping And Delivery" },
];

const featurePills = [
  {
    id: "shipping",
    title: "Free Shipping",
    text: "Delivery in 3-5 business days",
    icon: MdLocalShipping,
  },
  {
    id: "returns",
    title: "Easy Returns",
    text: "30 day return window",
    icon: MdOutlineReplay,
  },
  {
    id: "warranty",
    title: "Secure Checkout",
    text: "Protected payment experience",
    icon: MdSecurity,
  },
];

const withHexAlpha = (hex, alpha) => {
  if (!hex) {
    return hex;
  }

  const normalizedHex = hex.replace("#", "");

  if (normalizedHex.length === 3) {
    const expandedHex = normalizedHex
      .split("")
      .map((value) => value + value)
      .join("");

    return `#${expandedHex}${alpha}`;
  }

  if (normalizedHex.length === 6) {
    return `#${normalizedHex}${alpha}`;
  }

  return hex;
};

const ProductInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const product = getProductById(id);

  const colorDefault = useMemo(() => product?.colors?.[0] ?? null, [product]);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(colorDefault);
  const [openSection, setOpenSection] = useState("materials");
  const [cartAnimation, setCartAnimation] = useState(null);
  const cartAnimationTimeoutRef = useRef(null);
  const cartReceiveTimeoutRef = useRef(null);
  const addToCartButtonRef = useRef(null);
  const mainImageRef = useRef(null);
  const imageHover = useRef(null);

  useEffect(() => {
    setSelectedImage(0);
    setQuantity(1);
    setSelectedColor(colorDefault);
    setOpenSection("materials");
  }, [colorDefault]);

  useEffect(() => {
    return () => {
      if (cartAnimationTimeoutRef.current) {
        clearTimeout(cartAnimationTimeoutRef.current);
      }
      if (cartReceiveTimeoutRef.current) {
        clearTimeout(cartReceiveTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const node = imageHover.current;
    node.style.setProperty("--display", "0");
    node.addEventListener("mousemove", (event) => {
      node.style.setProperty("--display", "1");
      const percentX = (event.offsetX * 100) / node.offsetWidth;
      const percentY = (event.offsetY * 100) / node.offsetHeight;
      node.style.setProperty("--zoom-x", percentX + "%");
node.style.setProperty(
  '--image-url',
  `url(http://localhost:5173${node.dataset.image})`
);      node.style.setProperty("--zoom-y", percentY + "%");
    });
    node.addEventListener("mouseleave", (event) => {
      node.style.setProperty("--display", "0");
    });
  }, [imageHover]);

  const handleBackToProducts = () => {
    navigate("/products", {
      state: {
        restoreProductId: location.state?.restoreProductId ?? Number(id),
        restoreScrollTop: location.state?.restoreScrollTop ?? 0,
      },
    });
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F4F7FB] px-4 py-8 dark:bg-slate-950">
        <div className="mx-auto max-w-3xl rounded-[28px] border border-[color:var(--color-border-subtle)] bg-white p-8 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <h1 className="text-2xl font-bold text-[color:var(--color-text-primary)]">
            Product not found
          </h1>
          <p className="mt-3 text-sm text-[color:var(--color-text-secondary)]">
            The product you requested does not exist or the link is invalid.
          </p>
          <Button
            text="Back to Products"
            className="mt-6 px-6"
            onClick={handleBackToProducts}
          />
        </div>
      </div>
    );
  }

  const mainImage = product.images[selectedImage] ?? product.images[0];
  const discountPercent = Math.max(
    0,
    Math.round(
      ((product.originalPrice - product.price) / product.originalPrice) * 100,
    ),
  );
  const imageBackdropStyle = selectedColor?.hex
    ? {
        background: selectedColor.hex      }
    : undefined;
  const imageFrameStyle = selectedColor?.hex
    ? {
        backgroundColor: withHexAlpha(selectedColor.hex, "1A"),
      }
    : undefined;

  const handleAddToCart = () => {
    if (cartAnimation) {
      return;
    }

    const imageRect = mainImageRef.current?.getBoundingClientRect();
    const cartTargetRect = document
      .querySelector('[data-cart-target="true"]')
      ?.getBoundingClientRect();

    const startX = imageRect
      ? imageRect.left + imageRect.width / 2
      : window.innerWidth / 2;
    const startY = imageRect
      ? imageRect.top + imageRect.height / 2
      : window.innerHeight / 2;
    const targetX = cartTargetRect
      ? cartTargetRect.left + cartTargetRect.width / 2
      : startX + 180;
    const targetY = cartTargetRect
      ? cartTargetRect.top + 10
      : Math.max(48, startY - 220);

    if (cartAnimationTimeoutRef.current) {
      clearTimeout(cartAnimationTimeoutRef.current);
    }
    if (cartReceiveTimeoutRef.current) {
      clearTimeout(cartReceiveTimeoutRef.current);
    }

    setCartAnimation({
      image: mainImage,
      startX,
      startY,
      deltaX: targetX - startX,
      deltaY: targetY - startY,
      width: imageRect ? Math.min(imageRect.width, 200) : 180,
      height: imageRect ? Math.min(imageRect.height, 200) : 180,
      quantity,
    });

    cartReceiveTimeoutRef.current = setTimeout(() => {
      dispatch(
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          image: mainImage,
          quantity,
          selectedColor,
        }),
      );
      window.dispatchEvent(new CustomEvent("cart:receive"));
    }, 520);

    cartAnimationTimeoutRef.current = setTimeout(() => {
      setCartAnimation(null);
    }, 760);
  };

  return (
    <div className="bg-[linear-gradient(180deg,#F7FAFF_0%,#EEF3FA_100%)]">
      <div className="relative  h-[calc(100vh-7.5vh)] overflow-hidden no-scrollbar  px-[31px] pb-[30px] pt-[30px] dark:bg-slate-950">
        <div className="mx-auto ">
          <button
            type="button"
            onClick={handleBackToProducts}
            className="inline-flex cursor-pointer items-center gap-3 rounded-full border border-white/70 bg-white/90 px-4 py-2 text-sm font-semibold text-[color:var(--color-text-primary)] shadow-sm backdrop-blur transition hover:-translate-x-1 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
          >
            <IoArrowBackCircleSharp size={24} />
            Back to products
          </button>

          <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)]">
            <section className="overflow-hidden h-[calc(100vh-20vh)] rounded-[34px] border border-white/70 bg-white/90 p-5 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur dark:border-slate-800 dark:bg-slate-900">
              <div className="grid gap-4 lg:grid-cols-[104px_minmax(0,1fr)]">
                <div className="order-2 flex gap-3 overflow-x-auto pb-1 lg:order-1 lg:max-h-[700px] lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden">
                  {product.images.map((image, index) => {
                    const isActive = index === selectedImage;

                    return (
                      <button
                        key={`${image}-${index}`}
                        type="button"
                        onClick={() => setSelectedImage(index)}
                        className={`flex h-[92px] w-[92px] shrink-0 cursor-pointer items-center justify-center rounded-[24px] border  lg:h-[104px] lg:w-[104px] ${
                          isActive
                            ? "border-[#4880FF] bg-[#EAF1FF] shadow-[0_14px_30px_rgba(72,128,255,0.18)] dark:bg-slate-800"
                            : "border-transparent bg-[#F5F8FD] hover:border-[#4880FF]/40 dark:bg-slate-950"
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.name} preview ${index + 1}`}
                          className="h-16 object-contain lg:h-20"
                        />
                      </button>
                    );
                  })}
                </div>

                <div
                  className="order-1 overflow-hidden rounded-[30px] p-6 transition-colors duration-300 dark:bg-[radial-gradient(circle_at_top,#1E3A5F_0%,#111827_42%,#0F172A_100%)] lg:order-2 lg:p-8"
                  style={imageBackdropStyle}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-white/85 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[#356DFF] shadow-sm dark:bg-slate-900/70 dark:text-blue-300">
                      New season
                    </span>
                    <span className="rounded-full bg-[#111827] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white dark:bg-slate-100 dark:text-slate-900">
                      {discountPercent}% off
                    </span>
                  </div>

                  <div
                    className="mt-8 flex items-center justify-center rounded-[28px] border border-white/60 bg-white/40 p-8 shadow-inner transition-colors duration-300 dark:border-slate-700/50 dark:bg-slate-900/20 dark:shadow-none lg:min-h-[520px]"
                    style={imageFrameStyle}
                  >
                    <div
                      ref={imageHover}
                      className="zoom-image"
                      data-image={mainImage}
                    >
                      <img
                        ref={mainImageRef}
                        src={mainImage}
                        alt={product.name}
                        className="h-[450px] w-[450px] object-fit drop-shadow-[0_26px_45px_rgba(15,23,42,0.2)] dark:drop-shadow-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className=" h-[calc(100vh-20vh)] overflow-y-auto no-scrollbar rounded-[34px] border border-white/70 bg-white/90 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur dark:border-slate-800 dark:bg-slate-900">
              <div className="p-6">
                <h1 className=" text-[34px] font-[900] leading-[1.1] text-[color:var(--color-text-primary)] dark:text-slate-100 lg:text-[44px]">
                  {product.name}
                </h1>

                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
                  <Rating value={product.rating} count={product.reviews} />
                  <span className="text-sm font-semibold text-[color:var(--color-text-secondary)] dark:text-slate-400">
                    {product.reviews} reviews
                  </span>
                </div>

                <p className="mt-6 max-w-[52ch] text-[15px] leading-7 text-[color:var(--color-text-secondary)] dark:text-slate-300">
                  {product.description}
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {featurePills.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.id}
                        className="rounded-[24px] border border-[#E8EEF7] bg-[#F8FBFF] p-4 dark:border-slate-800 dark:bg-slate-950/70"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-[#356DFF] shadow-sm dark:bg-slate-900 dark:text-blue-300">
                          <Icon size={20} />
                        </div>
                        <h3 className="mt-4 text-sm font-bold text-[color:var(--color-text-primary)] dark:text-slate-100">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-xs leading-5 text-[color:var(--color-text-secondary)] dark:text-slate-400">
                          {item.text}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 rounded-[28px] border border-[#E7ECF7] bg-[#F8FBFF] p-5 dark:border-slate-800 dark:bg-slate-950/70">
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[color:var(--color-text-secondary)] dark:text-slate-400">
                        Price
                      </p>
                      <div className="mt-2 flex flex-wrap items-end gap-3">
                        <div className="text-[38px] font-[900] leading-none text-[#356DFF] dark:text-blue-300">
                          ${product.price.toFixed(2)}
                        </div>
                        <div className="pb-1 text-[22px] font-semibold text-gray-400 line-through dark:text-slate-500">
                          ${product.originalPrice.toFixed(2)}
                        </div>
                      </div>
                    </div>

                    <div className="rounded-[22px] bg-white px-4 py-3 text-right shadow-sm dark:bg-slate-900">
                      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[color:var(--color-text-secondary)] dark:text-slate-400">
                        You save
                      </p>
                      <p className="mt-1 text-lg font-extrabold text-[color:var(--color-text-primary)] dark:text-slate-100">
                        ${(product.originalPrice - product.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)] dark:text-slate-400">
                      Colour
                    </p>
                    <p className="text-sm font-semibold text-[color:var(--color-text-primary)] dark:text-slate-100">
                      {selectedColor?.name}
                    </p>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    {product.colors.map((color) => {
                      const isActive = selectedColor?.id === color.id;

                      return (
                        <button
                          key={color.id}
                          type="button"
                          aria-label={color.name}
                          title={color.name}
                          onClick={() => setSelectedColor(color)}
                          className={`flex cursor-pointer items-center gap-3 rounded-full border px-3 py-2 transition-all duration-300 ${
                            isActive
                              ? "border-[#4880FF] bg-[#EDF4FF] shadow-sm dark:bg-blue-500/10"
                              : "border-[#E7ECF7] bg-white hover:border-[#4880FF]/40 dark:border-slate-700 dark:bg-slate-900"
                          }`}
                        >
                          <span
                            className="h-6 w-6 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: color.hex }}
                          />
                          <span className="text-sm font-semibold text-[color:var(--color-text-primary)] dark:text-slate-100">
                            {color.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center">
                  <div className="inline-flex h-14 items-center overflow-hidden rounded-[18px] border border-[#E7ECF7] bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
                    <button
                      type="button"
                      onClick={() =>
                        setQuantity((current) => Math.max(1, current - 1))
                      }
                      className="h-full cursor-pointer px-5 text-lg font-semibold text-[color:var(--color-text-secondary)] transition hover:bg-[#F5F8FD] dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      -
                    </button>
                    <span className="flex h-full min-w-[72px] items-center justify-center border-x border-[#E7ECF7] px-4 text-base font-extrabold text-[color:var(--color-text-primary)] dark:border-slate-700 dark:text-slate-100">
                      {String(quantity).padStart(2, "0")}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((current) => current + 1)}
                      className="h-full cursor-pointer px-5 text-lg font-semibold text-[color:var(--color-text-secondary)] transition hover:bg-[#F5F8FD] dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      +
                    </button>
                  </div>

                  <div className="cart-action-wrap relative flex-1">
                    <div
                      className={`cart-button-shell ${cartAnimation ? "cart-button-shell-active" : ""}`}
                      aria-hidden="true"
                    />
                    <Button
                      ref={addToCartButtonRef}
                      text={
                        cartAnimation
                          ? '<span class="cart-button-copy cart-button-copy-active"><span>Adding to cart</span></span>'
                          : '<span class="cart-button-copy"><span>Add to cart</span></span>'
                      }
                      disabled={Boolean(cartAnimation)}
                      className={`h-14! w-full rounded-[18px]! px-6 text-sm font-bold tracking-[0.2em] bg-[#4880FF]! ${
                        cartAnimation
                          ? "cart-button-pulse cart-button-processing"
                          : ""
                      }`}
                      onClick={handleAddToCart}
                    />
                  </div>
                </div>

                <div className="mt-8 rounded-[28px] border border-[#E7ECF7] bg-white p-2 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
                  <div className="divide-y divide-[#EDF1F7] dark:divide-slate-800">
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
                            className="flex w-full cursor-pointer items-center justify-between rounded-[20px] px-4 py-4 text-left text-sm font-bold text-[color:var(--color-text-primary)] transition hover:text-[#356DFF] dark:text-slate-100 dark:hover:text-blue-300"
                          >
                            <span>{section.title}</span>
                            <span
                              className={`text-lg text-[color:var(--color-text-secondary)] transition-transform duration-300 dark:text-slate-400 ${
                                isOpen ? "" : "rotate-0"
                              }`}
                            >
                              {isOpen ? "-" : "+"}
                            </span>
                          </button>

                          <div
                            className={`product-accordion-panel ${
                              isOpen ? "product-accordion-panel-open" : ""
                            }`}
                          >
                            <div className="product-accordion-panel-inner px-4 pb-4 text-sm leading-7 text-[color:var(--color-text-secondary)] dark:text-slate-300">
                              {section.id === "materials" ? (
                                <ul className="space-y-2">
                                  {product.specifications.map((item) => (
                                    <li
                                      key={item}
                                      className="flex items-start gap-3"
                                    >
                                      <span className="mt-2 h-2 w-2 rounded-full bg-[#4880FF]" />
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
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {cartAnimation ? (
          <div
            className="cart-fly-image cart-fly-image-active"
            aria-hidden="true"
            style={{
              left: `${cartAnimation.startX}px`,
              top: `${cartAnimation.startY}px`,
              width: `${cartAnimation.width}px`,
              height: `${cartAnimation.height}px`,
              "--cart-fly-x": `${cartAnimation.deltaX}px`,
              "--cart-fly-y": `${cartAnimation.deltaY}px`,
            }}
          >
            <div className="cart-fly-image-inner cart-fly-image-inner-active">
              <img
                src={cartAnimation.image}
                alt=""
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProductInfo;
