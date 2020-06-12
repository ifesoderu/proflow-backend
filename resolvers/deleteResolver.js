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
            return res.status(200).json({ success: true, message: 'Resource successfully removed' })
        }).catch(e => {
            return res.status(400).json({ success: false, message: "Couldn't remove resource" })
        })
}


module.exports = {
    deleteAssignedMember,
    deleteTeamMember,
    deleteSection,
    deleteTask,
    deleteProject,
    deleteTeam
}