require "rubygems"
require "bundler/setup"

# load gems from the Gemfile
Bundler.require(:default)

IL_SP_FACTORY = RGeo::Cartesian.simple_factory(:srid => 4326)
CITY_HALL = IL_SP_FACTORY.point(-71.05813, 42.36022)
# Polygon buffered 500ft from City Hall
CITY_HALL_BUFFERED = CITY_HALL.buffer(500)

# Load GeoJSON
geojson = File.read(File.expand_path(
  File.dirname(__FILE__) + "../../city_parcels.geojson"))
features = RGeo::GeoJSON.decode(geojson, :json_parser => :json)

# Filter features near City Hall
# nearby_features = features.select { |feature| feature.geometry.intersects?(CITY_HALL_BUFFERED) }

# Output GeoJSON of features near City Hall
# puts RGeo::GeoJSON.encode(RGeo::GeoJSON::FeatureCollection.new(nearby_features)).to_json