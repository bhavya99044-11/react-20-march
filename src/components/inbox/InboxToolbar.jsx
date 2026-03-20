import React, { useRef } from "react";
import { Input, Tooltip } from "../common";
import { GrUndo } from "react-icons/gr";
import { MdInfo } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoArchiveOutline, IoArrowUndoOutline } from "react-icons/io5";
import classNames from "classnames";
const InboxToolbar = ({
  onArchive,
  onDelete,
  selectedCount = 0,
  archiveTitle = "Archive",
  archiveMode = "archive",
  searchValue = "",
  onSearchChange,
  isBinFolder,
  handleRestoreFromBin,
}) => {
  const isDisabled = selectedCount === 0;
  const indexInputRef = useRef(null);
  return (
    <div className="px-6 pt-5 sticky top-0 bg-white z-40 pb-4 border-b border-[var(--color-border-light)] flex items-center justify-between dark:bg-slate-900 dark:border-slate-700">
      <Input
        divClassName="h-[38px] !bg-[#FAFBFD] !border-[var(--orderlist-border-color)] !rounded-[19px] dark:!bg-slate-800 dark:!border-slate-700"
        placeholder="Search"
        startIcon="search"
        className="w-full max-w-[420px]"
        inputClassName="w-full"
        value={searchValue}
        ref={indexInputRef}
        onChange={onSearchChange}
      />
      <div className="flex items-center border border-[var(--orderlist-border-color)] rounded-[2px] dark:border-slate-700">
        <Tooltip contentClassName={isDisabled?"w-[220px]":'w-25'} content={isDisabled?'Please select atleast one email to archive.':archiveTitle}>
          <button
            type="button"
            aria-label={archiveTitle}
            className={classNames(
              "h-10 w-11 border-r-1 border-[var(--orderlist-border-color)] cursor-pointer bg-[#FAFBFD] inline-flex items-center justify-center dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100",
              isDisabled && "!cursor-not-allowed",
            )}
            onClick={onArchive}
            disabled={isDisabled}
          >
            {archiveMode === "unarchive" ? (
              <IoArrowUndoOutline size={16} />
            ) : (
              <IoArchiveOutline size={16} />
            )}
          </button>
        </Tooltip>
        <Tooltip contentClassName={isDisabled?"w-[220px]":'w-25'} placement="left" content={isDisabled?'Please select atleast one email to delete':"Delete"}>
          <button
            type="button"
            aria-label="Delete"
            className={classNames(
              "h-10 w-11 bg-[#FAFBFD] cursor-pointer inline-flex items-center justify-center dark:bg-slate-800 dark:text-slate-100",
              isDisabled && "!cursor-not-allowed",
            )}
            onClick={onDelete}
            disabled={isDisabled}
          >
            <MdDelete size={16} />
          </button>
        </Tooltip>
        {isBinFolder && (
          <Tooltip content="Undo Delete">
            <button
              type="button"
              aria-label="Undo Delete"
              onClick={() => handleRestoreFromBin()}
              className={classNames(
                "h-10 w-11 border-l-1 cursor-pointer border-[var(--orderlist-border-color)] bg-[#FAFBFD] inline-flex items-center justify-center dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100",
              )}
            >
              <GrUndo size={16} />
            </button>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default InboxToolbar;
