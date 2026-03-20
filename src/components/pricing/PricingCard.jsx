import React from "react";
import { Button } from "../common";
import classNames from "classnames";
import { FaCheckCircle } from "react-icons/fa";

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

  return (
    <div
      onClick={() => {
        if (!isCurrentPlan) {
          onSelectPlan?.(plan);
        }
      }}
      className={classNames(
        "flex group relative transtion-colors ease-in-out duration-300 h-[calc(100vh-23.2vh)] relative flex-col overflow-y-auto rounded-[24px] bg-white text-[color:var(--color-text-body)] shadow-lg no-scrollbar dark:border dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100",
        !isCurrentPlan && "cursor-pointer hover:bg-[#4880FF]",
        isCurrentPlan && "!bg-[#4880FF]",
      )}
    >
      {isCurrentPlan && (
        <div className={classNames("absolute top-2 right-2 z-40")}>
          <FaCheckCircle size={20} color="white" />
        </div>
      )}
      {/* <div className="absolute -top-14 -left-12 w-[600.5px]  ">
        <img src="/images/pricing-bg.png" className="w-full"/>
      </div> */}
      <div
        className={classNames(
          "flex z-40 flex-col transition-colors ease-in-out mb-10 items-center mt-10 text-center",
        )}
      >
        <span
          className={classNames(
            "text-[22px] group-hover:text-white transition-colors ease-in-out duration-400 leading-[1.4] font-[700]",
            isCurrentPlan && "text-white",
          )}
        >
          {plan.name}
        </span>
        <span
          className={classNames(
            "mt-[10px] text-[16px] group-hover:text-white transition-colors ease-in-out duration-400 leading-[1.4] text-[color:var(--color-text-secondary)]",
            isCurrentPlan && "text-white",
          )}
        >
          {plan.billingLabel}
        </span>
        <h2
          className={classNames(
            "mt-[10px] text-[46px] group-hover:text-white transition-colors ease-in-out duration-400 leading-[1.36] font-[800] text-[#4880FF] dark:text-blue-400",
            isCurrentPlan && "text-white",
          )}
        >
          ${plan.price}
        </h2>
      </div>

      <div
        className={classNames(
          "mx-4 z-40 min-h-[2px] bg-[color:var(--color-border-light)] dark:bg-slate-700/80",
          isCurrentPlan && "!bg-white/30",
        )}
      />

      <ul
        className={classNames(
          "flex z-40 flex-1 flex-col gap-[15px] pt-10 items-center",
          isCurrentPlan && "!text-white",
        )}
      >
        {plan.features.map((feature) => (
          <li
            key={`${plan.id}-${feature.label}`}
            className={classNames("w-full px-6", isCurrentPlan && "!text-white  transtion-colors ease-in-out duration-300")}
          >
            <span
              className={classNames(
                "block  transtion-colors ease-in-out duration-300 group-hover:text-white rounded-xl text-center text-lg font-semibold text-[color:var(--color-text-primary)] ",
                !feature.active && "opacity-45",
                 isCurrentPlan && "!text-white",
              )}
            >
              {feature.label}
            </span>
          </li>
        ))}
      </ul>
      <div
        className={classNames(
          "mx-4 z-40 mt-[39px] min-h-[2px] bg-[color:var(--color-border-light)] dark:bg-slate-700/80",
          isCurrentPlan && "!bg-white/30",
        )}
      />

      <div
        className={classNames(
          "mt-6 pb-4 z-40 flex w-full flex-col items-center",
        )}
      >
        <Button
          text={actionText}
          disabled={isCurrentPlan}
          className={classNames(
            "!h-15 !w-[180px] !rounded-[30px] !border-[2px] !text-[16px] !font-bold dark:!bg-slate-900",
            isCurrentPlan
              ? "!border-[#4880FF] !bg-white !text-[#4880FF]"
              : "!border-[#4880FF] !bg-white !text-[#4880FF] dark:!bg-slate-800 dark:!text-blue-300",
          )}
        />
        <span
          className={classNames(
            "mt-6 group-hover:text-white transtion-colors duration-300 cursor-pointer text-center text-[15px] font-bold text-[color:var(--color-text-primary)] underline underline-offset-2",
            isCurrentPlan && "text-white",
          )}
        >
          Start Your 30 Day Free Trial
        </span>
      </div>
    </div>
  );
};

export default PricingCard;
