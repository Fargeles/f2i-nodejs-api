const {
    create,
    update,
    remove,
    show,
    showList,
    addCollaborateur,
    updateCollaborateur,
    removeCollaborateur,
    updateGenre,
    addOneVue,
    addOneLike
} = require("../controllers/SongController");
const Song = require("../models/SongModel");

const router = require("express").Router();

router.get('/', showList)
router.get('/:id/show', show)
router.post('/create', create)
router.put('/:id/update', update)
router.post('/:id/delete', remove)

router.put('/:id/collaborateurs/add', addCollaborateur)
router.put('/:id/collaborateurs/:idCollaborateur/update', updateCollaborateur)
router.put('/:id/collaborateurs/:idCollaborateur/delete', removeCollaborateur)

router.put('/:id/genre/update', updateGenre)
router.put('/:id/vue/add', addOneVue)
router.put('/:id/like/add', addOneLike)

module.exports = router;