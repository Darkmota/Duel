let cons = new Array();
let jwt = require('jwt-simple');
let secret = require('./secret');
let dbWorker = require('../db/dbWorker');

module.exports = function(server) {
    let IO = require('socket.io');
    let socketIO = IO(server);
    let count = 0;
    let waiterName = false;
    let waiterSocketId = false;
    let userMap = new Map();
    let roomInfo = [];
    socketIO.on('connect', function (socket) {
        console.log("connect: " + socket.id);
        socket.on('join', function (token) {
        	console.log("join: " + token);
            let decoded = jwt.decode(token, secret.jwt_secret);
            if (decoded.username) {
                if (decoded.exp >= new Date().getTime()) {
                    socket.emit('token_time_out');
                }
                else {
                    /*
                    let preload = {
                        username: decoded.username,
                        exp: new Date().getTime() + 60*10*1000,
                    }
                    let token = jwt.encode(preload, secret.jwt_secret);
                    socket.emit('game_token', token);
                    */
                    if (waiterName !== false && waiterName !== decoded.username) {
                        let hostName = waiterName;
                        let hostSocketId = waiterSocketId;
                    	console.log('Grouped: '+hostName+' '+decoded.username);
                        waiterName = false;
                        waiterSocketId = false;
                        for (let id = 1; id <= 20; ++id) {
                            if (roomInfo[id] === undefined) {
                    			console.log('Atroom['+id+']');
                                userMap.set(decoded.username, {
                                    enemyName: hostName,
                                    isHost: false,
                                    socketId: socket.id,
                                    roomId: id,
                                    MP: 0,
                                    move: false
                                });
                                userMap.set(hostName, {
                                    enemyName: decoded.username,
                                    isHost: true,
                                    socketId: hostSocketId,
                                    roomId: id,
                                    MP: 0,
                                    move: false
                                });
                                roomInfo[id] = {
                                    round: 1,
                                    hostName: hostName,
                                    guestName: decoded.username,
                                    duelRecord:[]
                                }
                                socketIO.to(hostSocketId).emit('game_start', {enemyName: decoded.username});
                                socket.emit('game_start', {enemyName: hostName});
                                break;
                            }
                        }
                    }
                    else {
                        waiterName = decoded.username;
                        waiterSocketId = socket.id;
                        //socket.emit('wait');
                    }
                }
            }
        });
        socket.on('submit_movement', function (data) {
            let token = data.token;
            let move = data.move;
            console.log('submit_movement');
            console.log(data);
            let decoded = jwt.decode(token, secret.jwt_secret);
            if (decoded.username) {
                if (decoded.exp >= new Date().getTime()) {
                    socket.emit('token_time_out');
                }
                else {
                    let myData = userMap.get(decoded.username);
                    if (myData) {
                        myData.move = move;
                        let room = roomInfo[myData.roomId];
                        if (room) {
                            console.log("Room: " + myData.roomId);
                            let hostData = myData.isHost ? myData : userMap.get(room.guestName);
                            let guestData = myData.isHost ? userMap.get(room.guestName) : myData;
                            if (hostData.move !== false && guestData.move !== false) {
                                ((arr)=>{
                                    console.log("Move complete: " + hostData.move + ' ' + guestData.move);
                                    for (let i = 0; i < arr.length; ++i) {
                                        let cost = 0;
                                        switch (arr[i].move) {
                                            case -1:
                                            case -2:
                                            case -3:
                                            case -4:
                                            case -5:
                                                cost = arr[i].move;
                                                break;
                                            case 2:
                                            case 4:
                                                cost = -arr[i].move/2;
                                                break;
                                        }
                                        if (arr[i].MP < cost) {
                                            arr[i].move = 0;
                                        }
                                        if (arr[i].move === 0) {
                                            arr[i].MP++;
                                        }
                                    }
                                })([hostData, guestData]);
                                let hostMove = hostData.move;
                                let guestMove = guestData.move;
                                room.duelRecord.push({
                                    round: room.round,
                                    hostMove: hostData.move,
                                    guestMove: guestData.move
                                });
                                let result = "u";
                                if (hostMove < 0 && guestMove < 0) {
                                    if (hostMove < guestMove) {
                                        result = "h";
                                    }
                                    else if (hostMove > guestMove) {
                                        result = "g";
                                    }
                                }
                                else if (hostMove < 0 && guestMove === 0) {
                                    result = "h";
                                }
                                else if (hostMove === 0 && guestMove < 0) {
                                    result = "g";
                                }
                                else if (hostMove < 0 && guestMove > 0) {
                                    if (- hostMove > guestMove) {
                                        result = "h";
                                    }
                                }
                                else if (hostMove > 0 && guestMove < 0) {
                                    if (- guestMove > hostMove) {
                                        result = "g";
                                    }
                                }
                                if (result === "h") {
                                    result = guestData.enemyName;
                                }
                                else if (result === "g") {
                                    result = hostData.enemyName;
                                }
                                socketIO.to(hostData.socketId).emit("result", {
                                    result: result,
                                    enemyMove: guestMove
                                });
                                socketIO.to(guestData.socketId).emit("result", {
                                    result: result,
                                    enemyMove: hostMove
                                });
                                if (result !== "u") {
                                    userMap.delete(room.hostName);
                                    userMap.delete(room.guestName);
                                    if (result === "h") {
                                        dbWorker.modifyUser({username: room.hostName}, {$inc: {"point": 1, "win": 1}});
                                        dbWorker.modifyUser({username: room.guestName}, {$inc: {"point": -1, "lose": 1}});
                                    }
                                    else {
                                        dbWorker.modifyUser({username: room.hostName}, {$inc: {"point": -1, "lose": 1}});
                                        dbWorker.modifyUser({username: room.guestName}, {$inc: {"point": 1, "win": 1}});
                                    }
                                    dbWorker.addRecord({
                                        hostName: room.hostName,
                                        guestName: room.guestName,
                                        record: room.duelRecord,
                                    });
                                }
                                else {
                                    delete room;
                                }
                                hostData.move = false;
                                guestData.move = false;
                            }
                        }
                    }
                }
            }
        });
    });
}
