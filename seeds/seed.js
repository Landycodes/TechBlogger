const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const userData = require('./user.json');
const blogData = require('./blogs.json');
const CommentData = require('./comment.json')

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
  
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
  
    for (const Blogs of blogData) {
      await Blog.create({
        ...Blogs,
        user_id: users[Math.floor(Math.random() * users.length)].id,
      });
    }
    for (const Comments of CommentData) {
      await Comment.create({
        ...Comments,
        user_id: users[Math.floor(Math.random() * users.length)].id,
        post_id: users[Math.floor(Math.random() * Blog.length)].id,
      });
    }
  
    process.exit(0);
  };
  
  seedDatabase();
  