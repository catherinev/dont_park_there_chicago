$(document).ready(function(){
  var active_map;
  findUser();

  $('#address_submit').on('click', function(event){
    findAddress('#address');
  })

  $('#lower_address_submit').on('click', function(event){
    findAddress('#lower_address');
  })

});


function findUser() {
  if (navigator.geolocation){
    function success(position) {
      var latitude  = position.coords.latitude;
      var longitude = position.coords.longitude;
      var data = {latitude: latitude, longitude: longitude};

      updatePage(data, 'your current location')
    };
    navigator.geolocation.getCurrentPosition(success);
  }
}

function findAddress(selector){
  var address = $(selector).val();
  $(selector).val('')
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({'address': address + 'chicago'}, function(results, status){
    var lat = results[0].geometry.location.k;
    var lng = results[0].geometry.location.B;
    data = {latitude: lat, longitude: lng};
    updatePageFromAddress(data, address);
  });
}

function updatePage(data, location) {
  $.post('/load_region', data, function(response){ 
    $('#active_map').append(response);
    
  });

  postCurrentLocation(data, location);
}

function updatePageFromAddress(data, location) {

  $.post('/load_region_from_address', data, function(response){ 
    $('#active_map').replaceWith(response)
    addLegend(active_map);
    console.log('hello')
  });

  postCurrentLocation(data, location);
}

function postCurrentLocation(data, location) {
  $.post('/current_position', data, function(response){ 
    $('.copy p:nth-child(2)').html('The next street cleaning<br>for ' + location + ' is:<br>' + response.next_sweep);

    $('#next').html('<h3>Next street cleaning for ' + location + ':</h3>' + response.next_sweep);
      
    str = "</h3><h3>Street Cleaning Days</h3><ul>"

    var days = response.sweep_days;
    if (days.length > 0) {
      for (var i=0; i<days.length; i++) {
        str += '<li>' + days[i] + '</li>';
      }
    } else {
      str += '<li>none</li>';
    }
    $('#future').html(str + '</ul>');
  }, 'JSON');
}

function addLegend(active_map) {
  legend.onAdd = function (map) {
     var div = L.DomUtil.create('div', 'info legend');
        div.innerHTML += '<b>Streets will next be swept in:</b><br><br>' +
              '<i style="background: red"></i> ' + 'less than a week<br><br>' + '<i style="background: green"></i> ' + 'a week or more';
      return div;
      };
    legend.addTo(active_map);
}