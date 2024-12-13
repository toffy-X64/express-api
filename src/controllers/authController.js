const { Op } = require('sequelize');
const HTTPError = require('../utils/customError');
const HTTP_STATUS = require('../utils/HTTP_STATUS.js');
const userService = require('../services/userService.js');
const jwtService = require('../utils/jwtService.js');
const userDTO = require('../config/dto/UserDTO.js');

const isValidUsername = (username) => {
    return username.length >= 3 && username.length <= 32;
}

const isValidPassword = (password) => {
    return password.length >= 8 && password.length <= 64;
}

const isValidEmail = (email) => {
    return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

const createUserJwt = (user) => {
    const payload = new userDTO(user)
    const token = jwtService.generate({...payload})
    return token || false;
}

class authController
{
    async login(req, res, next)
    {
        if (req.user)
            return next(new HTTPError('You already logged!', HTTP_STATUS.BAD_REQUEST))

        const {login, password} = req.body;
        if (!login || !password)
            return next(new HTTPError('Invalid data!', HTTP_STATUS.BAD_REQUEST))

        try {
            const user = await userService.find({ 
                [Op.or]: [
                    {username: login},
                    {email: login}
                ]
            })
            if (!user)
                return next(new HTTPError('User not found with provided username or email', HTTP_STATUS.UNAUTHORISED));

            const isPasswordValid = await user.validatePassword(password);
            if (!isPasswordValid)
                return next(new HTTPError('Invalid password', HTTP_STATUS.UNAUTHORISED));

            const token = createUserJwt(user);
            return res.status(HTTP_STATUS.ACCEPTED).json({token});
        } catch (error) {
            return next(new HTTPError('Internal Server Error during login!', HTTP_STATUS.INTERNAL_SERVER_ERROR));
        }


    }

    async register(req, res, next) 
    {
        const {username, email, password} = req.body;
        if (!username || !email || !password)
            return next(new HTTPError('Invalid data! Login, Email and password are required.', HTTP_STATUS.BAD_REQUEST)); 

        if (!isValidUsername(username))
            return next(new HTTPError('Invalid username!', HTTP_STATUS.BAD_REQUEST))
        if (!isValidEmail(email))
            return next(new HTTPError('Invalid email!', HTTP_STATUS.BAD_REQUEST))
        if (!isValidPassword(password))
            return next(new HTTPError('Invalid password!', HTTP_STATUS.BAD_REQUEST))

        try {
            const existingUser = await userService.find({
                [Op.or]: [
                    {username},
                    {email}
                ]
            })
            if (existingUser)
                return next(new HTTPError('User with this username or email is already exists!', HTTP_STATUS.BAD_REQUEST));

            const user = await userService.create({username, email, password})
            if (!user)
                return next(new HTTPError('Server error during creating user!', HTTP_STATUS.BAD_REQUEST));

            const token = createUserJwt(user);

            return res.status(HTTP_STATUS.OK).json({token});

        } catch (error) {
            return next(new HTTPError('Internal Server Error during register!', HTTP_STATUS.INTERNAL_SERVER_ERROR))
        }
    }
}

module.exports = new authController;