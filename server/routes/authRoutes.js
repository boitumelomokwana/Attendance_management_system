const express = require("express");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const router = express.Router();
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const fallbackUsers = [
    {
        _id: "demo-user",
        firstName: "Admin",
        lastName: "User",
        email: "admin@attendance.com",
        password: bcrypt.hashSync("password123", 10),
        role: "Admin"
    }
];

async function findUserByEmail(email) {

    if (mongoose.connection.readyState === 1) {

        return User.findOne({ email });

    }

    return fallbackUsers.find((user) => user.email === email);

}

async function saveUser(userData) {

    if (mongoose.connection.readyState === 1) {

        return User.create(userData);

    }

    const newUser = {
        ...userData,
        _id: `${Date.now()}`
    };

    fallbackUsers.push(newUser);

    return newUser;

}

router.post("/login", async (req, res) => {

    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {

        return res.json({
            _id: user._id,
            firstName: user.firstName,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        });

    }

    return res.status(401).json({ message: "Invalid credentials" });

});

router.post("/register", async (req, res) => {

    try {

        const { firstName, lastName, email, password } = req.body;
        const existingUser = await findUserByEmail(email);

        if (existingUser) {

            return res.status(400).json({ message: "User already exists" });

        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await saveUser({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role: "Student"
        });

        return res.status(201).json({
            _id: user._id,
            firstName: user.firstName,
            email: user.email,
            token: generateToken(user._id)
        });

    }

    catch (error) {

        return res.status(500).json({ message: error.message });

    }

});

module.exports = router;