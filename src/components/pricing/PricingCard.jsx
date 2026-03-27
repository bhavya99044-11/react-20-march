import React from "react";
import { Button } from "../common";
import classNames from "classnames";
import { FaCheckCircle } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";

const PricingCard = ({
  plan,
  onSelectPlan,
  isCurrentPlan = false,
  isUpgrade = false,
}) => {
  const actionText = isCurrentPlan
    ? "Current Plan"
    : isUpgrade
      ? "Upgrade Plan"
      : plan.ctaText;

  const activeFeatures = plan.features.filter((feature) => feature.active);
  const inactiveFeatures = plan.features.filter((feature) => !feature.active);

  return (
    <div
      onClick={() => {
        if (!isCurrentPlan) {
          onSelectPlan?.(plan);
        }
      }}
      className={classNames(
        "group relative flex h-auto min-h-0 flex-col overflow-hidden rounded-[30px] border text-[color:var(--color-text-body)] shadow-[0_24px_60px_rgba(15,23,42,0.08)] transition-all duration-300 ease-out lg:h-full dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100",
        isCurrentPlan
          ? "border-transparent bg-[linear-gradient(180deg,#4880FF_0%,#245DDF_100%)]"
          : "cursor-pointer border-[#E7ECF7] bg-white hover:-translate-y-1 hover:border-[#BFD0FF] hover:shadow-[0_28px_70px_rgba(72,128,255,0.18)] dark:border-slate-700 dark:hover:border-blue-500/60",
      )}
    >
      {isCurrentPlan && (
        <div className="absolute right-5 top-5 z-20 flex items-center gap-2 rounded-full bg-white/18 px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
          <FaCheckCircle size={16} color="white" />
          Active
        </div>
      )}

      <div
        className={classNames(
          "absolute inset-x-0 top-0 h-[220px] opacity-100 transition-opacity duration-300",
          isCurrentPlan
            ? "bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.24),transparent_58%)]"
            : "bg-[radial-gradient(circle_at_top,rgba(72,128,255,0.18),transparent_60%)] group-hover:opacity-100",
        )}
      />

      <div
        className={classNames(
          "relative z-10 flex flex-col px-6 pb-5 pt-6",
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div
              className={classNames(
                "inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.24em]",
                isCurrentPlan
                  ? "bg-white/16 text-white"
                  : "bg-[#EDF4FF] text-[#356DFF] dark:bg-blue-500/15 dark:text-blue-300",
              )}
            >
              {isCurrentPlan ? "Your plan" : isUpgrade ? "Recommended next" : "Starter choice"}
            </div>
            <span
              className={classNames(
                "mt-4 block text-[28px] font-[800] leading-[1.1]",
                isCurrentPlan ? "text-white" : "text-[color:var(--color-text-primary)]",
              )}
            >
              {plan.name}
            </span>
          </div>

          {!isCurrentPlan ? (
            <div className="rounded-full border border-[#DCE7FF] bg-white/80 p-2 text-[#356DFF] backdrop-blur-sm transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-900/80 dark:text-blue-300">
              <MdArrowOutward size={20} />
            </div>
          ) : null}
        </div>

        <span
          className={classNames(
            "mt-4 text-[15px] leading-[1.6]",
            isCurrentPlan
              ? "text-white/80"
              : "text-[color:var(--color-text-secondary)] dark:text-slate-300",
          )}
        >
          {plan.billingLabel}
        </span>

        <div className="mt-6 flex items-end gap-2">
          <h2
            className={classNames(
              "text-[48px] font-[900] leading-none",
              isCurrentPlan ? "text-white" : "text-[#356DFF] dark:text-blue-300",
            )}
          >
            ${plan.price}
          </h2>
          <span
            className={classNames(
              "pb-2 text-sm font-semibold",
              isCurrentPlan ? "text-white/75" : "text-[color:var(--color-text-secondary)]",
            )}
          >
            /month
          </span>
        </div>

        <div
          className={classNames(
            "mt-6 rounded-[22px] border p-4",
            isCurrentPlan
              ? "border-white/20 bg-white/10 backdrop-blur-sm"
              : "border-[#E7ECF7] bg-[#F8FBFF] dark:border-slate-700 dark:bg-slate-950/60",
          )}
        >
          <div className="flex items-center justify-between gap-3">
            <span
              className={classNames(
                "text-sm font-semibold",
                isCurrentPlan ? "text-white/85" : "text-[color:var(--color-text-secondary)]",
              )}
            >
              Includes
            </span>
            <span
              className={classNames(
                "rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.2em]",
                isCurrentPlan
                  ? "bg-white/14 text-white"
                  : "bg-white text-[#356DFF] shadow-sm dark:bg-slate-900 dark:text-blue-300",
              )}
            >
              {activeFeatures.length} features
            </span>
          </div>

          <p
            className={classNames(
              "mt-3 text-sm leading-6",
              isCurrentPlan ? "text-white/80" : "text-[color:var(--color-text-secondary)]",
            )}
          >
            {plan.trialText || "Built for teams that want cleaner workflows and faster daily ops."}
          </p>
        </div>
      </div>

      <ul
        className={classNames(
          "relative z-10 flex max-h-[270px] overflow-y-auto no-scrollbar flex-1 flex-col gap-2.5 overflow-y-auto px-6 pb-5 pr-3",
          isCurrentPlan && "!text-white",
        )}
      >
        {activeFeatures.map((feature) => (
          <li
            key={`${plan.id}-${feature.label}`}
            className={classNames(
              "flex items-center gap-3  rounded-2xl px-4 py-3",
              isCurrentPlan ? "bg-white/10" : "bg-[#F8FBFF] dark:bg-slate-950/60",
            )}
          >
            <FaCheckCircle
              size={18}
              className={classNames(
                "shrink-0",
                isCurrentPlan ? "text-white" : "text-[#356DFF] dark:text-blue-300",
              )}
            />
            <span
              className={classNames(
                "text-[14px] font-semibold leading-5",
                isCurrentPlan ? "text-white" : "text-[color:var(--color-text-primary)]",
              )}
            >
              {feature.label}
            </span>
          </li>
        ))}

        {inactiveFeatures.length > 0 ? (
          <li
            className={classNames(
              "mt-1 rounded-2xl border border-dashed px-4 py-4 text-sm leading-6",
              isCurrentPlan
                ? "border-white/20 text-white/70"
                : "border-[#D7E3FC] text-[color:var(--color-text-secondary)] dark:border-slate-700 dark:text-slate-400",
            )}
          >
            {inactiveFeatures.map((feature) => feature.label).join(" • ")}
          </li>
        ) : null}
      </ul>

      <div
        className={classNames(
          "relative z-10 mt-auto pt-4 flex w-full flex-col px-6 pb-6",
        )}
      >
        <Button
          text={actionText}
          disabled={isCurrentPlan}
          className={classNames(
            "!h-14 !w-full !rounded-[18px] !border-[2px] !text-[15px] !font-bold",
            isCurrentPlan
              ? "!border-white/20 !bg-white !text-[#356DFF]"
              : "!border-[#356DFF] !bg-[#356DFF] !text-white hover:!bg-[#245DDF] dark:!border-blue-400 dark:!bg-blue-500 dark:hover:!bg-blue-600",
          )}
        />
        <div className="mt-4 flex items-center justify-between gap-3">
          <span
            className={classNames(
              "text-sm font-semibold",
              isCurrentPlan ? "text-white/75" : "text-[color:var(--color-text-secondary)]",
            )}
          >
            Start with a 30 day free trial
          </span>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
