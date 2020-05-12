let express = require('express');
let router = express.Router();
let Story = require('../models/story');
let Comment = require('../models/comments');

// Get creation form.
router.get('/new', (req,res) => {
    res.render('newStory');
})

// Submit the creation form.
router.post('/new', (req,res,next) => {
    req.body.userId = req.session.userId;
    req.body.author = res.locals.user.username;
    Story.create(req.body, (err, story) => {
        if (err) return next (err);
        res.render('readStory', {story});
    })
})

// Get list.
router.get('/storyList', (req,res) => {
    var { username } = req.session;
    console.log(req.session, 'Session started!');
    Story.find({}, (err,story) => {
        if (err) return next(err);
        res.render('storyList', {story});
    })
})

// Editing Story.
router.get('/:id/edit', (req,res, next) => {
    Story.findById(req.params.id, (err,story) => {
        if (err) return next (err);
        res.render('storyEdit', { story });
    })
})

// Submitting the update form to update story.
router.post('/:id/edit', (req,res,next) => {
    Story.findByIdAndUpdate(req.params.id, req.body, (err,data) => {
        console.log(data, 'Receiving data.')
        if (err) return next (err);
        res.redirect(`/stories/${data.id}`);
    })
})

// Story Details and Add comments.
router.get('/:id', (req,res,next) => {
    Story.findById(req.params.id)
    .populate('comments', 'author content')
    .exec((err, story) => {
        if (err) return next(err);
        res.render('readStory', {story});
    })
})

// Creating comments.
router.post('/:id', (req,res,next) => {
    let id = req.params.id;
    req.body.storyId = id
    Comment.create(req.body, (err,comment) => {
        if (err) next (err);
        Story.findByIdAndUpdate(id, {$push: {comments: comment.id}}, (err, data) => {
            if (err) return next (err);
            res.redirect(`/stories/${id}`);
        })
    })
})

// Deleting Story.
router.get('/:id/delete', (req,res,next) => {
    Story.findByIdAndDelete(req.params.id, (err,story) => {
        if (err) return next (err);
        Comment.deleteMany({storyId: req.params.id}, (err) => {
            if (err) return next (err);
        })
        res.redirect('/stories/storyList');
    })
})

module.exports = router;