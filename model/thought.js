const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
//create the reaction model
const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: 'Please enter your reaction here.',
            maxlength: 280
        },
        username: {
            type: String,
            required: 'Type in your name here',
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
)
//create the thoughts model

const ThoughtSchema = new Schema(
    {
        
        username: {
            type: String,
            required: true,
            trim: true
        },
        thoughtText: {
            type: String,
            required: 'Type in your thoughts here.',
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false
    }
)
// include a virtual for reactionCount

ThoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
  });

const Thought = model('Thought', ThoughtSchema)

//export this file for use outside this file

module.exports = Thought