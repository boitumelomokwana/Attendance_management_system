import StudentRow from "./StudentRow";

function StudentTable({ students, editStudent, deleteStudent }) {

    return (

        <table>

            <thead>

                <tr>

                    <th>Student No</th>

                    <th>First Name</th>

                    <th>Last Name</th>

                    <th>Course</th>

                    <th>Year</th>

                    <th>Status</th>

                    <th>Actions</th>

                </tr>

            </thead>

            <tbody>

                {

                    students.map(student => (

                        <StudentRow
                            key={student.id}
                            student={student}
                            editStudent={editStudent}
                            deleteStudent={deleteStudent}
                        />

                        

                    ))

                }

            </tbody>

        </table>

    );

}

export default StudentTable;