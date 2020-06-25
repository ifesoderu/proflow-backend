const db = require("../knex")

//Get all the projects created
const getAllProjects = (db, req, res) => {
    db.select('*').from('projects').then(data => {
        return res.status(200).json({ success: true, data })
    }).catch(err => {
        return res.status(400).json({ success: false, data: err })
    })
}

// Get project by ID
const getProjectById = (db, req, res) => {
    db.select('*').from('projects').where('project_id', parseInt(req.params.id, 10)).then(data => {
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

const getMemberProjects = (db, req, res) => {
    db.transaction(trx => {
        trx.select('team_id')
            .from('team_membership')
            .where('member_email', req.params.email)
            .then(
                teamIDObjectsArray => {
                    let teamIDs = teamIDObjectsArray.map(({ team_id }) => team_id)
                    return trx.select('*')
                        .from('projects')
                        .where({ privacy: 'public' })
                        .orWhere({ privacy: null })
                        .orWhereIn('team_id', [...teamIDs])
                        .then(data => {
                            return res.status(200).json({ success: true, data: data })
                        }).then(trx.commit)
                        .catch(trx.rollback)
                }).catch(err => {
                    return res.status(400).json({ success: false, data: "You are not in the team that created this project" })
                })
    })
}

//Get all tasks in a section with section id and project id
const getTasksBySectionsAndProjectId = (db, req, res) => {
    db.transaction(
        trx => {
            trx.select('id')
                .from('sections')
                .where('project_id', parseInt(req.params.pid, 10))
                .then(data => {
                    const section_ids = data.map(({ id }) => parseInt(id, 10));
                    trx.select('*')
                        .from('tasks')
                        .whereIn('section_id', [...section_ids])
                        .andWhere({ project_id: parseInt(req.params.pid, 10) })
                        .then(data => {
                            return res.status(200).json({ success: true, data })
                        }).then(trx.commit)
                        .catch(trx.rollback)
                }).catch(err => {
                    return res.status(400).json({ success: false, data: "Could not get tasks" })
                })
        })
}

// Get tasks that have been assigned
const getPersonalTasks = (db, req, res) => {
    db.select('task_id')
        .from('task_assignee')
        .where('member_email', req.params.email)
        .then(data => {
            return res.status(200).json({ success: true, data })
        }).catch(err => {
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

const getTasksByIds = (db, req, res) => {
    db.transaction(trx => {
        trx.select('task_id')
            .from('task_assignee')
            .where('member_email', req.params.email)
            .then((data) => {
                const task_ids = data.map(({ task_id }) => parseInt(task_id, 10));
                return trx('tasks')
                    .select('*')
                    .whereIn('id', [...task_ids])
                    .then(data => {
                        return res.status(200).json({ success: true, data: data })
                    }).then(trx.commit)
                    .catch(trx.rollback)
            }).catch(err => {
                return res.status(400).json({ success: false, data: "Could not get tasks" })
            })
    })
}

const getFavouritedProjects = (db, req, res) => {
    // get project IDs from favourited_projects table using the email of the user
    // get projects from project using the rerutned IDs
    db.transaction(trx => {
        trx.select('project_id')
            .from('favourited_projects')
            .where('member_email', req.params.email)
            .then(
                projectIDObjects => {
                    const projectIDs = projectIDObjects.map(({ project_id }) => parseInt(project_id, 10));
                    return trx.select('*')
                        .from('projects')
                        .whereIn('project_id', [...projectIDs])
                        .then(projects => {
                            return res.status(200).json({ success: true, data: projects })
                        }).then(trx.commit)
                        .catch(trx.rollback)
                }).catch(err => {
                    return res.status(400).json({ success: false, data: "Could not get favourite projects" })
                })
    })
}

const getProjectSections = (db, req, res) => {
    db.select('*')
        .from('sections')
        .where('project_id', parseInt(req.params.pid, 10))
        .then(data => {
            const addTasks = data.map(datum => ({ ...datum, tasks: [] }))
            return res.status(200).json({ success: true, data: addTasks })
        }).catch(err => {
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
            return res.status(400).json({ success: false, data: "Could not get assigned members" })
        })
}

const getTeamMembers = (db, req, res) => {
    const { id } = req.params;
    db.select('member_email')
        .from('team_membership')
        .where('team_id', parseInt(id, 10))
        .then(memberEmails => {
            return res.status(200).json({ success: true, data: memberEmails })
        }).catch(err => {
            return res.status(400).json({ success: false, data: "Could not get team members" })
        })
}

const getJoinedTeams = (db, req, res) => {
    const { email } = req.params;
    db.transaction(
        trx => {
            trx.select('team_id')
                .from('team_membership')
                .where('member_email', email)
                .then(teamIDObjectsArray => {
                    let teamIDs = teamIDObjectsArray.map(({ team_id }) => team_id)
                    return trx.select('*')
                        .from('projects')
                        .whereIn('team_id', [...teamIDs])
                        .then(data => {
                            return res.status(200).json({ success: true, data: { teamIDs, teamProjects: data } })
                        }).then(trx.commit)
                        .catch(trx.rollback)
                }).catch(err => {
                    return res.status(400).json({ success: false, data: "Could not get joined teams" })
                })
        }
    )
}

const getAllTeams = (db, req, res) => {
    db.select('*')
        .from('teams')
        .then(data => {
            return res.status(200).json({ success: true, data })
        }).catch(err => {
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
            return res.status(400).json({ success: false, data: "Could not get team" })
        })
}


module.exports = {
    getProjectById, getTeamProjects, getAllProjects,
    getPersonalTasks, getTasksBySectionsAndProjectId, getTaskById, getTasksByIds, getFavouritedProjects, getMemberProjects,
    getProjectSections, getSection,
    getProjectComments,
    getAllMembers, getMember, getAssignedMembers, getTeamMembers,
    getAllTeams, getTeam, getJoinedTeams
}