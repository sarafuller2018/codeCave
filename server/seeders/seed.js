// set up sourced from in class activities 
const db = require('../config/connection');
const { User, Project, Comment } = require('../models');
const cleanDB = require('./cleanDB');

const userData = require('./userData.json');
const projectData = require('./projectData.json');
const commentData = require('./commentData.json');

db.once('open', async () => {
  try {
    await User.deleteMany({});
    await Project.deleteMany({});
    await Comment.deleteMany({});

    const users = await User.create(userData);

    const userMap = {};
    users.forEach(user => {
      userMap[user.userName] = user._id; // Map usernames to _id
    });

    const projects = projectData.map(project => ({
      ...project,
      user: userMap[project.user] // Assign the correct _id for each user
    }));

    const createdProjects = await Project.create(projects);

    // Map projects to users' projects array
    for (let project of createdProjects) {
      const userId = project.user;
      await User.findByIdAndUpdate(userId, { $push: { projects: project._id } });
    }

    await Comment.create(commentData);

    console.log('Seed data successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
});


// example of code for adding new project and keeping connection to user 
// Assuming the user ID is generated when the user is created
// const userId = generateUserId();

// When creating a new project, associate it with the user by using the user's ID
// const newProject = {
//   id: generateProjectId(), // Generate a random project ID
//   user: userId, // Use the user's ID as the reference
//   name: "New Project",
//   description: "Description of the new project",
//   Other project fields...
// };

// Add the new project to the user's list of projects
// const user = getUserById(userId);
// user.projects.push(newProject.id);

// Save the updated user and the new project to your data store
// saveUser(user);
// saveProject(newProject)