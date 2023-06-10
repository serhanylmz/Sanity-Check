// Fetch data from specified files
async function fetchData(fileName) {
    const response = await fetch(fileName);
    return response.json();
  }
  
  function getColor(value) {
    // Return green for 'Better' and red for 'Worse'
    return value === 'Better' ? '#4CAF50' : '#f44336';
  }
  
  document.addEventListener("DOMContentLoaded", async () => {
    
    // Initialize the map with center coordinates focusing on Turkey and adjust the zoom level accordingly
    const turkeyCenter = [38.9637, 35.2433];
    const zoomLevel = 6;
    const myMap = L.map("map").setView(turkeyCenter, zoomLevel);
  
    // Add an OpenStreetMap tile layer (you can use other providers if you prefer)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(myMap);
  
  const geoJsonData = await fetchData('data\tr-cities.json');
  const jsonData = await fetchData('data\finaldata.json');
  
  // Combine GeoJSON and JSON data by matching "Province Name"
  geoJsonData.features.forEach((feature) => {
    const province = jsonData.find((item) => item['Province Name'] === feature.properties.name);
    if (province) {
      Object.assign(feature.properties, province);
    }
  });
  
  // Display the merged data as polygons on the map
  L.geoJson(geoJsonData, {
    style: function (feature) {
      return { fillColor: getColor(feature.properties.result), fillOpacity: 0.6 };
    },
    onEachFeature: function (feature, layer) {
      // Add a popup to display all the stats for each province when hovered over
      let popupContent = `<h4>${feature.properties.name}</h4>`;
      popupContent += 'index_2013: ' + feature.properties.index_2013 + '<br>';
      popupContent += 'index_2014: ' + feature.properties.index_2013 + '<br>';
      popupContent += 'index_2015: ' + feature.properties.index_2013 + '<br>';
      popupContent += 'index_2016: ' + feature.properties.index_2013 + '<br>';
      popupContent += 'index_2017: ' + feature.properties.index_2013 + '<br>';
      popupContent += 'index_2018: ' + feature.properties.index_2013 + '<br>';
      popupContent += 'index_2019: ' + feature.properties.index_2013 + '<br>';
      popupContent += 'index_2020: ' + feature.properties.index_2020 + '<br>';
        popupContent += '2020_predicted: ' + feature.properties['2020_predicted'];
      
          layer.bindPopup(popupContent);
  
          layer.on({
            mouseover(e) { this.openPopup(); },
            mouseout(e) { this.closePopup(); }
          });
        },
  }).addTo(myMap);
  });
  