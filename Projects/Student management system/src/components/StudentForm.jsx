import { useState } from "react";

// StudentForm component - handles both adding and editing students
function StudentForm({ onSubmit, editingStudent, onCancelEdit }) {
  // Form state - if editing, fill with existing data; otherwise empty
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    branch: "",
    semester: "",
    mobile: "",
  });

  // We need to update form when editingStudent changes
  // Using a simple check with useEffect-like behavior
  const [lastEditId, setLastEditId] = useState(null);

  // If editingStudent changed, update the form
  if (editingStudent && editingStudent.id !== lastEditId) {
    setFormData({
      id: editingStudent.id,
      name: editingStudent.name,
      email: editingStudent.email,
      branch: editingStudent.branch,
      semester: editingStudent.semester,
      mobile: editingStudent.mobile,
    });
    setLastEditId(editingStudent.id);
  }

  // If we were editing but now we're not, clear the form
  if (!editingStudent && lastEditId !== null) {
    setFormData({
      id: "",
      name: "",
      email: "",
      branch: "",
      semester: "",
      mobile: "",
    });
    setLastEditId(null);
  }

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);

    // Clear form after adding (not after editing, parent handles that)
    if (!editingStudent) {
      setFormData({
        id: "",
        name: "",
        email: "",
        branch: "",
        semester: "",
        mobile: "",
      });
    }
  };

  return (
    <div className="form-container">
      <h2>{editingStudent ? "Edit Student" : "Add Student"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Student ID</label>
          <input
            type="number"
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="Enter student ID"
            disabled={!!editingStudent}
          />
        </div>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter student name"
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
          />
        </div>

        <div className="form-group">
          <label>Branch</label>
          <select name="branch" value={formData.branch} onChange={handleChange}>
            <option value="">-- Select Branch --</option>
            <option value="CSE">CSE</option>
            <option value="CS">CS</option>
            <option value="IT">IT</option>
            <option value="ECE">ECE</option>
          </select>
        </div>

        <div className="form-group">
          <label>Semester</label>
          <select
            name="semester"
            value={formData.semester}
            onChange={handleChange}
          >
            <option value="">-- Select Semester --</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
              <option key={sem} value={sem}>
                {sem}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Mobile Number</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Enter 10-digit mobile number"
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn-submit">
            {editingStudent ? "Update Student" : "Add Student"}
          </button>
          {editingStudent && (
            <button type="button" className="btn-cancel" onClick={onCancelEdit}>
              Cancel Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default StudentForm;
