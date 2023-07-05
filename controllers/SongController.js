const Song = require("../models/SongModel");

const create = async (req, res) => {
    const { titre, album, auteur, dateParution, genre } = req.body;
  try {
    const song = await Song({ titre, album, auteur, dateParution, genre });
    song.save().then((saveSong) => {
      res.status(201).json(saveSong);
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Erreur lors de la sauvegarde de la musique` });
  }
}
const update = async (req, res) => {
  const id = req.params.id;
  const { titre, album, auteur, dateParution, genre } = req.body;
  try {
    const song = await Song.findOne({
      _id: id
    })
    .then((song) => {
      if (!song) {
        return res.status(404).json({ error: "Musique introuvable" });
      }
      song.titre = titre;
      song.album = album;
      song.auteur = auteur;
      song.dateParution = dateParution;
      song.genre = genre;

      song.save().then((saveSong) => {
        res.status(201).json(saveSong);
      });
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Erreur lors de la sauvegarde de l'article` });
  }
}
const remove = async (req, res) => {
  const id = req.params.id;
  try {
    const song = await Song.findOneAndDelete({
      _id: id
    })
    .then((song) => {
      if (!song) {
        return res.status(404).json({ error: "Musique introuvable" });
      }
        return res.status(200).json(song);
    })
  } catch (error) {
    res.json({ message: "Musique non trouvé" });
  }
}
const show = async (req, res) => {
  const id = req.params.id;
  try {
    const song = await Song.findOne({
      _id: id
    })
    .then((song) => {
      if (!song) {
        return res.status(404).json({ error: "Musique introuvable" });
      }
      res.status(200).json(song);
    });
  } catch (error) {
    res.json({ message: "Musique non trouvé" });
  }
}
const showList = async (req, res) => {
  try {
    const songs = await Song.find({});
    res.status(200).json(songs);
  } catch (error) {
    res.json({ message: "Musiques non trouvées" });
  }
}
const addCollaborateur = async (req, res) => {
  try {
    const id = req.params.id;
    const libelle = req.body;
    await Song.findById(id)
      .then((song) => {
        if (!song) {
          return res.status(404).json({ error: "Musique introuvable" });
        }
        const collaborateur = libelle;
        song.collaborateurs.push(collaborateur);
        return song.save();
      })
      .then((updateSong) => {
        res.json(updateSong);
      });
  } catch (error) {
    res.status(500).json({ error: `Erreur lors de l'ajout d'un nouveau collaborateur` });
  }
}
const updateCollaborateur = async (req, res) => {
  try {
    const id = req.params.id;
    const idCollaborateur = req.params.idCollaborateur;
    const libelle = req.body;
    await Song.findById(id)
      .then((song) => {
        if (!song) {
          return res.status(404).json({ error: "Musique introuvable" });
        }
        const collaborateur = { libelle };
        song.collaborateurs.find({_id: idCollaborateur}) = collaborateur;
        return song.save();
      })
      .then((updateSong) => {
        res.json(updateSong);
      });
  } catch (error) {
    res.status(500).json({ error: `Erreur lors de la modification d'un collaborateur` });
  }
}
const removeCollaborateur = async (req, res) => {
  try {
    const id = req.params.id;
    const idCollaborateur = req.params.idCollaborateur;
    await Song.findById(id)
      .then((song) => {
        if (!song) {
          return res.status(404).json({ error: "Musique introuvable" });
        }
        const index = song.collaborateurs.findIndex({_id: idCollaborateur});
        song.collaborateurs.splice(index, 1);
        return song.save();
      })
      .then((updateSong) => {
        res.json(updateSong);
      });
  } catch (error) {
    res.status(500).json({ error: `Erreur lors de la suppression d'un collaborateur` });
  }
}
const updateGenre = async (req, res) => {
  try {
    const id = req.params.id;
    const genre = req.body;
    await Song.findById(id)
      .then((song) => {
        if (!song) {
          return res.status(404).json({ error: "Musique introuvable" });
        }
        song.genre = genre;
        return song.save();
      })
      .then((updateSong) => {
        res.json(updateSong);
      });
  } catch (error) {
    res.status(500).json({ error: `Erreur lors de la modification du genre` });
  }
}
const addOneVue = async (req, res) => {
  try {
    const id = req.params.id;
    await Song.findById(id)
      .then((song) => {
        if (!song) {
          return res.status(404).json({ error: "Musique introuvable" });
        }
        song.vuesCount++;
        return song.save();
      })
      .then((updateSong) => res.json(updateSong));
  } catch (error) {
    res
      .status(500)
      .json({ error: `Erreur lors de l'ajout d'une vue à la musique` });
  }
}
const addOneLike = async (req, res) => {
  try {
    const id = req.params.id;
    await Song.findById(id)
      .then((song) => {
        if (!song) {
          return res.status(404).json({ error: "Musique introuvable" });
        }
        song.likesCount++;
        return song.save();
      })
      .then((updateSong) => res.json(updateSong));
  } catch (error) {
    res
      .status(500)
      .json({ error: `Erreur lors de l'ajout d'une vue à la musique` });
  }
}

module.exports = { create, update, remove, show, showList, addCollaborateur, updateCollaborateur, removeCollaborateur, updateGenre, addOneVue, addOneLike };