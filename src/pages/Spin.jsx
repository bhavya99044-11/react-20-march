import React, { useEffect, useMemo, useState } from "react";
import { IoIosPin } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../features/cartSlice";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import { products } from "../data/products";
import {
  getActivePlanId,
  getRemainingSpins,
  getRewardedPrice,
  getTodayStamp,
  getUsedSpinsToday,
  getUserDailySpinLimit,
  isRewardSameDay,
  rewardSupportsProductSelection,
} from "../utils/spinReward";
import { fetchCurrentUser } from "../utils/authSession";
import { api } from "../utils/api";
import { errorToast, successToast } from "../utils/toastMessage";

const createSpinInstanceId = () =>
  `spin-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

const rewards = [
  {
    id: "spin-15",
    label: "15% Off",
    rewardType: "discount-percent",
    discountPercent: 15,
    details: "Apply to one product only",
  },
  {
    id: "spin-25",
    label: "25% Off",
    rewardType: "discount-percent",
    discountPercent: 25,
    details: "Apply to one product only",
  },
  {
    id: "spin-40",
    label: "40% Off",
    rewardType: "discount-percent",
    discountPercent: 40,
    details: "Apply to one product only",
  },
  {
    id: "spin-50",
    label: "50% Off",
    rewardType: "discount-percent",
    discountPercent: 50,
    details: "Big discount on one product",
  },
  {
    id: "spin-75",
    label: "75% Off",
    rewardType: "discount-percent",
    discountPercent: 75,
    details: "Lucky drop for one product",
  },
  {
    id: "spin-free",
    label: "Free Product",
    rewardType: "free-product",
    discountPercent: 100,
    details: "Choose one product for free",
  },
];

const wheelColors = [
  "#4880FF",
  "#1D4ED8",
  "#60A5FA",
  "#2563EB",
  "#93C5FD",
  "#2563EB",
];
const SPIN_DURATION = 4800;
const FEATURED_PRODUCTS_LIMIT = 20;

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

export default function SpinWheel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const { width, height } = useWindowSize();
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedReward, setSelectedReward] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showConffeti, setShowConffeti] = useState(false);
  const segmentAngle = 360 / rewards.length;
  const featuredProducts = useMemo(
    () => products.slice(0, FEATURED_PRODUCTS_LIMIT),
    [],
  );
  const todayStamp = getTodayStamp();

  useEffect(() => {
    let isMounted = true;

    const loadSpinReward = async () => {
      setIsProfileLoading(true);

      try {
        const user = await fetchCurrentUser();

        if (!isMounted) {
          return;
        }

        setCurrentUser(user);

        const profileReward = user?.spinReward ?? null;

        if (!profileReward) {
          setSelectedReward(null);
          setSelectedProductId(null);
          return;
        }

        if (isRewardSameDay(profileReward, todayStamp)) {
          setSelectedReward(profileReward);
          setSelectedProductId(profileReward.appliedProductId ?? null);
          return;
        }

        setSelectedReward(null);
        setSelectedProductId(null);

        if (user?.id) {
          const patchResponse = await api.patch(`/users/${user.id}`, {
            spinReward: null,
          });

          if (isMounted) {
            setCurrentUser(patchResponse.data);
          }
        }
      } catch (error) {
        console.error("Failed to load spin reward:", error);

        if (isMounted) {
          setCurrentUser(null);
          setSelectedReward(null);
          setSelectedProductId(null);
        }
      } finally {
        if (isMounted) {
          setIsProfileLoading(false);
        }
      }
    };

    loadSpinReward();

    return () => {
      isMounted = false;
    };
  }, [todayStamp]);

  const handleConffetiCLick = () => {
    setShowConffeti(true);

    window.setTimeout(() => {
      setShowConffeti(false);
    }, 10000);
  };

  const getRewardAtPointer = (finalRotation) => {
    const normalizedRotation = ((finalRotation % 360) + 360) % 360;
    const pointerIndex =
      (rewards.length -
        (Math.floor((normalizedRotation + segmentAngle / 2) / segmentAngle) %
          rewards.length)) %
      rewards.length;

    return rewards[pointerIndex];
  };

  const wheelBackground = useMemo(() => {
    const slices = rewards
      .map((_, index) => {
        const start = index * segmentAngle;
        const end = start + segmentAngle;
        return `${wheelColors[index]} ${start}deg ${end}deg`;
      })
      .join(", ");

    return `conic-gradient(from -90deg, ${slices})`;
  }, [segmentAngle]);

  const dailySpinLimit = currentUser ? getUserDailySpinLimit(currentUser) : 0;
  const spinsUsedToday = getUsedSpinsToday(selectedReward, todayStamp);
  const remainingSpinsToday = currentUser
    ? getRemainingSpins(currentUser, selectedReward, todayStamp)
    : 0;
  const hasUsedOfferToday = Boolean(selectedReward?.appliedProductId);
  const canSpinToday =
    !isProfileLoading &&
    Boolean(currentUser?.id) &&
    remainingSpinsToday > 0 &&
    !hasUsedOfferToday;
  const appliedRewardProductId = selectedReward?.appliedProductId ?? null;

  const rewardedCartItem = cartItems.find(
    (item) =>
      item.spinReward?.spinInstanceId === selectedReward?.spinInstanceId,
  );

  const persistSpinReward = async (reward, { incrementSpinUsage = false } = {}) => {
    const freshUser = await fetchCurrentUser();

    if (!freshUser?.id) {
      throw new Error("User not found");
    }

    const activeReward = isRewardSameDay(freshUser.spinReward, todayStamp)
      ? freshUser.spinReward
      : null;
    const nextDailySpinLimit = getUserDailySpinLimit(freshUser);
    const nextUsedSpins = incrementSpinUsage
      ? Math.min(getUsedSpinsToday(activeReward, todayStamp) + 1, nextDailySpinLimit)
      : getUsedSpinsToday(activeReward, todayStamp);
    const rewardPayload = reward
      ? {
          ...activeReward,
          ...reward,
          earnedOn: todayStamp,
          spinsUsedToday: nextUsedSpins,
          dailySpinLimit: nextDailySpinLimit,
          planId: getActivePlanId(freshUser.purchasedPlans),
        }
      : null;

    const patchResponse = await api.patch(`/users/${freshUser.id}`, {
      spinReward: rewardPayload,
    });

    setCurrentUser(patchResponse.data);

    return patchResponse.data?.spinReward ?? rewardPayload;
  };

  const handleSpin = () => {
    if (isSpinning || !canSpinToday) {
      return;
    }

    if (!currentUser?.id) {
      errorToast("Please log in to use the daily spin.");
      return;
    }

    const nextIndex = Math.floor(Math.random() * rewards.length);
    const extraTurns = 360 * 6;
    const stopOffset = (360 - nextIndex * segmentAngle) % 360;
    const finalRotation = rotation + extraTurns + stopOffset;
    const landedReward = getRewardAtPointer(finalRotation);
    const storedReward = {
      spinInstanceId: createSpinInstanceId(),
      rewardId: landedReward.id,
      rewardLabel: landedReward.label,
      rewardType: landedReward.rewardType,
      discountPercent: landedReward.discountPercent,
      details: landedReward.details,
      earnedOn: todayStamp,
      appliedProductId: null,
    };

    setIsSpinning(true);
    setSelectedReward(null);
    setSelectedProductId(null);
    setRotation(finalRotation);
    window.setTimeout(async () => {
      try {
        const savedReward = await persistSpinReward(storedReward, {
          incrementSpinUsage: true,
        });

        setSelectedReward(savedReward);
        setSelectedProductId(savedReward.appliedProductId ?? null);
        successToast(`You won ${savedReward.rewardLabel}.`);
        handleConffetiCLick();
      } catch (error) {
        console.error("Failed to save spin reward:", error);
        errorToast("Unable to save your daily reward.");
      } finally {
        setIsSpinning(false);
      }
    }, SPIN_DURATION);
  };

  const handleSelectProduct = (productId) => {
    if (
      hasUsedOfferToday ||
      remainingSpinsToday <= 0 ||
      !rewardSupportsProductSelection(selectedReward) ||
      appliedRewardProductId
    ) {
      return;
    }

    setSelectedProductId((current) =>
      Number(current) === Number(productId) ? null : productId,
    );
  };

  const handleAddRewardToCart = async (product) => {
    if (
      hasUsedOfferToday ||
      remainingSpinsToday <= 0 ||
      !selectedReward ||
      !rewardSupportsProductSelection(selectedReward)
    ) {
      return;
    }

    const rewardPayload = {
      ...selectedReward,
      appliedProductId: product.id,
      productName: product.name,
    };

    try {
      const savedReward = await persistSpinReward(rewardPayload);

      dispatch(
        addToCart({
          id: product.id,
          name: product.name,
          image: product.images[0],
          quantity: 1,
          price: getRewardedPrice(selectedReward, product.price),
          originalPrice: product.price,
          selectedColor: product.colors?.[0] ?? null,
          spinReward: savedReward,
        }),
      );

      setSelectedReward(savedReward);
      setSelectedProductId(product.id);
      successToast(`${selectedReward.rewardLabel} applied to ${product.name}.`);
    } catch (error) {
      console.error("Failed to update reward product:", error);
      errorToast("Unable to apply this reward right now.");
    }
  };

  return (
    <div className="mt-4  bg-gray-100 px-4 pb-8 sm:mt-6 sm:px-6 lg:mt-[30px] lg:px-[30px] dark:bg-slate-950 dark:text-slate-100 [--base-color:#e5e7eb] [--highlight-color:#f3f4f6] dark:[--base-color:#1f2937] dark:[--highlight-color:#334155]">
      {showConffeti && <Confetti
       width={width} 
      //  confettiSource={{x: 700, y: 450}	}
       numberOfPieces={500}       
       height={height} />}
      <h2 className="mb-4 text-2xl font-bold text-gray-800 sm:text-[28px] lg:text-[32px] dark:text-slate-100">
        Spin Wheel
      </h2>
      <div className="grid grid-cols-2 border-[0.3px] justify-between rounded-2xl border-[#B9B9B9] bg-white ">
        <div className="spin-wheel-shell relative flex items-center justify-center">
          <div
            className={`spin-pointer absolute top-6 z-20 ${isSpinning ? "is-spinning" : ""}`}
          >
            <IoIosPin color={"blue"} size={56} />
          </div>

          <div
            className={`spin-wheel ${isSpinning ? "is-spinning" : ""}`}
            style={{
              "--wheel-bg": wheelBackground,
              transform: `rotate(${rotation}deg)`,
            }}
          >
            {rewards.map((reward, index) => {
              const angle = index * segmentAngle;

              return (
                <div
                  key={reward.id}
                  className="spin-segment-label"
                  style={{ transform: `rotate(${angle}deg)` }}
                >
                  <span
                    style={{
                      transform: `translateX(-50%)`,
                    }}
                  >
                    {reward.label}
                  </span>
                </div>
              );
            })}

            <div className="spin-wheel-center">
              <button
                type="button"
                onClick={handleSpin}
                disabled={isSpinning || isProfileLoading || !canSpinToday}
                className="flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-transparent text-[1.15rem] font-black uppercase tracking-[0.08em] text-[#245ddf] disabled:cursor-not-allowed disabled:opacity-70 dark:text-[#93c5fd]"
              >
                {isSpinning ? "..." : "Spin"}
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="rounded-[28px] w-[485px] border border-white/70 bg-white/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
            <span className="spin-eyebrow">Daily reward</span>
            <p className="mt-3 text-2xl font-extrabold text-[color:var(--color-text-primary)]">
              {selectedReward?.rewardLabel ?? "No spin yet today"}
            </p>
            <p className="mt-2 text-sm font-semibold text-[#356DFF] dark:text-slate-200">
              {currentUser?.id
                ? `${spinsUsedToday}/${dailySpinLimit} spins used today • ${remainingSpinsToday} left`
                : "Log in to use your plan spins"}
            </p>
            <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">
              {hasUsedOfferToday
                ? `Today's offer is already locked to ${selectedReward?.productName}.`
                : selectedReward
                  ? selectedReward.details
                  : "Spin the wheel to unlock one offer for a single product."}
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleSpin}
                disabled={isSpinning || isProfileLoading || !canSpinToday}
                className="inline-flex min-w-[180px] cursor-pointer items-center justify-center rounded-full bg-[#4880FF] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(72,128,255,0.28)] transition hover:bg-[#356DFF] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSpinning
                  ? "Spinning..."
                  : isProfileLoading
                    ? "Loading..."
                  : !currentUser?.id
                    ? "Login To Spin"
                  : hasUsedOfferToday
                    ? "Offer Used Today"
                  : canSpinToday
                    ? "Spin Now"
                    : "Daily Limit Reached"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-8 rounded-[30px] border-[0.3px] border-[#B9B9B9] bg-white/85 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/85">
        <div className="flex flex-col gap-3 border-b border-[color:var(--color-border-subtle)] pb-5 dark:border-slate-800 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#356DFF]">
              Reward products
            </p>
            <h2 className="mt-2  font-semibold text-[color:var(--color-text-primary)]">
              Award only applies on single product. For rest off the product price remains same.
            </h2>
          </div>

        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {featuredProducts.map((product) => {
            const isSelected = Number(selectedProductId) === Number(product.id);
            const isRewardAppliedHere = Number(appliedRewardProductId) === Number(product.id);
            const isLockedToAnotherProduct =
              Boolean(appliedRewardProductId) && !isRewardAppliedHere;
            const rewardedPrice = getRewardedPrice(selectedReward, product.price);
            const savingAmount = Math.max(Number(product.price) - rewardedPrice, 0);
            const canApplyReward =
              Boolean(selectedReward) &&
              !hasUsedOfferToday &&
              remainingSpinsToday > 0 &&
              rewardSupportsProductSelection(selectedReward) &&
              !appliedRewardProductId;

            return (
              <article
                key={product.id}
                className={`rounded-[26px] border p-4 shadow-sm transition ${
                  isSelected || isRewardAppliedHere
                    ? "border-[#4880FF] bg-[#F4F8FF] dark:border-[#4880FF] dark:bg-slate-800/90"
                    : "border-white/70 bg-white/90 dark:border-slate-800 dark:bg-slate-900/90"
                }`}
              >
                <button
                  type="button"
                  onClick={() => navigate(`/products/${product.id}`)}
                  className="flex w-full cursor-pointer items-center justify-center rounded-[22px] bg-[#F5F8FD] p-4 dark:bg-slate-950"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-36 object-contain"
                  />
                </button>

                <div className="mt-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[color:var(--color-text-secondary)]">
                        {product.brand}
                      </p>
                      <h3 className="mt-2 text-base font-extrabold text-[color:var(--color-text-primary)]">
                        {product.name}
                      </h3>
                    </div>
                    <span className="rounded-full bg-[#EDF4FF] px-3 py-1 text-xs font-bold text-[#356DFF] dark:bg-slate-800 dark:text-slate-100">
                      {product.rating}.0
                    </span>
                  </div>

                  <div className="mt-4 flex items-end justify-between gap-3">
                    <div>
                      <p className="text-lg font-extrabold text-[color:var(--color-text-primary)]">
                        {formatCurrency(product.price)}
                      </p>
                      {selectedReward ? (
                        <p className="mt-1 text-sm font-semibold text-[#16a34a] dark:text-green-300">
                          Reward price: {formatCurrency(rewardedPrice)}
                        </p>
                      ) : (
                        <p className="mt-1 text-sm text-[color:var(--color-text-secondary)]">
                          Spin to unlock today&apos;s price
                        </p>
                      )}
                    </div>
                    {savingAmount > 0 && selectedReward ? (
                      <span className="rounded-full bg-[#ECFDF3] px-3 py-1 text-xs font-bold text-[#15803D] dark:bg-green-500/10 dark:text-green-300">
                        Save {formatCurrency(savingAmount)}
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-4 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => navigate(`/products/${product.id}`)}
                      className="w-full cursor-pointer rounded-full border border-[color:var(--color-border-subtle)] bg-white px-4 py-3 text-sm font-semibold text-[color:var(--color-text-primary)] transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                    >
                      View Product
                    </button>

                    {selectedReward ? (
                      isRewardAppliedHere ? (
                        rewardedCartItem ? (
                          <button
                            type="button"
                            onClick={() => navigate("/cart")}
                            className="w-full cursor-pointer rounded-full bg-[#4880FF] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#356DFF]"
                          >
                            Reward Added
                          </button>
                        ) : (
                          <button
                            type="button"
                            disabled
                            className="w-full cursor-not-allowed rounded-full bg-[#E5E7EB] px-4 py-3 text-sm font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                          >
                            Offer Already Used
                          </button>
                        )
                      ) : isLockedToAnotherProduct ? (
                        <button
                          type="button"
                          disabled
                          className="w-full cursor-not-allowed rounded-full bg-[#E5E7EB] px-4 py-3 text-sm font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                        >
                          Reward Locked
                        </button>
                      ) : canApplyReward ? (
                        isSelected ? (
                          <button
                            type="button"
                            onClick={() => handleAddRewardToCart(product)}
                            className="w-full cursor-pointer rounded-full bg-[#4880FF] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#356DFF]"
                          >
                            Apply {selectedReward.rewardLabel}
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleSelectProduct(product.id)}
                            className="w-full cursor-pointer rounded-full bg-[#EAF1FF] px-4 py-3 text-sm font-semibold text-[#356DFF] transition hover:bg-[#DCE9FF] dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                          >
                            Select For Reward
                          </button>
                        )
                      ) : (
                        <button
                          type="button"
                          disabled
                          className="w-full cursor-not-allowed rounded-full bg-[#E5E7EB] px-4 py-3 text-sm font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                        >
                          Spin To Unlock Reward
                        </button>
                      )
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="w-full cursor-not-allowed rounded-full bg-[#E5E7EB] px-4 py-3 text-sm font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                      >
                        Spin To Unlock Reward
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
