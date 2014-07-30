function enterAddress() {
  $("#address").keyup(function(event){
    if(event.keyCode == 13){
      $("button#address_submit").click();
    }
  });

  $("#lower_address").keyup(function(event){
    if(event.keyCode == 13){
      $("button#lower_address_submit").click();
    }
  });
}

function updateDateRange() {
  $('button.update_from_date').on('click', function() {
    active_map.off('click');
    hideTab();
    $.post('/load_after_date_change', {date: getDateRange()}, function(response) {
      active_map.removeLayer(allMapElements);
      $('#map_script').remove();
      $('#active_map').append(response);
    });
  });
}