import { useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { RiCloseLine } from "react-icons/ri";
import EventCard from "./EventCard";
import { Button, Input } from "../common";
import {
  MODAL_CANCEL_BUTTON_CLASS,
  MODAL_PRIMARY_BUTTON_CLASS,
} from "../common/modalButtonStyles";
import { checkValidation } from "../../utils/helpers";
import { addEventRules } from "../../utils/validation";

const DEFAULT_VISIBLE_EVENTS = 4;

export default function CalendarSidebar({ events, onCreateEvent, loading = false }) {
  const [showAll, setShowAll] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalClosing, setIsModalClosing] = useState(false);
  const closeTimerRef = useRef(null);
  const [formValues, setFormValues] = useState({
    title: "",
    date: "",
    endDate: "",
    time: "",
    address: "",
    city: "",
    color: "#A78BFA",
  });
  const [formErrors, setFormErrors] = useState({});

  const visibleEvents = showAll ? events : events.slice(0, DEFAULT_VISIBLE_EVENTS);
  const hasMoreEvents = events.length > DEFAULT_VISIBLE_EVENTS;

  useEffect(() => {
    if (!hasMoreEvents && showAll) {
      setShowAll(false);
    }
  }, [hasMoreEvents, showAll]);

  useEffect(() => () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
  }, []);

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isModalOpen, isModalClosing]);

  const colorOptions = [
    { label: "Violet", color: "#A78BFA", bgLight: "#EDE9FE" },
    { label: "Pink", color: "#EC4899", bgLight: "#FCE7F3" },
    { label: "Orange", color: "#F97316", bgLight: "#FFEDD5" },
    { label: "Blue", color: "#3B82F6", bgLight: "#DBEAFE" },
  ];
  const modalInputClassName = "w-full";
  const modalInputFieldClassName = "w-full";
  const modalInputWrapperClassName =
    "rounded-xl border-slate-200 bg-[#FAFBFD] dark:border-slate-700 dark:bg-slate-800";

  const handleSeeMore = () => {
    if (events.length <= DEFAULT_VISIBLE_EVENTS) return;
    setShowAll((prev) => !prev);
  };

  const handleAddEvent = async () => {
    setFormErrors({});
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setIsModalClosing(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (!isModalOpen || isModalClosing) return;
    setIsModalClosing(true);
    closeTimerRef.current = setTimeout(() => {
      setIsModalOpen(false);
      setIsModalClosing(false);
      setFormErrors({});
      closeTimerRef.current = null;
    }, 180);
  };

  const updateField = (field) => (event) => {
    const value =
      field === "title" || field === "address" || field === "city"
        ? event.target.value.replace(/^\s+/, "")
        : event.target.value;

    setFormValues((prev) => {
      const nextValues = { ...prev, [field]: value };
      const validationResult = checkValidation(
        { [field]: value },
        addEventRules,
        formErrors,
        setFormErrors,
      );

      if (
        (field === "date" || field === "endDate") &&
        nextValues.endDate &&
        nextValues.date &&
        nextValues.endDate < nextValues.date
      ) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          ...validationResult,
          endDate: "End date must be after start date.",
        }));
      } else if (field === "date" || field === "endDate") {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          ...validationResult,
          endDate: "",
        }));
      }

      return nextValues;
    });
  };

  const formatEventTime = (startDate, endDate, time) => {
    if (!startDate || !time) return "";
    const dateTime = new Date(`${startDate}T${time}`);
    const dateLabel = new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(dateTime);
    const timeLabel = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }).format(dateTime);

    if (endDate && endDate !== startDate) {
      const endLabel = new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(new Date(`${endDate}T${time}`));
      return `${dateLabel} - ${endLabel} at ${timeLabel}`;
    }

    return `${dateLabel} at ${timeLabel}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationResult = checkValidation(
      formValues,
      addEventRules,
      formErrors,
      setFormErrors,
    );
    const nextErrors = { ...validationResult };

    if (
      formValues.endDate &&
      formValues.date &&
      formValues.endDate < formValues.date
    ) {
      nextErrors.endDate = "End date must be after start date.";
    }

    setFormErrors(nextErrors);

    const hasNoErrors = Object.values(nextErrors).every((value) => value === "");

    if (!hasNoErrors) return;

    const selectedColor =
      colorOptions.find((option) => option.color === formValues.color) ||
      colorOptions[0];
    const timeLabel = formatEventTime(
      formValues.date,
      formValues.endDate,
      formValues.time,
    );

    const payload = {
      id: Date.now(),
      title: formValues.title.trim(),
      date: formValues.date,
      endDate: formValues.endDate || formValues.date,
      time: timeLabel,
      address: formValues.address.trim(),
      city: formValues.city.trim(),
      color: selectedColor.color,
      bgLight: selectedColor.bgLight,
      attendees: [],
      extraCount: 0,
    };

    await onCreateEvent?.(payload);
    setFormValues({
      title: "",
      date: "",
      endDate: "",
      time: "",
      address: "",
      city: "",
      color: colorOptions[0].color,
    });
    handleCloseModal();
  };

  return (
    <div className="bg-white border-[0.3px] h-[calc(100vh-18vh)] no-scrollbar overflow-auto text-[#202224] flex flex-col border-[#B9B9B9] rounded-2xl dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700 [--base-color:#e5e7eb] [--highlight-color:#f3f4f6] dark:[--base-color:#1f2937] dark:[--highlight-color:#334155]">
      {loading ? (
        <div className="mx-6 mt-6">
          <Skeleton width={238} height={43} borderRadius={12} />
        </div>
      ) : (
        <button
          onClick={handleAddEvent}
          className="w-[238px] items-center justify-center flex bg-[#4880FF]/90 mx-6 mt-6 hover:opacity-80 cursor-pointer transition-colors font-bold text-white text-[13.5px] py-3 rounded-lg"
        >
          + Add New Event
        </button>
      )}
      <div className="mt-6 px-6">
        {loading ? (
          <Skeleton width={136} height={25} />
        ) : (
          <p className="text-[18px] pb-[15px] border-b-[0.6px] border-[#B9B9B9]/50 font-bold dark:border-slate-700">
            You are going to
          </p>
        )}
      </div>
      {loading ? (
        <div className="pt-6 space-y-6 divide-y divide-[#E0E0E0]/50">
          {Array.from({ length: DEFAULT_VISIBLE_EVENTS }).map((_, index) => (
            <div key={`event-skeleton-${index}`} className="flex gap-3 px-6 pb-5">
              <Skeleton circle width={38} height={38} />
              <div className="flex-1 space-y-2">
                <Skeleton height={14} width={122} />
                <Skeleton height={12} width="60%" />
                <Skeleton height={12} width="50%" />
                <Skeleton height={12} width="40%" />
                <div className="flex flex-row gap-2">
                      <Skeleton circle width={24} height={24} />
                      <Skeleton circle width={24} height={24} />
                      <Skeleton circle width={24} height={24} />
                      <Skeleton circle width={24} height={24} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="divide-y divide-[#E0E0E0]/50 dark:divide-slate-800">
          {visibleEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
      {!loading && events.length === 0 ? (
        <p className="px-6 py-6 text-sm font-semibold text-[#202224]/60 dark:text-slate-400">
          No events yet. Click "Add New Event" to get started.
        </p>
      ) : null}
      {!loading && hasMoreEvents ? (
        <button
          onClick={handleSeeMore}
          className="w-[126px] cursor-pointer mt-4 mx-auto mb-[27px] bg-[#E2EAF8]/70 rounded-xl py-2 text-[12.5px] font-bold hover:bg-gray-50 transition-colors dark:bg-slate-800 dark:hover:bg-slate-700"
        >
          {showAll ? "See Less" : "See More"}
        </button>
      ) : null}

      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className={`absolute inset-0 bg-black/40 ${
              isModalClosing ? "backdrop-animate-out" : "backdrop-animate-in"
            }`}
            onClick={handleCloseModal}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            className={`relative z-10 w-[92%] max-w-[520px] rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900 dark:text-slate-100 ${
              isModalClosing ? "modal-flip-animate-out" : "modal-flip-animate"
            }`}
          >
            <button
              type="button"
              onClick={handleCloseModal}
              aria-label="Close modal"
              className="absolute right-4 top-4 rounded-full p-1 text-[#6B7280] transition-colors hover:bg-slate-100 hover:text-[#202224] cursor-pointer dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            >
              <RiCloseLine className="h-5 w-5" />
            </button>
            <div>
            <h3 className="text-lg font-bold text-[#202224] dark:text-slate-100">
              Add New Event
            </h3>
            <p className="mt-2 text-sm text-[#6B7280] dark:text-slate-400">
              Fill the event details below.
            </p>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <Input
                label="Title"
                name="title"
                value={formValues.title}
                onChange={updateField("title")}
                required={true}
                placeholder="Event title"
                error={formErrors.title}
                capitalizeWords={true}
                className={modalInputClassName}
                inputClassName={modalInputFieldClassName}
                divClassName={modalInputWrapperClassName}
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  label="Start Date"
                  name="date"
                  type="date"
                  value={formValues.date}
                  onChange={updateField("date")}
                  required={true}
                  error={formErrors.date}
                  className={modalInputClassName}
                  inputClassName={modalInputFieldClassName}
                  divClassName={modalInputWrapperClassName}
                />
                <Input
                  label="End Date"
                  name="endDate"
                  type="date"
                  value={formValues.endDate}
                  onChange={updateField("endDate")}
                  required={true}
                  error={formErrors.endDate}
                  className={modalInputClassName}
                  inputClassName={modalInputFieldClassName}
                  divClassName={modalInputWrapperClassName}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  label="Time"
                  name="time"
                  type="time"
                  value={formValues.time}
                  onChange={updateField("time")}
                  required={true}
                  error={formErrors.time}
                  className={modalInputClassName}
                  inputClassName={modalInputFieldClassName}
                  divClassName={modalInputWrapperClassName}
                />
                <div>
                  <label className="text-sm font-semibold text-[#202224] dark:text-slate-200">
                    Color
                  </label>
                  <select
                    value={formValues.color}
                    onChange={updateField("color")}
                    required={true}
                    className="mt-2 h-10 w-full cursor-pointer rounded-lg border border-[#E5E7EB] bg-[#FAFBFD] px-3 text-sm dark:border-slate-700 dark:bg-slate-800"
                  >
                    {colorOptions.map((option) => (
                      <option key={option.color} value={option.color}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <Input
                label="Address"
                name="address"
                value={formValues.address}
                onChange={updateField("address")}
                required={true}
                placeholder="Street address"
                error={formErrors.address}
                className={modalInputClassName}
                inputClassName={modalInputFieldClassName}
                divClassName={modalInputWrapperClassName}
              />

              <Input
                label="City"
                name="city"
                value={formValues.city}
                onChange={updateField("city")}
                required={true}
                placeholder="City"
                error={formErrors.city}
                capitalizeWords={true}
                className={modalInputClassName}
                inputClassName={modalInputFieldClassName}
                divClassName={modalInputWrapperClassName}
              />

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button
                  type="button"
                  text="Cancel"
                  onClick={handleCloseModal}
                  useColorClasses={false}
                  className={MODAL_CANCEL_BUTTON_CLASS}
                />
                <Button
                  type="submit"
                  text="Create"
                  useColorClasses={false}
                  className={MODAL_PRIMARY_BUTTON_CLASS}
                />
              </div>
            </form>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
