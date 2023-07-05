const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const songSchema = new Schema({
    titre: String,
    album: String,
    auteur: String,
    collaborateurs : [ 
        { 
            libelle: String,
        } 
    ],
    genre: {
        libelle: String
    },
    dateParution: { type: Date, default: null },
    dateCreation: { type: Date, default: Date.now },
    vuesCount: { type: Number, default: 0 },
    likesCount: { type: Number, default: 0 },
  });

const Song = mongoose.model("Song", songSchema);
module.exports = Song;