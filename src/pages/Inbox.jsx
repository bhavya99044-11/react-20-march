import React, { useEffect, useMemo, useState } from "react";
import { InboxList, InboxSidebar, InboxToolbar } from "../components/inbox";
import { DeleteModal } from "../components/common";
import {
  MODAL_CANCEL_BUTTON_CLASS,
  MODAL_PRIMARY_BUTTON_CLASS,
} from "../components/common/modalButtonStyles";
import { api } from "@/utils/api";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { RiCloseLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
const Inbox = () => {

  const navigate = useNavigate();

  const [emails, setEmails] = useState([]);
  const [emailLoading, setEmailLoading] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [activeFolder, setActiveFolder] = useState("Inbox");
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteLoading] = useState(false);
  const [labelModalOpen, setLabelModalOpen] = useState(false);
  const [labelModalEmail, setLabelModalEmail] = useState(null);
  const [labelKey, setLabelKey] = useState(null);
  const [labelModalValue, setLabelModalValue] = useState("");
  const [selectedLabels, setSelectedLabels] = useState([]);
  const isArchivedFolder = activeFolder === "Archived";
  const isBinFolder = activeFolder === "Bin";

  const getEmailsData = async () => {
    try {
      const response = await api.get("emails");
      setEmails(
        response.data.map((email) => ({
          deleted: false,
          archived: false,
          ...email,
        })),
      );
    } catch (e) {
      console.error(e);
    } finally {
      setEmailLoading(false);
    }
  };

  useEffect(() => {
    getEmailsData();
  }, []);

  const folderCounts = useMemo(() => {
    const counts = {
      Inbox: 0,
      Starred: 0,
      Sent: 0,
      Draft: 0,
      Spam: 0,
      Archived: 0,
      Bin: 0,
    };

    emails.forEach((email) => {
      if (email.deleted) {
        counts.Bin += 1;
        return;
      }
      if (email.archived) {
        counts.Archived += 1;
        return;
      }
      counts.Inbox += 1;
      if (email.starred) {
        counts.Starred += 1;
      }
    });

    return counts;
  }, [emails]);

  const folders = [
    { label: "Inbox", count: folderCounts.Inbox },
    { label: "Starred", count: folderCounts.Starred },
    { label: "Sent", count: folderCounts.Sent },
    { label: "Draft", count: folderCounts.Draft },
    { label: "Spam", count: folderCounts.Spam },
    { label: "Archived", count: folderCounts.Archived },
    { label: "Bin", count: folderCounts.Bin },
  ];

  const labels = [
    {
      label: "Primary",
      color: "#00B69B",
      key:"primary",
      tagClassName: "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300",
    },
    {
      label: "Social",
      color: "#5A8CFF",
      key:"social",
      tagClassName: "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300",
    },
    {
      label: "Work",
      color: "#FD9A56",
      key:"work",
      tagClassName: "bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-300",
    },
    {
      label: "Friends",
      color: "#D456FD",
      key:"friends",
      tagClassName: "bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-300",
    },
  ];

  const handleToggleCheck = (id) => {
    setEmails((prev) =>
      prev.map((email) =>
        email.id === id ? { ...email, checked: !email.checked } : email,
      ),
    );
  };

  const handleToggleLabelFilter = (label) => {
    setSelectedLabels((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label],
    );
  };

  const handleSelectFolder = (folder) => {
    setEmails((prev) =>
      prev.map((email) =>
        email.checked ? { ...email, checked: false } : email,
      ),
    );
    setActiveFolder(folder);
  };

  const handleLabelChange = () => {};

  const handleToggleStar = async (id) => {
    const currentEmail = emails.find((item) => item.id === id);
    if (!currentEmail) return;
    const updatedEmail = { ...currentEmail, starred: !currentEmail.starred };

    setEmails((prev) =>
      prev.map((email) => (email.id === id ? updatedEmail : email)),
    );

    
     api.put(`/emails/${id}`, updatedEmail).then(()=>{
      }
     ).catch((e)=>{
       console.error(e);
       setEmails((prev) =>
        prev.map((email) => (email.id === id ? currentEmail : email)),
      );
    })
    }

  const selectedIds = useMemo(
    () => emails.filter((email) => email.checked).map((email) => email.id),
    [emails],
  );

  const openLabelModal = (email) => {
    setLabelModalEmail(email);
    setLabelModalValue(email?.tag ?? "");
    setLabelModalOpen(true);
  };

  const applyLabelChange = async () => {
    if (!labelModalEmail) return;

    const selectedLabel =
      labelModalValue === ""
        ? null
        : labels.find((item) => item.label === labelModalValue);
    const currentEmail = emails.find((item) => item.id === labelModalEmail.id);
    if (!currentEmail) return;
    const updatedEmail = {
      ...currentEmail,
      tag: selectedLabel ? selectedLabel.label : null,
      tagColor: selectedLabel ? selectedLabel.tagClassName : null,
    };

    setEmails((prev) =>
      prev.map((email) =>
        email.id === currentEmail.id ? updatedEmail : email,
      ),
    );
    setLabelModalOpen(false);

  };

  const handleArchive = async () => {
    if (selectedIds.length === 0) return;
    const shouldArchive = !isArchivedFolder;

    setEmails((prev) =>
      prev.map((email) =>
        selectedIds.includes(email.id)
          ? { ...email, archived: shouldArchive, checked: false }
          : email,
      ),
    );
    if (selectedIds.includes(activeId)) {
      setActiveId(null);
    }

    try {
      await Promise.all(
        selectedIds.map((id) =>
          api.post(`emails/${id}`, { archived: shouldArchive }),
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0) return;

    setEmails((prev) =>
      prev.map((email) =>
        selectedIds.includes(email.id)
          ? { ...email, deleted: true, checked: false }
          : email,
      ),
    );
    if (selectedIds.includes(activeId)) {
      setActiveId(null);
    }
    try {
      await Promise.all(
        selectedIds.map((id) => api.post(`emails/${id}`, { deleted: true })),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handlePermanentDelete = async () => {
    if (selectedIds.length === 0) return;

    setEmails((prev) => prev.filter((email) => !selectedIds.includes(email.id)));
    if (selectedIds.includes(activeId)) {
      setActiveId(null);
    }
    try {
      await Promise.all(selectedIds.map((id) => api.delete(`emails/${id}`)));
    } catch (error) {
      console.error(error);
    }
  };

  const handleRestoreFromBin = async () => {
    if (selectedIds.length === 0) return;

    setEmails((prev) =>
      prev.map((email) =>
        selectedIds.includes(email.id)
          ? { ...email, deleted: false, checked: false }
          : email,
      ),
    );
    if (selectedIds.includes(activeId)) {
      setActiveId(null);
    }
    try {
      await Promise.all(
        selectedIds.map((id) => api.post(`emails/${id}`, { deleted: false })),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const visibleEmails = useMemo(() => {
    const folderFiltered = (() => {
      if (activeFolder === "Archived") {
        return emails.filter((email) => email.archived && !email.deleted);
      }
      if (activeFolder === "Bin") {
        return emails.filter((email) => email.deleted);
      }
      if (activeFolder === "Starred") {
        return emails.filter(
          (email) => email.starred && !email.archived && !email.deleted,
        );
      }
      return emails.filter((email) => !email.archived && !email.deleted);
    })();

    const query = searchValue.trim().toLowerCase();
    const searchFiltered = !query
      ? folderFiltered
      : folderFiltered.filter((email) => {
          const haystack = [email.sender, email.subject, email.tag, email.time]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();
          return haystack.includes(query);
        });

    if (selectedLabels.length === 0) return searchFiltered;

    return searchFiltered.filter((email) =>
      selectedLabels.includes(email.tag),
    );
  }, [activeFolder, emails, searchValue, selectedLabels]);

  useEffect(() => {
    setPage(1);
  }, [activeFolder, searchValue, selectedLabels]);

  const totalPages = Math.max(1, Math.ceil(visibleEmails.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const pageStart = (safePage - 1) * pageSize;
  const pageEnd = pageStart + pageSize;
  const pagedEmails = visibleEmails.slice(pageStart, pageEnd);

  return (
    <div className="pt-[30px] flex flex-col pl-[31px] pr-[33px] bg-theme-white dark:bg-slate-950 [--base-color:#e5e7eb] [--highlight-color:#f3f4f6] dark:[--base-color:#1f2937] dark:[--highlight-color:#334155]">
      <h1 className="font-bold text-[29.5px] tracking-[-0.2px] text-gray-900 dark:text-slate-100">
        Inbox
      </h1>
      <div className="flex mt-[23px] flex-row gap-[21px]">
        <InboxSidebar
          folders={folders}
          labels={labels}
          activeFolder={activeFolder}
          onSelectFolder={handleSelectFolder}
          selectedLabels={selectedLabels}
          onToggleLabel={handleToggleLabelFilter}
        />
        <section className="flex-1 no-scrollbar max-h-[calc(100vh-20vh)] rounded-[14px] border-[var(--orderlist-border-color)] border-[0.3px] bg-white dark:bg-slate-900 dark:border-slate-700 flex flex-col overflow-hidden">
          <InboxToolbar
            onArchive={handleArchive}
            onDelete={() => setDeleteOpen(true)}
            selectedCount={selectedIds.length}
            archiveTitle={isArchivedFolder ? "Unarchive" : "Archive"}
            archiveMode={isArchivedFolder ? "unarchive" : "archive"}
            searchValue={searchValue}
            isBinFolder={isBinFolder}
            handleLabelChange={handleLabelChange}
            handleRestoreFromBin={handleRestoreFromBin}
            onSearchChange={(event) => setSearchValue(event.target.value)}
          />
          <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar">
            <InboxList
              emails={pagedEmails}
              // emailLoading={emailLoading}
              onToggleCheck={handleToggleCheck}
              onToggleStar={handleToggleStar}
              onLabelClick={openLabelModal}
              onSelect={setActiveId}
              activeId={activeId}
            />
          </div>
          <div className="mt-auto flex items-center justify-between px-6 py-4 border-t border-[var(--color-border-light)] dark:border-slate-700">
            <span className="text-sm text-gray-400 dark:text-slate-400">
              Showing {visibleEmails.length === 0 ? 0 : pageStart + 1}-
              {Math.min(pageEnd, visibleEmails.length)} of{" "}
              {visibleEmails.length}
            </span>
            <div className="flex items-center">
              <button
                type="button"
                className="px-3 py-2 border border-[var(--color-border-primary)] rounded-md border-r-none rounded-r-none text-[color:var(--color-text-primary)] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
                disabled={safePage === 1}
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                aria-label="Previous page"
              >
                <FaAngleLeft />
              </button>
              <button
                type="button"
                className="px-3 py-2 border-y-1 border-r-1 border-[var(--color-border-primary)] rounded-y-md rounded-r-lg !rounded-left-none !border-left-none text-[color:var(--color-text-primary)] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
                disabled={safePage === totalPages}
                onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                aria-label="Next page"
              >
                <FaAngleRight />
              </button>
            </div>
          </div>
        </section>
      </div>
      <DeleteModal
        open={deleteOpen}
        title={isBinFolder ? "Delete permanently" : "Delete emails"}
        message={
          isBinFolder
            ? `Are you sure you want to permanently delete selected email${selectedIds.length>1?'s':''}?`
            : `Are you sure you want to delete selected email${selectedIds.length>1?'s':''}?`
        }
        confirmText={isBinFolder ? "Delete forever" : "Delete"}
        cancelText="Cancel"
        onClose={() => setDeleteOpen(false)}
        loading={deleteLoading}
        onConfirm={async () => {
          if (isBinFolder) {
            await handlePermanentDelete();
          } else {
            await handleDelete();
          }
          setDeleteOpen(false);
        }}
      />
      {labelModalOpen ? (
        <div className="fixed inset-0 z-[90] flex items-center justify-center">
          <div
            className="absolute inset-0 z-[90] bg-black/40"
            onClick={() => setLabelModalOpen(false)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            className="popup-animate relative z-[100] w-[92%] max-w-[420px] rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900 dark:text-slate-100"
          >
            <button
              type="button"
              onClick={() => setLabelModalOpen(false)}
              aria-label="Close modal"
              className="absolute right-4 top-4 rounded-full p-1 text-[color:var(--color-text-secondary)] transition-colors hover:bg-slate-100 hover:text-[color:var(--orderlist-text-color)] cursor-pointer dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            >
              <RiCloseLine className="h-5 w-5" />
            </button>
            <h3 className="text-lg font-bold text-[color:var(--orderlist-text-color)] dark:text-slate-100">
              Change label
            </h3>
            <p className="mt-2 text-sm text-[color:var(--color-text-secondary)] dark:text-slate-300">
              Select a label for this email.
            </p>
            <div className="mt-4">
              <select
                className="h-10 w-full px-3 cursor-pointer text-sm rounded-[6px] border border-[var(--orderlist-border-color)] bg-[#FAFBFD] dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700"
                value={labelModalValue}
                onChange={(event) => setLabelModalValue(event.target.value)}
              >
                <option value="__none">None</option>
                {labels.map((label) => (
                  <option key={label.label} value={label.label}>
                    {label.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setLabelModalOpen(false)}
                className={`${MODAL_CANCEL_BUTTON_CLASS} cursor-pointer`}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={applyLabelChange}
                className={`${MODAL_PRIMARY_BUTTON_CLASS} cursor-pointer`}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Inbox;
