const flatted = require('flatted')
const User = require('../models/user')
const {userService, postService, genreService, bookService} = require('../services') 



const router = require('express').Router()

router.get('/', async(req, res)=> {
    const posts = await postService.load()
    res.send({posts})
    // res.render('posts', {posts}) 
})

//get genre with ID
router.get('/:postId', async(req, res)=> {
    const post = await postService.find(req.params.postId)
    if (!post) return res.status(404).send('Can not find post')
    res.send(post)
    
})

//delete post
router.delete('/delete-post/:postId', async(req, res) => {
    await postService.removeBy('_id', req.params.postId)
    res.send('OK')
})

router.patch('/:postId', async (req, res) => {
    const postId = req.params.postId;
    const { quote } = req.body;
  
    await postService.update(postId, { quote });
    res.send('Updated!');
  });


module.exports = router