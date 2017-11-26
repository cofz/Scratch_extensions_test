/*
 TEST VERSION FOR 
 BASED ON ISS STATION PROTECT BY KREG HANNING
 */
(function(ext) {

  var locations = {};
  var issData = null;

  function getLocation(str, callback) {

    if (locations[str]) {
      callback(locations[str]);
      return;
    }

    $.ajax({
      type: "GET",
      url: "http://nominatim.openstreetmap.org/search/", //site do satelite
      dataType: "jsonp",
      data: {
        format: "json",
        q: str
      },
      jsonp: "json_callback",
      success: function(data) {
        locations[str] = {};
        locations[str].coords = [data[0].lon, data[0].lat];
        locations[str].overhead = false;
        callback(locations[str]);
      },
      error: function(jqxhr, textStatus, error) {
        callback(null);
      }
    });
  }

//atualiza a localização 
  function updateinfo() {
    $.ajax({
      type: "GET",
      dataType: "json",
      url: "https://api.wheretheiss.at/v1/satellites/25544"
      //url: "https://api.wheretheiss.at/v1/satellites/25544", //url com arquivo json
      success: function(data) {
        issData = data; //salva os dados do arquivo json na variável data
      },
      error: function(jqxhr, textStatus, error) { //mensagem de erro
        console.log("Error downloading ISS data");
      }
    });
  }

//obtem a informação 
  ext.getinfo = function(stat) {
    if (!issData) return;
    if (stat === "longitude" || stat === "latitude")
      return issData[stat].toFixed(6).toString();
    else
      return issData[stat].toFixed(2).toString();
  };

  ext._getStatus = function() {
    return { status:2, msg:'Ready' };
  };

  ext._shutdown = function() {
    if (poller) {
      clearInterval(poller);
      poller = null;
    }
  };

  var descriptor = {
    blocks: [
      //['h', 'when ISS passes over %s', 'whenISSPasses', 'Boston, MA'],
      //['R', 'distance from %s in %m.measurements', 'distanceFrom', 'Boston, MA', 'kilometers'],
      ['r', 'current ISS %m.loc', 'getISSInfo', 'longitude']
    ],
    menus: {
      loc: ['longitude', 'latitude', 'altitude', 'velocity'],
      //measurements: ['kilometers', 'miles']
    },
    url: '---'
  };

  ScratchExtensions.register('Thingspeak', descriptor, ext);

  updateinfo();
  var poller = setInterval(updateISSLocation, 2000);

})({});
