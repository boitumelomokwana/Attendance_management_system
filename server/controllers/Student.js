const Student = require("../models/Student");

// GET all students
exports.getStudents = async (req, res) => {

    const students = await Student.find();

    res.json(students);

};

// CREATE student
exports.addStudent = async (req, res) => {

    const student = await Student.create(req.body);

    res.status(201).json(student);

};

// DELETE student
exports.deleteStudent = async (req, res) => {

    await Student.findByIdAndDelete(req.params.id);

    res.json({

        message:"Student deleted"

    });

};