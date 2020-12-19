const User = require('../models/User');
const { UserInputError, AuthenticationError } = require('apollo-server');
const bcryptp = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');
const checkAuth = require('../utils/checkAuth');
const { validateRegisterInput, validateLoginInput } = require('../utils/validators');



const resolvers = {
    Query: {
        async login(__, { email, password }){
            const { errors, valid } = validateLoginInput(email, password);
            if (!valid){
                throw new UserInputError('Errors', { errors });
            }
            const user = await User.findOne({ email });
            if (!user){
                errors.general = 'User not Found';
                throw new UserInputError('User not Found', { errors });
            }
            const match = await bcryptp.compare(password, user.password);
            if (!match){
                errors.general = 'Incorrect Password';
                throw new UserInputError('Incorrect Password', { errors });
            }
            const token = jwt.sign({
                id: user.id,
                email: user.email,
                username: user.username,
            }, SECRET_KEY, { expiresIn: '1h'});

            return{
                ...user._doc,
                id: user._id,
                token: token
            }
        }
    },
    Mutation: {
        async register(__, { username, email, password, confirmPassword }, context, info){
            try{
                //Validate User data
                const { errors, valid } = validateRegisterInput(username, email, password, confirmPassword);
                if (!valid){
                    throw new UserInputError('Errors', { errors });
                }
                //make sure username is unique
                //hash the password and create a token
                password = await bcryptp.hash(password, 12);
                const newUser = new User({
                    email,
                    username,
                    password,
                    createdAt: new Date().toISOString()
                })
                const res = await newUser.save();
                const token = jwt.sign({
                    id: res.id,
                    email: res.email,
                    username: res.username,
                }, SECRET_KEY, { expiresIn: '1h'});

                return{
                    ...res._doc,
                    id: res._id,
                    token: token,
                }   
            }
            catch(err){
                throw err;
            }
        }
    }
}

module.exports = resolvers