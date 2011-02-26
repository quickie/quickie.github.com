// this script does not belong to an article but the quickie site

$(document).ready(function() {
  var win      = $(window),
      demoWrap = $('#demowrap');
  
  win.resize(function() {
    var newWidth = win.width() - 800;
    
    if(newWidth >= 400) {
      demoWrap.width(newWidth);
    } else {
      //catch user with smaller screens
      demoWrap.width(550);
    }
  }).resize();
  
  setTimeout(function() {
    $('#thebigq').fadeIn('slow');
  }, 600);
});