# Entry Sketch

One entry in this archive = one Khmer proverb.

| Field | Required? | What it holds |
|---|---|---|
| `title` | Yes | Short English label for the proverb (e.g. "Knowing ten things does not equal mastering one"). Used in lists and headings. |
| `khmerName` | Yes | The proverb itself, in Khmer script. This archive is Khmer-first — no entry exists without it. |
| `story` | Yes | The proverb's meaning: what it says literally, what it means, and when Khmers say it. This is the actual content people come to read. |
| `source` | Yes | Which book or text it came from. My collection is drawn from books and literature, not living informants, so this is a citation (title/author), not a person's name. |
| `place` | No | Region or province the book associates with the proverb, when it says so. Often unknown for book sources — left blank rather than guessed. |
| `tags` | Yes | Short category words for browsing (e.g. "wisdom", "work", "family"). Needed from day one so search/browse in later sprints has something to filter on. |

## Cut

- **date** — proverbs don't have a knowable date of origin, and my source books don't date individual proverbs. A "date collected" field would just be today's date repeated five times, which tells a browser nothing. Cutting it.
- **photo or audio** — my source is books, not interviews or field recordings. There's no audio to attach, and photographing a book page adds a step without adding meaning beyond what `source` already records. Cutting it for now; can revisit if a later entry comes from a physical object worth photographing.
- **"who told you"** — reframed as `source` (a citation) instead of a person, since this collection's origin is literature, not oral interviews.

## Example entry (shape only)

```js
{
  title: "Knowing ten things does not equal mastering one",
  khmerName: "ដឹងដប់មិនស្មើជំនាញមួយ",
  story: "Said to someone who dabbles widely but goes deep in nothing — a reminder that breadth without mastery is its own kind of ignorance.",
  source: "Khmer Proverbs and Their Meaning (compiled anthology)",
  place: "",
  tags: ["wisdom", "learning"],
}
```
