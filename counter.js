document.getElementById("btn").addEventListener("click", function (event) {
  event.preventDefault()
});
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
        } else if (response.status === 500) {
          throw new Error('Server error');
        } else if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        let image = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
        map.setView([data.coord.lat, data.coord.lon], 9);
        marker =  L.marker([data.coord.lat, data.coord.lon]).bindPopup("<img src=" + image + "><span><h3>" + c(data.weather[0].description) + "</h3></span><hr><h2>" + data.name+"("+data.sys.country+")"+ "</h2><h4>Temperature: " + (data.main.temp - 273).toFixed(1) + "°C</h4><h4>Humidity: " + data.main.humidity + "%</h4><h4>Wind: " + (data.wind.speed * 3.6).toFixed(1) + " Km/h</h4>")
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
        let image = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
        map.setView([data.coord.lat, data.coord.lon], 9);
        marker = L.marker([data.coord.lat, data.coord.lon]).bindPopup("<img src=" + image + "><span><h3>" + c(data.weather[0].description) + "</h3></span><hr><h2>" + data.name+"("+data.sys.country+")"+ "</h2><h4>Temperature: " + (data.main.temp - 273).toFixed(1) + "°C</h4><h4>Humidity: " + data.main.humidity + "%</h4><h4>Wind: " + (data.wind.speed * 3.6).toFixed(1) + " Km/h</h4>")
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
  console.log("You clicked the map at latitude: " + lat + " and longitude: " + lng);
  main2(lat,lng)
  });

