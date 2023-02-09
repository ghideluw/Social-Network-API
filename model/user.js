const { Schema, model } = require('mongoose');


const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'Please enter your user name here.',
            trim: true,

        },
        email: {
            type: String,
            required: 'Enter in an email address here',
            unique: true,
            validate: {
                validator(validEmail) {
                  return /^([a-zA-Z0-9_\.-]+)@([\da-z\.-]+)\.([a-z]{2,6})(\.[a-z]{2,6})?$/.test(
                    validEmail
                  );
                },
                message: "Enter in an email address here",
              },
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// include a virtual for friendCount
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length
})



const User = model('User', UserSchema)

module.exports = User