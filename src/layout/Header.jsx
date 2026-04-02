import React, { useEffect, useRef, useState } from "react";
import UkFlag from "../assets/images/uk-flag.png";
import profileImage from "../assets/images/profile-img.png";
import { IconComponent, Input, Select } from "@/components/common";
import Skeleton from "react-loading-skeleton";
import { api } from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { clearCart } from "@/features/cartSlice";
import { remove } from "@/features/tokenSlice";
import { AUTH_SESSION_KEY, DARK_MODE_KEY } from "@/utils/constants";
import { fetchCurrentUser, getStoredSession } from "@/utils/authSession";
import classNames from "classnames";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { CgProfile } from "react-icons/cg";
import { LuSettings } from "react-icons/lu";
import { BiLogOut } from "react-icons/bi";

const productMenuItems = [
  { label: "Men", query: "men" },
  { label: "Women", query: "women" },
  { label: "Kids", query: "kids" },
  { label: "Shop", query: "shop" },
];

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartReceiving, setIsCartReceiving] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem(DARK_MODE_KEY) === "true",
  );
  const themeTransitionTimeoutRef = useRef(null);
  const hasMountedRef = useRef(false);
  const [searchFilters] = useSearchParams();
  const [searchProduct, setSearchProduct] = useState(
    searchFilters.get("product"),
  );
  const [searchTerm, setSearchTerm] = useState(searchFilters.get("search") ?? "");
  const [currentUser, setCurrentUser] = useState(() => getStoredSession());
  const cartCount = useSelector((state) => state.cart.items.length);

  useEffect(() => {
    setSearchProduct(searchFilters.get("product"));
    setSearchTerm(searchFilters.get("search") ?? "");
  }, [searchFilters]);

  useEffect(() => {
    if (hasMountedRef.current) {
      document.documentElement.classList.add("theme-transition");
      window.clearTimeout(themeTransitionTimeoutRef.current);
      themeTransitionTimeoutRef.current = window.setTimeout(() => {
        document.documentElement.classList.remove("theme-transition");
      }, 260);
    } else {
      hasMountedRef.current = true;
    }

    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem(DARK_MODE_KEY, String(isDarkMode));

    return () => {
      window.clearTimeout(themeTransitionTimeoutRef.current);
    };
  }, [isDarkMode]);

  const fetchLanguages = async () => {
    try {
      const response = await api.get("/languages");
      const data = response.data.filter((item) => {
        return (item.image = UkFlag);
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadCurrentUser = async () => {
      try {
        const user = await fetchCurrentUser();

        if (isMounted && user) {
          setCurrentUser((prev) => ({
            ...prev,
            ...user,
          }));
        }
      } catch (error) {
        console.error("Failed to load current user for header:", error);
      }
    };

    loadCurrentUser();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const closeMenuOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", closeMenuOutside);
    return () => document.removeEventListener("mousedown", closeMenuOutside);
  }, []);

  useEffect(() => {
    let cartReceiveTimeout;

    const handleCartReceive = () => {
      setIsCartReceiving(true);
      window.clearTimeout(cartReceiveTimeout);
      cartReceiveTimeout = window.setTimeout(() => {
        setIsCartReceiving(false);
      }, 300);
    };

    window.addEventListener("cart:receive", handleCartReceive);
    return () => {
      window.removeEventListener("cart:receive", handleCartReceive);
      window.clearTimeout(cartReceiveTimeout);
    };
  }, []);

  const changeLanguage = (selectedOption) => {
    setSelectedLanguage(selectedOption);
  };

  const onLogout = () => {
    dispatch(remove());
    dispatch(clearCart());
    localStorage.removeItem(AUTH_SESSION_KEY);
    setIsMenuOpen(false);
    navigate("/login", { replace: true });
  };

  const onProfile = () => {
    setIsMenuOpen(false);
    navigate("/user-profile", { replace: true });
  };

  const onProductMenuClick = (query) => {
    const nextSearchParams = new URLSearchParams();
    if (query !== "shop") {
      nextSearchParams.set("product", query);
    }
    if (searchTerm.trim()) {
      nextSearchParams.set("search", searchTerm.trim());
    }

    navigate(
      nextSearchParams.toString()
        ? `/products?${nextSearchParams.toString()}`
        : "/products",
    );
  };

  const handleSearchChange = (event) => {
    const nextSearch = event.target.value;
    setSearchTerm(nextSearch);

    const nextSearchParams = new URLSearchParams();
    const currentProduct = searchFilters.get("product");

    if (currentProduct) {
      nextSearchParams.set("product", currentProduct);
    }
    if (nextSearch.trim()) {
      nextSearchParams.set("search", nextSearch.trim());
    }

    navigate(
      nextSearchParams.toString()
        ? `/products?${nextSearchParams.toString()}`
        : "/products",
    );
  };

  return (
    <div className="sticky top-0 z-30 flex items-center bg-white justify-between shadow-md w-full dark:bg-slate-950 dark:border-b dark:border-slate-800 [--base-color:#e5e7eb] [--highlight-color:#f3f4f6] dark:[--base-color:#1f2937] dark:[--highlight-color:#334155]">
      <div className="ml-[78px] flex items-center my-2">
        <div className="flex gap-4 mr-4">
          {productMenuItems.map((item) => (
            <button
              key={item.query}
              type="button"
              onClick={() => {
                setSearchProduct(item.query);
                onProductMenuClick(item.query);
              }}
              className={classNames(
                "cursor-pointer text-sm capitalize font-semibold text-[color:var(--color-text-body)]  hover:text-[#4880FF] dark:text-slate-100 dark:hover:text-blue-300",
                searchProduct == item.query ? "!text-[#4880FF]" : null,
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <Input
          divClassName="h-[38px] !bg-[#F5F6FA] !border-[var(--orderlist-border-color)] !rounded-[19px] dark:!bg-slate-900 dark:!border-slate-700"
          placeholder="Search"
          startIcon="search"
          className="w-[388px]"
          inputClassName="dark:text-slate-100"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="mr-[31px] flex items-center py-[13px]">
        {loading ? (
          <Skeleton width={30} height={30} />
        ) : (
          <div className="mr-4 flex relative items-center">
            {/* <button
              type="button"
              title="Light Mode"
              onClick={() => setIsDarkMode(false)}
              className={`flex cursor-pointer h-8 w-8 z-40 items-center justify-center rounded-full transition ${
                !isDarkMode
                  ? " text-amber-600 "
                  : "text-gray-500 hover:text-amber-500 dark:text-slate-400 dark:hover:text-amber-400"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
            </button>
            <button
              type="button"
              title="Dark Mode"
              onClick={() => setIsDarkMode(true)}
              className={`ml-1 flex cursor-pointer h-8 w-8 z-40 items-center justify-center rounded-full transition ${
                isDarkMode
                  ? " text-slate-100 shadow-sm"
                  : "text-gray-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </button>
            <div
              className={classNames(
                "absolute h-8 w-8 bg-amber-100  rounded-full transition-transform transition-colors duration-400 custom-animation ease-in-out",
                isDarkMode ? "translate-x-9 bg-gray-800" : "translate-x-0 ",
              )}
            ></div> */}
            <div className="sky">
              <button
                type="button"
                title={
                  isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
                }
                aria-pressed={isDarkMode}
                onClick={() => setIsDarkMode((prev) => !prev)}
                className={classNames(
                  "switch",
                  isDarkMode && "night",
                  isDarkMode && "show-stars",
                )}
              >
                <div className="track day">
                  <div
                    className={classNames("moon", isDarkMode && "moon-slide")}
                  ></div>
                </div>
                <div className="stars">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M324.42 103.15L384 128l24.84 59.58a8 8 0 0 0 14.32 0L448 128l59.58-24.85a8 8 0 0 0 0-14.31L448 64 423.16 4.42a8 8 0 0 0-14.32 0L384 64l-59.58 24.84a8 8 0 0 0 0 14.31zm183.16 305.69L448 384l-24.84-59.58a8 8 0 0 0-14.32 0L384 384l-59.58 24.84a8 8 0 0 0 0 14.32L384 448l24.84 59.58a8 8 0 0 0 14.32 0L448 448l59.58-24.84a8 8 0 0 0 0-14.32zM384 255.64a16.06 16.06 0 0 0-8.84-14.33l-112.57-56.39-56.28-112.77c-5.44-10.87-23.19-10.87-28.62 0l-56.28 112.77L8.84 241.31a16 16 0 0 0 0 28.67l112.57 56.39 56.28 112.77a16 16 0 0 0 28.62 0l56.28-112.77L375.16 270a16.07 16.07 0 0 0 8.84-14.36z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M324.42 103.15L384 128l24.84 59.58a8 8 0 0 0 14.32 0L448 128l59.58-24.85a8 8 0 0 0 0-14.31L448 64 423.16 4.42a8 8 0 0 0-14.32 0L384 64l-59.58 24.84a8 8 0 0 0 0 14.31zm183.16 305.69L448 384l-24.84-59.58a8 8 0 0 0-14.32 0L384 384l-59.58 24.84a8 8 0 0 0 0 14.32L384 448l24.84 59.58a8 8 0 0 0 14.32 0L448 448l59.58-24.84a8 8 0 0 0 0-14.32zM384 255.64a16.06 16.06 0 0 0-8.84-14.33l-112.57-56.39-56.28-112.77c-5.44-10.87-23.19-10.87-28.62 0l-56.28 112.77L8.84 241.31a16 16 0 0 0 0 28.67l112.57 56.39 56.28 112.77a16 16 0 0 0 28.62 0l56.28-112.77L375.16 270a16.07 16.07 0 0 0 8.84-14.36z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M324.42 103.15L384 128l24.84 59.58a8 8 0 0 0 14.32 0L448 128l59.58-24.85a8 8 0 0 0 0-14.31L448 64 423.16 4.42a8 8 0 0 0-14.32 0L384 64l-59.58 24.84a8 8 0 0 0 0 14.31zm183.16 305.69L448 384l-24.84-59.58a8 8 0 0 0-14.32 0L384 384l-59.58 24.84a8 8 0 0 0 0 14.32L384 448l24.84 59.58a8 8 0 0 0 14.32 0L448 448l59.58-24.84a8 8 0 0 0 0-14.32zM384 255.64a16.06 16.06 0 0 0-8.84-14.33l-112.57-56.39-56.28-112.77c-5.44-10.87-23.19-10.87-28.62 0l-56.28 112.77L8.84 241.31a16 16 0 0 0 0 28.67l112.57 56.39 56.28 112.77a16 16 0 0 0 28.62 0l56.28-112.77L375.16 270a16.07 16.07 0 0 0 8.84-14.36z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M324.42 103.15L384 128l24.84 59.58a8 8 0 0 0 14.32 0L448 128l59.58-24.85a8 8 0 0 0 0-14.31L448 64 423.16 4.42a8 8 0 0 0-14.32 0L384 64l-59.58 24.84a8 8 0 0 0 0 14.31zm183.16 305.69L448 384l-24.84-59.58a8 8 0 0 0-14.32 0L384 384l-59.58 24.84a8 8 0 0 0 0 14.32L384 448l24.84 59.58a8 8 0 0 0 14.32 0L448 448l59.58-24.84a8 8 0 0 0 0-14.32zM384 255.64a16.06 16.06 0 0 0-8.84-14.33l-112.57-56.39-56.28-112.77c-5.44-10.87-23.19-10.87-28.62 0l-56.28 112.77L8.84 241.31a16 16 0 0 0 0 28.67l112.57 56.39 56.28 112.77a16 16 0 0 0 28.62 0l56.28-112.77L375.16 270a16.07 16.07 0 0 0 8.84-14.36z" />
                  </svg>
                </div>
                <div className="stars">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M324.42 103.15L384 128l24.84 59.58a8 8 0 0 0 14.32 0L448 128l59.58-24.85a8 8 0 0 0 0-14.31L448 64 423.16 4.42a8 8 0 0 0-14.32 0L384 64l-59.58 24.84a8 8 0 0 0 0 14.31zm183.16 305.69L448 384l-24.84-59.58a8 8 0 0 0-14.32 0L384 384l-59.58 24.84a8 8 0 0 0 0 14.32L384 448l24.84 59.58a8 8 0 0 0 14.32 0L448 448l59.58-24.84a8 8 0 0 0 0-14.32zM384 255.64a16.06 16.06 0 0 0-8.84-14.33l-112.57-56.39-56.28-112.77c-5.44-10.87-23.19-10.87-28.62 0l-56.28 112.77L8.84 241.31a16 16 0 0 0 0 28.67l112.57 56.39 56.28 112.77a16 16 0 0 0 28.62 0l56.28-112.77L375.16 270a16.07 16.07 0 0 0 8.84-14.36z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M324.42 103.15L384 128l24.84 59.58a8 8 0 0 0 14.32 0L448 128l59.58-24.85a8 8 0 0 0 0-14.31L448 64 423.16 4.42a8 8 0 0 0-14.32 0L384 64l-59.58 24.84a8 8 0 0 0 0 14.31zm183.16 305.69L448 384l-24.84-59.58a8 8 0 0 0-14.32 0L384 384l-59.58 24.84a8 8 0 0 0 0 14.32L384 448l24.84 59.58a8 8 0 0 0 14.32 0L448 448l59.58-24.84a8 8 0 0 0 0-14.32zM384 255.64a16.06 16.06 0 0 0-8.84-14.33l-112.57-56.39-56.28-112.77c-5.44-10.87-23.19-10.87-28.62 0l-56.28 112.77L8.84 241.31a16 16 0 0 0 0 28.67l112.57 56.39 56.28 112.77a16 16 0 0 0 28.62 0l56.28-112.77L375.16 270a16.07 16.07 0 0 0 8.84-14.36z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M324.42 103.15L384 128l24.84 59.58a8 8 0 0 0 14.32 0L448 128l59.58-24.85a8 8 0 0 0 0-14.31L448 64 423.16 4.42a8 8 0 0 0-14.32 0L384 64l-59.58 24.84a8 8 0 0 0 0 14.31zm183.16 305.69L448 384l-24.84-59.58a8 8 0 0 0-14.32 0L384 384l-59.58 24.84a8 8 0 0 0 0 14.32L384 448l24.84 59.58a8 8 0 0 0 14.32 0L448 448l59.58-24.84a8 8 0 0 0 0-14.32zM384 255.64a16.06 16.06 0 0 0-8.84-14.33l-112.57-56.39-56.28-112.77c-5.44-10.87-23.19-10.87-28.62 0l-56.28 112.77L8.84 241.31a16 16 0 0 0 0 28.67l112.57 56.39 56.28 112.77a16 16 0 0 0 28.62 0l56.28-112.77L375.16 270a16.07 16.07 0 0 0 8.84-14.36z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M324.42 103.15L384 128l24.84 59.58a8 8 0 0 0 14.32 0L448 128l59.58-24.85a8 8 0 0 0 0-14.31L448 64 423.16 4.42a8 8 0 0 0-14.32 0L384 64l-59.58 24.84a8 8 0 0 0 0 14.31zm183.16 305.69L448 384l-24.84-59.58a8 8 0 0 0-14.32 0L384 384l-59.58 24.84a8 8 0 0 0 0 14.32L384 448l24.84 59.58a8 8 0 0 0 14.32 0L448 448l59.58-24.84a8 8 0 0 0 0-14.32zM384 255.64a16.06 16.06 0 0 0-8.84-14.33l-112.57-56.39-56.28-112.77c-5.44-10.87-23.19-10.87-28.62 0l-56.28 112.77L8.84 241.31a16 16 0 0 0 0 28.67l112.57 56.39 56.28 112.77a16 16 0 0 0 28.62 0l56.28-112.77L375.16 270a16.07 16.07 0 0 0 8.84-14.36z" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <Skeleton width={30} height={30} />
        ) : (
          <div
          onClick={()=>navigate('/cart')}
            data-cart-target="true"
            className={classNames(
              "relative mr-5 flex items-center justify-center",
              isCartReceiving && "cart-target-receive",
            )}
          >
            <span className="cart-target-glow" aria-hidden="true" />
            <span className="cart-target-ring" aria-hidden="true" />
            <HiOutlineShoppingCart className="h-6 w-6 cursor-pointer text-[color:var(--color-text-body)] dark:text-slate-100" />
            <div
              className={classNames(
                "absolute -top-[8px] -right-[8px] flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#4880FF] px-1 text-[10px] font-bold text-white",
                isCartReceiving && "cart-count-bump",
              )}
            >
              {cartCount}
            </div>
          </div>
        )}

        {loading ? (
          <Skeleton width={30} height={30} />
        ) : (
          <div className="relative flex cursor-pointer items-center justify-center">
            <IconComponent
              icon="bell"
              className="h-5 w-5 dark:invert dark:brightness-90"
            />
            <div className="absolute flex items-center justify-center h-[18px] -top-[8px] -right-[4px] w-[18px] rounded-full bg-[#F93C659C]">
              <span className="h-[14px] w-[14px] rounded-full text-sm flex items-center justify-center text-white bg-pink-500">
                <span className="p-[1px]">6</span>
              </span>
            </div>
          </div>
        )}

        <div className="flex items-center ml-[26px] justify-center">
          {/* <div>
            {loading ? (
              <Skeleton width={100} height={30} />
            ) : (
              <Select
                onChange={changeLanguage}
                options={languages}
                className={""}
                value={selectedLanguage}
              />
            )}
          </div> */}
        </div>
        {loading ? (
          <Skeleton width={150} className="ml-6" height={30} />
        ) : (
          <div className="relative ml-[26.92px]" ref={menuRef}>
            <button
              type="button"
              className="flex items-center jstify-center cursor-pointer"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <img
                className="h-[44px] w-[44px]"
                src={profileImage}
                alt="Profile"
              />
              <div className="ml-5 flex flex-col text-left">
                <span className="text-[color:var(--color-text-body)] font-bold text-sm dark:text-slate-100">
                  {currentUser?.name || "User"}
                </span>
                <span className="text-[color:var(--color-text-muted)] mt-[3px] text-xs font-semibold dark:text-slate-400">
                  Admin
                </span>
              </div>
              <div className="ml-[26px]">
                <IconComponent
                  icon="circle-down"
                  className="h-[18px] w-[18px] dark:invert dark:brightness-90"
                />
              </div>
            </button>

            <div
              className={`${isMenuOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"} absolute right-0 z-50 mt-2 min-w-[220px] rounded-lg border border-[var(--color-border-subtle)] bg-white p-2 shadow-md transition-all duration-150 dark:border-slate-700 dark:bg-slate-900`}
            >
              <div
                type="button"
                onClick={onProfile}
                className="mt-1 w-full flex items-center gap-3 cursor-pointer rounded-md px-3 py-2 text-left text-sm font-medium text-[color:var(--color-text-primary)] transition-colors duration-300 ease-in-out hover:bg-blue-100 hover:text-[#356DFF] dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-blue-300"
              >
                <CgProfile size={18}/> <span className="mt-1">Profile</span>
              </div>
              <div
                type="button"
                onClick={()=>navigate('settings')}
                className="mt-1 w-full flex gap-3 items-center cursor-pointer rounded-md px-3 py-2 text-left text-sm font-medium text-[color:var(--color-text-primary)] transition-colors duration-300 ease-in-out hover:bg-blue-100 hover:text-[#356DFF] dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-blue-300"
              >
                <LuSettings size={18}/> <span className="">Settings</span>
              </div>
              <div
                type="button"
                onClick={onLogout}
                className="mt-1 w-full cursor-pointer flex gap-3 items-center rounded-md px-3 py-2 text-left text-sm text-red-600 transition-colors duration-300 ease-in-out hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30"
              >
               <BiLogOut size={18}/> <span className="">Logout</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
