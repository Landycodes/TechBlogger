const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Blog, User } = require('../models');


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

  // try {
  //   const userData = await User.findByPk(req.session.user_id, {
  //     attributes: { exclude: ['password'] },
  //     include: [{model: Blog}]
  //   });

  //   const user = userData.get({ plain: true });
  //   res.render('dashboard', {
  //     ...user,
  //     logged_in: true
  //   });

  // } catch (err) {
  //   res.status(500).json(err);
  // }
});

//get createpost page
router.get('/createpost', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{model: Blog}]
    });

    const user = userData.get({ plain: true });
    res.render('createpost', {
      ...user,
      logged_in: true
    });

  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;