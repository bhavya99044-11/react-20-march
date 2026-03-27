import React from "react";
import { FaFire } from "react-icons/fa";
import { BiSolidPhoneCall } from "react-icons/bi";

const CartHeader = () => {
  return (
    <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
      <h1 className="text-2xl font-bold text-[color:var(--color-text-primary)]">
        Shopping Cart
      </h1>
      <h2 className="mx-auto flex items-center gap-2 rounded-full bg-blue-200/40 p-2 px-3 text-center text-base dark:text-slate-100 sm:text-[20px] xl:mx-0">
        <FaFire color="orange" />
        <span className="font-semibold text-[#4880FF]">
          Hurry up! Your items are getting sold out
        </span>
      </h2>
      <div className="flex items-center gap-1 text-[color:var(--color-text-primary)] dark:text-slate-100">
        <BiSolidPhoneCall size={20} color="#4880FF" />
        <span className="text-sm font-semibold sm:text-base">
          Help Line: +91 6355431837
        </span>
      </div>
    </div>
  );
};

export default CartHeader;
