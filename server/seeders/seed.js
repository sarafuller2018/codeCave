// set up sourced from in class activities 
const db = require('../config/connection');
const { User, Project, Comment } = require('../models');
const cleanDB = require('./cleanDB');

const userData = require('./userData.json');
const projectData = require('./projectData.json');
const commentData = require('./commentData.json');

db.once('open', async () => {
  // clean database
  await cleanDB("User", "users");
  await cleanDB("Project", "projects");
  await cleanDB("Comment", "comments");

  await User.create(userData);
  await Project.create(projectData);
  await Comment.create(commentData);

  console.log('seed finished!');
  process.exit(0);
});