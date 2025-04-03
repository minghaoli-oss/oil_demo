// main.js
let allMarkers = []; // 全局存储标记

// 封装数据加载方法
async function loadAndRenderData() {
  try {
    // 1. 获取数据
    const response = await fetch('data/demo.geojson');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    // 2. 解析数据
    const data = await response.json(); // 此处定义data变量
    
    // 3. 创建标记
    data.features.forEach(feature => {
      const marker = new AMap.Marker({
        position: feature.geometry.coordinates,
        content: `<div class="marker">${feature.properties.name}</div>`
      });

      // 信息窗点击事件
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

  } catch (error) {
    console.error('数据加载失败:', error);
    alert('地图数据加载失败，请检查网络连接');
  }
}

// 初始化地图后调用
const map = new AMap.Map('map-container', {
  zoom: 3,
  center: [105, 35]
});
loadAndRenderData(); // 启动数据加载

function showAddForm() {
    document.getElementById('edit-form').style.display = 'block';
  }
  
  function saveNewField() {
    const newFeature = {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: map.getCenter()
      },
      properties: {
        name: document.getElementById('field-name').value,
        储量: parseInt(document.getElementById('reserves').value),
        type: "常规油田"
      }
    };
    
    // 创建新标记
    const marker = new AMap.Marker({
      position: newFeature.geometry.coordinates,
      content: `<div class="marker">${newFeature.properties.name}</div>`
    });
    allMarkers.push(marker);
    map.add(marker);
  }