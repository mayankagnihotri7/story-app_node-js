let express = require('express');
let app = express();
let router = express.Router();
let Story = require('../models/story');

// Create a story.
// Get creation form.
router.get('/new', (req,res) => {
    res.render('newStory');
})

// Submit the creation form.
router.post('/new', (req,res,next) => {
    Story.create(req.body, (err, story) => {
        if (err) return next (err);
        res.redirect('/users/readStory');
    })
})

// Get list.
router.get('/storyList', (req,res) => {
    Story.find({}, (err,story) => {
        if (err) return next(err);
        res.render('storyList', {story});
    })
})

// Story Details.
router.get('/:id', (req,res,next) => {
    Story.findById(req.params.id, (err, story) => {
        if (err) next (err);
        res.render('readStory', {story});
    })
})

// Adding Comments.
// router.get('/:id')

module.exports = router;