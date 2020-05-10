let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let storySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    author: String,
    description: {
        type: String,
        required: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
},{timestamps: true});

module.exports = mongoose.model('Story', storySchema);