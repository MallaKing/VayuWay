// Initialize map immediately
let map = new MapmyIndia.Map("map", {
  center: [20.5937, 78.9629], // India center
  zoom: 5
});
const APILINK = "http://192.168.1.5:8000/api/v1/corridors/"; // Replace with your API endpoint
let geojsonLayer = null;
function getCorridor(corId) {
  fetch(APILINK + corId)
    .then(res => res.json())
    .then(data => {
      // Remove existing geojson layers
      /*if (geojsonLayer) {
        map.removeLayer(geojsonLayer);
        geojsonLayer = null;
      }*/

      // If multiple corridors (array of objects)
      if (Array.isArray(data)) {
        data.forEach(item => {
          const layer = L.geoJSON(item.corridor, {
            style: {
              color: "#0078FF",
              weight: 4,
              opacity: 0.7
            }
          }).addTo(map);
          map.fitBounds(layer.getBounds());
        });
      } else {
        // Single corridor
        geojsonLayer = L.geoJSON(data.corridor, {
          style: {
            color: "#0078FF",
            weight: 4,
            opacity: 0.7
          }
        }).addTo(map);
        map.fitBounds(geojsonLayer.getBounds());
      }
    })
    .catch(err => {
      console.error("Error loading corridor:", err);
      alert("Failed to load corridor");
    });
}





let marker = null;
let circle = null;
let kmlLayer = null;

function updateInfo(lat, lng, accuracy, timestamp) {
  document.getElementById("lat").textContent = lat.toFixed(6);
  document.getElementById("lng").textContent = lng.toFixed(6);
  document.getElementById("accuracy").textContent = accuracy.toFixed(2);
  document.getElementById("timestamp").textContent = timestamp;
}

function updateLocation(position) {
  const { latitude, longitude, accuracy } = position.coords;
  const timestamp = new Date(position.timestamp).toLocaleTimeString();

  map.setView([latitude, longitude], 16);

  if (marker) map.removeLayer(marker);
  if (circle) map.removeLayer(circle);

  marker = new L.Marker([latitude, longitude]).addTo(map);
  circle = new L.Circle([latitude, longitude], { radius: accuracy }).addTo(map);

  updateInfo(latitude, longitude, accuracy, timestamp);
}

function showError(error) {
  const message = {
    1: "Permission denied",
    2: "Position unavailable",
    3: "Timeout reached"
  };
  alert("Error: " + (message[error.code] || "Unknown error"));
}

// Real-time location
if ("geolocation" in navigator) {
  navigator.geolocation.watchPosition(updateLocation, showError, {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: 5000
  });
} else {
  alert("Geolocation is not supported by your browser.");
}
function loadCorridor() {
  const corid = document.getElementById("corid-input").value.trim();
  if (!corid) {
    alert("Please enter a corridor ID.");
    return;
  }
  getCorridor(corid);
}


// Handle KML Upload
/*document.getElementById("kml-upload").addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const kmlText = e.target.result;

    if (kmlLayer) map.removeLayer(kmlLayer); // Remove previous layer

    const kmlDoc = new DOMParser().parseFromString(kmlText, "text/xml");
    kmlLayer = omnivore.kml.parse(kmlDoc).addTo(map);

    kmlLayer.on("ready", () => {
      map.fitBounds(kmlLayer.getBounds());
    });
  };

  reader.readAsText(file);
});*/



  