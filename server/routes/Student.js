const express = require("express");
const router = express.Router();
const { getStudents, addStudent, updateStudent, deleteStudent } = require("../controllers/Student");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/role");

router.get("/", protect, getStudents);
router.post("/", protect, authorize("Admin", "Lecturer"), addStudent);
router.put("/:id", protect, authorize("Admin", "Lecturer"), updateStudent);
router.delete("/:id", protect, authorize("Admin"), deleteStudent);

module.exports = router;
