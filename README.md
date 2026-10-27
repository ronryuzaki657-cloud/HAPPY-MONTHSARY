# 💌 For You — A Monthsary Love Letter

A cinematic, one-page digital love letter. Midnight sky, glowing stars,
an envelope that opens, a handwritten-style letter, hidden secrets,
and a final emotional moment.

**Tech:** HTML + CSS + vanilla JavaScript. No frameworks, no APIs, no backend.

---

## ▶ How to Run It

**Option A — just double-click** `index.html`. It opens in your browser and works.

**Option B — VS Code Live Server (recommended):**
1. Install the **Live Server** extension in VS Code.
2. Right-click `index.html` → **"Open with Live Server"**.
3. It opens at `http://127.0.0.1:5500`.

---

## ✏️ How to Personalize the Letter

Open **`script.js`**. At the very top there is one clearly labeled block:

```js
const CONTENT = {
  herName: "My Dearest",        // ✏️ her name / nickname
  yourName: "Yours, always",    // ✏️ how you sign it
  letterDate: "October 28, 2026",
  letter: "...",                // ✏️ THE LETTER (use \n\n for new paragraphs)
  hiddenNotes: [ ... ],         // ✏️ 4 secret messages (tiny sparkles on the paper)
  promise: "...",               // ✏️ the heart-seal promise
  moreMessage: "...",           // ✏️ the "one more thing" message
  finalTitle: "Happy Monthsary",
  finalMessage: "...",          // ✏️ the big final moment text
  finalClose: "...",            // ✏️ the warm closing line
};
```

**You never need to touch any other code.** Edit only this object.
Placeholders are used — none of the memories are real; write your own words.

---

## 🎵 How to Add Music

1. Pick an MP3 file (a song that is *yours* as a couple).
2. Rename it to exactly `music.mp3`.
3. Put it inside the `assets/` folder → `assets/music.mp3`.

- Music **never autoplays** — she presses the ♪ button in the corner.
- If the file is missing, the button simply hides itself and **everything else still works**.
- Keep the file under ~8 MB for fast loading on phones.

---

## 📱 How to Test on Your Phone

**Same Wi-Fi method (easiest):**
1. In VS Code, run **Live Server** on your PC.
2. Find your PC's local IP: open PowerShell → `ipconfig` → look for *IPv4 Address* (e.g. `192.168.1.5`).
3. On your phone's browser, visit `http://192.168.1.5:5500` (your IP + `:5500`).
4. Your phone and PC must be on the same Wi-Fi.

**Or:** deploy it first (below) and open the live link on your phone.

---

## 🚀 How to Publish Free (GitHub Pages)

1. Create a free account at [github.com](https://github.com) (skip if you have one).
2. Click **+** (top-right) → **New repository** → name it something like `monthsary-letter` → **Public** → **Create**.
3. On the repo page, click **uploading an existing file**, then drag in:
   - `index.html`
   - `style.css`
   - `script.js`
   - the `assets` folder (including `music.mp3`)
4. Click **Commit changes**.
5. Go to **Settings → Pages** → under *Branch*, pick `main` → **Save**.
6. Wait ~1–2 minutes, then open:
   `https://YOUR-USERNAME.github.io/monthsary-letter/`

Send her that link. 💗

---

## 🗂 Project Structure

```
HAPPY MONTHSARY/
├── index.html      ← the page & its three scenes
├── style.css       ← all visuals (sky, envelope, paper, animations)
├── script.js       ← CONTENT object (your letter) + experience logic
├── assets/
│   └── music.mp3   ← your song (add this file)
└── README.md
```

## ✨ What She'll Experience

1. **The envelope** — sealed, glowing, addressed to her, under a moonlit sky. Tap to open.
2. **The letter** — the text types itself out; a "Show me everything" button reveals it instantly. Hidden sparkles ♥ ✦ reveal secret notes. Handwritten annotations appear.
3. **The seal** — a beating heart she can break to reveal your promise.
4. **"There's one more thing…"** — a deeper, more emotional closing message.
5. **The final moment** — the sky dims, a glowing heart, a shower of pink and lavender particles, and your last words.
6. **↺ Read it again** — replays the whole experience.

Includes: keyboard support (Enter/Space on buttons, Esc opens the envelope), `prefers-reduced-motion` support, a skip-animation button, and no dead buttons — everything works.
