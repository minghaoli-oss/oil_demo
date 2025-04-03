// main.js
const map = new AMap.Map('map-container', {
    zoom: 3,  // 初始缩放级别
    center: [105, 35]  // 中国中心坐标
  });

  // main.js
function loadGeoJSON() {
    fetch('data/demo.geojson')
      .then(response => response.json())
      .then(data => {
        data.features.forEach(feature => {
          new AMap.Marker({
            position: feature.geometry.coordinates,
            content: `<div class="marker">${feature.properties.name}</div>`
          }).addTo(map);
        });
      });
  }
  loadGeoJSON();