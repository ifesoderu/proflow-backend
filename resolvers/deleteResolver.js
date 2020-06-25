// Delete assigned member
// Delete team member
// Delete Section

const deleteAssignedMember = (db, req, res) => {
    const { member_email, task_id } = req.body;
    db('task_assignee')
        .where({ member_email, task_id })
        .del()
        .then(data => {
            return res.status(200).json({ success: true, message: 'Resource successfully removed' })
        }).catch(e => {
            return res.status(400).json({ success: false, message: "Couldn't remove resource" })
        })
}
const unFavouriteProject = (db, req, res) => {
    const { member_email, project_id } = req.body;
    db('favourited_projects')
        .where({ member_email, project_id })
        .del()
        .then(data => {
            return res.status(200).json({ success: true, message: 'Project successfully removed from favourites', data: project_id })
        }).catch(e => {
            return res.status(400).json({ success: false, message: "Couldn't remove project from favourites" })
        })
}

const deleteTeamMember = (db, req, res) => {
    const { member_email, team_id } = req.body;
    db('team_membership')
        .where({ member_email, team_id })
        .del()
        .then(data => {
            return res.status(200).json({ success: true, message: 'Resource successfully removed' })
        }).catch(e => {
            return res.status(400).json({ success: false, message: "Couldn't remove resource" })
        })
}
const deleteSection = (db, req, res) => {
    const { id } = req.body;
    db('sections')
        .where({ id })
        .del()
        .then(data => {
            return res.status(200).json({ success: true, message: 'Resource successfully removed' })
        }).catch(e => {
            return res.status(400).json({ success: false, message: "Couldn't remove resource" })
        })
}
const deleteTask = (db, req, res) => {
    const { id } = req.body;
    db('tasks')
        .where({ id })
        .del()
        .then(data => {
            return res.status(200).json({ success: true, message: 'Resource successfully removed' })
        }).catch(e => {
            return res.status(400).json({ success: false, message: "Couldn't remove resource" })
        })
}
const deleteProject = (db, req, res) => {
    const { project_id } = req.body;
    db('projects')
        .where({ project_id })
        .del()
        .then(data => {
            return res.status(200).json({ success: true, message: 'Resource successfully removed' })
        }).catch(e => {
            return res.status(400).json({ success: false, message: "Couldn't remove resource" })
        })
}

const deleteTeam = (db, req, res) => {
    const { id } = req.body;
    db('teams')
        .where({ id })
        .del()
        .then(data => {
            return res.status(200).end()
        }).catch(e => {
            return res.status(400).json({ success: false, message: "Couldn't remove resource" })
        })
}


module.exports = {
    deleteAssignedMember,
    deleteTeamMember,
    deleteSection,
    deleteTask,
    unFavouriteProject,
    deleteProject,
    deleteTeam
}