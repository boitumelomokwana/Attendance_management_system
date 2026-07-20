import { useState } from "react";
import "../styles/StudentForm.css";

const INITIAL = { studentNo: "", firstName: "", lastName: "", course: "", year: "" };

function StudentForm({ addStudent, updateStudent, editingStudent }) {
  const [student, setStudent] = useState(editingStudent || INITIAL);

  function handleChange(e) {
    const { name, value } = e.target;
    setStudent({
      ...student,
      [name]: name === "year" ? parseInt(value, 10) || "" : value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (editingStudent) {
      updateStudent(student);
    } else {
      addStudent(student);
    }
  }

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <h2>{editingStudent ? "Edit Student" : "Add Student"}</h2>
      <input
        name="studentNo"
        placeholder="Student Number"
        value={student.studentNo}
        onChange={handleChange}
        required
      />
      <input
        name="firstName"
        placeholder="First Name"
        value={student.firstName}
        onChange={handleChange}
        required
      />
      <input
        name="lastName"
        placeholder="Last Name"
        value={student.lastName}
        onChange={handleChange}
        required
      />
      <input
        name="course"
        placeholder="Course"
        value={student.course}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="year"
        placeholder="Year"
        value={student.year}
        onChange={handleChange}
        required
        min={1}
        max={6}
      />
      <button>{editingStudent ? "Update Student" : "Add Student"}</button>
    </form>
  );
}

export default StudentForm;
