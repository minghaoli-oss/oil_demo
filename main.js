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

  let allMarkers = [];

function searchOilField() {
  const keyword = document.getElementById('search-input').value.toLowerCase();
  allMarkers.forEach(marker => {
    const name = marker.getExtData().name.toLowerCase();
    marker.setVisible(name.includes(keyword));
  });
}

// 修改标记创建代码
data.features.forEach(feature => {
    const marker = new AMap.Marker({
      position: feature.geometry.coordinates,
      content: `<div class="marker">${feature.properties.name}</div>`
    });
    
    marker.on('click', () => {
      new AMap.InfoWindow({
        content: `
          <h3>${feature.properties.name}</h3>
          <p>类型：${feature.properties.type}</p>
          <p>储量：${feature.properties.储量}万吨</p>
        `
      }).open(map, marker.getPosition());
    });
    
    marker.setExtData(feature.properties);
    allMarkers.push(marker);
    map.add(marker);
  });