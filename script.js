const img = document.getElementById("img")
const button = document.getElementById("button")


let JSON_URL = "";

function ChanMode() {
    JSON_URL = "Chan.json";
    fetchJSON(JSON_URL);
}

function ChangbinMode() {
    JSON_URL = "Changbin.json";
    fetchJSON(JSON_URL);
}

function Allmode() {
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

function detectMode() {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get("mode");

    if (mode === "All") AllMode();
    else if (mode === "Chan") ChanMode();
    else if (mode === "Changbin") ChangbinMode();
}

button.onclick = showRandomImage;

window.onload = detectMode;

// Service Worker registration
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .then(() => console.log("Service Worker registered"))
    .catch(err => console.error("SW failed:", err));
}