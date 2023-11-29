const Users = require('../models/User');
exports.getUsers = async (req, res, next) => {
    try {
        const users= await Users.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json(error);
    }
};