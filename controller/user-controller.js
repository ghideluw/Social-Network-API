const { User, Thought } = require('../model')

const userController = {
  //use getAllUser method to retrieve all users
    getAllUsers(req, res) {
        User.find({})
            
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            })
    },
    //use getUserById method to retrieve a user by ID
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
          .populate({
            path: "thoughts",
            select: "-__v",
          })
          .select("-__v")
          .then((dbUserData) => {
            if (!dbUserData) {
              res.status(404).json({ message: "There is no user with this id" });
              return;
            }
            res.json(dbUserData);
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json(err);
          });
      },

      //use createUser method to create a new user
    createUser({ body }, res) {
        
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err)
                res.status(400).json(err)
            })
    },
    //use updateUser method to retrieve user by ID and update the user
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, {
          new: true,
          runValidators: true,
        })
          .then((dbUserData) => {
            if (!dbUserData) {
              res.status(404).json({ message: "There is no user with this id" });
              return;
            }
            res.json(dbUserData);
          })
          .catch((err) => res.status(400).json(err));
      },

      //use deleteUser method to destroy a user history by ID
      deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
          .then((dbUserData) => {
            if (!dbUserData) {
              res.status(404).json({ message: "There is no user with this id" });
              return;
            }
            User.updateMany(
              { _id: { $in: dbUserData.friends } },
              { $pull: { friends: params.id } }
            )
              .then(() => {
                Thought.deleteMany({ username: dbUserData.username })
                  .then(() => {
                    res.json({ message: "This User has been deleted" });
                  })
                  .catch((err) => res.status(400).json(err));
              })
              .catch((err) => res.status(400).json(err));
          })
          .catch((err) => res.status(400).json(err));
      },
      //add a friend with the findByIdandUpdate method
    addFriend({ params }, res) {
        User.findByIdAndUpdate(
          { _id: params.id },
          { $addToSet: { friends: params.friendId } },
          { new: true }
        )
          .select("-__v")
          .then((dbUserData) => {
            if (!dbUserData) {
              res.status(404).json({ message: "There is no user with this id" });
              return;
            }
            res.json(dbUserData);
          })
          .catch((err) => {
            res.status(400).json(err);
          });
      },
      //remove friend with the findByIdAndUpdate method
      removeFriend({ params }, res) {
        User.findByIdAndUpdate(
          { _id: params.id },
          { $pull: { friends: params.friendId } },
          { new: true, runValidators: true }
        )
          .select("-__v")
          .then((dbUserData) => {
            if (!dbUserData) {
              res.status(404).json({ message: "There is no friend matching this id" });
              return;
            }
            res.json(dbUserData);
          })
          .catch((err) => res.status(400).json(err));
      },
}
//export this file for use outside this file

module.exports = userController