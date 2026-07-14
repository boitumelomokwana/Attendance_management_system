import { useState } from "react";

import studentsData from "../data/students";

import StudentTable from "../components/StudentTable";
import StudentForm from "../components/StudentForm";
import Modal from "../components/Modal";

import "../styles/Students.css";

function Students() {

    const [students, setStudents] = useState(studentsData);

    const [isOpen, setIsOpen] = useState(false);

    const [editingStudent, setEditingStudent] = useState(null);

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

            <StudentTable

                students={students}

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