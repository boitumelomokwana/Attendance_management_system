function StudentRow({ student, editStudent, deleteStudent }) {
  const statusStyles = {
    Present: { bg: "#dcfce7", color: "#166534" },
    Absent: { bg: "#fee2e2", color: "#b91c1c" },
    Late: { bg: "#fef3c7", color: "#92400e" },
    Leave: { bg: "#e0e7ff", color: "#3730a3" }
  };

  const style = statusStyles[student.status] || { bg: "#f3f4f6", color: "#374151" };

  return (
    <tr>
      <td>{student.studentNo}</td>
      <td>{student.firstName}</td>
      <td>{student.lastName}</td>
      <td>{student.course}</td>
      <td>{student.year}</td>
      <td>
        <span
          style={{
            padding: "0.25rem 0.5rem",
            borderRadius: "999px",
            background: style.bg,
            color: style.color
          }}
        >
          {student.status}
        </span>
      </td>
      <td>
        <button className="edit-btn" onClick={() => editStudent(student)}>
          Edit
        </button>
        <button className="delete-btn" onClick={() => deleteStudent(student.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default StudentRow;
