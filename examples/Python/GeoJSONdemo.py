# TITLE: GeoJSON Example in Python
# AUTHOR: Nick Doiron, City of Boston
# CREATED: 2013-07-25
# UPDATED: 2013-07-25
# NOTES: Adapted from example by Tom Schenk Jr., City of Chicago
# MODULES: json

import json

parcel_file = open('../../city_parcels.geojson', 'r')
parcel_data = json.load(parcel_file)
parcel_file.close()