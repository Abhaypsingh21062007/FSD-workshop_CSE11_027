import { useState, useEffect } from "react";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import SearchStudent from "./components/SearchStudent";
import "./App.css";

// Backend API URL
const API_URL = "http://localhost:5000/api/students";

function App() {
  // State for students list
  const [students, setStudents] = useState([]);

  // State for search input
  const [searchTerm, setSearchTerm] = useState("");

  // State for editing a student (null means we are adding, not editing)
  const [editingStudent, setEditingStudent] = useState(null);

  // State for success/error messages
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  // Fetch all students from backend when the app loads
  useEffect(() => {
    fetchStudents();
  }, []);

  // Function to fetch students from the backend
  const fetchStudents = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
      showMessage("Failed to fetch students from server", "error");
    }
  };

  // Show a message for a few seconds
  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);
    // Clear message after 3 seconds
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000);
  };

  // Handle form submit (add or update)
  const handleFormSubmit = async (formData) => {
    // --- Frontend validation ---
    if (!formData.id) {
      showMessage("Student ID is required", "error");
      return;
    }
    if (!formData.name || formData.name.trim() === "") {
      showMessage("Please enter the student name", "error");
      return;
    }
    if (!formData.email || formData.email.trim() === "") {
      showMessage("Please enter the email", "error");
      return;
    }
    // Simple email check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showMessage("Please enter a valid email", "error");
      return;
    }
    if (!formData.branch) {
      showMessage("Please select a branch", "error");
      return;
    }
    if (
      !formData.semester ||
      formData.semester < 1 ||
      formData.semester > 8
    ) {
      showMessage("Semester must be between 1 and 8", "error");
      return;
    }
    if (!formData.mobile || !/^\d{10}$/.test(formData.mobile)) {
      showMessage("Mobile number must be exactly 10 digits", "error");
      return;
    }

    try {
      if (editingStudent) {
        // UPDATE request
        const response = await fetch(`${API_URL}/${editingStudent.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await response.json();

        if (response.ok) {
          showMessage(data.message, "success");
          setEditingStudent(null); // exit edit mode
          fetchStudents(); // refresh the list
        } else {
          showMessage(data.message, "error");
        }
      } else {
        // ADD request
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await response.json();

        if (response.ok) {
          showMessage(data.message, "success");
          fetchStudents(); // refresh the list
        } else {
          showMessage(data.message, "error");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      showMessage("Something went wrong. Is the server running?", "error");
    }
  };

  // Handle edit button click
  const handleEdit = (student) => {
    setEditingStudent(student);
    // Scroll to top so user can see the form
    window.scrollTo({ top: 0 });
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    // Browser confirmation dialog
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (!confirmed) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (response.ok) {
        showMessage(data.message, "success");
        fetchStudents(); // refresh the list
      } else {
        showMessage(data.message, "error");
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      showMessage("Failed to delete student", "error");
    }
  };

  // Filter students based on search term (by ID or name, case-insensitive)
  const filteredStudents = students.filter((student) => {
    if (searchTerm.trim() === "") return true;

    const term = searchTerm.toLowerCase();
    const idMatch = student.id.toString().includes(term);
    const nameMatch = student.name.toLowerCase().includes(term);

    return idMatch || nameMatch;
  });

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <h1>Student Management System</h1>
        <p>Manage student records easily</p>
      </header>

      {/* Show success/error message */}
      {message && (
        <div className={`message ${messageType}`}>
          {message}
        </div>
      )}

      {/* Student Form */}
      <StudentForm
        onSubmit={handleFormSubmit}
        editingStudent={editingStudent}
        onCancelEdit={handleCancelEdit}
      />

      {/* Search Bar */}
      <SearchStudent searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {/* Student Table */}
      <StudentList
        students={filteredStudents}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Show message if search has no results but there are students */}
      {searchTerm && filteredStudents.length === 0 && students.length > 0 && (
        <p className="no-students">No student found.</p>
      )}
    </div>
  );
}

export default App;
