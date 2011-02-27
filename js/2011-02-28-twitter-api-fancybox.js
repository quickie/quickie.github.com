(function($) {
  var userInfo = [ //extract this info from the json result
        { name: 'Following',        key: 'friends_count'   },
        { name: 'Followers',        key: 'followers_count' },
        { name: 'Statuses',         key: 'statuses_count'  },
        { name: 'URL',              key: 'url'             } 
      ],
      searchTerm = 'jquery',
      searchUrl  = 'http://search.twitter.com/search.json?q=' + searchTerm + '+filter:links&rpp=5',
      statusText = 'Click on the User Link or Picture for more information',
      tweetLi    = function(user, image, text) {
        return '<span><a href="http://twitter.com/' + user + '">' + user + '</a></span>' +
               '<img src="' + image + '" width="48" height="48" />' +
               '<p>' + urlize(text) + '</p>';
      },
      waitDiv    = function(user) {
        return '<div class="fb-wait">Querying the Twitter API for @' + user + '...</div>';
      },
      userUrl    = function(user) {
        return 'http://twitter.com/users/' + user + '.json';
      },
      infoWrap   = function(json) {
        var infos = ''
        
        for(i = 0; i < userInfo.length; i++) {
          var info = json[userInfo[i].key];
          
          if(info) {
            infos += '<li>' + 
                       urlize('<span>' + userInfo[i].name + '</span>' + info); +
                     '</li>'
          }
        }

        return '<div class="fb-info">' +
                  '<h1><a href="http://twitter.com/' + json.screen_name + '">@' + json.screen_name + '</a></h1>' +
                  '<img src="' + json.profile_image_url + '" width="128" height="128" />' +
                  '<ul>' + infos + '</ul>' +
               '</div>'
      },
      urlize     = function(text) { //http://stackoverflow.com/questions/37684/replace-url-with-html-links-javascript
        var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        return text.replace(exp, '<a href="$1">$1</a>');
      };
      
      
  function displayUserInformation(user) {
    $.fancybox(waitDiv(user));
    
    $.getJSON(userUrl(user) + '?callback=?', function(json) {
      $.fancybox(infoWrap(json), {
        scrolling: false
      });
    });
  }
  
  $(document).ready(function() {
    var demo   = $('#demo'),
        tweets = $('<ul/>').appendTo(demo);
    
    $.getJSON(searchUrl + '&callback=?', function(json) {
      var results = json.results;
      
      $('.status', demo).text(statusText);
      
      for(i = 0; i < results.length; i++) {
        var t = results[i];
        
        $('<li/>', {
          html: tweetLi(t.from_user, t.profile_image_url, t.text)
        }).appendTo(tweets);
      }
      
      $('li img, li span a', tweets).click(function() {
        var userLi = $(this).parent();
            userLi = userLi.is('li') ? userLi : userLi.parent(); //coming from <a>
        
        displayUserInformation(userLi.find('span a').text());
        return false;
      });
    });
  });
})(jQuery);