const {
    create,
    update,
    remove,
    show,
    showList,
    addCollaborateur,
    updateCollaborateur
} = require("../controllers/SongController");
const Song = require("../models/SongModel");

const router = require("express").Router();

router.get('/', showList)
router.get('/:id/show', show)
router.post('/create', create)
router.put('/:id/update', update)
router.post('/:id/delete', remove)

router.post('/:id/collaborateurs/add', addCollaborateur)
router.put('/:id/collaborateurs/:idCollaborateur/update', updateCollaborateur)

module.exports = router;