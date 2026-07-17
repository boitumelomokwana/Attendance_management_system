const mongoose = require("mongoose");
const Student = require("../models/Student");

const fallbackStudents = [];

// GET all students
exports.getStudents = async (req, res) => {

    if (mongoose.connection.readyState === 1) {

        const students = await Student.find();
        return res.json(students);

    }

    return res.json(fallbackStudents);

};

// CREATE student
exports.addStudent = async (req, res) => {

    const payload = {
        ...req.body,
        status: req.body.status || "Present"
    };

    if (mongoose.connection.readyState === 1) {

        const student = await Student.create(payload);
        return res.status(201).json(student);

    }

    const student = {
        _id: `${Date.now()}`,
        ...payload
    };

    fallbackStudents.push(student);

    return res.status(201).json(student);

};

// DELETE student
exports.deleteStudent = async (req, res) => {

    if (mongoose.connection.readyState === 1) {

        await Student.findByIdAndDelete(req.params.id);
        return res.json({ message: "Student deleted" });

    }

    const index = fallbackStudents.findIndex((student) => student._id === req.params.id);

    if (index !== -1) {

        fallbackStudents.splice(index, 1);

    }

    return res.json({ message: "Student deleted" });

};