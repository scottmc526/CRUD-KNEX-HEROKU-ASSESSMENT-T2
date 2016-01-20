var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function Posts(){
  return knex('posts');
}

function Comments(){
  return knex('comments')
}

router.get('/:post_id/comments', function(req, res, next){
    Comments().where('post_id', req.params.post_id).first().then(function(results){
      res.json({'SUCCESS':results})
  })
});

router.post('/:post_id/comments', function(req, res, next){
  Comments().where('post_id', req.params.post_id).first().insert(req.body).then(function(result){
    res.redirect('/');
  })
})

router.get('/:post_id/comments/:id', function(req, res, next){
  Comments().where('id', req.params.id).then(function(result){
    res.json({'SUCCESS': result})
  })
})

router.get('/:post_id/comments/:id/edit', function(req, res, next){
  Comments().where('id', req.params.id).then(function(result){
    res.json({'SUCCESS': result})
  })
})

router.post('/:post_id/comments/:id', function(req, res, next){
  Comments().where('id', req.params.id).insert(req.body).then(function(result){
    res.redirect('/')
  })
})

router.post('/:post_id/comments/:id/delete', function(req, res, next){
  Comments.where('id', req.params.id).del().then(function(result){
    res.redirect('/')
  })
})






module.exports = router;
