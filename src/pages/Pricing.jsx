import React, { useEffect, useState } from "react";
import PricingCard from "../components/pricing/PricingCard";
import PricingCardSkeleton from "../components/pricing/PricingCardSkeleton";
import PurchasePlanModal from "../components/pricing/PurchasePlanModal";
import { api } from "../utils/api";
import { fetchCurrentUser, getCurrentUserEmail } from "../utils/authSession";
import { errorToast, successToast } from "../utils/toastMessage";

const toPlanPrice = (plan) => Number(plan?.price || 0);

const getActivePlan = (purchasedPlans = []) => {
  return purchasedPlans.reduce((highestPlan, plan) => {
    if (!highestPlan) {
      return plan;
    }

    return toPlanPrice(plan) > toPlanPrice(highestPlan) ? plan : highestPlan;
  }, null);
};

const Pricing = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const currentEmail = getCurrentUserEmail();

    const loadPricingData = async () => {
      setLoading(true);
      try {
        const [plansResponse, currentUser] = await Promise.all([
          api.get("/pricingPlans"),
          currentEmail ? fetchCurrentUser() : Promise.resolve(null),
        ]);

        if (isMounted) {
          setPlans(
            Array.isArray(plansResponse.data) ? plansResponse.data.slice(0, 3) : [],
          );
          setCurrentUser(currentUser);
        }
      } catch (error) {
        console.error(error);
        if (isMounted) {
          setPlans([]);
          setCurrentUser(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadPricingData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleOpenPurchase = (plan) => {
    setSelectedPlan(plan);
    setIsPurchaseOpen(true);
  };

  const handleClosePurchase = () => {
    if (isPurchasing) return;
    setIsPurchaseOpen(false);
    setSelectedPlan(null);
  };

  const handleConfirmPurchase = async () => {
    setIsPurchasing(true);

    try {
      const freshUser = await fetchCurrentUser();

      if (!freshUser) {
        errorToast("Please log in to purchase a plan.");
        return;
      }

      const purchasedPlans = Array.isArray(freshUser.purchasedPlans)
        ? freshUser.purchasedPlans
        : [];
      const activePlan = getActivePlan(purchasedPlans);
      const selectedPlanPrice = toPlanPrice(selectedPlan);
      const activePlanPrice = toPlanPrice(activePlan);

      if (activePlan?.planId === selectedPlan.id) {
        errorToast(`${selectedPlan.name} is already your active plan.`);
        return;
      }

      if (activePlan && selectedPlanPrice <= activePlanPrice) {
        errorToast(
          `Only a higher plan you can upgrade.`,
        );
        return;
      }

      const nextPurchasedPlan = {
        planId: selectedPlan.id,
        name: selectedPlan.name,
        price: selectedPlan.price,
        billingLabel: selectedPlan.billingLabel,
        trialText: selectedPlan.trialText,
        purchasedAt: new Date().toISOString(),
      };

      const patchResponse = await api.patch(`/users/${freshUser.id}`, {
        purchasedPlans: [nextPurchasedPlan],
      });

      setCurrentUser(patchResponse.data);
      successToast(
        activePlan
          ? `${selectedPlan.name} plan upgraded successfully.`
          : `${selectedPlan.name} plan purchased successfully.`,
      );
      handleClosePurchase();
    } catch (error) {
      console.error(error);
      errorToast("Unable to update plan.");
    } finally {
      setIsPurchasing(false);
    }
  };

  const purchasedPlans = Array.isArray(currentUser?.purchasedPlans)
    ? currentUser.purchasedPlans
    : [];
  const activePlan = getActivePlan(purchasedPlans);
  const activePlanPrice = toPlanPrice(activePlan);

  return (
    <>
      <div className="flex h-full min-h-0 flex-col overflow-hidden bg-theme-white pt-[30px] pl-[30px] pr-[33px] dark:bg-slate-950">
        <h1 className="text-[32px] font-bold text-gray-900 dark:text-slate-100">
          Pricing
        </h1>
        <div className="mt-[31px] grid grid-cols-1 gap-6 pb-8 lg:min-h-0 lg:flex-1 lg:grid-cols-3 lg:pb-[30px]">
          {loading
            ? Array.from({ length: 3 }, (_, index) => (
                <PricingCardSkeleton key={`pricing-skeleton-${index}`} />
              ))
            : null}
          {plans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              onSelectPlan={handleOpenPurchase}
              isCurrentPlan={activePlan?.planId === plan.id}
              isUpgrade={Boolean(activePlan) && toPlanPrice(plan) > activePlanPrice}
            />
          ))}
          {!loading && plans.length === 0 ? (
            <div className="col-span-full rounded-[24px] border border-dashed border-slate-300 px-6 py-12 text-center text-sm font-semibold text-slate-500 dark:border-slate-700 dark:text-slate-400">
              No pricing plans found.
            </div>
          ) : null}
        </div>
      </div>
      <PurchasePlanModal
        open={isPurchaseOpen}
        plan={selectedPlan}
        loading={isPurchasing}
        onClose={handleClosePurchase}
        onConfirm={handleConfirmPurchase}
      />
    </>
  );
};

export default Pricing;
