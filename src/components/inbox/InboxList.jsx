import React from "react";
import { Checkbox, Tooltip } from "../common";
import { IoStar, IoStarOutline } from "react-icons/io5";
import classNames from "classnames";
import InboxListSkeleton from "./InboxListSkeleton";

const InboxList = ({
  emails = [],
  onToggleCheck,
  onToggleStar,
  onSelect,
  onLabelClick,
  emailLoading = false,
  activeId,
}) => {
  if (emailLoading) {
    return <InboxListSkeleton rows={8} />;
  }

  return (
    <div className="border-r z-30 border-[var(--color-border-light)] dark:border-slate-700 dark:bg-slate-900">
      {!emailLoading &&
        emails.map((email) => (
          <div key={email.id}>
            <div
              onClick={() => onSelect?.(email.id)}
              className={`flex relative items-center px-5 checkbox-label py-[22px] h-[62px] border-b border-[var(--color-border-light)] transition-colors dark:border-slate-800 ${
                activeId === email.id ? "bg-[#F5F8FF] dark:bg-slate-800/70" : ""
              }`}
            >
              <div
                onClick={(event) => {
                  event.stopPropagation();
                }}
              >
                <Checkbox
                  id={`email-${email.id}`}
                  name={`email-${email.id}`}
                  checked={email.checked}
                  onChange={(event) => {
                    event.stopPropagation();
                    onToggleCheck?.(email.id);
                  }}
                  checkLabel="Select email"
                  labelClassName="sr-only"
                  wrapClassName="!gap-0"
                  inputClassName="h-4 w-4 border-[var(--color-border-input)]"
                />
              </div>

              {!email?.deleted && (
                <button
                  type="button"
                  onClick={(event) => {
                    onToggleStar?.(email.id);
                  }}
                  className={classNames("shrink-0 z-40 cursor-pointer ml-6")}
                >
                  {email.starred ? (
                    <IoStar className="h-4 w-4 text-yellow-400" />
                  ) : (
                    <IoStarOutline className="h-4 w-4 text-gray-300 dark:text-slate-600" />
                  )}
                </button>
              )}

              <span
                className={classNames(
                  "w-[105px] truncate flex-shrink-0 ml-[30px] mr-10 text-sm",
                  "font-medium text-gray-700 dark:text-slate-300",
                )}
              >
                {email.sender}
              </span>

              {email.tag ? (
                <Tooltip
                  className="shrink-0"
                  contentClassName="w-25"
                  content="Change label"
                >
                  <button
                    type="button"
                    aria-label="Change label"
                    onClick={(event) => {
                      event.stopPropagation();
                      onLabelClick?.(email);
                    }}
                    className={` w-[60px] cursor-pointer flex items-center justify-center text-xs font-medium px-2 py-[3px] rounded-[3px] ${email.tagColor}`}
                  >
                    {email.tag}
                  </button>
                </Tooltip>
              ) : (
                <Tooltip className="shrink-0" content="Add label">
                  <button
                    type="button"
                    aria-label="Add label"
                    onClick={(event) => {
                      event.stopPropagation();
                      onLabelClick?.(email);
                    }}
                    className="w-14 text-[10px] text-gray-400 hover:text-gray-600 dark:text-slate-500 dark:hover:text-slate-300"
                  >
                    Add
                  </button>
                </Tooltip>
              )}

              <span
                className={classNames(
                  "flex-1 ml-5 text-sm truncate",
                  "font-semibold text-gray-900 dark:text-slate-100",
                )}
              >
                {email.subject}
              </span>

              <span className="justify-end text-xs text-gray-400 ml-2 dark:text-slate-400">
                {email.time}
              </span>
            </div>
          </div>
        ))}
      {!emailLoading && emails.length <= 0 ? (
        <div className="flex h-full w-full mt-10 items-center justify-center">
          <span className="text-sm text-gray-500 dark:text-slate-400">
            Oops!, Data not available
          </span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default InboxList;
