import { useState, useMemo, useEffect } from "react";

import studentsData from "../data/students";

import StudentTable from "../components/StudentTable";
import StudentForm from "../components/StudentForm";
import Modal from "../components/Modal";

import "../styles/Students.css";

function Students() {

    const [students, setStudents] = useState(() => {
        const saved = localStorage.getItem("students");
        return saved ? JSON.parse(saved) : studentsData;
    });

    const [isOpen, setIsOpen] = useState(false);

    const [editingStudent, setEditingStudent] = useState(null);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("All");

    function addStudent(student) {

        setStudents([
            ...students,
            {
                id: Date.now(),
                ...student,
                status: "Present"
            }
        ]);

        setIsOpen(false);
    }

    function updateStudent(updatedStudent) {

        setStudents(

            students.map(student =>

                student.id === updatedStudent.id

                    ? updatedStudent

                    : student

            )

        );

        setEditingStudent(null);

        setIsOpen(false);

    }

    function deleteStudent(id) {

        setStudents(

            students.filter(student => student.id !== id)

        );

    }

    function editStudent(student) {

        setEditingStudent(student);

        setIsOpen(true);

    }

    useEffect(() => {
        localStorage.setItem("students", JSON.stringify(students));
    }, [students]);

    const filteredStudents = useMemo(() => {
        return students.filter((student) => {
            const matchesSearch = `${student.firstName} ${student.lastName} ${student.studentNo}`.toLowerCase().includes(search.toLowerCase());
            const matchesStatus = statusFilter === "All" || student.status === statusFilter;
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

            <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <input
                    type="text"
                    placeholder="Search by name or student no"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ padding: "0.6rem", borderRadius: "6px", border: "1px solid #ccc", flex: "1", minWidth: "220px" }}
                />
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ padding: "0.6rem", borderRadius: "6px", border: "1px solid #ccc" }}>
                    <option value="All">All statuses</option>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Late">Late</option>
                </select>
            </div>

            <StudentTable

                students={filteredStudents}

                deleteStudent={deleteStudent}

                editStudent={editStudent}

            />

            <Modal

                isOpen={isOpen}

                onClose={() => setIsOpen(false)}

            >

                <StudentForm

                    addStudent={addStudent}

                    updateStudent={updateStudent}

                    editingStudent={editingStudent}

                />

            </Modal>

        </div>

    );

}

export default Students;