import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button, DeleteModal, Input, Select, Tooltip } from "@/components/common";
import { api } from "@/utils/api";
import { errorToast, successToast } from "@/utils/toastMessage";
import { checkValidation } from "@/utils/helpers";
import { rewardRules } from "@/utils/validation";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { FiEdit2, FiTruck } from "react-icons/fi";
import { MdEditSquare } from "react-icons/md";
import { HiOutlineTicket } from "react-icons/hi2";
import { LuBadgeDollarSign } from "react-icons/lu";
import { RiCloseLine, RiDeleteBin6Line, RiFlashlightLine } from "react-icons/ri";

const rewardTypes = [
  {
    id: "delivery-free",
    title: "Delivery",
    subtitle: "Free",
    label: "Delivery Free",
    value: "100%",
    suffix: "OFF",
    icon: FiTruck,
  },
  {
    id: "flash-half",
    title: "Flash",
    subtitle: "Half",
    label: "Flash Half",
    value: "50%",
    suffix: "",
    icon: RiFlashlightLine,
  },
  {
    id: "save-100",
    title: "Save",
    subtitle: "100",
    label: "Save 100",
    value: "$100",
    suffix: "",
    icon: LuBadgeDollarSign,
  },
  {
    id: "save-50",
    title: "Save",
    subtitle: "50",
    label: "Save 50",
    value: "$50",
    suffix: "",
    icon: HiOutlineTicket,
  },
  {
    id: "quick-drop",
    title: "Quick",
    subtitle: "Drop",
    label: "Quick Drop",
    value: "35%",
    suffix: "",
    icon: RiFlashlightLine,
  },
];

const statusStyles = {
  Active:
    "bg-green-100 text-green-600 border-green-200 dark:bg-green-500/20 dark:text-green-300 dark:border-green-500/30",
  Inactive:
    "bg-red-100 text-red-500 border-red-200 dark:bg-red-500/20 dark:text-red-300 dark:border-red-500/30",
};

const rewardTypeOptions = rewardTypes.map((reward) => ({
  id: reward.id,
  name: reward.label,
}));

const rewardStatusOptions = [
  { id: "Active", name: "Active" },
  { id: "Inactive", name: "Inactive" },
];

const initialRewardForm = {
  couponName: "",
  rewardType: rewardTypes[0].label,
  validTill: "",
  status: "Active",
  typeId: rewardTypes[0].id,
};

const getDefaultValidTill = () => {
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  return nextWeek.toISOString().slice(0, 16);
};

const buildCouponCode = (rewardType) => {
  const typeLabel = rewardType || rewardTypes[0].label;
  const base = typeLabel.replace(/[^a-z0-9]/gi, "").toUpperCase().slice(0, 8);
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${base}${suffix}`;
};

const formatValidTillDisplay = (value) => {
  if (!value) {
    return "N/A";
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return value;
  }

  const datePart = parsedDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const timePart = parsedDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return `${datePart} - ${timePart}`;
};

const toDatetimeLocalValue = (value) => {
  if (!value) {
    return "";
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  const timezoneOffset = parsedDate.getTimezoneOffset() * 60000;
  return new Date(parsedDate.getTime() - timezoneOffset).toISOString().slice(0, 16);
};




const Rewards = () => {
  const validTillInputRef = useRef(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingReward, setEditingReward] = useState(null);
  const [rewardErrors, setRewardErrors] = useState({});
  const [rewardForm, setRewardForm] = useState({
    ...initialRewardForm,
    validTill: getDefaultValidTill(),
    couponName: buildCouponCode(initialRewardForm.rewardType),
  });
  const [rewardToDelete, setRewardToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const pageSize = 5;

    useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setIsModalOpen(false);
    }
}

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  useEffect(() => {
    const loadRewards = async () => {
      setLoading(true);

      try {
        const response = await api.get("/rewards");
        setRewards(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Failed to load rewards:", error);
        setRewards([]);
        errorToast("Unable to load rewards.");
      } finally {
        setLoading(false);
      }
    };

    loadRewards();
  }, []);

  const filteredRewards = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return rewards;
    }

    return rewards.filter((reward) =>
      [reward.couponName, reward.rewardType, reward.status]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [rewards, search]);

  const totalPages = Math.max(1, Math.ceil(filteredRewards.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const pageStart = (safePage - 1) * pageSize;
  const pagedRewards = filteredRewards.slice(pageStart, pageStart + pageSize);

  useEffect(() => {
    setPage((prev) => Math.min(prev, totalPages));
  }, [totalPages]);

  const resetRewardForm = (rewardTypeOverride) => {
    const nextRewardType = rewardTypeOverride || rewardTypes[0];

    setRewardForm({
      couponName: buildCouponCode(nextRewardType.label),
      rewardType: nextRewardType.label,
      validTill: getDefaultValidTill(),
      status: "Active",
      typeId: nextRewardType.id,
    });
    setRewardErrors({});
  };

  const openCreateModal = (rewardTypeOverride = null) => {
    setEditingReward(null);
    resetRewardForm(rewardTypeOverride);
    setIsModalOpen(true);
  };

  const openEditModal = (reward) => {
    setEditingReward(reward);
    setRewardForm({
      couponName: reward.couponName || "",
      rewardType: reward.rewardType || rewardTypes[0].label,
      validTill: toDatetimeLocalValue(reward.validTill),
      status: reward.status || "Active",
      typeId:
        reward.typeId ||
        rewardTypes.find((item) => item.label === reward.rewardType)?.id ||
        rewardTypes[0].id,
    });
    setIsModalOpen(true);
  };

  const closeRewardModal = () => {
    if (isSaving) {
      return;
    }

    setIsModalOpen(false);
    setEditingReward(null);
    setRewardErrors({});
  };

  const handleRewardFieldChange = (event) => {
    const { name, value } = event.target;

    setRewardForm((prev) => {
      if (name === "rewardType") {
        const selectedRewardType =
          rewardTypes.find((item) => item.label === value) || rewardTypes[0];

        checkValidation(
          {
            rewardType: [value],
          },
          rewardRules,
          rewardErrors,
          setRewardErrors,
        );

        return {
          ...prev,
          rewardType: value,
          typeId: selectedRewardType.id,
        };
      }

      checkValidation(
        {
          [name]: [value],
        },
        rewardRules,
        rewardErrors,
        setRewardErrors,
      );

      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleRewardSelectChange = (field, selectedOption) => {
    if (!selectedOption) {
      return;
    }

    setRewardForm((prev) => {
      if (field === "rewardType") {
        checkValidation(
          {
            rewardType: [selectedOption.name],
          },
          rewardRules,
          rewardErrors,
          setRewardErrors,
        );

        return {
          ...prev,
          rewardType: selectedOption.name,
          typeId: selectedOption.id,
        };
      }

      checkValidation(
        {
          [field]: [selectedOption.name],
        },
        rewardRules,
        rewardErrors,
        setRewardErrors,
      );

      return {
        ...prev,
        [field]: selectedOption.name,
      };
    });
  };

  const openValidTillPicker = () => {
    validTillInputRef.current?.showPicker?.();
  };

  const handleGenerateCode = (rewardTypeOverride) => {
    const rewardTypeLabel = rewardTypeOverride || rewardForm.rewardType;

    setRewardForm((prev) => ({
      ...prev,
      couponName: buildCouponCode(rewardTypeLabel),
    }));
  };

  const handleSaveReward = async (event) => {
    event.preventDefault();

    const validationResult = checkValidation(
      rewardForm,
      rewardRules,
      rewardErrors,
      setRewardErrors,
    );

    const isValid = Object.values(validationResult).every((value) => value === "");
    if (!isValid) {
      errorToast("Please complete all reward details.");
      return;
    }

    const payload = {
      couponName: rewardForm.couponName.trim().toUpperCase(),
      rewardType: rewardForm.rewardType.trim(),
      validTill: rewardForm.validTill ? new Date(rewardForm.validTill).toISOString() : "",
      status: rewardForm.status,
      typeId: rewardForm.typeId,
    };

    setIsSaving(true);

    try {
      if (editingReward) {
        const response = await api.patch(`/rewards/${editingReward.id}`, payload);
        setRewards((prev) =>
          prev.map((reward) =>
            reward.id === editingReward.id ? response.data : reward,
          ),
        );
        successToast("Reward updated successfully.");
      } else {
        const response = await api.post("/rewards", payload);
        setRewards((prev) => [response.data, ...prev]);
        successToast("Reward created successfully.");
      }

      setIsModalOpen(false);
      setEditingReward(null);
      setPage(1);
    } catch (error) {
      console.error("Failed to save reward:", error);
      errorToast(editingReward ? "Unable to update reward." : "Unable to create reward.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteReward = async () => {
    if (!rewardToDelete) {
      return;
    }

    setIsDeleting(true);

    try {
      await api.delete(`/rewards/${rewardToDelete.id}`);
      setRewards((prev) =>
        prev.filter((reward) => reward.id !== rewardToDelete.id),
      );
      successToast("Reward deleted successfully.");
      setRewardToDelete(null);
    } catch (error) {
      console.error("Failed to delete reward:", error);
      errorToast("Unable to delete reward.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="justify-center pt-[30px] pl-[30px] pr-[30px] nunito-font bg-theme-white dark:bg-slate-950 [--base-color:#e5e7eb] [--highlight-color:#f3f4f6] dark:[--base-color:#1f2937] dark:[--highlight-color:#334155]">
        <h1 className="mb-[15px] text-[32px] font-bold text-gray-800 dark:text-slate-100">
          Rewards
        </h1>

        <div className="flex flex-col gap-5 xl:flex-row">
          <div className="flex h-[calc(100vh-18vh)] flex-col rounded-2xl border-[0.3px] border-[#B9B9B9] bg-white text-[#202224] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 xl:w-[390px]">
            <div
              type="button"
            //   onClick={() => openCreateModal()}
              className="mx-6 mt-6 dark:bg-slate-800 flex items-center justify-center rounded-lg bg-white text-[#4880FF] py-3 text-[13.5px] font-bold border transition-colors"
            >
              Reward Types
            </div>

            <div className="mt-2 flex flex-col overflow-y-auto px-4 pb-4">
              {rewardTypes.map((reward) => {
                const Icon = reward.icon;                
                return (
                  <div
                    key={reward.id}
                    onClick={() => openCreateModal(reward)}
                    className="group relative my-2 flex w-full cursor-pointer overflow-hidden rounded-xl bg-white drop-shadow-[0_0_5px_rgba(0,0,0,0.18)] dark:bg-slate-950/40"
                  >
                    <div className="flex w-[34%] items-center justify-center bg-[linear-gradient(180deg,#4880FF_0%,#245DDF_100%)]">
                      <div className="flex flex-col items-center px-4 py-6 text-center">
                        <div className="mx-auto flex items-center text-2xl text-white">
                          <Icon className="h-[30px] w-[30px]" />
                        </div>
                        <p className="font-bold text-white">{reward.title}</p>
                        <p className="text-sm text-white">{reward.subtitle}</p>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute bottom-0 left-0 top-0 border-l-2 border-dashed border-gray-300 dark:border-slate-600" />
                    </div>

                    <div className="relative flex-1 p-4">
                      <div className="absolute inset-x-0 top-0 h-[220px] bg-[radial-gradient(circle_at_top,rgba(72,128,255,0.18),transparent_60%)] opacity-100 transition-opacity duration-300" />
                      <p className="text-xs tracking-widest text-gray-400 dark:text-slate-400">
                        {reward.label}
                      </p>
                      <div className="mt-1 flex items-center gap-1">
                        <span className="text-2xl font-bold text-gray-800 dark:text-slate-100">
                          {reward.value}
                        </span>
                        {reward.suffix ? (
                          <span className="text-sm text-gray-600 dark:text-slate-400">
                            {reward.suffix}
                          </span>
                        ) : null}
                      </div>
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          openCreateModal(reward);
                        }}
                        className="mt-3 w-fit rounded border bg-[linear-gradient(180deg,#4880FF_0%,#245DDF_100%)] px-4 py-1 text-xs font-semibold text-white shadow transition-all duration-150 ease-in-out group-hover:bg-white group-hover:bg-none group-hover:text-[#4880FF]"
                      >
                        Generate
                      </button>
                    </div>

                    <div className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-white dark:bg-slate-900" />
                    <div className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-white dark:bg-slate-900" />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex h-[calc(100vh-18vh)] flex-1 flex-col overflow-auto rounded-2xl border-[0.3px] border-[#B9B9B9] bg-white text-[#202224] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
            <div className="flex w-full flex-col items-center justify-center gap-3 p-6 pb-4 xl:flex-row">
              <Input
                placeholder="Search rewards"
                startIcon="search"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                className="w-full xl:w-auto"
                divClassName="h-[38px] w-full xl:w-[800px]"
                inputClassName="!w-full xl:!w-[800px]"
              />
              <button
                type="button"
                onClick={() => openCreateModal()}
                className="flex w-full cursor-pointer items-center justify-center rounded-lg bg-[linear-gradient(180deg,#4880FF_0%,#245DDF_100%)] py-3 text-[13.5px] font-bold text-white transition-colors hover:opacity-90 xl:w-[238px]"
              >
                + Create Reward
              </button>
            </div>

            <div className="mx-6 mb-4 overflow-hidden rounded-xl border border-[var(--orderlist-border-color)] bg-white text-[var(--orderlist-text-color)] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
              <div className="grid min-w-[760px] grid-cols-[0.5fr_1.1fr_1fr_0.9fr_1.1fr_0.8fr] border-b border-[var(--orderlist-border-color)] px-6 py-4 text-sm font-[700] dark:border-slate-700">
                <span className="capitalize">Id</span>
                <span className="capitalize">Coupon Name</span>
                <span className="capitalize">Reward Type</span>
                <span className="capitalize">Valid till</span>
                <span className="text-center capitalize">Status</span>
                <span className="text-center capitalize">Actions</span>
              </div>

              {loading ? (
                <div className="px-6 py-10 text-center text-sm font-semibold text-slate-500 dark:text-slate-400">
                  Loading rewards...
                </div>
              ) : null}

              {!loading && pagedRewards.map((reward, index) => (
                <div
                  key={reward.id}
                  className={`grid min-w-[760px] grid-cols-[0.5fr_1.1fr_1fr_0.9fr_1.1fr_0.8fr] items-center px-6 py-5 transition-colors hover:bg-gray-50 dark:hover:bg-slate-800/50 ${
                    index !== pagedRewards.length - 1
                      ? "border-b border-gray-100 dark:border-slate-800"
                      : ""
                  }`}
                >
                  <div className="flex flex-col">{reward.id}</div>
                  <div className="flex flex-col justify-center">
                    <span className="text-sm font-semibold text-gray-700 dark:text-slate-200">
                      {reward.couponName}
                    </span>
                  </div>
                  <span className="text-sm text-gray-700 dark:text-slate-200">
                    {reward.rewardType}
                  </span>
                  <span className="flex text-sm text-gray-700 dark:text-slate-200">
                    {formatValidTillDisplay(reward.validTill)}
                  </span>
                  <div className="text-center">
                    <span
                      className={`inline-flex items-center rounded-md border px-3 py-1 text-center text-xs font-bold ${
                        statusStyles[reward.status] || statusStyles.Inactive
                      }`}
                    >
                      {reward.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-center">
                    <Tooltip placement="left" content="Edit">
                      <button
                        type="button"
                        className="cursor-pointer text-blue-500"
                        onClick={() => openEditModal(reward)}
                      >
                        <MdEditSquare className="h-5 w-5" />
                      </button>
                    </Tooltip>
                    <Tooltip placement="right" content="Delete">
                      <button
                        type="button"
                        className="cursor-pointer text-red-500"
                        onClick={() => setRewardToDelete(reward)}
                      >
                        <RiDeleteBin6Line className="h-5 w-5" />
                      </button>
                    </Tooltip>
                  </div>
                </div>
              ))}

              {!loading && pagedRewards.length === 0 ? (
                <div className="px-6 py-10 text-center text-sm font-semibold text-slate-500 dark:text-slate-400">
                  No rewards found.
                </div>
              ) : null}
            </div>

            <div className="mt-auto flex items-center justify-between px-6 pb-6">
              <span className="text-sm text-gray-400 dark:text-slate-400">
                Showing {filteredRewards.length === 0 ? 0 : pageStart + 1}-
                {Math.min(pageStart + pageSize, filteredRewards.length)} of{" "}
                {filteredRewards.length}
              </span>

              <div className="flex items-center">
                <button
                  type="button"
                  className="cursor-pointer rounded-md rounded-r-none border border-[var(--color-border-primary)] border-r-none px-3 py-2 text-[color:var(--color-text-primary)] disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
                  disabled={safePage === 1}
                  aria-label="Previous page"
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                >
                  <FaAngleLeft />
                </button>
                <button
                  type="button"
                  className="cursor-pointer rounded-r-lg border-y border-r border-[var(--color-border-primary)] px-3 py-2 text-[color:var(--color-text-primary)] disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
                  disabled={safePage === totalPages || filteredRewards.length === 0}
                  aria-label="Next page"
                  onClick={() =>
                    setPage((prev) => Math.min(prev + 1, totalPages))
                  }
                >
                  <FaAngleRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen ? (
        <div className="fixed inset-0 z-80 flex items-center justify-center">
          <div
            className="absolute popup-animate backdrop-animate inset-0 bg-black/40"
            onClick={closeRewardModal}
            aria-hidden="true"
          />
          <div className="relative z-10 w-[92%] max-w-[560px] rounded-2xl bg-white p-6 shadow-xl dark:border dark:border-slate-700 dark:bg-slate-900">
            <button
              type="button"
              onClick={closeRewardModal}
              className="absolute cursor-pointer right-4 top-4 rounded-full p-1 text-[color:var(--color-text-secondary)] transition-colors hover:bg-slate-100 hover:text-[color:var(--orderlist-text-color)] dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            >
              <RiCloseLine className="h-5 w-5" />
            </button>

            <h3 className="text-lg font-bold text-[color:var(--orderlist-text-color)] dark:text-slate-100">
              {editingReward ? "Edit Reward Coupon" : "Create Reward Coupon"}
            </h3>

            <form onSubmit={handleSaveReward} className="mt-5 space-y-4">
              <Input
                label="Coupon Name"
                name="couponName"
                value={rewardForm.couponName}
                onChange={handleRewardFieldChange}
                placeholder="FREESHIP100X"
                className="w-full"
                divClassName="rounded-2xl border border-[color:var(--color-border-subtle)] dark:border-slate-700"
                inputClassName="!w-full"
                error={rewardErrors.couponName}
                required
              />

              <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
                <div className="">
                  <label className="mb-1 block text-sm font-semibold capitalize text-[color:var(--color-text-input)]">
                    Reward Type
                  </label>
                  <div className="rounded-2xl text-[color:var(--color-text-placeholder)] h-12 border border-[color:var(--color-border-subtle)] px-3 py-[13px] dark:border-slate-700">
                    <Select
                      options={rewardTypeOptions}
                      value={
                        rewardTypeOptions.find(
                          (option) => option.name === rewardForm.rewardType,
                        ) || rewardTypeOptions[0]
                      }
                      onChange={(selectedOption) =>
                        handleRewardSelectChange("rewardType", selectedOption)
                      }
                      className="text-sm dark:text-slate-100"
                    />
                  </div>
                  {rewardErrors.rewardType ? (
                    <p className="mt-1 text-xs text-red-600">{rewardErrors.rewardType}</p>
                  ) : null}
                </div>
                      
                <div className="pt-6">
                  <Button
                    text="Generate Code"
                    type="button"
                    className="px-5 bg-[linear-gradient(180deg,#4880FF_0%,#245DDF_100%)]"
                    onClick={() => handleGenerateCode()}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-semibold capitalize text-[color:var(--color-text-input)]">
                    Valid Till
                  </label>
                  <input
                    ref={validTillInputRef}
                    type="datetime-local"
                    name="validTill"
                    value={rewardForm.validTill}
                    onChange={handleRewardFieldChange}
                    onClick={openValidTillPicker}
                    onFocus={openValidTillPicker}
                    className="w-full cursor-pointer rounded-2xl border border-[color:var(--color-border-subtle)] bg-white px-4 py-[13px] text-sm text-[color:var(--color-text-input)] outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    required
                  />
                  {rewardErrors.validTill ? (
                    <p className="mt-1 text-xs text-red-600">{rewardErrors.validTill}</p>
                  ) : null}
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold capitalize text-[color:var(--color-text-input)]">
                    Status
                  </label>
                  <div className="rounded-2xl border h-12 border-[color:var(--color-border-subtle)] px-4 py-[13px] dark:border-slate-700">
                    <Select
                      options={rewardStatusOptions}
                      value={
                        rewardStatusOptions.find(
                          (option) => option.name === rewardForm.status,
                        ) || rewardStatusOptions[0]
                      }
                      onChange={(selectedOption) =>
                        handleRewardSelectChange("status", selectedOption)
                      }
                      className="text-sm dark:text-slate-100"
                    />
                  </div>
                  {rewardErrors.status ? (
                    <p className="mt-1 text-xs text-red-600">{rewardErrors.status}</p>
                  ) : null}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button
                  text="Cancel"
                  type="button"
                  onClick={closeRewardModal}
                  color="secondary"
                  className="px-5 !text-[color:var(--orderlist-text-color)]"
                />
                <Button
                  text={editingReward ? "Update Reward" : "Create Reward"}
                  type="submit"
                  loading={isSaving}
                  className="px-5 bg-[linear-gradient(180deg,#4880FF_0%,#245DDF_100%)]"
                />
              </div>
            </form>
          </div>
        </div>
      ) : null}

      <DeleteModal
        open={Boolean(rewardToDelete)}
        title="Delete Reward"
        message={`Are you sure you want to delete ${rewardToDelete?.couponName || "this reward"}? This action cannot be undone.`}
        confirmText="Delete"
        onClose={() => {
          if (!isDeleting) {
            setRewardToDelete(null);
          }
        }}
        onConfirm={handleDeleteReward}
        loading={isDeleting}
      />
    </>
  );
};

export default Rewards;
