import React, { useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { Button, DeleteModal } from "../components/common";
import PurchasePlanModal from "../components/pricing/PurchasePlanModal";
import { api } from "../utils/api";
import { fetchCurrentUser, getCurrentUserEmail } from "../utils/authSession";
import { errorToast, successToast } from "../utils/toastMessage";
import { FaRegEye } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";

const toPlanPrice = (plan) => Number(plan?.price || 0);

const getActivePlan = (purchasedPlans = []) => {
  return purchasedPlans.reduce((highestPlan, plan) => {
    if (!highestPlan) {
      return plan;
    }

    return toPlanPrice(plan) > toPlanPrice(highestPlan) ? plan : highestPlan;
  }, null);
};

const UserProfile = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [pricingPlans, setPricingPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const activePlan = useMemo(() => {
    const purchasedPlans = Array.isArray(userProfile?.purchasedPlans)
      ? userProfile.purchasedPlans
      : [];

    return getActivePlan(purchasedPlans);
  }, [userProfile]);

  const nextPlan = useMemo(() => {
    if (!activePlan) {
      return null;
    }

    return (
      pricingPlans
        .filter((plan) => toPlanPrice(plan) > toPlanPrice(activePlan))
        .sort(
          (firstPlan, secondPlan) =>
            toPlanPrice(firstPlan) - toPlanPrice(secondPlan),
        )[0] || null
    );
  }, [activePlan, pricingPlans]);

  useEffect(() => {
    let isMounted = true;
    const currentEmail = getCurrentUserEmail();

    const loadUserProfile = async () => {
      try {
        const [currentUser, plansResponse] = await Promise.all([
          fetchCurrentUser(),
          api.get("/pricingPlans"),
        ]);

        if (isMounted) {
          setUserProfile(currentUser);
          setPricingPlans(
            Array.isArray(plansResponse.data) ? plansResponse.data : [],
          );
        }
      } catch (error) {
        console.error(error);
        if (isMounted) {
          setUserProfile(null);
          setPricingPlans([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (!currentEmail) {
      setLoading(false);
      return () => {
        isMounted = false;
      };
    }

    loadUserProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  const refreshUserProfile = async () => {
    const nextUser = await fetchCurrentUser();
    setUserProfile(nextUser);
    return nextUser;
  };

  const handleCloseUpgradeModal = () => {
    if (isUpgrading) return;
    setIsUpgradeOpen(false);
  };

  const handleConfirmUpgrade = async () => {
    if (!userProfile || !nextPlan) return;

    setIsUpgrading(true);

    try {
      const freshUser = await refreshUserProfile();

      if (!freshUser) {
        errorToast("User not found.");
        return;
      }

      const nextPurchasedPlan = {
        planId: nextPlan.id,
        name: nextPlan.name,
        price: nextPlan.price,
        billingLabel: nextPlan.billingLabel,
        trialText: nextPlan.trialText,
        purchasedAt: new Date().toISOString(),
      };

      const patchResponse = await api.patch(`/users/${freshUser.id}`, {
        purchasedPlans: [nextPurchasedPlan],
      });

      setUserProfile(patchResponse.data);
      successToast(`${nextPlan.name} plan upgraded successfully.`);
      setIsUpgradeOpen(false);
    } catch (error) {
      console.error(error);
      errorToast("Unable to upgrade plan.");
    } finally {
      setIsUpgrading(false);
    }
  };

  const handleCloseCancelModal = () => {
    if (isCancelling) return;
    setIsCancelOpen(false);
  };

  const handleConfirmCancel = async () => {
    if (!userProfile) return;

    setIsCancelling(true);

    try {
      const freshUser = await refreshUserProfile();

      if (!freshUser) {
        errorToast("User not found.");
        return;
      }

      const patchResponse = await api.patch(`/users/${freshUser.id}`, {
        purchasedPlans: [],
      });

      setUserProfile(patchResponse.data);
      successToast("Plan cancelled successfully.");
      setIsCancelOpen(false);
    } catch (error) {
      console.error(error);
      errorToast("Unable to cancel plan.");
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <>
      <div className="pt-[30px] flex flex-col pl-[31px] pr-[33px] bg-theme-white dark:bg-slate-950">
        <h1 className="font-[700] text-[29.5px] tracking-[-0.2px] text-gray-900 dark:text-slate-100">
          Profile
        </h1>
        <div className="mt-6 rounded-[14px] bg-white p-6 text-[color:var(--color-text-body)] dark:border dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
          <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/60">
            <h2 className="text-xl font-bold text-[color:var(--orderlist-text-color)] dark:text-slate-100">
              User Profile
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[color:var(--color-text-secondary)] dark:text-slate-400">
                  Name
                </p>
                <p className="mt-1 text-base font-semibold text-[color:var(--orderlist-text-color)] dark:text-slate-100">
                  {loading ? "Loading..." : userProfile?.name || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[color:var(--color-text-secondary)] dark:text-slate-400">
                  Email
                </p>
                <p className="mt-1 text-base font-semibold text-[color:var(--orderlist-text-color)] dark:text-slate-100">
                  {loading ? "Loading..." : userProfile?.email || "N/A"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-[color:var(--orderlist-text-color)] dark:text-slate-100">
                Plan
              </h2>
            </div>

            {loading ? (
              <div className="mt-4 rounded-xl border border-dashed border-slate-300 px-5 py-8 text-sm font-semibold text-slate-500 dark:border-slate-700 dark:text-slate-400">
                Loading purchased plans...
              </div>
            ) : !activePlan ? (
              <div className="mt-4 rounded-xl border border-dashed flex border-slate-300 px-5 py-8 text-sm font-semibold text-slate-500 dark:border-slate-700 dark:text-slate-400">
                No plans purchased yet.
                <span
                  onClick={() => navigate("/pricing")}
                  className="ml-2 flex items-center gap-1 cursor-pointer text-[#4880FF] underline underline-[#4880FF]"
                >
                  View Plans <FaRegEye color="#4880FF" />{" "}
                </span>
              </div>
            ) : (
              <div className={classNames("mt-4 grid gap-4 lg:grid-cols-2")}>
                <div
                  className={classNames(
                    "rounded-2xl bg-blue-50 border relative border-[#4880FF] border-[2px] p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800/70",
                  )}
                >
                          <div
                            className={classNames(
                              "absolute -top-2 -right-1.5 z-40 rounded-full bg-white dark:bg-slate-900",
                            )}
                          >
                            <FaCheckCircle size={20} color="#4880FF" />
                          </div>
                  <div
                    className={classNames(
                      "flex items-start justify-between gap-4",
                    )}
                  >
                    <div>
                      <h3
                        className={classNames(
                          "text-lg font-bold text-[#4880FF] dark:text-slate-100",
                        )}
                      >
                        {activePlan.name}
                      </h3>
                      <p
                        className={classNames(
                          "mt-1 text-sm text-slate-500 dark:text-slate-400",
                        )}
                      >
                        {activePlan.billingLabel}
                      </p>
                    </div>
                    <span
                      className={classNames(
                        "text-xl font-extrabold text-[#4880FF]",
                      )}
                    >
                      ${activePlan.price}
                    </span>
                  </div>
                  <div
                    className={classNames(
                      "mt-3 text-sm text-slate-600 dark:text-slate-300",
                    )}
                  >
                    Purchase On:{" "}
                    {new Date(activePlan.purchasedAt).toLocaleString("en-US")}
                  </div>
                  <Button
                    className="px-5 py-2 mt-10 h-10 border border-[2px] border-[#4880FF] !font-semibold text-[#4880FF] bg-white dark:!bg-slate-800 dark:!text-slate-100"
                    text="Cancel Plan"
                    type="button"
                    useColorClasses={false}
                    onClick={() => setIsCancelOpen(true)}
                  />
                </div>

                {nextPlan && (
                  <div
                    className={classNames(
                      "rounded-2xl border border-[var(--color-border-subtle)] p-5 shadow-sm dark:border-slate-700",
                      "bg-[#4880FF] dark:bg-slate-800/70",
                    )}
                  >
                    {nextPlan ? (
                      <>
                        <div
                          className={classNames(
                            "flex items-start justify-between gap-4",
                          )}
                        >
                          <div>
                            <h3
                              className={classNames(
                                "text-lg font-bold text-white dark:text-slate-100",
                              )}
                            >
                              {nextPlan.name}
                            </h3>
                            <p
                              className={classNames(
                                "mt-1 text-sm text-white/80 dark:text-slate-300",
                              )}
                            >
                              {nextPlan.billingLabel}
                            </p>
                          </div>
                          <span
                            className={classNames(
                              "text-xl font-extrabold text-white",
                            )}
                          >
                            ${nextPlan.price}
                          </span>
                        </div>
                        <div
                          className={classNames(
                            "mt-18 flex items-center gap-3",
                          )}
                        >
                          <Button
                            className="px-5 py-2 h-10 border border-[2px] border-[#4880FF] !font-semibold text-[#4880FF] bg-white dark:!bg-slate-800 dark:!text-slate-100"
                            text="Upgrade Plan"
                            type="button"
                            useColorClasses={false}
                            onClick={() => setIsUpgradeOpen(true)}
                          />
                          <span
                            className="text-white underline cursor-pointer"
                            onClick={() => navigate("/pricing")}
                          >
                            Learn more about this plan
                          </span>
                        </div>
                      </>
                    ) : null}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <PurchasePlanModal
        open={isUpgradeOpen}
        plan={nextPlan}
        loading={isUpgrading}
        onClose={handleCloseUpgradeModal}
        onConfirm={handleConfirmUpgrade}
      />

      <DeleteModal
        open={isCancelOpen}
        title="Cancel plan"
        message={`Are you sure you want to cancel your ${activePlan?.name || ""} plan?`}
        confirmText={isCancelling ? "Cancelling..." : "Cancel"}
        cancelText="No"
        loading={isCancelling}
        onClose={handleCloseCancelModal}
        onConfirm={handleConfirmCancel}
      />
    </>
  );
};

export default UserProfile;
