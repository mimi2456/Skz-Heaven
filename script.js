const img = document.getElementById("img")
const button = document.getElementById("button")

function ChanMode() {
    JSON_URL = "Chan.json";
    fetchJSON(JSON_URL);
}

function ChangbinMode() {
    JSON_URL = "Changbin.json";
    fetchJSON(JSON_URL);
}

function AllMode() {
    JSON_URL = "All.json";
    fetchJSON(JSON_URL);
}

let urls = [];

function fetchJSON(JSON_URL) {
  fetch(JSON_URL)
    .then(response => response.json())
    .then(data => {
      urls = data;
      showRandomImage();
    });
}

function showRandomImage() {
  if (urls.length === 0) return;
  const randomUrl = urls[Math.floor(Math.random() * urls.length)];
  img.src = randomUrl;
}

function loadMode(mode) {
  const map = {
    All: "All.json",
    Chan: "Chan.json",
    Changbin: "Changbin.json"
  };
  const file = map[mode] || map.All;
  fetchJSON(file);
}

document.addEventListener("DOMContentLoaded", () => {
  const img = document.getElementById("img");
  const button = document.getElementById("button");

  const btnAll = document.getElementById("All");
  const btnChan = document.getElementById("Chan");
  const btnChangbin = document.getElementById("Changbin");

  // We are on ModeSelect.html if those buttons exist
  if (btnAll || btnChan || btnChangbin) {
    if (btnAll) btnAll.addEventListener("click", () => location.href = "web.html?mode=All");
    if (btnChan) btnChan.addEventListener("click", () => location.href = "web.html?mode=Chan");
    if (btnChangbin) btnChangbin.addEventListener("click", () => location.href = "web.html?mode=Changbin");
  }

  // We are on web.html if image + button exist
  if (img && button) {
    const params = new URLSearchParams(location.search);
    const mode = params.get("mode") || "All";
    document.getElementById("ModeDisplay").innerText = `Current mode: ${mode}`;
    loadMode(mode);
    
    button.addEventListener("click", showRandomImage);
  }
});

// Service Worker registration
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .then(() => console.log("Service Worker registered"))
    .catch(err => console.error("SW failed:", err));
}