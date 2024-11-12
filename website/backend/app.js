const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.static('frontend'));

// Create a connection to the MySQL database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

//Connect to the database 
db.connect((err) => {
  if (err) {
    console.error(`Error connecting to MySQL: ${err.message}`);
    process.exit(1);
  
  } else {
    console.log('Connected to MySQL');
  }
});

// User registration route
app.post('/register', (req, res) => {
    const { fullName, email, phone, password } = req.body;

    // Hash password before saving to the database
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ error: 'Server error' });

        // Insert user data into the database
        const query = 'INSERT INTO users (full_name, email, phone, password) VALUES (?, ?, ?, ?)';
        db.query(query, [fullName, email, phone, hashedPassword], (err, results) => {
            if (err) return res.status(500).json({ error: 'Database error' });
            
            res.status(201).json({ message: 'User registered successfully' });
        });
    });
});

// User login route
app.post('/login', (req, res) => {

    console.log('Login route hit');

    const { email, password } = req.body;

    // Query the database for the user by email
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (results.length === 0) return res.status(400).json({ error: 'User not found' });

        const user = results[0];

        // Compare the hashed password
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return res.status(500).json({ error: 'Server error' });
            if (!isMatch) return res.status(400).json({ error: 'Invalid password' });

            // Generate a JWT token
            //const token = jwt.sign({ id: user.id, fullName: user.full_name }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ message: 'Login successful'/*, token*/ });
        });
    });
});

app.get('/', (req, res) => {
res.sendFile(__dirname + '/frontend/zaicheta_priqteli.html');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});