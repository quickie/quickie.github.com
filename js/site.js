// this script does not belong to an article but the quickie site

$(document).ready(function() {
  var win   = $(window),
      right = $('#right');
  
  win.resize(function() {
    var newWidth = win.width() - 650;
    
    if(newWidth >= 400) {
      right.width(newWidth);
    } else {
      //catch user with smaller screens
      right.width(550);
    }
  }).resize();
  
  setTimeout(function() {
    $('#thebigq').fadeIn('slow');
  }, 600);
  
  var quickie  = $('#quickie'),
      posted   = $('.date a', quickie),
      id       = posted.attr('href').split('/')[3],
      date     = new Date(posted.text()),
      zeronize = function(num) { return num <= 9 ? '0' + num : num },
      strDate  = date.getFullYear() + '-' + zeronize(date.getMonth() + 1) + '-' + zeronize(date.getDate());
      basename = strDate + '-' + id,
      posturl  = 'https://github.com/quickie/quickie.github.com/blob/master/_posts/' + basename + '.html',
      srcurl   = 'https://github.com/quickie/quickie.github.com/tree/master/js/' + basename + '.js',
  
  posted.text(strDate);
  
  quickie
    .append('<li><a href="' + posturl + '">Post @ Github</a></li>')
    .append('<li><a href="' + srcurl + '">Source @ Github</a></li>');
  
  $('body').append('<script src="/js/' + basename + '.js" type="text/javascript"></script>');
});