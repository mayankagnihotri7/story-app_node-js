let express = require('express');
let router = express.Router();
let Comment = require('../models/comments');
let Story = require('../models/story');

// Get form for editing comments.

router.get('/:id/edit', (req,res,next) => {
    Comment.findById(req.params.id, (err, comment) => {
        if (err) return next (err);
        res.render('commentEdit', {comment});
    })
});

// Submit form to update comments.
router.post('/:id/edit', (req,res,next) => {
    Comment.findByIdAndUpdate(req.params.id, req.body, (err, comment) => {
        if (err) return next (err);
        res.redirect(`/stories/${comment.storyId}`);
    })
})

// Deleting comments
router.get("/:id/delete", (req, res, next) => {
  Comment.findByIdAndDelete(req.params.id, (err, comment) => {
    if (err) return next(err);
    Story.findByIdAndUpdate(
      comment.storyId,
      { $pull: { comments: req.params.id } },
      (err, data) => {
          if (err) return next (err);
          res.redirect('/stories/' + comment.storyId);
      }
    );
  });
});

module.exports = router;