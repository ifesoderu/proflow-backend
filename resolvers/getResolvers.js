const db = require("../knex")

//Get all the projects created
const getAllProjects = (db, req, res) => {
    db.select('*').from('projects').then(data => {
        return res.status(200).json({ success: true, data })
    }).catch(err => {
        return res.status(400).json({ success: false, data: error })
    })
}

// Get project by ID
const getProjectById = (db, req, res) => {
    db.select('*').from('projects').where('project_id', parseInt(req.params.id, 10)).then(data => {
        console.log(data)
        return res.status(200).json({ success: true, data: data[0] })
    }).catch(err => {
        return res.status(400).json({ success: false, data: "Could not get project" })
    })
}

// Get project by team id
const getTeamProjects = (db, req, res) => {
    db.select('*').from('projects').where('team_id', parseInt(req.params.id, 10)).then(data => {
        return res.status(200).json({ success: true, data })
    }).catch(err => {
        return res.status(400).json({ success: false, data: "Could not get projects" })
    })
}

//Get all tasks in a section with section id and project id
const getTasksBySectionAndProjectId = (db, req, res) => {
    db.select('*')
        .from('tasks')
        .where({ section_id: parseInt(req.params.sid, 10), project_id: parseInt(req.params.pid, 10) })
        .then(data => {
            return res.status(200).json({ success: true, data })
        }).catch(err => {
            console.log(err)
            return res.status(400).json({ success: false, data: "Could not get tasks" })
        })
}

// Get tasks that have been assigned
const getPersonalTasks = (db, req, res) => {
    db.select('*')
        .from('task_assignee')
        .where('member_id', parseInt(req.params.id, 10))
        .then(data => {
            return res.status(200).json({ success: true, data })
        }).catch(err => {
            console.log(err)
            return res.status(400).json({ success: false, data: "Could not get tasks" })
        })
}

// Get task by ID
const getTaskById = (db, req, res) => {
    db.select('*').from('tasks').where('id', parseInt(req.params.id, 10)).then(data => {
        return res.status(200).json({ success: true, data: data[0] })
    }).catch(err => {
        return res.status(400).json({ success: false, data: "Could not get task" })
    })
}

const getProjectSections = (db, req, res) => {
    db.select('*')
        .from('sections')
        .where('project_id', parseInt(req.params.pid, 10))
        .then(data => {
            return res.status(200).json({ success: true, data })
        }).catch(err => {
            console.log(err)
            return res.status(400).json({ success: false, data: "Could not get sections" })
        })
}
const getSection = (db, req, res) => {
    db.select('*')
        .from('sections')
        .where('id', parseInt(req.params.id, 10))
        .then(data => {
            return res.status(200).json({ success: true, data: data[0] })
        }).catch(err => {
            console.log(err)
            return res.status(400).json({ success: false, data: "Could not get sections" })
        })
}

const getProjectComments = (db, req, res) => {
    db.select('*')
        .from('comments')
        .where('project_id', parseInt(req.params.pid, 10))
        .then(data => {
            return res.status(200).json({ success: true, data })
        }).catch(err => {
            console.log(err)
            return res.status(400).json({ success: false, data: "Could not get comments" })
        })
}

const getAllMembers = (db, req, res) => {
    db.select('*')
        .from('members')
        // .where('id', parseInt(req.params.id, 10))
        .then(data => {
            return res.status(200).json({ success: true, data })
        }).catch(err => {
            console.log(err)
            return res.status(400).json({ success: false, data: "Could not get members" })
        })
}

const getMember = (db, req, res) => {
    db.select('*')
        .from('members')
        .where('id', parseInt(req.params.id, 10))
        .then(data => {
            return res.status(200).json({ success: true, data: data[0] })
        }).catch(err => {
            console.log(err)
            return res.status(400).json({ success: false, data: "Could not get member" })
        })
}

const getAssignedMembers = (db, req, res) => {
    const { id } = req.params;
    db.select('member_email')
        .from('task_assignee')
        .where('task_id', parseInt(id, 10))
        .then(memberEmails => {
            return res.status(200).json({ success: true, memberEmails })
        }).catch(err => {
            console.log(err)
            return res.status(400).json({ success: false, data: "Could not get assigned members" })
        })
}

const getTeamMembers = (db, req, res) => {
    const { id } = req.params;
    db.select('member_email')
        .from('team_membership')
        .where('team_id', parseInt(id, 10))
        .then(memberEmails => {
            return res.status(200).json({ success: true, memberEmails })
        }).catch(err => {
            console.log(err)
            return res.status(400).json({ success: false, data: "Could not get team members" })
        })
}

const getAllTeams = (db, req, res) => {
    db.select('*')
        .from('teams')
        .then(data => {
            return res.status(200).json({ success: true, data })
        }).catch(err => {
            console.log(err)
            return res.status(400).json({ success: false, data: "Could not get teams" })
        })
}

const getTeam = (db, req, res) => {
    db.select('*')
        .from('teams')
        .where('id', parseInt(req.params.id, 10))
        .then(data => {
            return res.status(200).json({ success: true, data: data[0] })
        }).catch(err => {
            console.log(err)
            return res.status(400).json({ success: false, data: "Could not get team" })
        })
}


module.exports = {
    getProjectById, getTeamProjects, getAllProjects,
    getPersonalTasks, getTasksBySectionAndProjectId, getTaskById,
    getProjectSections, getSection,
    getProjectComments,
    getAllMembers, getMember, getAssignedMembers, getTeamMembers,
    getAllTeams, getTeam,
}