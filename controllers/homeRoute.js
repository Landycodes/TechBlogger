const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Blog, User } = require('../models');
const { text } = require('express');


//get homepage
router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
          include: [
            {
              model: User,
              attributes: ['username'],
            },
          ],
        });
    
        // Serialize data so the template can read it
        const blogs = blogData.map((blog) => blog.get({ plain: true }));
    
        // Pass serialized data and session flag into template
        res.render('homepage', { 
          blogs, 
          logged_in: req.session.logged_in 
        });
      } catch (err) {
        res.status(500).json(err);
      }
    });

//get signin page
router.get('/signin', async (req,res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
      }
    res.render('signin')
});

//show signupform when the 'im new here' button is clicked
router.get('/signup', async (req,res) => {
  if (req.session.logged_in) {
      res.redirect('/dashboard');
      return;
    }
  res.render('signup')
});


//get dashboard
router.get('/dashboard', withAuth, async (req,res) => {
  try {
    const blogData = await Blog.findAll({
      where: {user_id: req.session.user_id},
      include: [
        {
          model: User,
          attributes: ['username'],
        }
      ]
    })

    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    
    // Pass serialized data and session flag into template
    res.render('dashboard', { 
      blogs, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//get createpost page
router.get('/createpost', withAuth, async (req, res) => {
  res.render('createpost', {
    logged_in: req.session.logged_in, 
  })
});

router.get('/updatepost/:id', withAuth, async (req, res) => {
  const blogData = await Blog.findByPk(req.params.id);
  const blog = blogData.get({plain: true});
  res.render('updatepost', {
    blog,
    logged_in: req.session.logged_in, 
  })
});


router.get('/blog/:id', async (req, res) => {
  try {
    const blogId = await Blog.findByPk(req.params.id, {
      include: [{model: User}]
    })
res.status(200).json(blogId)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;