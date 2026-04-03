const normalizeDayStamp = (value) => {
  if (!value) {
    return "";
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const PLAN_SPIN_LIMITS = {
  basic: 2,
  standard: 4,
  premium: 10,
};

const PLAN_SPIN_RANK = {
  basic: 1,
  standard: 2,
  premium: 3,
};

const getTodayStamp = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const isRewardSameDay = (reward, dayStamp = getTodayStamp()) =>
  normalizeDayStamp(reward?.earnedOn) === dayStamp;

const getActivePlanId = (purchasedPlans = []) => {
  if (!Array.isArray(purchasedPlans) || !purchasedPlans.length) {
    return "";
  }

  return purchasedPlans.reduce((selectedPlanId, plan) => {
    const currentPlanId = String(plan?.planId || plan?.id || "").toLowerCase();
    const currentRank = PLAN_SPIN_RANK[currentPlanId] ?? 0;
    const selectedRank = PLAN_SPIN_RANK[selectedPlanId] ?? 0;

    return currentRank > selectedRank ? currentPlanId : selectedPlanId;
  }, "");
};

const getPlanSpinLimit = (planId) => {
  const normalizedPlanId = String(planId || "").toLowerCase();
  return PLAN_SPIN_LIMITS[normalizedPlanId] ?? 1;
};

const getUserDailySpinLimit = (user) =>
  getPlanSpinLimit(getActivePlanId(user?.purchasedPlans));

const getUsedSpinsToday = (reward, dayStamp = getTodayStamp()) => {
  if (!isRewardSameDay(reward, dayStamp)) {
    return 0;
  }

  const spinsUsedToday = Number(reward?.spinsUsedToday);

  if (Number.isFinite(spinsUsedToday) && spinsUsedToday > 0) {
    return spinsUsedToday;
  }

  return reward?.rewardId ? 1 : 0;
};

const getRemainingSpins = (user, reward, dayStamp = getTodayStamp()) =>
  Math.max(getUserDailySpinLimit(user) - getUsedSpinsToday(reward, dayStamp), 0);

const getRewardDiscountAmount = (reward, productPrice) => {
  const safePrice = Number(productPrice || 0);

  if (!reward || safePrice <= 0) {
    return 0;
  }

  switch (reward.rewardType) {
    case "discount-percent":
      return safePrice * (Number(reward.discountPercent || 0) / 100);
    case "free-product":
      return safePrice;
    default:
      return 0;
  }
};

const getRewardedPrice = (reward, productPrice) =>
  Math.max(Number(productPrice || 0) - getRewardDiscountAmount(reward, productPrice), 0);

const rewardSupportsProductSelection = (reward) =>
  reward?.rewardType === "discount-percent" || reward?.rewardType === "free-product";

export {
  getActivePlanId,
  getTodayStamp,
  isRewardSameDay,
  getPlanSpinLimit,
  getRewardDiscountAmount,
  getRewardedPrice,
  getRemainingSpins,
  getUsedSpinsToday,
  getUserDailySpinLimit,
  rewardSupportsProductSelection,
};
