const https = require('https');
const firebase = require('firebase');

const API_BASE_URL = 'https://www.adultswim.com/api';
const API_ENDPOINT_CHAT = '/chat';
const API_ENDPOINT_USERS = '/chat/channelUsers/live-stream';
const API_ENDPOINT_TAGS = '/chat/tags';
const API_ENDPOINT_CONFIG = '/chat/config';
const API_ENDPOINT_NOTIFICATIONS = '/notifications/live-stream';
const API_ENDPOINT_TOKEN = '/token/live-stream&format=json&callback=gigya.callback&context=R154921076&version=8.1.40';
const API_ENDPOINT_SCHEDULE = '/schedule/streams';
const API_ENDPOINT_COUNT = '/eyeball/count/r0xw2u30R3GchW27yVqlug';
const API_ENDPOINT_STREAMS = '/streams/v1/shows';
const API_ENDPOINT_VIDEOS = '/videos/api/v3/videos/r0xw2u30R3GchW27yVqlug?fields=title,type,duration,collection_title,poster,stream,segments,title_id';

request = https.get(API_BASE_URL+API_ENDPOINT_CONFIG, res => {
  res.setEncoding('utf8');
  let body = '';
  res.on('data', data => {
    body += data;
  });
  res.on('end', () => {
    body = JSON.parse(body);

    // config = body.data.app;
    config = body.data.shard;

    // begin firebase stuff here
    firebase.initializeApp(config);

    // subscribe to realtime database chat and output raw CSV format
    console.log('date,username,message');
    const db = firebase.database();
    var chatRef = db.ref('/messages/live-stream');
    chatRef.on('child_added', function(data) {
      message = data.val()
      username = message.username.replace(/\\([\s\S])|(")/g,"\\$1$2");
      body = message.body.replace(/\\([\s\S])|(")/g,"\\$1$2");
      console.log('"'+Date(message.createdAt).toString()+'"'+','+'"'+username+'"'+','+'"'+body+'"');
    });
  });
});
