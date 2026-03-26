// background.js — Trinetra.net v7.2
// Two jobs:
// 1. Auto-detect T&C pages and notify content script
// 2. Handle evidence file downloads to user's PC (subfolders work via this)

const TNC_PATTERNS = [
  "terms","privacy","policy","legal","tos","eula",
  "agreement","conditions","gdpr","consent","cookies",
  "disclaimer","rules","service-agreement","user-agreement"
];

// ── Auto-detect T&C pages ──────────────────────────────────────────────────────
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status !== "complete") return;
  if (!tab.url || tab.url.startsWith("chrome://")) return;
  const url = tab.url.toLowerCase();
  if (TNC_PATTERNS.some(p => url.includes(p))) {
    chrome.tabs.sendMessage(tabId, { type: "TNC_PAGE_DETECTED" }).catch(() => {});
  }
});

// ── Download evidence files to user's PC ──────────────────────────────────────
// Content scripts cannot call chrome.downloads — only service workers can.
// This listener stays alive and handles download requests from content.js
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type !== "DOWNLOAD_EVIDENCE") return false;

  // Validate we have what we need
  if (!msg.url || !msg.filename) {
    sendResponse({ ok: false, error: "Missing url or filename" });
    return false;
  }

  chrome.downloads.download({
    url:            msg.url,
    filename:       msg.filename,
    saveAs:         false,           // auto-save, no dialog box
    conflictAction: "uniquify",      // if file exists → add (1), (2) etc
  }, (downloadId) => {
    const err = chrome.runtime.lastError;
    if (err) {
      console.error("[Trinetra] Download failed:", err.message, "| File:", msg.filename);
      sendResponse({ ok: false, error: err.message });
    } else {
      console.log("[Trinetra] ✅ Saved:", msg.filename, "| ID:", downloadId);
      sendResponse({ ok: true, downloadId, filename: msg.filename });
    }
  });

  return true; // MUST return true to keep channel open for async sendResponse
});
