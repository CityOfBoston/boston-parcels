# TITLE: MySQL Demo in Python
# AUTHOR: Nick Doiron, City of Boston
# CREATED: 2013-07-25
# UPDATED: 2013-07-25
# NOTES: Adapted from example by Tom Schenk Jr., City of Chicago
# MODULES: json

import json
import MySQLdb # install MySQLdb for Python access

parcel_file = open('../../city_parcels.geojson', 'r')
parcel_data = json.load(parcel_file)
parcel_file.close()

db = MySQLdb.connect( host = "localhost",
                      user = "admin",
                      passwd  = "admin",
                      db = "parceldb")

cursor = db.cursor()

cursor.execute( "CREATE TABLE parcels ( parcel_id VARCHAR 10, ward VARCHAR 4 )" )

for feature in parcel_data["features"]:
  a = feature["properties"]["PID_LONG"]
  if(feature["properties"].has_key("WARD")):
    b = feature["properties"]["WARD"]
  else:
    b = " "
  cursor.execute( "INSERT INTO parcels VALUES (%s, %s)", ( a, b ) )