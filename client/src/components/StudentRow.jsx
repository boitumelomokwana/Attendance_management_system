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

            <td>{student.status}</td>

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