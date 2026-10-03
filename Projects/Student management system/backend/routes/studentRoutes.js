const express = require("express");
const router = express.Router();

// In-memory array to store students (resets when server restarts)
let students = [
  {
    id: 101,
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    branch: "CSE",
    semester: 3,
    mobile: "9876543210",
  },
  {
    id: 102,
    name: "Priya Singh",
    email: "priya@gmail.com",
    branch: "IT",
    semester: 4,
    mobile: "9123456780",
  },
  {
    id: 103,
    name: "Aman Verma",
    email: "aman@gmail.com",
    branch: "ECE",
    semester: 2,
    mobile: "9988776655",
  },
];

// GET /api/students - Fetch all students
router.get("/", (req, res) => {
  res.json(students);
});

// GET /api/students/:id - Fetch a student by ID
router.get("/:id", (req, res) => {
  const studentId = parseInt(req.params.id);
  const student = students.find((s) => s.id === studentId);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.json(student);
});

// POST /api/students - Add a new student
router.post("/", (req, res) => {
  const { id, name, email, branch, semester, mobile } = req.body;

  // --- Server-side validation ---

  if (!id) {
    return res.status(400).json({ message: "Student ID is required" });
  }

  if (!name || name.trim() === "") {
    return res.status(400).json({ message: "Please enter the student name" });
  }

  if (!email || email.trim() === "") {
    return res.status(400).json({ message: "Please enter the email" });
  }

  // Simple email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Please enter a valid email" });
  }

  if (!branch) {
    return res.status(400).json({ message: "Please select a branch" });
  }

  if (!semester || semester < 1 || semester > 8) {
    return res.status(400).json({ message: "Semester must be between 1 and 8" });
  }

  if (!mobile || !/^\d{10}$/.test(mobile)) {
    return res
      .status(400)
      .json({ message: "Mobile number must be exactly 10 digits" });
  }

  // Check for duplicate Student ID
  const exists = students.find((s) => s.id === parseInt(id));
  if (exists) {
    return res.status(400).json({ message: "Student ID already exists" });
  }

  // Create new student object
  const newStudent = {
    id: parseInt(id),
    name: name.trim(),
    email: email.trim(),
    branch,
    semester: parseInt(semester),
    mobile,
  };

  students.push(newStudent);

  res.status(201).json({
    message: "Student added successfully",
    student: newStudent,
  });
});

// PUT /api/students/:id - Update an existing student
router.put("/:id", (req, res) => {
  const studentId = parseInt(req.params.id);
  const index = students.findIndex((s) => s.id === studentId);

  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  const { name, email, branch, semester, mobile } = req.body;

  // --- Server-side validation ---

  if (!name || name.trim() === "") {
    return res.status(400).json({ message: "Please enter the student name" });
  }

  if (!email || email.trim() === "") {
    return res.status(400).json({ message: "Please enter the email" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Please enter a valid email" });
  }

  if (!branch) {
    return res.status(400).json({ message: "Please select a branch" });
  }

  if (!semester || semester < 1 || semester > 8) {
    return res.status(400).json({ message: "Semester must be between 1 and 8" });
  }

  if (!mobile || !/^\d{10}$/.test(mobile)) {
    return res
      .status(400)
      .json({ message: "Mobile number must be exactly 10 digits" });
  }

  // Update the student
  students[index] = {
    id: studentId,
    name: name.trim(),
    email: email.trim(),
    branch,
    semester: parseInt(semester),
    mobile,
  };

  res.json({
    message: "Student updated successfully",
    student: students[index],
  });
});

// DELETE /api/students/:id - Delete a student
router.delete("/:id", (req, res) => {
  const studentId = parseInt(req.params.id);
  const index = students.findIndex((s) => s.id === studentId);

  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  students.splice(index, 1);

  res.json({ message: "Student deleted successfully" });
});

module.exports = router;
