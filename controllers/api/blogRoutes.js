//routes for posting, deleting, and updating blogs
const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

//create a new blog
router.post('/', withAuth, async (req, res) => {
    try {
      const newBlog = await Blog.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newBlog);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  //delete blog by id
  router.delete('/:id', async (req, res) => {
    try {
      const blogData = await Blog.destroy({
        where: {
          id: req.params.id,
          // user_id: req.session.user_id,
        },
      });
  
      if (!blogData) {
        res.status(404).json({ message: 'blog ID not found!' });
        return;
      }
      res.render('dashboard');
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.put('/:id', withAuth, async (req, res) => {
    try {
      const blogData = await Blog.update({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!blogData) {
        res.status(404).json({ message: 'blog ID not found!' });
        return;
      }
  
      res.status(200).json(blogData);
    } catch (err) {
      res.status(500).json(err);
    }
  });



  module.exports = router;