function findAddress(selector){
  var address = $(selector).val();
  $(selector).val('')
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({'address': address + 'chicago'}, function(results, status){
    var lat = results[0].geometry.location.k;
    var lng = results[0].geometry.location.B;
    data = {latitude: lat, longitude: lng, date: getDateRange()};
    updatePageFromAddress(data, address);
  });
}

function updatePage(data, location) {
  postLocation(data, location, pagePost);
}

function updatePageFromAddress(data, location) {
  postLocation(data, location, addressPost);
}

function postLocation(data, location, regionFunction) {
  $.post('/current_position', data, function(response){
    var days = response.sweep_days;
    console.log(days);
    if (days.length > 0) {
      buildSidebarWithDate(location, response);
    } else {
      buildSidebarNoDate(location);
    }
    regionFunction(data);
  }, 'JSON');
}

function addressSubmit() {
  $('#address_submit').on('click', function(event){
    findAddress('#address');
  })

  $('#lower_address_submit').on('click', function(event){
    findAddress('#lower_address');
  })
}

function addressPost(data) {
  $.post('/load_region_from_address', data, function(response){ 
    $('#active_map').replaceWith(response)
    addLegend(active_map);
  });
}

function pagePost(data) {
  $.post('/load_region', data, function(response){ 
    $('#active_map').append(response);
  });
}

function renderDate(date){
  var response = date.split(" ")
  if (isNaN(response[1])) {
    return "<div>No sweeping scheduled for this location</div>";
  } else {
    return "<div id = 'date_icon'><div id = 'month'>" + response[0] + "</div><div id = 'day'>" + response[1]  + "</div></div>"
  }
}

function buildSidebarWithDate(location, response) {
  $('#next p').html('<h3>Next street cleaning for ' + location + ':</h3><br>' + renderDate(response.next_sweep));
  $("#modal3_div").show();
  $('#notify_exp').html('Want email or SMS notifications for street sweeping at this location?  Sign up here.');
}

function buildSidebarNoDate(location) {
  $('#next p').html('<h3>There is no scheculed street sweeping<br>for ' + location + '.</h3><p>Please select another location to see street sweeping dates.</p>');
  $("#modal3_div").hide();
  $('#notify_exp').html('');
}