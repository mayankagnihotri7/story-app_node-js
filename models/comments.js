let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let commentSchema = new Schema({
    author: String,
    content: String,
    storyId: {
        type: Schema.Types.ObjectId,
        ref: 'Story',
        required: true
    }
},{timestamps: true});

module.exports = mongoose.model('Comment', commentSchema);