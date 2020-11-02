//Import the express module into the project
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
var bcrypt = require('bcryptjs');

// Middleware
// const auth = require('./middleware/authentication')

const db = require('./knex');


const app = express();


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors(
    {
        origin: ['https://proflowapp.herokuapp.com', 'https://emekly.herokuapp.com']
    }
));


//Resolvers
const {
    // Project GET Resolvers
    getAllProjects, getProjectById, getTeamProjects, getMemberProjects,

    //Task GET Resolvers
    getPersonalTasks, getTasksBySectionsAndProjectId, getTaskById, getTasksByIds, getFavouritedProjects,


    //Section GET Resolvers
    getSection, getProjectSections,

    //Comment GET Resolvers
    getProjectComments,

    // Member GET Resolvers
    getAllMembers, getMember, getAssignedMembers, getTeamMembers,

    // Team GET Resolvers
    getAllTeams, getTeam, getJoinedTeams,
} = require('./resolvers/getResolvers')

const {
    //Team
    createTeam,
    // Project 
    createProject, favouriteProject,
    //Member
    loginMember, assignMemberToTask, addMemberToTeam,
    //Section
    createSection,
    // Task
    createTask,
    // Comment
    createComment
} = require('./resolvers/postResolvers')

const {
    // Tasks
    updateTask,
    // Section
    updateSection,
    // Project
    updateProject,
    // Team
    updateTeam
} = require('./resolvers/updateResolvers')

const {
    deleteAssignedMember,
    deleteTeamMember,
    deleteSection,
    deleteTask,
    unFavouriteProject, deleteProject,
    deleteTeam
} = require('./resolvers/deleteResolver')

const { requireAuth } = require('./middleware/authentication')

//ROUTES
app.get('/', (req, res) => {
    res.json({ success: "True" })
})

//-----GET ROUTES ------//  

//Get all projects
app.get('/projects', requireAuth, requireAuth, (req, res) => { getAllProjects(db, req, res) })

//Get project by project id
app.get('/project/:id', requireAuth, (req, res) => { getProjectById(db, req, res) })

//Get project by team id
app.get('/teamprojects/:id', requireAuth, (req, res) => { getTeamProjects(db, req, res) })

//Get project by team id
app.get('/memberprojects/:email', requireAuth, (req, res) => { getMemberProjects(db, req, res) })

//Get tasks by section id and project id
app.get('/tasks/:pid', requireAuth, (req, res) => { getTasksBySectionsAndProjectId(db, req, res) })

//Get task by id
app.get('/task/:id', requireAuth, (req, res) => { getTaskById(db, req, res) })


//Get tasks by ids
app.get('/tasksbyids/:email', requireAuth, (req, res) => { getTasksByIds(db, req, res) })

//Get tasks by member id
app.get('/personaltasks/:email', requireAuth, (req, res) => { getPersonalTasks(db, req, res) })

//Get sections of a project
app.get('/sections/:pid', requireAuth, (req, res) => { getProjectSections(db, req, res) })

//Get a section
app.get('/section/:id', requireAuth, (req, res) => { getSection(db, req, res) })

//Get comments of a project
app.get('/comments/:pid', requireAuth, (req, res) => { getProjectComments(db, req, res) })

// Get all members
app.get('/members', requireAuth, (req, res) => { getAllMembers(db, req, res) })

// Get all members assigned to a task
app.get('/assignedmembers/:id', requireAuth, (req, res) => { getAssignedMembers(db, req, res) })

// Get all members added to a team with team id
app.get('/teammembers/:id', requireAuth, (req, res) => { getTeamMembers(db, req, res) })

// Get one member
app.get('/member/:id', requireAuth, (req, res) => { getMember(db, req, res) })

// Get all teams
app.get('/teams', requireAuth, (req, res) => { getAllTeams(db, req, res) })

// Get all teams
app.get('/team/:id', requireAuth, (req, res) => { getTeam(db, req, res) })

// Get all teams
app.get('/joinedteams/:email', requireAuth, (req, res) => { getJoinedTeams(db, req, res) })

// Get all favourited projects using member email
app.get('/favouritedprojects/:email', requireAuth, (req, res) => { getFavouritedProjects(db, req, res) })



//-----POST ROUTES ------//  

//Member Login
app.post('/login', (req, res) => { loginMember(db, bcrypt, req, res) })

//Create Team
app.post('/team', (req, res) => { createTeam(db, req, res) })

// Create Project
app.post('/project', (req, res) => { createProject(db, req, res) })

// Add Section
app.post('/section', (req, res) => { createSection(db, req, res) })

// Add Task
app.post('/task', (req, res) => { createTask(db, req, res) })

// Add Task
app.post('/comment', (req, res) => { createComment(db, req, res) })

// Assign Member to task
app.post('/assignmember', (req, res) => { assignMemberToTask(db, req, res) })

// Assign Member to team
app.post('/teammember', (req, res) => { addMemberToTeam(db, req, res) })

// Add project to favourite
app.post('/favouriteproject', (req, res) => { favouriteProject(db, req, res) })



//-----UPDATE ROUTES ------//  

// Update a task
app.put('/task', (req, res) => { updateTask(db, req, res) })

// Update a section
app.put('/section', (req, res) => { updateSection(db, req, res) })

// Update a project
app.put('/project', (req, res) => { updateProject(db, req, res) })

// Update a team
app.put('/team', (req, res) => { updateTeam(db, req, res) })


//-----DELETE ROUTES ------//  

// Delete an assigned member
app.delete('/assignedmember', (req, res) => { deleteAssignedMember(db, req, res) })

// Delete a team member
app.delete('/teammember', (req, res) => { deleteTeamMember(db, req, res) })

// Delete a task
app.delete('/task', (req, res) => { deleteTask(db, req, res) })

// Delete a section
app.delete('/section', (req, res) => { deleteSection(db, req, res) })

// Delete a project
app.delete('/project', (req, res) => { deleteProject(db, req, res) })

// Remove project from favourite
app.delete('/unfavouriteproject', (req, res) => { unFavouriteProject(db, req, res) })

// Delete a team
app.delete('/team', (req, res) => { deleteTeam(db, req, res) })




//Server running on port 3001
app.listen(process.env.PORT || 3001, () => {
    console.log('Server running')
})