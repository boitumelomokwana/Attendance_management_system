function StudentRow({

    student,

    editStudent,

    deleteStudent

}) {

    return (

        <tr>

            <td>{student.studentNo}</td>

            <td>{student.firstName}</td>

            <td>{student.lastName}</td>

            <td>{student.course}</td>

            <td>{student.year}</td>

            <td>
                <span style={{
                    padding: "0.25rem 0.5rem",
                    borderRadius: "999px",
                    background: student.status === "Absent" ? "#fee2e2" : student.status === "Late" ? "#fef3c7" : "#dcfce7",
                    color: student.status === "Absent" ? "#b91c1c" : student.status === "Late" ? "#92400e" : "#166534"
                }}>
                    {student.status}
                </span>
            </td>

            <td>

                <button
                    className="edit-btn"
                    onClick={() => editStudent(student)}
                >
                    Edit
                </button>

                <button
                    className="delete-btn"
                    onClick={() => deleteStudent(student.id)}
                >
                    Delete
                </button>

            </td>

        </tr>

    );

}

export default StudentRow;