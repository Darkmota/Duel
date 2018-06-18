let cons = new Array();
let waitingRoom = {
    playerA: false,
    playerB: false
}

module.exports = function(app) {
    let io = require('socket.io')(app);
    let socket = io();
    socket.on('connect', function (){
        console.log(socket.client); 
    });
}