$(document).ready(function(){

  toggleListener();
  resizeMap();
  resizeListener();
});

function toggleListener(){
  $('#toggle').on('click', function(){
    
    if ($('#mobile').css('display') === 'none'){
      showTab();
    }
    else {
      hideTab(); 
    }
  });
}

function resizeMap(){
  if ($(window).width() <= 430){
    $('#active_map').css({
      'height': ($(window).height() - 115) + 'px'
    })
    $('#personal_map').css({
      'height': ($(window).height() - 115) + 'px'
    })
    moveRangeToMobile();
    moveProfilePageToMobile();
  }
  else if ($(window).width() <= 720){
    $('#active_map').css({
      'height': ($(window).height() - 80) + 'px'
    })
    $('#personal_map').css({
      'height': ($(window).height() - 80) + 'px'
    })
    moveRangeToMobile();
    moveProfilePageToMobile();
  }
  else {
    $('#active_map').css({
      'height': '550px'
    })
  }
}

function resizeListener(){
  $(window).resize(function(){
    resizeMap();
  })
}

function moveRangeToMobile(){
  if ($("#range").length){
    $('#range').appendTo('#mobile')
    showTab();
  }
}

function showTab(){
  var $toggle = $('#toggle'),
      $mobile = $('#mobile'),
      mobileHeight = $mobile.height(),
      windowHeight = $(window).height();
  $mobile.css({
    'display': 'block'
  });
  $toggle.html('&#x25BC')
  $toggle.css({
    'bottom': (mobileHeight) + 'px'
  })
}

function hideTab(){
  var $toggle = $('#toggle'),
      $mobile = $('#mobile'),
      mobileHeight = $mobile.height(),
      windowHeight = $(window).height();
  $mobile.css({
    'display': 'none'
  });
  $toggle.html('&#x25B2')
  $toggle.css({
    'bottom': 0
  })
}

function moveProfilePageToMobile(){
  if ($("#user_title").length){
    $('.user_container').appendTo('#mobile')
    showTab();
  }
}