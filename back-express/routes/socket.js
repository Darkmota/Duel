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
                if (0&&decoded.exp >= new Date().getTime()) {
                    socket.emit('token_time_out');
                }
                else {
                    if (waiterName !== false && waiterName !== decoded.username) {
                        let hostName = waiterName;
                        let hostSocketId = waiterSocketId;
                        console.log('Grouped: '+hostName+' '+decoded.username);
                        waiterName = false;
                        waiterSocketId = false;
                        for (let id = 1; id <= 200; ++id) {
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
        socket.on('surrender', function(token) {
            console.log('[on] surrender');
            let decoded = jwt.decode(token, secret.jwt_secret);
            if (decoded.username) {
                let myData = userMap.get(decoded.username);
                if (myData === undefined) {
                    if (waiterName === decoded.username) {
                        waiterName = false;
                        console.log('Waiter '+decoded.username+' stop waiting.');
                    }
                    else {
                        console.log('[Unexcpted] Waiter is '+ waiterName +'.');
                    }
                }
                else {
                    let room = roomInfo[myData.roomId];
                    console.log(myData);
                    console.log(room);
                    if (room) {
                        console.log("[at] Room: " + myData.roomId);
                        let hostData = myData.isHost ? myData : userMap.get(room.guestName);
                        let guestData = myData.isHost ? userMap.get(room.guestName) : myData;
                        if (myData.isHost) {
                            socketIO.to(guestData.socketId).emit("result", {
                                result: "g",
                                enemyMove: -100 //means surrender
                            });
                        }
                        else {
                            socketIO.to(hostData.socketId).emit("result", {
                                result: "h",
                                enemyMove: -100 //means surrender
                            });
                        }
                    }
                }
            }
        });
        socket.on('submit_movement', function (data) {
            let token = data.token;
            let move = data.move;
            console.log('[on] submit_movement');
            let decoded = jwt.decode(token, secret.jwt_secret);
            if (decoded.username) {
                if (0&&decoded.exp >= new Date().getTime()) {
                    socket.emit('token_time_out');
                }
                else {
                    let myData = userMap.get(decoded.username);
                    if (myData) {
                        myData.move = move;
                        let room = roomInfo[myData.roomId];
                        console.log(myData);
                        console.log(room);
                        if (room) {
                            console.log("[at] Room: " + myData.roomId);
                            let hostData = myData.isHost ? myData : userMap.get(room.hostName);
                            let guestData = myData.isHost ? userMap.get(room.guestName) : myData;
                            if (hostData.move !== false && guestData.move !== false) {
                                console.log("----"+room.hostName+" vs "+room.guestName+"----");
                                console.log("Round: " + room.round);
                                ((arr)=>{
                                    console.log("Move: " + hostData.move + ' ' + guestData.move);
                                    for (let i = 0; i < arr.length; ++i) {
                                        let cost = 0;
                                        switch (arr[i].move) {
                                            case -1:
                                            case -2:
                                            case -3:
                                            case -4:
                                            case -5:
                                                cost = -arr[i].move;
                                                break;
                                            case 2:
                                            case 4:
                                                cost = arr[i].move/2;
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
                                socketIO.to(hostData.socketId).emit("result", {
                                    enemyMove: guestMove
                                });
                                socketIO.to(guestData.socketId).emit("result", {
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
                                    delete room;
                                }
                                else {
                                    room.duelRecord.push({
                                        round: room.round,
                                        hostMove: hostMove,
                                        guestMove: guestMove,
                                    })
                                    hostData.move = false;
                                    guestData.move = false;
                                    room.round++;
                                }
                            }
                        }
                    }
                }
            }
        });
    });
}
