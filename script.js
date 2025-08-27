// Parse query string (e.g. ?lat=42.218&lon=-85.778&name=Albert+Miller)
function getQueryParams() {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    lat: parseFloat(urlParams.get("lat")),
    lon: parseFloat(urlParams.get("lon")),
    name: urlParams.get("name") || "Grave"
  };
}

window.onload = () => {
  const { lat, lon, name } = getQueryParams();

  if (!lat || !lon) {
    alert("No coordinates provided in URL.");
    return;
  }

  const scene = document.querySelector("a-scene");
  const markerEntity = document.getElementById("marker");

  // Add a simple marker (sphere)
  const marker = document.createElement("a-entity");
  marker.setAttribute("gps-entity-place", `latitude: ${lat}; longitude: ${lon};`);
  marker.setAttribute("geometry", "primitive: sphere; radius: 1.5;");
  marker.setAttribute("material", "color: yellow; opacity: 0.9;");
  marker.setAttribute("scale", "2 2 2");

  // Add text label
  const label = document.createElement("a-text");
  label.setAttribute("value", name);
  label.setAttribute("look-at", "[gps-camera]");
  label.setAttribute("align", "center");
  label.setAttribute("color", "#FFFFFF");
  label.setAttribute("width", "8");
  label.setAttribute("position", "0 3 0");

  marker.appendChild(label);
  markerEntity.appendChild(marker);

  console.log(`Placed marker at ${lat}, ${lon} with label: ${name}`);
};
