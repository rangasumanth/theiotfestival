var express = require('express');
var path = require('path');
var twitter = require('ntwitter');
var http = require('http');
var mongoose = require('mongoose');
var router = express.Router();


//var streamHandler = require('./streamhandler');
//var Tweet = require('./models/tweet');
/*
var twit = new twitter({
  consumer_key: 'dteOV9HkUj0x7xW7OzPUcJ4lb', // <--- FILL ME IN
  consumer_secret: 'xn4UTRj7be5DHIVSqlI65lULb3TjrKzST5aD4ywIUSJgskrM9e', // <--- FILL ME IN
  access_token_key: '590688831-ZtYu3G0LAsNjdHBrQq8TIAkiTvVPjQ2FnM2MQhT0', // <--- FILL ME IN
  access_token_secret: '1rEqY669AkSFChZlt8l9wBhbDkV2CZeYS7HUp1R50f9BA' // <--- FILL ME IN
});

twit.stream('statuses/filter', {
  track: 'theaugustfest, #TheAugustFest'
}, function(stream) {
  streamHandler(stream);
});

 GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'TheGeekAngel\'s social &hearts; wall TheGeekAngel\'s'
  });
});
/*
router.post('/messages', function(req, res) {
  //console.log(req.body);
  // Set a stream listener for tweets matching tracking keywords
  // Call static model method to get tweets in the db
  Tweet.getTweets(function(tweets) {
    console.log(tweets);
    res.json({
      next_request: {
        sources: [{
          'twitter.Search': {
            query: "#TheAugustFest",
            since_id: "",
            count: 100
          }
        }],
        filters: [{
          ExcludeRetweets: {}
        }],
        count: 66
      },
      messages: [tweets]
    });
  });
  //res.sendFile(path.join(__dirname + '/messages.json'));

});
*/

/* GET config . */
router.get('/config', function(req, res, next) {
  res.json(
{messageprovider:{
	type:"beam.messageprovider.APIMessageProvider",
	apimessageprovider:{
		pictures_only:false,
		api_request:{
			sources:[
				{"twitter.Search":{query:"#thegeekangels",count:100}},
				{"instagram.TagMedia":{tag:"thegeekangels",count:30}}
		      ],
			  filters:[{ExcludeRetweets:{}}]
			}
		}
	}
   ,view:{type:"beam.view.classic.ClassicView",
	   classic:{message_tag: "TheGeekAngels",
		   show_instagram_logo:true,
		    message_prefix:"Tag your posts with",
			fake_swaps:true,
			swap_interval:500,
			licensed:true,
			branding_content:""
			}
			}
	}
);
});

router.get('/view/templates', function(req, res, next) {
  res.render('templates');
});
module.exports = router;
