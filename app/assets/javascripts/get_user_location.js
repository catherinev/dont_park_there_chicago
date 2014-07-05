$(document).ready(function(){

  findUser();

});

function findUser() {
 
  if (navigator.geolocation){

    function success(position) {
      var latitude  = position.coords.latitude;
      var longitude = position.coords.longitude;
      var data = {latitude: latitude, longitude: longitude};

      $.post('/current_position', data, function(response){ 
        console.log(response);
          // replace this response with something that renders new map on top of old map
      }, 'JSON');

      $.post('/update_surrounding', data, function(response){ 
        console.log(response);
        // render new map at the bottom of the page? put it on the page in the right place
      }, 'JSON');
    };
    navigator.geolocation.getCurrentPosition(success);
  }
}



