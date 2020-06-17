//Import the express module into the project
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
var bcrypt = require('bcryptjs');

// Middleware
// const auth = require('./middleware/authentication')

const db = require('./knex');

//Call the express module
const app = express();


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors(
    {
        origin: 'http://localhost:3000'
    }
));


//Resolvers
const {
    // Project GET Resolvers
    getAllProjects, getProjectById, getTeamProjects,

    //Task GET Resolvers
    getPersonalTasks, getTasksBySectionAndProjectId, getTaskById, getTasksByIds,

    //Section GET Resolvers
    getSection, getProjectSections,

    //Comment GET Resolvers
    getProjectComments,

    // Member GET Resolvers
    getAllMembers, getMember, getAssignedMembers, getTeamMembers,

    // Team GET Resolvers
    getAllTeams, getTeam
} = require('./resolvers/getResolvers')

const {
    //Team
    createTeam,
    // Project 
    createProject,
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
    deleteProject,
    deleteTeam
} = require('./resolvers/deleteResolver')

const { requireAuth } = require('./middleware/authentication')

//ROUTES
app.get('/', (req, res) => {
    res.json({ success: "True" })
})

//-----GET ROUTES ------//  

//Get all projects
app.get('/projects', (req, res) => { getAllProjects(db, req, res) })

//Get project by project id
app.get('/project/:id', (req, res) => { getProjectById(db, req, res) })

//Get project by team id
app.get('/teamprojects/:id', (req, res) => { getTeamProjects(db, req, res) })

//Get tasks by section id and project id
app.get('/tasks/:pid/:sid', (req, res) => { getTasksBySectionAndProjectId(db, req, res) })

//Get task by id
app.get('/task/:id', (req, res) => { getTaskById(db, req, res) })


//Get tasks by ids
app.get('/tasksbyids/:email', (req, res) => { getTasksByIds(db, req, res) })

//Get tasks by member id
app.get('/personaltasks/:email', (req, res) => { getPersonalTasks(db, req, res) })

//Get sections of a project
app.get('/sections/:pid', (req, res) => { getProjectSections(db, req, res) })

//Get a section
app.get('/section/:id', (req, res) => { getSection(db, req, res) })

//Get comments of a project
app.get('/comments/:pid', (req, res) => { getProjectComments(db, req, res) })

// Get all members
app.get('/members', (req, res) => { getAllMembers(db, req, res) })

// Get all members assigned to a task
app.get('/assignedmembers/:id', (req, res) => { getAssignedMembers(db, req, res) })

// Get all members added to a team with team id
app.get('/teammembers/:id', (req, res) => { getTeamMembers(db, req, res) })

// Get one member
app.get('/member/:id', (req, res) => { getMember(db, req, res) })

// Get all teams
app.get('/teams', (req, res) => { getAllTeams(db, req, res) })

// Get all teams
app.get('/team/:id', (req, res) => { getTeam(db, req, res) })



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

// Delete a team
app.delete('/team', (req, res) => { deleteTeam(db, req, res) })




//Server running on port 3001
app.listen(process.env.PORT || 3001, () => {
    console.log('Server running')
})