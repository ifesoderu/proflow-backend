const jwt = require('jsonwebtoken');


const signJWTToken = (email) => {
    return jwt.sign({
        data: email,
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
    }, `MYJSON_WEB_TOKEN_SECRET`);
}

const loginMember = (db, bcrypt, req, res) => {
    console.log(req.body)
    const { email, password } = req.body;
    if (email.trim() === '') return response.status(400).json({ success: false, message: "Kindly fill all fields" })
    db.select('*')
        .from('members')
        .where('email', email)
        .then(data => {
            if (data.length !== 1) return response.status(400).json({ success: false, message: "unable to log in" })
            // const isValid = bcrypt.compareSync(password, data[0].password)
            const isValid = password === data[0].password
            if (isValid) {
                const token = signJWTToken(email)
                return res.status(201).json({
                    success: true,
                    message: "Login Successful",
                    data: token
                })
            } else {
                return res.status(400).json({
                    success: false,
                    message: "Invalid email or password",
                    data: null
                })

            }
        }).catch(err => {
            console.log(err)
            return response.status(400).json("Login not successfu;")
        })
}

const createTeam = (db, req, res) => {
    const { name, description } = req.body
    if (name.trim() === "") return response.status(400).json({ success: false, message: "Kindly fill all fields" })
    db('teams')
        .insert({ name, description })
        .returning('*')
        .then(team => {
            const response = {
                success: true,
                message: "Team successfully created",
                data: team
            }
            return res.status(201).json(response)
        }).catch(err => {
            console.log(err)
            return res.status(400).json("Could not create team")
        })
}

const createProject = (db, req, res) => {
    const { name, description, team_id, status, creator_email, privacy, board } = req.body
    if (name.trim() === "") return response.status(400).json({ success: false, message: "Kindly fill all fields" })
    db.transaction(
        trx => {
            trx.insert({ name, description, team_id, status, creator_email, privacy, board })
                .into('projects')
                .returning('*')
                .then(project => {
                    trx('comments')
                        .insert({ content: 'Created this project', owner_email: creator_email, project_id: project[0].project_id })
                        .then(trx.commit)
                        .catch(trx.rollback)
                    const response = {
                        success: true,
                        message: "Project successfully created",
                        data: project[0]
                    }
                    return res.status(201).json(response)
                }).catch(err => {
                    console.log(err)
                    return res.status(400).json("Could not create project")
                })
        }
    )
}

const createSection = (db, req, res) => {
    const { name, project_id } = req.body
    if (name.trim() === "") return response.status(400).json({ success: false, message: "Kindly fill all fields" })
    db('sections')
        .insert({ name, project_id })
        .returning('*')
        .then(team => {
            const response = {
                success: true,
                message: "Section successfully created",
                data: team
            }
            return res.status(201).json(response)
        }).catch(err => {
            console.log(err)
            return res.status(400).json("Could not create section")
        })
}

const createTask = (db, req, res) => {
    const { title, description, completed, due_date, section_id, project_id } = req.body
    if (title.trim() === "") return response.status(400).json({ success: false, message: "Kindly fill all fields" })
    db('tasks')
        .insert({ ...req.body })
        .returning('*')
        .then(task => {
            const response = {
                success: true,
                message: "Task successfully created",
                data: task
            }
            return res.status(201).json(response)
        }).catch(err => {
            console.log(err)
            return res.status(400).json("Could not create Task")
        })
}

const createComment = (db, req, res) => {
    const { project_id, owner_email, content } = req.body
    db('comments')
        .insert({ ...req.body })
        .returning('*')
        .then(comment => {
            const response = {
                success: true,
                message: "Comment successfully created",
                data: comment
            }
            return res.status(201).json(response)
        }).catch(err => {
            console.log(err)
            return res.status(400).json("Could not create Comment")
        })
}

const assignMemberToTask = (db, req, res) => {
    const { member_email, task_id } = req.body;
    db('task_assignee')
        .insert({ ...req.body })
        .returning('member_email')
        .then(assignedMember => {
            const response = {
                success: true,
                message: "Member successfully assigned",
                data: assignedMember
            }
            return res.status(201).json(response)
        }).catch(err => {
            console.log(err)
            return res.status(400).json("Could not create assign member")
        })
}

const addMemberToTeam = (db, req, res) => {
    const { member_email, team_id } = req.body;
    db('team_membership')
        .insert({ ...req.body })
        .returning('member_email')
        .then(assignedMember => {
            const response = {
                success: true,
                message: "Member successfully added",
                data: assignedMember
            }
            return res.status(201).json(response)
        }).catch(err => {
            console.log(err)
            return res.status(400).json("Could not create add member")
        })
}

module.exports = {
    createTeam,
    loginMember,
    assignMemberToTask,
    addMemberToTeam,
    createProject,
    createSection,
    createTask,
    createComment
}