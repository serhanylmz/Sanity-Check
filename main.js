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

const geoJsonData = await fetchData('data/tr-cities.json');
const jsonData = await fetchData('data/finaldata.json');

// Combine GeoJSON and JSON data by matching "Province Name"
geoJsonData.features.forEach((feature) => {
   const province = jsonData.find((item) => item['Province Name'] === feature.properties.name);
  
   if (province) {
       Object.assign(feature.properties, province);
   }
});

// Display merged data as polygons on the map
L.geoJSON(geoJsonData, {
     style: function (feature) {
        return { fillColor: getColor(feature.properties.result), fillOpacity:0.6 };
      },
   
   
   onEachFeature:function(feature,layer){
        
       layer.on({
           mouseover(e){this.openPopup();},
           mouseout(e){this.closePopup();},
           click(e){showProvinceData(feature.properties);}
          });
       },
       
}).addTo(myMap);


function showProvinceData(properties){

   var tableContainer=document.getElementById('province-table');
  
   while(tableContainer.firstChild){
        tableContainer.removeChild(tableContainer.firstChild);
    }

 document.getElementById('result-div').innerHTML="";
    
  var dataTable=document.createElement('table');

  dataTable.appendChild(createTableHeader(['Year', 'Index']));
    
  for(let year in properties){ 
          if(year.startsWith("index_")){
              let value=properties[year];

                  let row=createTableRow([year.substring(6),value]); 

                  dataTable.appendChild(row);   

            } else if(year==="2020_predicted"){ 
                let propName="Predicted Value";            
                let propValue=properties[year];
                
                  let row=createTableRow([propName,propValue]);
        
                  dataTable.appendChild(row); 
              }
      }
      
      tableContainer.appendChild(dataTable);

      if ('result' in properties){

          var resultDiv=document.createElement("div");
          
          resultDiv.id="result";
          
          resultDiv.innerText=(properties["result"]+" THAN EXPECTED").toUpperCase();

          if(properties['result']==='Better'){
              resultDiv.style.backgroundColor="#4CAF50"; // Green color for better results             
            
          } else if(properties['result']==='Worse'){
              resultDiv.style.backgroundColor="#f44336"; // Red color for worse results                        
          }

            document.getElementById('result-div').appendChild(resultDiv);  

      }

      // Scroll to table and oval section when a province is clicked
      document.getElementById("content-container").scrollIntoView({behavior: "smooth"});
      // Set the new province name as the title 
      document.getElementById("province-title").innerText = properties["name"];
      
      // Make scroll-up button visible and append it to resultDiv
      const button = document.getElementById("scroll-up-btn");
      button.style.display = "block";
      
      // Add event listener to button for scrolling up
      button.onclick = () => {
          window.scrollTo({top:0, behavior:"smooth"});
      };
  }
  });


  function createTableHeader(headers){
    let headerRow=document.createElement('tr');

    headers.forEach(header=>{
    let th=document.createElement('th');
    th.textContent=header;

    headerRow.appendChild(th);

    })

    return headerRow;

  }

  function createTableRow(values){
    let row=document.createElement('tr');

    values.forEach(val=>{

    let td=document.createElement('td');    

    td.textContent=val;

    row.appendChild(td);

  })

  return row;

}
