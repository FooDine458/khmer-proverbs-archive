import collection from "../collection.config.js";

// Sample data: two real entries from the archive
const entries = [
  {
    title: "Knowing ten things does not equal mastering one",
    description: "Said to someone who dabbles widely but goes deep in nothing — a reminder that breadth without mastery is its own kind of ignorance.",
    contributor: collection.curator,
    place: "Siem Reap",
  },
  {
    title: "A single bracelet does not jingle",
    description: "Means that one person alone cannot create change or make an impact; it takes a group or community to produce sound and progress.",
    contributor: collection.curator,
    place: "Battambang",
  },
];

export default function EntryCard({ entry }) {
  return (
    <div style={{
      border: '1px solid #232B38',
      borderRadius: '10px',
      padding: '24px',
      marginBottom: '24px',
      backgroundColor: '#1A1F29',
      flexGrow: 1,
      flexBasis: 'calc(50% - 16px)', // For two cards per row with gap
      boxSizing: 'border-box',
    }}>
      <h2 style={{
        margin: '0 0 12px 0',
        fontSize: '24px',
        fontWeight: '700',
        color: '#F5F7FA',
      }}>
        {entry.title}
      </h2>
      <p style={{
        margin: '0 0 16px 0',
        fontSize: '17px',
        lineHeight: '1.75',
        color: '#AEB6C2',
      }}>
        {entry.description}
      </p>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        fontSize: '14px',
        color: '#97A1B3',
      }}>
        <span>
          <strong>Contributor:</strong> {entry.contributor}
        </span>
        <span>
          <strong>Place:</strong> {entry.place || 'Unknown'}
        </span>
      </div>
    </div>
  );
}