// The sentence under the form title that says what happens after saving.
// Editing a published entry is the surprising case: it disappears from the
// public site until an admin approves it again, so say that plainly.
export default function ReviewNotice({ entry }) {
  const isLive = entry?.status === "published";

  return (
    <>
      <p className="auth-lead">
        An admin reviews every entry before it appears on the site
        {entry ? ", and an edited entry goes back for review" : ""}.
      </p>
      {isLive ? (
        <p className="auth-notice" role="note">
          This entry is public now. If you save changes, it is hidden until an admin approves it again.
        </p>
      ) : null}
    </>
  );
}
