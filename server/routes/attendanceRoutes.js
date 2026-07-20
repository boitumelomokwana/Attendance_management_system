const express = require("express");
const router = express.Router();
const { Attendance, Student } = require("../models");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/role");

const fallbackAttendance = [];

router.get("/", protect, async (req, res) => {
  try {
    const records = await Attendance.findAll({ include: [{ model: Student, as: "student" }] });
    return res.json(records);
  } catch (err) {
    console.error("getAttendance error:", err.message);
    return res.json(fallbackAttendance);
  }
});

router.post("/", protect, authorize("Admin", "Lecturer"), async (req, res) => {
  try {
    const record = await Attendance.create({ ...req.body, markedById: req.user.id });
    return res.status(201).json(record);
  } catch (err) {
    console.error("createAttendance error:", err.message);
    const record = { id: `${Date.now()}`, ...req.body, markedById: req.user?.id };
    fallbackAttendance.push(record);
    return res.status(201).json(record);
  }
});

router.put("/:id", protect, authorize("Admin", "Lecturer"), async (req, res) => {
  try {
    const [updated] = await Attendance.update(req.body, { where: { id: req.params.id } });
    if (updated === 0) {
      return res.status(404).json({ message: "Record not found" });
    }
    const record = await Attendance.findByPk(req.params.id, {
      include: [{ model: Student, as: "student" }]
    });
    return res.json(record);
  } catch (err) {
    console.error("updateAttendance error:", err.message);
    const idx = fallbackAttendance.findIndex((r) => String(r.id) === String(req.params.id));
    if (idx !== -1) fallbackAttendance[idx] = { ...fallbackAttendance[idx], ...req.body };
    return res.json(fallbackAttendance[idx] || req.body);
  }
});

module.exports = router;
