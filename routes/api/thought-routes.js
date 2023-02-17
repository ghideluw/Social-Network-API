const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    addThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controller/thought-controller')
//create a route to retrieve all thoughts 
router
    .route('/')
    .get(getAllThoughts)
    
//create a route to retrieve a thought by its ID and create a new thought
router
    .route('/:userId')
    .post(addThought);

    //add route to get a thought by ID, update a thought by ID, and delete a thought by ID
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(addThought)
    .delete(removeThought)

router
//create a route to create a reaction to a particular thought
    .route('/:thoughtId/reactions')
    .post(addReaction)

    //create a route to delete a reaction by its ID

    router.route("/:thoughtId/reactions/:reactionId")
    .delete(removeReaction)
    
//export this file for use outside this file
module.exports = router;