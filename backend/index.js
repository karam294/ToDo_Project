const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root", // Replace with your username
    password: "root", // Replace with your password
    database: "todoproject" // Replace with your database name
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to the MySQL database.");
});

// API route to create a user account
app.post("/create-account", async (req, res) => {
    const { username, email, password } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        // Hash the password for security
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the user into the database
        const query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
        db.query(query, [username, email, hashedPassword], (err, result) => {
            if (err) {
                console.error("Error inserting user:", err);
                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(400).json({ error: "Username or email already exists." });
                }
                return res.status(500).json({ error: "Database error." });
            }
            res.status(201).json({ message: "User created successfully." });
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

//login logic
const jwt = require("jsonwebtoken");

// Secret key for signing JWTs (keep this secure in production!)
const SECRET_KEY = "your_secret_key";

// API route for user login
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
    }

    // Query the database for the user
    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], async (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Internal server error." });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: "Invalid email or password." });
        }

        const user = results[0];

        // Compare the entered password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid email or password." });
        }

        // Create a JWT token
        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

        // Respond with the token
        res.status(200).json({ message: "Login successful!", token });
    });
});
// API route to get user info based on email (for the Main page)
app.get("/getUserInfo", (req, res) => {
    const { email } = req.query;  // Get email from query parameter

    // Query the database for the user info
    const query = "SELECT id, username, email FROM users WHERE email = ?";
    db.query(query, [email], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Internal server error." });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "User not found." });
        }

        // Send user data (id, username, email)
        res.status(200).json(results[0]);
    });
});
// API route to get tasks based on user id
app.get("/getTasks", (req, res) => {
    const { userId } = req.query;  // Get userId from query parameter

    // Query the database for tasks based on user id
    const query = "SELECT * FROM tasks WHERE user_id = ?";
    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Internal server error." });
        }

        // Return tasks data
        res.status(200).json(results);
    });
});


// API route to delete a task by ID
app.delete("/deleteTask/:taskId", (req, res) => {
    const taskId = req.params.taskId;

    // Query to delete the task
    const query = "DELETE FROM tasks WHERE id = ?";
    db.query(query, [taskId], (err, result) => {
        if (err) {
            console.error("Error deleting task:", err);
            return res.status(500).json({ error: "Failed to delete task." });
        }
        res.status(200).json({ message: "Task deleted successfully." });
    });
});

// API route to add a new task


    app.post("/addTask", (req, res) => {
        const { user_id, title, description, due_date, completed } = req.body;
    
        // Validate required fields
        if (!user_id || !title || !description || !due_date) {
            return res.status(400).json({ error: "All fields are required." });
        }
    
        // Insert the new task into the database, now including user_id
        const query = "INSERT INTO tasks (user_id, title, description, due_date, completed) VALUES (?, ?, ?, ?, ?)";
        db.query(query, [user_id, title, description, due_date, completed], (err, result) => {
            if (err) {
                console.error("Error adding task:", err);
                return res.status(500).json({ error: "Failed to add task." });
            }
            res.status(201).json({ message: "Task added successfully." });
        });
    });
    