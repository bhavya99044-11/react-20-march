import React from "react";
import { Button } from "../common";

const InboxPreview = ({ email }) => {
  if (!email) {
    return (
      <div className="px-8 py-6 text-sm text-[color:var(--color-text-secondary)] dark:text-slate-400">
        Select an email to preview.
      </div>
    );
  }

  return (
    <div className="px-8 py-6 dark:text-slate-100">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[color:var(--orderlist-text-color)] dark:text-slate-100">
            {email.subject}
          </h2>
          <p className="text-sm text-[color:var(--color-text-secondary)] mt-1 dark:text-slate-400">
            From: {email.sender} • {email.time}
          </p>
        </div>
        <Button
          text="Reply"
          className="bg-secondary/90 !text-[color:var(--orderlist-text-color)] px-5 py-2 dark:!text-white"
          type="button"
        />
      </div>
      <div className="mt-6 text-sm leading-6 text-[color:var(--orderlist-text-color)] dark:text-slate-200">
        <p>
          Hi Bhavya, thanks for your message. This is a preview template that you
          can replace with real content.
        </p>
        <p className="mt-4">
          Tag: {email.tag || "General"} • Status:{" "}
          {email.unread ? "Unread" : "Read"}
        </p>
      </div>
      <div className="mt-6 flex gap-3">
        <Button
          text="Mark as Read"
          className="bg-secondary/90 !text-[color:var(--orderlist-text-color)] px-5 py-2 dark:!text-white"
          type="button"
        />
        <Button
          text="Forward"
          className="bg-[var(--color-text-primary)] text-white px-5 py-2 dark:bg-slate-200 dark:text-slate-900"
          useColorClasses={false}
          type="button"
        />
      </div>
    </div>
  );
};

export default InboxPreview;
