let Duel = function(window, element, socket) {
    return (function(window, element, socket) {
        let instance = {};
        instance.clear = function() {
            this.ctx.fillStyle = '#bbb';
            this.ctx.fillRect(0,0,this.width,this.height);
        }
        instance.resize = function(box) {
            this.canvas.width = box.width;
            this.canvas.height = box.height;
            this.width = box.width;
            this.height = box.height;
        }
        instance.LOADING = {
            move: function(pos) {
                instance.status.pos = pos;
            },
            click: function(pos) {
                instance.status.pos = pos;
                console.log([instance.status.pos.x, instance.status.pos.y]);
            },
            refresh: function() {
                if (instance.status.graphics.left === 0) {
                    instance.emitList.push({
                        name: "join",
                        data: window.localStorage.getItem('auth')
                    })
                    instance.status.scene = instance.WAITING;
                }
                instance.ctx.fillStyle = "black";
                instance.ctx.font = "50px Consolas";
                instance.ctx.fillText(instance.status.graphics.left+"个素材等待读取……", 960, 540, 600, 100);
            }
        }
        instance.WAITING = {
            move: function(pos) {
                instance.status.pos = pos;
            },
            click: function(pos) {
                instance.status.pos = pos;
                console.log([instance.status.pos.x, instance.status.pos.y]);
            },
            refresh: function() {
                instance.ctx.fillStyle = "black";
                instance.ctx.font = "50px Consolas";
                instance.ctx.fillText("正在等待新对手……", 960, 540, 600, 100);
            }
        }
        instance.PLAYING = {
            move: function(pos) {
                instance.status.pos = pos;
            },
            click: function(pos) {
                instance.status.pos = pos;
            },
            refresh: function() {
                instance.ctx.fillStyle = "black";
                instance.ctx.font = "50px Consolas";
                if (instance.status.timer > 0) {
                    instance.ctx.drawImage()
                }
                if (instance.status.playData.myMove === false) {
                    instance.ctx.strokeRect(360, 110, 400, 100);
                    instance.ctx.fillText("单刀(-1)", 560, 180, 400, 100);

                    instance.ctx.strokeRect(360, 310, 400, 100);
                    instance.ctx.fillText("双刀(-2)", 560, 380, 400, 100);

                    instance.ctx.fillStyle = "blue";
                    instance.ctx.strokeRect(360, 510, 400, 100);
                    instance.ctx.fillText("格挡(-1)", 560, 580, 400, 100);

                    instance.ctx.fillStyle = "green";
                    instance.ctx.strokeRect(360, 710, 400, 100);
                    instance.ctx.fillText("蓄能(+1)", 560, 780, 400, 100);

                    instance.ctx.fillStyle = "black";
                    instance.ctx.strokeRect(1160, 110, 400, 100);
                    instance.ctx.fillText("单枪(-3)", 1360, 180, 400, 100);

                    instance.ctx.strokeRect(1160, 310, 400, 100);
                    instance.ctx.fillText("双枪(-4)", 1360, 380, 400, 100);

                    instance.ctx.fillStyle = "blue";
                    instance.ctx.strokeRect(1160, 510, 400, 100);
                    instance.ctx.fillText("防暴盾(-2)", 1360, 580, 400, 100);

                    instance.ctx.fillStyle = "red";
                    instance.ctx.strokeRect(1160, 710, 400, 100);
                    instance.ctx.fillText("龟派气功(-5)", 1360, 780, 400, 100);
                }
                if (instance.status.playData.myMove !== false && instance.status.playData.enemyMove !== false) {
                    instance.status.timer = 200;
                    switch (instance.status.playData.myMove) {
                        case -1:
                        case -2:
                        case -3:
                        case -4:
                        case -5:
                            instance.status.playData.leftImage = "La" + (- instance.status.playData.myMove);
                            break;
                        case 2:
                        case 4:
                            instance.status.playData.leftImage = "Ld" + (instance.status.playData.myMove / 2);
                            break;
                        case 0:
                            instance.status.playData.leftImage = "L0";
                            break;
                    }
                    switch (instance.status.playData.enemyMove) {
                        case -1:
                        case -2:
                        case -3:
                        case -4:
                        case -5:
                            instance.status.playData.rightImage = "Ra" + (- instance.status.playData.enemyMove);
                            break;
                        case 2:
                        case 4:
                            instance.status.playData.rightImage = "Rd" + (instance.status.playData.enemyMove / 2);
                            break;
                        case 0:
                            instance.status.playData.rightImage = "R0";
                            break;
                    }
                }
                instance.ctx.fillStyle = "red";
                instance.ctx.font = "100px Consolas";
            }
        }
        instance.status = {
            authChecked: false,
            scene: instance.LOADING,
            leftImage: false,
            rightImage: false,
            pos: {x: 0, y: 0},
            graphics: {
                left: 16,
                image: {}
            },
            playData: {},
            timer: 200
        }
        instance.init = function() {
            let imgList = ['L0', 'Ld1', 'Ld2', 'La1', 'La2', 'La3', 'La4', 'La5', 'R0', 'Rd1', 'Rd2', 'Ra1', 'Ra2', 'Ra3', 'Ra4', 'Ra5'];
            function imgLoad(img, callback) {
                var timer = setInterval(function() {
                    if (img && img.complete) {
                        clearInterval(timer);
                        callback(img);
                    }
                }, 50);
            }
            for (let i = 0; i < imgList.length; ++i) {
                let name = imgList[i];
                instance.status.graphics.image[name] = new Image();
                instance.status.graphics.image[name].src = "../img/" + name + ".png";
                imgLoad(instance.status.graphics.image[name], () => {
                    instance.status.graphics.left--;
                });
            }
            this.socket = socket;
            this.socketOn = function (name, data) {
                switch (name) {
                    case "token_time_out":
                        alert("token超时无效，请重新登录。");
                        break;
                    case "game_start":
                        instance.status.playData = {
                            authChecked: true,
                            myMP: 0,
                            enemyMP: 0,
                            myMove: false,
                            enemyMove: false,
                            round: 1,
                            animeTime: 200
                        }
                        instance.status.scene = instance.PLAYING;
                        break;
                    case "result":
                        instance.status.playData.enemyMove = data.enemyMove;
                        break;
                }
            }
            this.on = (name, data) => {
                this.onList.push({name: name, data: data});
                console.log('on:'+[name, data]);
            }
            this.emitList = [];
            this.onList = [];
            this.canvas = element;
            this.canvas.width = 1920;
            this.canvas.height = 1080;
            this.width = this.canvas.width;
            this.height = this.canvas.height;
            this.ctx = this.canvas.getContext('2d');
            this.ctx.textAlign = "center";
            this.ctx.lineWidth = 5;
            this.canvas.addEventListener('mousemove', (e) => {
                let box = this.canvas.getBoundingClientRect();
                let mouseX = (e.clientX - box.left) * 1920 / box.width;
                let mouseY = (e.clientY - box.top) * 1080 / box.height;
                this.status.scene.move({x: mouseX, y: mouseY});
            }, false);
            this.canvas.addEventListener('touchmove', (e) => {
                let box = this.canvas.getBoundingClientRect();
                let mouseX = (e.clientX - box.left) * 1920 / box.width;
                let mouseY = (e.clientY - box.top) * 1080 / box.height;
                this.status.scene.move({x: mouseX, y: mouseY});
            }, false);
            this.canvas.addEventListener('click', (e) => {
                let box = this.canvas.getBoundingClientRect();
                let mouseX = (e.clientX - box.left) * 1920 / box.width;
                let mouseY = (e.clientY - box.top) * 1080 / box.height;
                this.status.scene.click({x: mouseX, y: mouseY});
            }, false);
        }
        instance.start = function() {
            let w = window;
            let requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
            let main = () => {
                if (this.emitList[0]) {
                    console.log("emited: ["+this.emitList[0].name+"]: " + this.emitList[0].data);
                    this.socket.emit(this.emitList[0].name, this.emitList[0].data);
                    this.emitList.shift();
                }
                if (this.onList[0]) {
                    console.log("oned: ["+this.onList[0].name+"]: " + this.onList[0].data);
                    this.socketOn(this.onList[0].name, this.onList[0].data);
                    this.onList.shift();
                }
                this.clear();
                this.status.scene.refresh();
                requestAnimationFrame(main);
            };
            console.log(this);
            main();
        }
        return instance;
    })(window, element, socket);
}

export default Duel;