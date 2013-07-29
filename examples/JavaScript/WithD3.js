var feature;

var width = 1280,
    height = 800,
    centered;

var projectionNow = d3.geo.azimuthal()
    .scale(174000)
    .origin([-71.09,42.29])
    .mode("orthographic")
    .translate([width / 2, height / 2]);

var circle = d3.geo.greatCircle()
    .origin(projectionNow.origin());

var path = d3.geo.path()
    .projection(projectionNow);

var svg = d3.select("#map").append("svg:svg")
    .attr("width", width)
    .attr("height", height);
    
d3.json("../../wards/ward_1.geojson", function(collection) {

  feature = svg.selectAll("path")
    .data(collection.features)
    .enter().append("svg:path")
      .attr("d", clip)
      .attr("fill", function(d){
        var r = Math.floor(Math.random() * 16).toString(16);
        var g = Math.floor(Math.random() * 16).toString(16);
        var b = Math.floor(Math.random() * 16).toString(16);
        var color = "#" + [r,g,b].join("");
        return color;
      })
      .on("click", clicked);

  feature.append("svg:title")
      .text(function(d) { return d.properties.PID_LONG; });
});

function clicked(d) {

  var centroid = d.geometry.coordinates[0][0];
  
  var projection2 = d3.geo.azimuthal()
    .scale(174000)
    .origin(centroid)
    .mode("orthographic")
    .translate([width / 2, height / 2]);

  feature.transition()
      .duration(3000)
      .attrTween("d", projectionTween(projectionNow, projection2, centroid));
}

function projectionTween(projection0, projection1, centroid) {
  return function(d) {
    var t = 0;

    function project(λ, φ) {
      λ *= 180 / Math.PI, φ *= 180 / Math.PI;
      var p0 = projection0([λ, φ]), p1 = projection1([λ, φ]);
      return [(1 - t) * p0[0] + t * p1[0], (1 - t) * -p0[1] + t * -p1[1]];
    }

    return function(_) {
      t = _;

      var x = (projection1.origin()[0] - projection0.origin()[0]) * t + projection0.origin()[0];
      var y = (projection1.origin()[1] - projection0.origin()[1]) * t + projection0.origin()[1];
      var scale = (700000 - projection0.scale()) * t + projection0.scale();

      projectionNow = d3.geo.azimuthal(project)
        .scale(scale)
        .origin( [x, y] )
        .mode("orthographic");

      var path = d3.geo.path()
        .projection(projectionNow);

      return path(d);
    };
  };
}

function clip(d) {
  return path(circle.clip(d));
}