const router = require('express').Router();


const{
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controller/user-controller')

// create route to Retrieve all Users and Create a User 

router
    .route('/')
    .get(getAllUsers)
    .post(createUser)

//create route to retrieve user by ID, delete user by ID, and update user by ID
router
    .route('/:id')
    .get(getUserById)
    .delete(deleteUser)
    .put(updateUser)
//create route to add a friend and delete a friend from a user
router
    .route("/:id/friends/:friendId")
    .post(addFriend)
    .delete(removeFriend);

//export this file for use outside this file
    module.exports = router;