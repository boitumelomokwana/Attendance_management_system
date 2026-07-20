const { Student } = require("../models");

const fallbackStudents = [];

// GET all students
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.findAll();
    return res.json(students);
  } catch (err) {
    console.error("getStudents error:", err.message);
    return res.json(fallbackStudents);
  }
};

// CREATE student
exports.addStudent = async (req, res) => {
  const payload = {
    ...req.body,
    status: req.body.status || "Present"
  };

  try {
    const student = await Student.create(payload);
    return res.status(201).json(student);
  } catch (err) {
    console.error("addStudent error:", err.message);
    const student = { id: `${Date.now()}`, ...payload };
    fallbackStudents.push(student);
    return res.status(201).json(student);
  }
};

// UPDATE student
exports.updateStudent = async (req, res) => {
  try {
    const [updated] = await Student.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated === 0) {
      return res.status(404).json({ message: "Student not found" });
    }
    const student = await Student.findByPk(req.params.id);
    return res.json(student);
  } catch (err) {
    console.error("updateStudent error:", err.message);
    const idx = fallbackStudents.findIndex(
      (s) => String(s.id) === String(req.params.id)
    );
    if (idx !== -1) {
      fallbackStudents[idx] = { ...fallbackStudents[idx], ...req.body };
      return res.json(fallbackStudents[idx]);
    }
    return res.status(404).json({ message: "Student not found" });
  }
};

// DELETE student
exports.deleteStudent = async (req, res) => {
  try {
    const deleted = await Student.destroy({ where: { id: req.params.id } });
    if (deleted === 0) {
      return res.status(404).json({ message: "Student not found" });
    }
    return res.json({ message: "Student deleted" });
  } catch (err) {
    console.error("deleteStudent error:", err.message);
    const index = fallbackStudents.findIndex(
      (student) => String(student.id) === String(req.params.id)
    );
    if (index !== -1) fallbackStudents.splice(index, 1);
    return res.json({ message: "Student deleted" });
  }
};
