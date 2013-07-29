var map = L.map("map").setView([ 42.36022, -71.05813 ], 13);

L.tileLayer('http://{s}.tiles.mapbox.com/v3/mapmeld.boston-greenery/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    maxNativeZoom: 15,
    maxZoom: 17
}).addTo(map);

var s = document.createElement("script");
s.type = "text/javascript";
s.src = "http://code.jquery.com/jquery-1.9.1.min.js";
s.onload = function(){
  $.getJSON("../../wards/ward_1.geojson", function(gj){
    var parcels = L.geoJson(gj, {
      style: function(feature){
        if(feature.properties.PID_LONG === "PID you want to highlight"){
          return { weight: 1, color: "#f00" };
        }
        else{
          return { weight: 1 };
        }
      },
      onEachFeature: function(feature, layer){
        var popupTable = "<table border='1'>";
        for( attribute in feature.properties ){
          popupTable += "<tr>";
          popupTable += "<td><b>" + attribute + "</b></td>";
          popupTable += "<td>" + feature.properties[attribute] + "</td>";
          popupTable += "</tr>";
        }
        popupTable += "</table>";
        layer.bindPopup( popupTable );
      }
    }).addTo(map);
    map.fitBounds( parcels.getBounds() );
  });
};
document.body.appendChild(s);