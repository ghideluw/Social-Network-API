const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    addThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controller/thought-controller')

router
    .route('/')
    .get(getAllThoughts)
    

router
    .route('/:userId')
    .post(addThought);
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(addThought)
    .delete(removeThought)

router

    .route('/:thoughtId/reactions')
    .post(addReaction)

    router.route("/:thoughtId/reactions/:reactionId")
    .delete(removeReaction)

module.exports = router;