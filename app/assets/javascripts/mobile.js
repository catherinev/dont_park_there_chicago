$(document).ready(function(){

  toggleListener();
  // resizeMap();
});

function toggleListener(){
  $('#toggle').on('click', function(){
    var $toggle = $(this),
        $mobile = $('#mobile'),
        mobileHeight = $mobile.height(),
        windowHeight = $(window).height();
    
    if ($mobile.css('display') === 'none'){
      $mobile.css({
        'display': 'block'
      });
      $toggle.html('&#x25BC')
      $toggle.css({
        'bottom': (mobileHeight) + 'px'
      })
    }
    else {
      $mobile.css({
        'display': 'none'
      });
      $toggle.html('&#x25B2')
      $toggle.css({
        'bottom': 0
      })  
    }
  });
}

function resizeMap(){


  if ($(window).width() <= 460){
    $('#active_map').css({
      'height': ($(window).height() - 170) + 'px'
    })
  }
}