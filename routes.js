var express = require('express');
var path = require('path');
var twitter = require('ntwitter');
var http = require('http');
var mongoose = require('mongoose');
var router = express.Router();


var streamHandler = require('./streamhandler');
var Tweet = require('./models/tweet');

var twit = new twitter({
  consumer_key: 'b817l7p80PPyMNaGPhThzSu1a', // <--- FILL ME IN
  consumer_secret: 'LYVbcNXFWHZCwbWdThXgPII2ouuNMHKdPgEUAsfVfIUCixipZ5', // <--- FILL ME IN
  access_token_key: '767765431641788417-QMgywY59lm0WnCvRA4BOMBFRsMAiSxi', // <--- FILL ME IN
  access_token_secret: 'Uo03XBYjo8hZUuatFmkIY0PwDuzWCJEXyOxxZ3OFQNqEH' // <--- FILL ME IN
});

twit.stream('statuses/filter', {
  track: 'theiotfestival, #TheIoTFestival'
}, function(stream) {
  streamHandler(stream);
});

 GET home page.
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'TheIoTFestival\'s social &hearts; wall TheIoTFestival\'s'
  });
});

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
