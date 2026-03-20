import React from "react";
import Skeleton from "react-loading-skeleton";
import { IconComponent } from "../common";

const Card = ({
  up,
  percent,
  footer,
  heading,
  icon,
  iconColor,
  iconBgColor,
  count,
  loading = false,
}) => {
  return (
    <div className="flex hover:-translate-y-1 duration-300 transition-transform p-4 w-full flex-col dark:bg-slate-700 dark:text-white bg-white rounded-[14px]">
      <div className="flex flex-row justify-between">
        <div>
          <div className="text-black/70 dark:text-white capitalize">
            {loading ? <Skeleton width={90} /> : heading}
          </div>
          <div className="text-[28px] font-bold dark:text-white mt-[14px]">
            {loading ? <Skeleton width={120} /> : count}
          </div>
        </div>
        <div
          className="h-15 w-15 flex items-center justify-center rounded-[23px]"
          style={{
            backgroundColor: iconBgColor,
            color: iconColor,
          }}
        >
          {loading ? <Skeleton circle width={24} height={24} /> : <IconComponent icon={icon} />}
        </div>
      </div>

      <div className="text-[16px] mt-[25px] flex items-center font-[600]">
        {loading ? (
          <Skeleton width={170} />
        ) : (
          <>
            <span
              className={`${up ? "text-green-500" : "text-red-500"} flex items-center flex-row mr-[3px]`}
            >
              {up ? <IconComponent icon="green-arrow" /> : <IconComponent icon="red-arrow" />}
              <span className="ml-[5px]">{percent}%</span>
            </span>
            <span className="text-black/70 dark:text-white">{footer}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
