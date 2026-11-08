// GitHub repository requested for this project.
const REPOSITORY_URL = "https://github.com/Joelndege/Phishing-Awareness-and-Detection-Application";
document.querySelectorAll("[data-repo]").forEach(link => {
  link.href = REPOSITORY_URL;
});

const analyse = document.querySelector("#analyse");
if (analyse) {
  const input = document.querySelector("#email-text");
  const result = document.querySelector("#result");
  const checks = [
    { test: /\b(urgent|immediately|act now|within 24 hours|suspended|final warning)\b/i, title: "Pressure or urgency", detail: "The text uses time pressure or a threat to encourage a quick response." },
    { test: /\b(password|verify your account|confirm your identity|login credentials|security code|one[- ]time code|\bOTP\b)\b/i, title: "Sensitive information request", detail: "The text may be asking for credentials or a sign-in code. Never share a one-time code in response to an email." },
    { test: /https?:\/\/[^\s<>"']+/i, title: "Link included", detail: "A URL appears in the message. Inspect its real destination carefully; the visible text may not match the destination." },
    { test: /\b(bit\.ly|tinyurl\.com|t\.co|goo\.gl|is\.gd|rb\.gy)(?:\/|\b)/i, title: "Shortened link", detail: "Shortened URLs hide their final destination. Verify it through a trusted route." },
    { test: /\b(prize|winner|claim your reward|gift card|free money)\b/i, title: "Unexpected reward", detail: "Unexpected prizes or rewards can be used to draw you into a scam." },
    { test: /\b(wire transfer|payment required|bank details|send payment|gift card)\b/i, title: "Payment or banking request", detail: "Confirm financial requests with the supposed sender using a known contact method." },
    { test: /\b(attachment|attached|open the file|enable macros|invoice\.(zip|html|exe|js))\b/i, title: "Attachment or file request", detail: "Unexpected attachments can be unsafe. Confirm with the sender through a separate, trusted channel." }
  ];
  analyse.addEventListener("click", () => {
    const text = input.value.trim();
    if (!text) { input.focus(); return; }
    const found = new Set();
    checks.forEach(item => { if (item.test.test(text)) found.add(item.title); });
    const sender = text.match(/\bFrom\s*:\s*[^\n<]*<([^>]+)>/i) || text.match(/<([\w.+-]+@[\w.-]+\.[a-z]{2,})>/i);
    const emailDomain = sender?.[1]?.split("@")[1]?.toLowerCase();
    const urlDomains = [...text.matchAll(/https?:\/\/([^\s/<>"']+)/gi)].map(match => match[1].toLowerCase().replace(/^www\./, ""));
    if (emailDomain && urlDomains.some(domain => domain !== emailDomain && !domain.endsWith(`.${emailDomain}`))) found.add("Sender and link domain differ");
    const details = {
      "Sender and link domain differ": "The email address domain and a linked website domain are different. This can be legitimate, but verify through the organisation’s known site.",
      "Unusual sender address": "The sender address includes an uncommon or lookalike domain. Compare it with the organisation’s official domain.",
    };
    const matches = checks.filter(item => found.has(item.title));
    if (found.has("Sender and link domain differ")) matches.push({ title: "Sender and link domain differ", detail: details["Sender and link domain differ"] });
    if (/[\w.+-]+@[^\s<>]+\.(?:zip|top|click|work|support|test)\b/i.test(text) && sender) matches.push({ title: "Unusual sender address", detail: details["Unusual sender address"] });
    result.className = "result-card has-result";
    const risk = matches.length >= 3 ? "Several signals" : matches.length ? "Review carefully" : "Few signals found";
    result.innerHTML = `<div class="result-top"><span class="eyebrow">ANALYSIS COMPLETE</span><span class="risk-pill ${matches.length ? "" : "low"}">${risk}</span></div><h2>${matches.length ? `${matches.length} indicator${matches.length === 1 ? "" : "s"} to review` : "No common indicators matched"}</h2><p class="result-summary">${matches.length ? "These patterns deserve a closer look:" : "This simple checker did not find its listed patterns. That does not confirm the message is safe."}</p>${matches.length ? `<ul class="signal-list">${matches.map(item => `<li><b>${item.title}</b>${item.detail}</li>`).join("")}</ul>` : ""}<p class="result-tip"><b>Next step:</b> Don’t use contact details or links in an unexpected message. Check with the organisation through its official website or a known number.</p>`;
  });
  document.querySelector("#clear").addEventListener("click", () => { input.value = ""; result.className = "result-card"; result.innerHTML = `<div class="result-empty"><div class="result-symbol">✳</div><p class="eyebrow">YOUR RESULTS</p><h2>Ready when<br>you are.</h2><p>Analysis will appear here with specific signals to review.</p></div>`; input.focus(); });
}

const revealButton = document.querySelector("#reveal-clues");
if (revealButton) revealButton.addEventListener("click", () => {
  const panel = document.querySelector("#clue-breakdown");
  const opening = panel.hidden;
  panel.hidden = !opening;
  revealButton.setAttribute("aria-expanded", String(opening));
  revealButton.innerHTML = opening ? "Hide the clues <span>−</span>" : "Reveal the clues <span>＋</span>";
});

document.querySelectorAll(".quiz-option").forEach(button => button.addEventListener("click", () => {
  const feedback = document.querySelector("#quiz-feedback");
  document.querySelectorAll(".quiz-option").forEach(option => option.classList.remove("chosen-correct", "chosen-wrong"));
  const correct = button.dataset.correct === "true";
  button.classList.add(correct ? "chosen-correct" : "chosen-wrong");
  feedback.textContent = correct
    ? "Correct. Use the official website or app you already know, or contact the organisation through a trusted number. Avoid the message’s link."
    : "Not the safest choice. Don’t use links or contact details supplied in an unexpected message. Verify through a channel you already trust.";
  feedback.className = `quiz-feedback ${correct ? "is-correct" : "is-wrong"}`;
}));
