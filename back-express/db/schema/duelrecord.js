var mongoose = require('../db');
var Schema = mongoose.Schema;

var duelrecordSchema = new Schema({
	hostName: String,
	hostTitle: String,
	guestName: String,
	guestTitle: String,
	record: [{
		round: Number,
		hostMove: Number,
		guestMove: Number,
	}],
	date: {
        type: Date, default: Date.now
    },
});

module.exports = mongoose.model('duelrecord', duelrecordSchema);