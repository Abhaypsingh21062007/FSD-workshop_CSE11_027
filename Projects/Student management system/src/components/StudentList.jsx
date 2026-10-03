// StudentList component - displays students in a table
function StudentList({ students, onEdit, onDelete }) {
  // If no students, show a message
  if (students.length === 0) {
    return <p className="no-students">No students available.</p>;
  }

  return (
    <div className="table-wrapper">
      <table className="student-table">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Branch</th>
            <th>Semester</th>
            <th>Mobile</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.branch}</td>
              <td>{student.semester}</td>
              <td>{student.mobile}</td>
              <td>
                <button className="btn-edit" onClick={() => onEdit(student)}>
                  Edit
                </button>
                <button
                  className="btn-delete"
                  onClick={() => onDelete(student.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;
