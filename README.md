# Khmer Household Archive

**Live site:** https://khmer-household-archive.vercel.app
**Built by:** Saifudine Lim, ICT 340, American University of Phnom Penh (AUPP), Fall 2026

---

## 1. What this is

The Khmer Household Archive collects the everyday objects found in a Cambodian home: the stone mortar by the stove, the condensed-milk tin that measures the rice, the clay pot, the woven bamboo basket. They aren't antiques or museum pieces. They're the things people use every day without thinking about them, written down with their Khmer names, what they're used for and where the information came from. The first eight entries cover kitchen tools common across Khmer households. Anyone can browse and search the published entries. Anyone with an account can add an object from their own household, and an admin reviews every entry before it goes public.

> The repo is called `khmer-proverbs-archive` because the project started as a collection of Khmer proverbs from books. I dropped that idea because anyone could look those up. Household objects come from family, and you can't find that with a search.

---

## 2. Who it's for

Cambodian families who want to record the objects and names their parents and grandparents use, and younger Cambodians (and the diaspora) who grew up around these things but never learned what they're called. Most of them will open the site on a phone, often on mobile data, usually from a link someone shared on Telegram or Facebook.

What I did for them:

- **Khmer first.** Every entry leads with its Khmer name in Khmer script, set large in Noto Serif Khmer, with the romanization and English name underneath. The database refuses an entry without Khmer script in the name.
- **Khmer text is protected from translation.** The site has a Khmer button that runs the page through Google Translate. I found it was "translating" names that were already Khmer, so ខ្ទះ showed up as ខត. Every Khmer name and romanization is now marked `translate="no"`. The menus and buttons are still in English. A proper Khmer interface needs Khmer wording written by a person, and I didn't want the AI writing it for me.
- **Phones first.** The CSS is written for small screens first, and the wider layout only switches on above 56rem.
- **Slow connections.** The home page is built ahead of time and the list of published entries is cached for 60 seconds and shared by every visitor, so most visits never wait on the database. Photos below the first screen load lazily, fonts swap in without blocking the text, and uploads are capped at 5 MB. (Not finished: `tbal-stone-mortar.jpeg` is still 778 KB.)
- **Sources are named by relationship.** Contributors write "Grandmother" or "My father", never a full name or phone number, because the site is public. Locations stop at province level for the same reason. Each entry is labelled either a personal family account or general history, and you can filter by that. Right now all eight published entries are general history (source "Common in Khmer households"), so the "Personal stories" filter is empty until a contributor adds a family account.
- **Sharing.** Links pasted into Telegram, Facebook or Messenger show the archive's name and description.

---

## 3. How it works

**The stack:** Next.js 15 (App Router, React 19, plain JavaScript) deployed on Vercel. Supabase handles accounts (email and password), the database (Postgres) and photo storage. Every push to `main` deploys automatically.

### Tables

| Table | What it holds |
|---|---|
| `entries` | One row per object: `khmer_name`, `romanization`, `english_name`, `description`, `place`, `contributor_name`, `contributor_id`, `contributor_email`, `image_url`, `image_alt`, `story`, `sources`, `status`, `created_at`, `updated_at` |
| `admins` | One column, `user_id`. Anyone listed here is a reviewer. There's no separate reviewers table. |

Check constraints in the database repeat the entry rules from [`entry-rules.md`](entry-rules.md): the Khmer name must contain Khmer script, the English name must use English characters, descriptions must be 20 to 1,200 characters, and `place` must be one of Cambodia's 25 provinces.

### The three statuses

| Status | Who sees it | What the site says |
|---|---|---|
| `pending` | The contributor and admins | "Pending approval, not yet public" |
| `published` | Everyone | The entry's catalogue number |
| `rejected` | The contributor and admins | "Returned for changes. Edit your entry to submit it again." |

```
contributor saves  -->  pending  --admin approves-->  published
                           ^    \
                           |     --admin returns-->  rejected ("Returned for changes")
                           |                              |
                           +----- contributor edits ------+
     (editing a published entry also sends it back to pending)
```

### Policies (row-level security)

Row-level security is on for both tables. These are the policies running in the live database:

| Table | Action | Who | Rule |
|---|---|---|---|
| `entries` | Read | Everyone | Published entries, plus your own entries, plus everything if you're an admin |
| `entries` | Add | Logged in | Only as yourself, and only with status `pending` |
| `entries` | Edit | Logged in | Only your own entries, and the result must be `pending` |
| `entries` | Edit | Admins | Any entry |
| `entries` | Delete | Logged in | Only your own entries |
| `entries` | Delete | Admins | Any entry |
| `admins` | Read | Logged in | Only your own row |
| Storage `photos` | Upload | Logged in | Only into a folder named after your own user id |
| Storage `photos` | Delete | Logged in | Only from your own folder |

Also in the database:

- **`is_admin()`** returns true if the logged-in user is in `admins`. It's `security definer` so policies can check it without anyone being able to read the `admins` table.
- **`set_updated_at()`** is a trigger that stamps `updated_at` on every edit. The browser can't set it.
- **Column-level read grants** on `entries` cover every column except `contributor_email`, so the browser key can't read emails at all.
- **The `photos` bucket** is public to read, limited to 5 MB, and accepts only JPEG, PNG and WebP.

**Where the SQL lives:** the tables, policies, `is_admin()` and the bucket were set up in the Supabase dashboard, and that SQL isn't in the repo. The later changes are in [`supabase/`](supabase): `track-entry-edits.sql`, `hide-contributor-email.sql` and `update-photo-alt-text.sql`.

---

## 4. Security decisions

### The gate

There's no `review_entry` function in this archive. The gate is row-level security:

- A contributor can only insert or update a row if the result has `status = 'pending'`. Trying to save your own entry as `published` fails with `new row violates row-level security policy for table "entries"`.
- Only the "admins review any entry" policy allows an update that leaves an entry `published` or `rejected`, and it only passes if `is_admin()` is true.
- When an admin clicks Approve, the browser sends an update that matches the entry's `id` **and** the `updated_at` the admin loaded. If the contributor edited the entry after the admin opened the page, zero rows change and the admin sees "This entry was edited after you opened this page, so nothing was saved." So nothing goes public that the admin didn't read.

**Why it lives in the database:** anything in the browser can be changed by the person using it. The database is the one place a visitor can't edit.

**What a hidden Publish button does and doesn't protect:** non-admins never see Approve, the admin page redirects them home, and Edit and Delete only show for the owner. That keeps the page tidy and nobody gets confused. It protects nothing against someone who opens the browser console and calls Supabase directly with the public key. Those calls hit the same policies, and that's what refuses them. I tested this from the console as a stranger account (see the checklist).

**A weakness I know about:** the admin update policy lets an admin change any column, not just `status`. A `review_entry(id, status, updated_at)` function that only touches `status` would be tighter, and it's the next thing I'd build.

### Decisions the briefs left to me

- **What a returned entry says:** "Returned for changes. Edit your entry to submit it again." It used to say "Not approved", and my code reviewer pointed out that sounds final. The point is to get a family's entry fixed, not to turn them away. In the database it's still stored as `rejected`. There's no field yet for the reviewer to say *why* it came back. That's a gap.
- **Can reviewers take down published entries?** In the database, yes: admins can delete any entry, or move it out of `published`. The site has no button for it. The review queue only shows pending entries, so a takedown currently happens in the Supabase dashboard. I kept it that way so a takedown is a deliberate act, not something you click by accident while reviewing.
- **What search shows a contributor about their own pending entries:** nothing. Search and the index run on the cached list of published entries, which is identical for every visitor, so a pending entry never shows up in search, not even for its owner. After saving, the contributor lands on the entry's own page, which says "Pending approval, not yet public". The upside is that the list can be cached and can never leak an unpublished entry. The downside is that there's no "my entries" page yet, so if you lose the link you can't find your pending entry.
- **Editing a published entry sends it back to review.** Otherwise someone could get an entry approved and then swap in different text. The edit form warns: "This entry is public now. If you save changes, it is hidden until an admin approves it again."

### Other things I locked down

- **Contributor emails:** during Lab 10 I found that a logged-out visitor could read the `contributor_email` column. The site now asks for columns by name, and the database no longer gives that column to the browser key. The same request now returns `permission denied for table entries`.
- **Photo uploads:** the code reads the file's first bytes to confirm it really is a JPEG, PNG or WebP, ignores the file's own name, and saves it as `<user id>/<random uuid>.<ext>`.
- **No raw errors shown:** Supabase errors are logged to the console, and the user sees a plain message instead.
- **Security headers:** pages can't be framed, and camera, microphone and location access are switched off.
- **Logins stay alive:** `middleware.js` refreshes the Supabase session so a tab left open doesn't silently log out on the server.

### Still open

- The `admins` table still has full table permissions for the logged-in and logged-out roles. Row-level security is the only thing stopping someone adding themselves as an admin. It held up when I attacked it, but revoking those permissions is a one-line fix I haven't made yet.
- Code changes deploy automatically, but the SQL is run by hand. That's how my review fixes ended up not live on 2 November. The fix is to keep schema changes as Supabase migrations in the repo.

---

## 5. AI use

I used Claude models through Claude Code for most of the build, and Cline in VS Code for the guided Sprint 2 tasks. Every AI tool worked under the rules in [`AGENTS.md`](AGENTS.md): small diffs, no new packages, no secrets in files, and Khmer text is never "fixed". I read and approved every diff before it was committed. Commits with AI help carry a `Co-Authored-By` line or an `(AI-assisted)` tag.

| Model (tool) | What it wrote | Verdict |
|---|---|---|
| Claude Opus 5 (Claude Code) | 1 Sep rebuild around household objects. 15 Sep: rewrite of the entries as household items, the guard that keeps the site up when Supabase config is missing, support for the publishable key name, a temporary build diagnostic | Kept the guard and the key fallback. The diagnostic was for one deploy problem, and I reverted it the same day. |
| Cline [fill in: model] | 15 Sep Tasks 1 to 3: Supabase clients, `/login` and `/signup`, logged-in state in the header | [fill in: what you kept or rewrote] |
| Claude Sonnet 5 (Claude Code) | 6 to 25 Sep: UI simplification, entry detail pages, add and delete your own entries, moving every entry into Supabase and retiring the seed file, the loading fallback | Kept |
| Claude Sonnet 5.5 (Claude Code) | 3 Oct: contribution form with photo upload, edit and delete, the approval gate, removing `dangerouslySetInnerHTML`, safe sign-up errors, design refresh. 6 Oct: index and entry page redesign. 2 Nov: the three code review fixes. 10 Nov: photo replacements and photo fitting | Kept, after the corrections below |
| Claude (Claude Code), tag missing | 16 Oct email leak fix, session refresh and caching. 22 Oct `translate="no"` fix | Kept. Both are AI-assisted but aren't marked. See the note below. |

**What I rewrote or rejected, and why:**

- **The fake "Blocked" results (Lab 10).** When I asked it to attack my gate, its first three attempts were refused by NOT NULL and check constraints, not by the security policies. Any of those would have gone into my table as "Blocked" while proving nothing. I required raw output for every attack, and it rebuilt the attack until it actually reached row-level security.
- **Renaming four Khmer entries.** It decided four of my nine names were misspelled and offered replacement spellings. I compared screenshots of the English view and the Khmer view. The database was correct all along, and the real problem was Google Translate rewriting Khmer on the page. I rejected the rename, and the fix was `translate="no"`.
- **The cheap stale-approve check.** The first idea was to only approve if the entry is still `pending`. That doesn't work because a contributor's edit leaves it pending. The real fix was the database-stamped `updated_at`.
- **Deploy order.** It warned twice that the SQL had to run before the code, then pushed the code first anyway. The 2 November build failed and the fixes weren't live until I caught it on 3 November. Lesson: a warning in a report is not a safeguard.
- **Khmer interface wording.** I didn't let the AI write the Khmer interface text for my archive. Khmer wording needs a person who speaks it.

**How I checked its work:**

- Ran the grader's stranger attacks against the live database as a real non-admin account, inside a transaction that rolled back, and read the raw error or row count for each one.
- Four tests on the review queue fix against a faked database before moving to the next finding.
- Read the Vercel deploy log. That's how I found the failed 2 November build.
- Rule I follow: no security check counts until I've seen its raw output.

**Disclosure:** two Sprint 3 commits had AI help but aren't marked. `803e019` lost its tag when I amended it after pushing, and `32d7407` came out of the Lab 10 session. I chose to disclose them here instead of force-pushing `main` to rewrite history.

---

## 6. Sources and c### Where the entries come from

All eight published entries are general history, credited on the site as "Common in Khmer households". They describe kitchen tools found across Cambodia, not one family's household.

| Entry | English name |
|---|---|
| ក្រឡ Krolor | Condensed milk can rice cup |
| ត្បាល់ Tbal | Stone mortar and pestle |
| កញ្ជើ Kanhchoe | Woven bamboo basket |
| ឆ្នាំងដី Chhnang dei | Clay cooking pot |
| កាំបិត Kambit | Kitchen cleaver |
| ខ្ទះ Khteah | Carbon-steel wok |
| ឆ្នាំងបាយ Chhnang bay | Rice cooker |
| ឆ្នាំងចំហុយ Chhnang chomhuy | Tiered steamer |

Khmer spellings were cross-checked against [Cambodian Cookbook: Kitchen Equipment](https://cambodiancookbook.com/equipment/).

tions.

### Photos

| Entry | Photo | Author | Licence |
|---|---|---|---|
| Krolor | [Hands holding tin of rice](https://www.pexels.com/photo/hands-holding-tin-of-rice-in-traditional-clothes-31679144/) | Defrino Maasy | Pexels License |
| Tbal | [Mortar & Pestle](https://commons.wikimedia.org/wiki/File:Mortar_%26_Pestle.jpg) | Saankav | CC BY-SA 4.0 |
| Kambit | [Chinese and old North American cleavers](https://commons.wikimedia.org/wiki/File:Chinese_and_old_North_American_cleavers_noBG.jpg), cropped | David R. Ingham | CC BY-SA 4.0 |
| Khteah | [Frying pan (Chinese wok)](https://commons.wikimedia.org/wiki/File:Frying_pan_(Chinese_wok).jpg) | Susan Slater | CC BY-SA 4.0 |
| Chhnang bay | [Rice-cooker](https://commons.wikimedia.org/wiki/File:Rice-cooker.jpg) | Aarchiba | Public domain |
| Chhnang chomhuy | [Steamers](https://commons.wikimedia.org/wiki/File:Steamers.jpg), cropped | [fill in: author] | CC BY-SA 3.0 |
| Kanhchoe, Chhnang dei | The archive's own [fill in: confirm who took them] | | |

Fonts: Newsreader, Schibsted Grotesk and Noto Serif Khmer, from Google Fonts. The project started from the ICT 340 Khmer Living Archive template.

---

## 7. Running it locally

You need [Node.js](https://nodejs.org) 18.18 or newer and a Supabase project set up as described in section 3.

```bash
git clone https://github.com/FooDine458/khmer-proverbs-archive.git
cd khmer-proverbs-archive
npm install
```

Create a file called `.env.local` with these two variables (names only, get the values from Supabase under Project Settings > API):

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
```

The older name `NEXT_PUBLIC_SUPABASE_ANON_KEY` also works.

```bash
npm run dev
```

Then open http://localhost:3000.

**About the publishable key:** it isn't committed to this repo. `.env.local` is in `.gitignore`, and Vercel holds its own copy. The key is public by design anyway: it ships to every visitor's browser, and it only gets what the row-level security policies allow. No secret key is used anywhere in this project.

If the variables are missing, the site still loads and just shows an empty archive.

---

## 8. Submission checklist

- Live URL loads logged out and shows published entries only: yes, https://khmer-household-archive.vercel.app (8 published entries)
- A stranger cannot publish their own entry through the page or the console: yes, tested 3 November 2026 as a non-admin account. The page has no publish control, and a direct insert or update to `published` returns `new row violates row-level security policy`.
- Logged out, the API returns nothing pending or returned: yes, tested 3 November 2026. A logged-out read returned only the 8 published entries.
- Contributors can edit and delete only their own entries: yes, see the policies in section 3
- No secrets anywhere in the repo history: yes, checked 3 November 2026 by scanning every reachable commit plus 14 dangling local commits for keys and `.env` files. None found.
- At least eight real entries, each with a credited source: yes, 8 (section 6)
- Khmer renders on every screen a user meets, including the queue: yes, Khmer names use Noto Serif Khmer with `lang="km"` on the index, entry pages, search suggestions and the review queue
- Works at phone width: yes, tested on [fill in: device or browser width]
- No test entries, lorem ipsum or TODO comments in shipped pages: yes
- No console errors on the main pages: yes [fill in: confirm]
- jesseorndorff is a collaborator on this repo: yes [fill in: confirm]
- Supabase project restored and awake on 10 November 2026
- Demo video link opens in a private window: yes, [fill in: link]
- Reflection pasted in the Canvas submission: yes [fill in: confirm]
- Posted in the Show Your Archive discussion: yes [fill in: confirm]
- Q&A slot booked for [fill in: date and time]
