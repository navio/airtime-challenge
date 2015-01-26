var request = require('sync-request'); // To make it simple to read, slower.

module.exports =

function(user,url,port){

    if(!port) port = 80; // default

    var get_header = { 'X-Labyrinth-Email': user, };
    var post_header = { 'X-Labyrinth-Email': user, 'Content-Type': 'text/json', };

    var path = url + ':' + port + '/';

    var start =
    function start(){
      var res = request('GET', path+'start',{ headers:get_header });
      return JSON.parse(res.getBody('UTF-8')).roomId;
    }

    var exits =
    function exits(room){
      var res = request('GET', path+'exits?roomId='+room ,{ headers:get_header });
      return JSON.parse( res.getBody('UTF-8') ).exits;
    }

    var move =
    function move(room,exit){
      var res = request('GET', path+'move?roomId='+room+'&exit='+exit ,{ headers:get_header });
      return JSON.parse( res.getBody('UTF-8') ).roomId;
    }

    var wall =
    function wall(wall){
      var res = request('GET', path+'wall?roomId='+wall ,{ headers:get_header });
      return JSON.parse( res.getBody('UTF-8') );
    }

    var report =
    function report(message,rooms){
      var body = JSON.stringify({roomIds: rooms , challenge: message });
      var res = request('POST', path+'report',{ headers: post_header, body: body });
      return res.getBody('UTF-8');
    }

  return {

    'getStart': start ,

    'getExits': exits,

    'moveTo': move,

    'readContent': wall,

    'submitReport': report,
  }

};
