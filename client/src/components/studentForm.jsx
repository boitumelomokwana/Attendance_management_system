import { useEffect, useState } from "react";

import "../styles/StudentForm.css";

function StudentForm({

    addStudent,

    updateStudent,

    editingStudent

}) {

    const [student, setStudent] = useState({

        studentNo: "",

        firstName: "",

        lastName: "",

        course: "",

        year: ""

    });

    useEffect(() => {

        if (editingStudent) {

            setStudent(editingStudent);

        }

    }, [editingStudent]);

    function handleChange(e) {

        setStudent({

            ...student,

            [e.target.name]: e.target.value

        });

    }

    function handleSubmit(e) {

        e.preventDefault();

        if (editingStudent) {

            updateStudent(student);

        }

        else {

            addStudent(student);

        }

    }

    return (

        <form

            className="student-form"

            onSubmit={handleSubmit}

        >

            <h2>

                {

                    editingStudent

                        ? "Edit Student"

                        : "Add Student"

                }

            </h2>

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
                name="year"
                placeholder="Year"
                value={student.year}
                onChange={handleChange}
                required
            />

            <button>

                {

                    editingStudent

                        ? "Update Student"

                        : "Add Student"

                }

            </button>

        </form>

    );

}

export default StudentForm;