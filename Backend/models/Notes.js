const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
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
        default: Date.now
    }
});

const NotesModel = mongoose.model('note',NotesSchema);
module.exports = NotesModel;