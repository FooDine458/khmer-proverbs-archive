// Said at the top of an entry that isn't public yet, so its contributor knows
// where it stands right after saving. Row-level security only hands a pending
// or returned entry to its owner and to admins, so nobody else ever sees this.
const MESSAGES = {
  pending: "Submitted. An admin will review it before it appears on the site. You can still edit or delete it.",
  rejected: "Returned for changes. Edit your entry and save it to send it back for review.",
};

export default function StatusNotice({ status }) {
  const message = MESSAGES[status];
  if (!message) return null;
  return (
    <p className="status-notice" role="status">
      {message}
    </p>
  );
}
