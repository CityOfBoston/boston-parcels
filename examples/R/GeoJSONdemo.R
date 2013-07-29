# TITLE: GeoJSONdemo.R
# AUTHOR: Nick Doiron, City of Boston
# CREATED: 2013-07-25
# UPDATED: 2013-07-25
# NOTES: Adapted from script by Tom Schenk Jr., City of Chicago
# LIBRARIES: rgdal, ggplot2

# Set working directory (e.g., "C:\\Users\\username\\downloads" or "~/downloads")
setwd("path\\to\\city-parcels")

# Install and load libraries
## If you need to install the RGDAL and GGPLOT2 libraries, complete this step first, otherwise, skip:
install.packages(c("rgdal", "ggplot2"))

library(rgdal)	# Import data into a Spatial Data Frame in R
library(ggplot2)	# Transform data from Shapefile to Data Frame

# Import data to Spatial Dataframe	
ogrInfo("city-parcels.geojson", layer="OGRGeoJSON") # Checks projection type for readOGR(), number of rows, and fields.

parcels.shapefile <- readOGR(dsn="city-parcels.geojson", layer="OGRGeoJSON", p4s="+proj=tmerc +ellps=WGS84") # Imports data.

head(parcels.shapefile) # Inspect the data structure.

plot(parcels.shapefile) # Test plot of spatial data frame.

# Fortify data to translate to Data Frame
parcels.df <- fortify(parcels.shapefile) # Caution, this is very memory intensive

head(parcels.df) # Inspect the data structure

ggplot(parcels.df, aes(x=long, y=lat, group=group)) + geom_path() # Test plot of data frame.