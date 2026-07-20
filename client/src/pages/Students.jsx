import { useState, useMemo, useEffect } from "react";
import { toast } from "react-toastify";

import StudentTable from "../components/StudentTable";
import StudentForm from "../components/StudentForm";
import Modal from "../components/Modal";
import { getStudents, addStudent, updateStudent, deleteStudent } from "../services/studentService";

import "../styles/Students.css";

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    getStudents()
      .then(setStudents)
      .catch(() => {
        const saved = localStorage.getItem("students");
        setStudents(saved ? JSON.parse(saved) : []);
        toast.info("Backend unavailable — using local data");
      })
      .finally(() => setLoading(false));
  }, []);

  function persistToLocal(data) {
    try {
      localStorage.setItem("students", JSON.stringify(data));
    } catch { /* ignore */ }
  }

  async function handleAddStudent(student) {
    try {
      const created = await addStudent(student);
      const updated = [...students, created];
      setStudents(updated);
      persistToLocal(updated);
      toast.success("Student added");
    } catch {
      const localStudent = { id: Date.now(), ...student, status: "Present" };
      const updated = [...students, localStudent];
      setStudents(updated);
      persistToLocal(updated);
      toast.info("Saved locally (backend unavailable)");
    }
    setIsOpen(false);
  }

  async function handleUpdateStudent(updatedStudent) {
    try {
      const result = await updateStudent(updatedStudent.id, updatedStudent);
      setStudents((prev) => {
        const updated = prev.map((s) => (s.id === (result.id || updatedStudent.id) ? { ...s, ...result } : s));
        persistToLocal(updated);
        return updated;
      });
      toast.success("Student updated");
    } catch {
      setStudents((prev) => {
        const updated = prev.map((s) => (s.id === updatedStudent.id ? updatedStudent : s));
        persistToLocal(updated);
        return updated;
      });
      toast.info("Updated locally (backend unavailable)");
    }
    setEditingStudent(null);
    setIsOpen(false);
  }

  async function handleDeleteStudent(id) {
    try {
      await deleteStudent(id);
      setStudents((prev) => {
        const updated = prev.filter((s) => s.id !== id);
        persistToLocal(updated);
        return updated;
      });
      toast.success("Student deleted");
    } catch {
      setStudents((prev) => {
        const updated = prev.filter((s) => s.id !== id);
        persistToLocal(updated);
        return updated;
      });
      toast.info("Removed locally (backend unavailable)");
    }
  }

  function handleEditStudent(student) {
    setEditingStudent(student);
    setIsOpen(true);
  }

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        `${student.firstName} ${student.lastName} ${student.studentNo}`
          .toLowerCase()
          .includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || student.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [students, search, statusFilter]);

  return (
    <div className="students-page">
      <div className="page-header">
        <h1>Students</h1>
        <button
          className="add-btn"
          onClick={() => {
            setEditingStudent(null);
            setIsOpen(true);
          }}
        >
          + Add Student
        </button>
      </div>

      <div
        style={{
          marginBottom: "1rem",
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap"
        }}
      >
        <input
          type="text"
          placeholder="Search by name or student no"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "0.6rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            flex: "1",
            minWidth: "220px"
          }}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ padding: "0.6rem", borderRadius: "6px", border: "1px solid #ccc" }}
        >
          <option value="All">All statuses</option>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
          <option value="Late">Late</option>
          <option value="Leave">Leave</option>
        </select>
      </div>

      {loading ? (
        <p>Loading students...</p>
      ) : (
        <StudentTable
          students={filteredStudents}
          deleteStudent={handleDeleteStudent}
          editStudent={handleEditStudent}
        />
      )}

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <StudentForm
          addStudent={handleAddStudent}
          updateStudent={handleUpdateStudent}
          editingStudent={editingStudent}
        />
      </Modal>
    </div>
  );
}

export default Students;
