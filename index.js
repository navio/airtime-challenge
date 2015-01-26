  var api   = require('./runner')('alnavarro@gmail.com','http://challenge2.airtime.com',7182);
  var async = require('async');

  var messages = [], report  = [];

  // Get Starting Point
  var starting_room  = api.getStart();

  // Run The Maze
  goToRoom(starting_room);

  // Sort my Messages
  messages.sort(function (a, b) {
    if (a.order > b.order) return 1;
      return -1;
  });

  // Construct Message
  var message = '';
  messages.forEach(function(item){
      message += item.writing;
  });

  // Send Message
  var res = api.submitReport(message,report);
  console.log(res);

  function goToRoom(room_id){

    var room_content = api.readContent(room_id);

    if(room_content.writing === 'xx'){
        report.push(room_id);
      }else{
        messages.push(room_content);
    }

    var room_exits = api.getExits(room_id);

    if( !room_exits ) return ;

    async.map(room_exits,takeExit);

    function takeExit(direction){
      //Ready to Move to Next Room
      var next_room = api.moveTo(room_id,direction);
          process.stdout.write(".");
          goToRoom(next_room);
    }

  }
