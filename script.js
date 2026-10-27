/* ============================================================
   SCRIPT.JS — cinematic love letter experience
   ============================================================
   ✏️  ALL PERSONAL CONTENT LIVES IN THE `CONTENT` OBJECT BELOW.
   Edit ONLY that object to personalize the letter, hidden
   notes, promise, and final message. No logic changes needed.
   ============================================================ */

/* ============================================================
   ✏️  EDIT YOUR LETTER HERE — THE ONLY SECTION YOU NEED
   ============================================================ */
const CONTENT = {
  // Her name (used on the envelope and greeting)
  herName: "My Beautiful Love Mariel", // e.g. "Bella" or "My Bella"
  yourName: "Yours, always, Ronel",             // e.g. "— Your Ron" or "— Me, forever yours"

  // The date shown at the top of the letter
  letterDate: "October 28, 2026",

  // THE LETTER. Plain text only. Use \n\n to create a new paragraph.
  letter:
    "Happy Monthsary, My Beautiful Love Mariel! ❤️🥹\n\n" +
    "I just want you to know how thankful I am to have you in my life. I know that life isn't always easy, and there will be days when things get stressful, tiring, and overwhelming. There will be problems we don't expect and challenges that might make us feel tired, but I hope you always remember that you don't have to face everything alone because you have me.\n\n" +
    "I want you to know that I will always be here to support you, not just as your partner, but also as someone who genuinely believes in you and your dreams. Whether it's your work, your job, your personal goals, or the things you want to achieve in life, I will always be cheering for you. I want to see you grow, succeed, and become the person you've always wanted to be. And even on days when you doubt yourself, I hope you can find a little strength in knowing that someone believes in you so much, and that someone is me.\n\n" +
    "Love, you don't have to be strong all the time. You don't always have to pretend that you're okay when you're tired or when things aren't going your way. Whenever life feels too heavy, you can always come to me. You can tell me about your worries, your frustrations, your fears, and even the little things that happened during your day. I'll listen to you, comfort you, and remind you that you are doing your best. I may not always have the perfect words to say or the answers to every problem, but I promise to do my best to understand you and be someone you can lean on.\n\n" +
    "And when problems come our way, I hope we always choose to face them together. We might not have everything figured out right now, and we might have days when things get difficult between us, but I believe that we can get through those moments as long as we continue to understand each other, communicate, and choose one another. I don't expect our relationship to be perfect. I just want us to keep learning, growing, and becoming better for ourselves and for each other.\n\n" +
    "I want to be there not only during your happiest moments, but also during the days when you feel lost, exhausted, or unsure of yourself. I want to celebrate your achievements, no matter how big or small, and remind you how proud I am of you. And when things don't go as planned, I'll still be here, reminding you that one bad day or one setback doesn't define you. You can rest, take your time, and try again. You don't have to rush everything, Love. I'll be here supporting you as you work toward the life you dream of.\n\n" +
    "Thank you for being part of my life and for giving me someone to love, care for, and look forward to spending more days with. I'm grateful for every moment we share, every laugh, every conversation, and even the little things that might seem ordinary but mean so much to me because they're with you.\n\n" +
    "I love you so much, Love. ❤️ And I hope that as we continue this journey together, you never have to question whether you have someone on your side. You have me. Through the good days and the bad days, through the victories and the struggles, and through all the unexpected things life may bring, I want us to keep choosing each other.\n\n" +
    "I can't promise that I can fix every problem or make every difficult day disappear, but I can promise that I'll do my best to stand beside you, support your dreams, and be a safe place for you to rest when the world gets too overwhelming.\n\n" +
    "Always remember that you are loved, appreciated, and never alone in this journey. Your dreams matter to me, your happiness matters to me, and you matter so much to me.\n\n" +
    "Happy monthsary again, Love! Here's to more months together, more memories to make, more dreams to chase, more problems to overcome, and more reasons to fall in love with each other every single day.\n\n" +
    "I love you, always and in all ways. ❤️🥹\n\n" +
    "No matter what life brings us, I hope we never forget that we're on the same team. It's you and me, Love. We'll figure things out together, one day at a time.\n\n" +
    "I love you so much, Love. Happy monthsary! 💗🫶🏻",

  // Four hidden notes — revealed when she clicks the tiny sparkles/hearts on the letter
  hiddenNotes: [
    "P.S. You looked beautiful today. You always do.",
    "I saved this spot in the letter just for a secret: you're my favorite person.",
    "If you're reading this late at night dream about you.",
    "One day I want to read this letter to you out loud.",
  ],

  // Shown when she breaks the heart-shaped seal
  promise: "My promise: no matter how busy life gets, I will never let you feel like an afterthought. You will always come first in the quiet parts of my heart.",

  // Shown by the "There's one more thing…" button — the deeper closing
  moreMessage:
    "I need you to know that this isn't just a monthsary letter. It's a small, permanent thank-you. For existing. For staying. For being the calmest, warmest part of my life.\n\nIf you ever forget how loved you are, come back to this page and read it again. I'll keep it here for you, always.",

  // The FINAL MOMENT — after dimming, the big message
  finalTitle: "Happy Monthsary",
  finalMessage:
    "One month down. A lifetime to go.\nEvery day with you is my favorite chapter so far.",
  finalClose: "I love you. Yesterday, today, and every tomorrow. — Yours ♥",
};
/* ============================================================
   ✋ END OF EDITABLE CONTENT — logic starts below
   ============================================================ */

/* ---------- shorthand ---------- */
const $ = (id) => document.getElementById(id);
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- state ---------- */
let currentScene = "envelope";
let typewriterTimer = null;
let skipRequested = false;
let fullLetterShown = false;

/* ============================================================
   STARFIELD (twinkling stars, canvas)
   ============================================================ */
const starfield = $("starfield");
const sfCtx = starfield.getContext("2d");
let stars = [];

function initStarfield() {
  starfield.width = window.innerWidth;
  starfield.height = window.innerHeight;
  const count = Math.min(180, Math.floor(window.innerWidth / 8));
  stars = Array.from({ length: count }, () => ({
    x: Math.random() * starfield.width,
    y: Math.random() * starfield.height,
    r: Math.random() * 1.4 + 0.3,
    tw: Math.random() * Math.PI * 2,
    speed: Math.random() * 0.02 + 0.005,
  }));
}

function drawStarfield() {
  sfCtx.clearRect(0, 0, starfield.width, starfield.height);
  for (const s of stars) {
    s.tw += s.speed;
    const alpha = 0.35 + Math.sin(s.tw) * 0.35;
    sfCtx.beginPath();
    sfCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    sfCtx.fillStyle = `rgba(255, 240, 250, ${Math.max(alpha, 0)})`;
    sfCtx.fill();
  }
  requestAnimationFrame(drawStarfield);
}

initStarfield();
if (!prefersReducedMotion) drawStarfield();
window.addEventListener("resize", initStarfield);

/* ============================================================
   TOAST
   ============================================================ */
let toastTimer = null;
function toast(msg) {
  const t = $("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 3500);
}

/* ============================================================
   SCENE MANAGEMENT
   ============================================================ */
function showScene(name) {
  document.querySelectorAll(".scene").forEach((s) => s.classList.add("hidden"));
  const scene = $("scene-" + name);
  scene.classList.remove("hidden");
  requestAnimationFrame(() => scene.classList.add("visible"));
  currentScene = name;
  $("skipBtn").classList.toggle("hidden", name !== "envelope");
  if (name === "final") {
    document.querySelector(".sky").classList.add("dim");
    startShower();
  }
}

/* ============================================================
   SCENE 1 — ENVELOPE
   ============================================================ */
$("addrName").textContent = CONTENT.herName;
$("envelope").addEventListener("click", openEnvelope);

function openEnvelope() {
  const env = $("envelope");
  if (env.classList.contains("opening")) return;
  spawnBurst(env);
  env.classList.add("opening");

  const wait = prefersReducedMotion ? 200 : 1900;
  setTimeout(() => {
    env.classList.add("disintegrate");
    setTimeout(() => {
      showScene("letter");
      startTypewriter();
    }, 650);
  }, wait);
}

/* glowing particles bursting from the envelope */
function spawnBurst(anchor) {
  if (prefersReducedMotion) return;
  const rect = anchor.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  for (let i = 0; i < 26; i++) {
    const p = document.createElement("span");
    const size = Math.random() * 6 + 3;
    p.style.cssText = `position:fixed;left:${cx}px;top:${cy}px;width:${size}px;height:${size}px;
      border-radius:50%;pointer-events:none;z-index:9;
      background:radial-gradient(circle,#ffd9ea,#ff8fb8);
      box-shadow:0 0 10px rgba(255,143,184,0.9);`;
    document.body.appendChild(p);
    const ang = Math.random() * Math.PI * 2;
    const dist = 60 + Math.random() * 140;
    p.animate(
      [
        { transform: "translate(-50%,-50%) scale(1)", opacity: 1 },
        {
          transform: `translate(${Math.cos(ang) * dist - 50}%,${Math.sin(ang) * dist - 50}px) scale(0.2)`,
          opacity: 0,
        },
      ],
      { duration: 1200 + Math.random() * 800, easing: "cubic-bezier(0.2,0.8,0.3,1)" }
    ).onfinish = () => p.remove();
  }
}

/* skip button — jumps straight to the letter */
$("skipBtn").addEventListener("click", () => {
  skipRequested = true;
  showScene("letter");
  showFullLetter(true);
});

/* ============================================================
   SCENE 2 — LETTER (typewriter)
   ============================================================ */
$("letterDate").textContent = CONTENT.letterDate;
const greetingBase = (CONTENT.herName || "my love").trim().replace(/^(my|dearest|my dearest)\s*/i, "");
$("letterGreeting").textContent = `My ${greetingBase},`;
$("letterSign").textContent = CONTENT.yourName;
$("promiseText").textContent = CONTENT.promise;

function startTypewriter() {
  const body = $("letterBody");
  body.textContent = "";
  fullLetterShown = false;
  if (prefersReducedMotion || skipRequested) {
    showFullLetter();
    return;
  }
  const text = CONTENT.letter;
  let i = 0;
  const cursor = document.createElement("span");
  cursor.className = "cursor";
  body.appendChild(cursor);

  const textNode = document.createTextNode("");
  body.insertBefore(textNode, cursor);

  function tick() {
    if (skipRequested) { cursor.remove(); return; }
    // reveal 2 chars per tick for a natural but not-slow feel
    i = Math.min(i + 2, text.length);
    textNode.nodeValue = text.slice(0, i);
    if (i < text.length) {
      typewriterTimer = setTimeout(tick, 24);
    } else {
      cursor.remove();
      finishLetter();
    }
  }
  tick();
}

function showFullLetter() {
  clearTimeout(typewriterTimer);
  skipRequested = true;
  $("letterBody").textContent = CONTENT.letter;
  finishLetter();
}

function finishLetter() {
  fullLetterShown = true;
  $("letterSign").classList.add("shown");
  $("revealAllBtn").classList.add("gone");
  document.querySelectorAll(".annotation").forEach((a, idx) =>
    setTimeout(() => a.classList.add("shown"), idx * 500)
  );
  document.querySelector(".annotation-1").textContent = `(read slowly, okay, ${shortName()})`;
}

function shortName() {
  // use the last word of herName as a nickname, e.g. "My Bella" -> "Bella"
  const parts = (CONTENT.herName || "").trim().split(/\s+/);
  return parts[parts.length - 1] || "love";
}

$("revealAllBtn").addEventListener("click", () => {
  if (!fullLetterShown) {
    spawnBurst($("letterBody"));
    showFullLetter();
  }
});

/* ---------- hidden sparkle notes ---------- */
const secrets = document.querySelectorAll(".secret");
secrets.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    const note = CONTENT.hiddenNotes[i];
    if (note) toast(note);
    btn.classList.add("used");
  });
});

/* ---------- heart seal → promise ---------- */
$("sealBtn").addEventListener("click", () => {
  const btn = $("sealBtn");
  if (btn.classList.contains("broken")) return;
  btn.classList.add("broken");
  spawnBurst(btn);
  const p = $("promiseText");
  p.classList.remove("hidden");
  requestAnimationFrame(() => p.classList.add("shown"));
});

/* ---------- "one more thing" → final scene ---------- */
$("moreBtn").addEventListener("click", () => {
  spawnBurst($("moreBtn"));
  setTimeout(() => showScene("final"), 400);
});

/* ============================================================
   SCENE 3 — FINAL MOMENT
   ============================================================ */
$("finalTitle").textContent = CONTENT.finalTitle;
$("finalMessage").textContent = CONTENT.finalMessage;
$("finalClose").textContent = CONTENT.finalClose;

/* glowing particle shower (canvas) */
const shower = $("shower");
const shCtx = shower.getContext("2d");
let drops = [];
let showerRunning = false;

function initShower() {
  shower.width = window.innerWidth;
  shower.height = window.innerHeight;
}
initShower();
window.addEventListener("resize", initShower);

function startShower() {
  initShower();
  if (prefersReducedMotion) return;
  showerRunning = true;
  drops = Array.from({ length: 70 }, () => newDrop(true));
  requestAnimationFrame(drawShower);
}

function newDrop(anywhere) {
  return {
    x: Math.random() * shower.width,
    y: anywhere ? Math.random() * shower.height : -10,
    r: Math.random() * 2.2 + 0.8,
    vy: Math.random() * 0.7 + 0.3,
    drift: Math.random() * 0.6 - 0.3,
    hue: Math.random() > 0.5 ? "255,143,184" : "185,166,232",
    tw: Math.random() * Math.PI * 2,
  };
}

function drawShower() {
  if (!showerRunning) return;
  shCtx.clearRect(0, 0, shower.width, shower.height);
  for (let i = 0; i < drops.length; i++) {
    const d = drops[i];
    d.y += d.vy;
    d.x += d.drift;
    d.tw += 0.05;
    if (d.y > shower.height + 10) drops[i] = newDrop(false);
    const alpha = 0.5 + Math.sin(d.tw) * 0.35;
    shCtx.beginPath();
    shCtx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    shCtx.fillStyle = `rgba(${d.hue},${Math.max(alpha, 0)})`;
    shCtx.shadowColor = `rgba(${d.hue},0.9)`;
    shCtx.shadowBlur = 8;
    shCtx.fill();
  }
  requestAnimationFrame(drawShower);
}

/* ============================================================
   REPLAY
   ============================================================ */
$("replayBtn").addEventListener("click", () => {
  // reset everything to the beginning
  skipRequested = false;
  fullLetterShown = false;
  clearTimeout(typewriterTimer);
  $("letterBody").textContent = "";
  $("letterSign").classList.remove("shown");
  $("revealAllBtn").classList.remove("gone");
  $("revealAllBtn").classList.remove("hidden");
  $("promiseText").classList.add("hidden");
  $("promiseText").classList.remove("shown");
  $("sealBtn").classList.remove("broken");
  document.querySelectorAll(".secret").forEach((s) => s.classList.remove("used"));
  document.querySelectorAll(".annotation").forEach((a) => a.classList.remove("shown"));
  document.querySelector(".annotation-1").textContent = "(read slowly, okay?)";
  const env = $("envelope");
  env.classList.remove("opening", "disintegrate");
  document.querySelector(".sky").classList.remove("dim");
  showerRunning = false;
  shCtx.clearRect(0, 0, shower.width, shower.height);

  const letterScene = $("scene-letter");
  letterScene.classList.remove("visible");
  showScene("envelope");
});

/* ============================================================
   AMBIENT MUSIC — never autoplays; works even if file missing
   ============================================================ */
const music = $("bgMusic");
const musicToggle = $("musicToggle");
let musicReady = false;

music.addEventListener("canplaythrough", () => (musicReady = true));
music.querySelector("source").addEventListener("error", () => {
  musicReady = false;
  musicToggle.style.display = "none"; // no file? hide the button, everything else works
  console.info("assets/music.mp3 not found — music disabled. Add your MP3 to enable it.");
});

musicToggle.addEventListener("click", () => {
  if (!musicReady && music.error) return;
  if (music.paused) {
    const p = music.play();
    if (p) {
      p.then(() => {
        musicToggle.classList.add("playing");
        musicToggle.setAttribute("aria-pressed", "true");
        musicToggle.setAttribute("aria-label", "Pause music");
        toast("♪ playing your song");
      }).catch(() => toast("Could not play music — check assets/music.mp3"));
    }
  } else {
    music.pause();
    musicToggle.classList.remove("playing");
    musicToggle.setAttribute("aria-pressed", "false");
    musicToggle.setAttribute("aria-label", "Play music");
  }
});

/* ============================================================
   KEYBOARD SUPPORT
   ============================================================ */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && currentScene === "envelope" && !$("envelope").classList.contains("opening")) {
    openEnvelope();
  }
});

/* ============================================================
   INITIALIZE
   ============================================================ */
showScene("envelope");
