let secret = require('./secret');
let express = require('express');
let router = express.Router();
let jwt = require('jwt-simple');
let dbWorker = require('../db/dbWorker');
let Cache = {};
Cache.userMap = new Map();
router.post('/*', function(req, res, next) { //test
    //res.json({msg:Math.random() * 10});
    next();
});

router.post('/login', function(req, res, next) {
    dbWorker.findUser(req.body,
        (doc) => {
            switch (doc.code) {
                case 0:
                    console.log(doc.data, req.body);
                    if (doc.data.username === req.body.username && doc.data.password === req.body.password) { //登录成功，签发token
                        let preload = {
                          username: req.body.username,
                          exp: new Date().getTime() + 10*1000,
                        }
                        let token = jwt.encode(preload, secret.jwt_secret);
                        res.json({code: 0, data: token, msg: "login_succeed."});
                    }
                    else {
                        res.json({code: 1, msg: "username_or_password_wrong"});
                    }
                    break;
                case 1:
                    res.json({code: 1, msg: "unexcepted_error_" + doc.err.message});
                    break;
            }
        });
    // if (req.body.username == "un" && req.body.password == "pw") {
    // }
    // else {
    // }
});

router.post('/register', function(req, res, next) {
    dbWorker.addUser(req.body,
        (doc) => {
            console.log(doc);
            switch (doc.code) {
                case 0:
                    let preload = {
                      username: req.body.username,
                      exp: new Date().getTime() + 10*1000,
                    }
                    let token = jwt.encode(preload, secret.jwt_secret);
                    res.json({code: 0, data: token, msg: "Register succeed."});
                    break;
                case 1:
                    res.json({code: 1, msg: doc.err});
                    break;
            }
        });
});

router.post('/app/duel/*', function(req, res, next) {
    next();
})

// router.post('/app/duel/startwait', function(req, res, next) {
//     if (Cache.userMap.get(req))
// })
module.exports = router;
