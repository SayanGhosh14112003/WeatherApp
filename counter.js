document.getElementById("btn").addEventListener("click", function (event) {
  event.preventDefault()
});
//--------------------
function secondsToHoursMinutes(seconds) {
  const hou = Math.floor(seconds / 3600);
  const min = Math.abs(Math.floor((seconds % 3600) / 60));
  return { hou, min };
}

//--------------------
var marker=L.marker([0,0]);
function c(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

var map = L.map('map').setView([22.5726, 88.3639], 4);
L.tileLayer('https://{s}.tile.jawg.io/jawg-terrain/{z}/{x}/{y}{r}.png?access-token=QdGlh2lbNSoVle78fGkgh9JIPn4Pd3qmCzq6UhOuemq0OC0y20FPLwpSKtEGGgCT', {
  maxZoom: 15,
  minZoom: 4
}).addTo(map);
async function main(city) {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=886705b4c1182eb1c69f28eb8c520e20`;
  try{
    const response = await fetch(url);
         map.removeLayer(marker)
        if (response.status === 404) {
          throw new Error('Location not found!');
        }
        const data = await response.json();
        //---------
        const url_aqi=`https://api.api-ninjas.com/v1/airquality?lat=${data.coord.lat}&lon=${data.coord.lon}`
        try{
          const res=await fetch(url_aqi, {
            method: 'GET',
            headers: {
                'X-Api-Key': 'f+DTxui6YEiG0R/bN20gwg==Ad7PoPNZqiLXIKYJ',
                'Content-Type': 'application/json'
            }
        });
          const data1=await res.json();
          var aqi=data1.overall_aqi;
          var pm10=data1.PM10.concentration;
          var no2=data1.NO2.concentration;
          var o3=data1.O3.concentration;
        }
        catch(err){
            
        }
        //------------
        var {hou,min}=secondsToHoursMinutes(data.timezone);
        let image = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
        map.setView([data.coord.lat, data.coord.lon], 9);
        marker =  L.marker([data.coord.lat, data.coord.lon]).bindPopup("<img src=" + image + "><span><h3>" + c(data.weather[0].description) + "</h3></span><hr><h2>" + data.name+"("+data.sys.country+")</h2><h4>Temperature: " + (data.main.temp - 273).toFixed(1) + "°C</h4><h4>Humidity: " + data.main.humidity + "%</h4><h4>Wind: " + (data.wind.speed * 3.6).toFixed(1) + " Km/h</h4> <h4>AQI: "+aqi+"</h4><h4>(PM10: "+(pm10).toFixed(1)+" No2: "+(no2).toFixed(1)+" O3: "+(o3).toFixed(1)+" )</h4><h4>Timezone: GMT "+hou+":"+min+"</h4>")
        marker.addTo(map).openPopup();
    }catch(err){
      alert(err);
    };
}
async function main2(lat,lng) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=886705b4c1182eb1c69f28eb8c520e20`;
  try{
    const response = await fetch(url);
    map.removeLayer(marker)
    const data = await response.json();
        //---------
        const url_aqi=`https://api.api-ninjas.com/v1/airquality?lat=${data.coord.lat}&lon=${data.coord.lon}`
        try{
          const res=await fetch(url_aqi, {
            method: 'GET',
            headers: {
                'X-Api-Key': 'f+DTxui6YEiG0R/bN20gwg==Ad7PoPNZqiLXIKYJ',
                'Content-Type': 'application/json'
            }
        });
          const data1=await res.json();
          var aqi=data1.overall_aqi;
          var pm10=data1.PM10.concentration;
          var no2=data1.NO2.concentration;
          var o3=data1.O3.concentration;
        }
        catch(err){
            
        }
        //------------
        var {hou,min}=secondsToHoursMinutes(data.timezone);
        let image = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
        map.setView([data.coord.lat, data.coord.lon], 9);
        marker =  L.marker([data.coord.lat, data.coord.lon]).bindPopup("<img src=" + image + "><span><h3>" + c(data.weather[0].description) + "</h3></span><hr><h2>" + data.name+"("+data.sys.country+")</h2><h4>Temperature: " + (data.main.temp - 273).toFixed(1) + "°C</h4><h4>Humidity: " + data.main.humidity + "%</h4><h4>Wind: " + (data.wind.speed * 3.6).toFixed(1) + " Km/h</h4> <h4>AQI: "+aqi+"</h4><h4>(PM10: "+(pm10).toFixed(1)+" No2: "+(no2).toFixed(1)+" O3: "+(o3).toFixed(1)+" )</h4><h4>Timezone: GMT "+hou+":"+min+"</h4>")
        marker.addTo(map).openPopup();
    }catch(err){
      console.log(err);
    };
}
btn.addEventListener('click', async() => {
  try{
    main(search.value);
  }catch(err){}
})
map.on('click', function(e){
  var coord = e.latlng;
  var lat = coord.lat;
  var lng = coord.lng;
  main2(lat,lng)
  });
