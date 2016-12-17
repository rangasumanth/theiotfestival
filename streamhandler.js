var Tweet = require('./models/tweet');

module.exports = function(stream){

  // When tweets get sent our way ...
  stream.on('data', function(data) {

    // Construct a new tweet object
    var tweet = data;
    delete tweet.id;
    tweet.twid = data.id;

    // Create a new model instance with our object
    var tweetEntry = new Tweet(tweet);

    // Save 'er to the database
    tweetEntry.save(function(err) {
      if (err) {
        // If everything is cool, socket.io emits the tweet.
        console.log(err);
      }
    });

  });

};
