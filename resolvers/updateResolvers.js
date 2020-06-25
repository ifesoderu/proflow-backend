const updateTask = (db, req, res) => {
    const { id, title, description, completed, due_date, section_id } = req.body;
    // if (title.trim() === "" || description.trim() === "" || completed === "" || due_date.trim() === "") {
    if (title.trim() === "") {
        return res.status(400).json({ success: false, message: "Fill up the fields" })
    }
    db('tasks')
        .where({ id })
        .update({ title, description, completed, due_date, section_id }, ['*'])
        .then(updatedTask => {
            return res.status(200).json({ success: true, message: "update successful", data: updatedTask[0] })
        }).catch(e => {
            return res.status(400).json({ success: false, message: "Update not successful" })
        })
}

const updateSection = (db, req, res) => {
    const { id, name } = req.body;
    if (name.trim() === "") {
        return res.status(400).json({ success: false, message: "Fill up the fields" })
    }
    db('sections')
        .where({ id })
        .update({ name }, ['*'])
        .then(updatedSection => {
            return res.status(200).json({ success: true, message: "update successful", data: updatedSection })
        }).catch(e => {
            return res.status(400).json({ success: false, message: "Update not successful" })
        })
}

const updateProject = (db, req, res) => {
    const { project_id, name, description, status, privacy } = req.body;
    if (name.trim() === "" || description.trim() === "" || status.trim() === "" || privacy.trim() === "") {
        return res.status(400).json({ success: false, message: "Fill up the fields" })
    }
    db('projects')
        .where({ project_id })
        .update({ name, description, status, privacy }, ['*'])
        .then(updatedProject => {
            return res.status(200).json({ success: true, message: "update successful", data: updatedProject })
        }).catch(e => {
            return res.status(400).json({ success: false, message: "Update not successful" })
        })
}


const updateTeam = (db, req, res) => {
    const { id, name, description } = req.body;
    if (name.trim() === "" || description.trim() === "") {
        return res.status(400).json({ success: false, message: "Fill up the fields" })
    }
    db('teams')
        .where({ id })
        .update({ name, description }, ['*'])
        .then(updatedTeam => {
            return res.status(200).json({ success: true, message: "update successful", data: updatedTeam })
        }).catch(e => {
            return res.status(400).json({ success: false, message: "Update not successful" })
        })
}

module.exports = {
    updateTask,
    updateSection,
    updateProject,
    updateTeam
}
