var da = require('./runner')('alnavarro@gmail.com','http://challenge2.airtime.com',7182);

 da.start(function(data){
                        console.log(JSON.parse(data));
                         });
