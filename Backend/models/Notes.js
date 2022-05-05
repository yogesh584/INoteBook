const mongoose = require("mongoose");

const NotesSchema = new Schema({
    title: {
        type: String,
        required : true
    },
    desc: {
        type: String,
        required : true
    },
    tag: {
        type: String,
        default : "General"
    },
    date: {
        type: Date,
        default: Data.now
    }
});

const NotesModel = mongoose.model('note',NotesSchema);
module.exports = NotesModel;