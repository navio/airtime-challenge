var Client = require('node-rest-client').Client;
 
module.exports =
 
function(user,url,port){
  if(!port) port = 80; // default
  var header = { 'X-Labyrinth-Email': user, };
  var path = url + ':' + port + '/';
 
  client = new Client();
 
  client.registerMethod("start", path+"start", "GET");
 
  client.registerMethod("exits", path+"exits?roomId=${roomId}", "GET");
 
  client.registerMethod("move", path+"move?roomId=${roomID}&exit=${exit}", "GET");
 
  client.registerMethod("wall", path+"wall?roomId=${wall}", "GET");
 
 
 
    var start = function start(fn){
      client.methods.start({ headers: header, },fn);
    }
 
    var exits = function exits(room,fn){
      client.methods.start({ headers: header, path: {"roomId":room} },fn);
    }
 
    var move = function move(room,exit,fn){
      client.methods.start({ headers: header, path: {"roomId":room,"exit":exit } },fn);
    }
 
    var wall = function wall(wall,fn){
      client.methods.start({ headers: header, path: {"wall":wall } },fn);
    }
 
  return {
 
    'start': start ,
 
    'exits': exits,
 
    'move': move,
 
    'wall': wall
  }
 
};
