const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getUsers = async(req, res) => {
    try {
        const users = await Users.findAll({
            attributes:['userId','name','email']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

const Register = async(req, res) => {
    const { name, email, password, confPassword } = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Password and Confirm Password do not match"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            name: name,
            email: email,
            password: hashPassword
        });
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}

const Login = async(req, res) => {
    try {
        const user = await Users.findAll({
            where:{
                email: req.body.email
            }
        });

        console.log(`[D] Request receieved: ${req.body.email} ${req.body.password}`)
        console.log(`[D] Matching password`)

        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({msg: "Wrong Password"});

        console.log(`[D] Password matched`)

        const userId = user[0].userId;
        const name = user[0].name;
        const email = user[0].email;
        
        console.log(`[D] ${userId} ${name} ${email}`)
        console.log(`[D] Getting token`)

        const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '15s'
        });
        const refreshToken = jwt.sign({userId, name, email}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });

        console.log(`[D] Successfully retreived token ${refreshToken}`)
        console.log(`[D] Updating refresh token`)

        await Users.update({refresh_token: refreshToken},{
            where:{
                userId: userId
            }
        });

        console.log(`[D] Successfully updated refresh token`)

        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        console.log(`[D] Sent Cookie`)

        res.json({ accessToken });

        console.log(`[D] Sent Jason`)

    } catch (error) {
        console.log(`[E] Error occured ${error}`)
        res.status(404).json({msg:"Email not found"});
    }
}

const Logout = async(req, res) => {
    console.log(`[D] getting refreshtoken from cookies`);
    const refreshToken = req.cookies.refreshToken;

    console.log(`[D] ${refreshToken}`);
    if(!refreshToken) return res.sendStatus(204);

    console.log(`[D] Trying to find refreshtoken`);
    const user = await Users.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204);
    
    console.log(`[D] found the refreshtoken`);
    const userId = user[0].userId;

    console.log(`[D] Attempting to delete refreshtoken`);
    await Users.update({refresh_token: null},{
        where:{
            userId: userId
        }
    });

    console.log(`[D] clearing cookies`);
    res.clearCookie('refreshToken');

    console.log(`[D] done`);
    return res.sendStatus(200);
}

module.exports = { getUsers, Register, Login, Logout };