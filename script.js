const img = document.getElementById("img")
const button = document.getElementById("button")


function ChanMode() {
   let JSON_URL = "Chan.json";
    fetchJSON(JSON_URL);
}

function ChangbinMode() {
   let JSON_URL = "Changbin.json";
    fetchJSON(JSON_URL);
}

function Allmode() {
   let JSON_URL = "All.json";
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

getElementById("All").onclick = Allmode;
getElementById("Chan").onclick = ChanMode;
getElementById("Changbin").onclick = ChangbinMode;
button.onclick = showRandomImage;

// Service Worker registration
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .then(() => console.log("Service Worker registered"))
    .catch(err => console.error("SW failed:", err));
}