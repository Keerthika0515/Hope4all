const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt'); // Use bcrypt for password hashing

const app = express();
const port = 3000;

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('public')); // Serve static files

// MySQL Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'orphanage' // Update this with your database name
});

// Establish MySQL Connection
db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL database.');
});

// Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM reg_page WHERE email = ?';
    db.query(sql, [email], (err, results) => {
        if (err) {
            res.status(500).json({ success: false, message: 'Server error' });
            return;
        }

        if (results.length === 0) {
            res.status(400).json({ success: false, message: 'Invalid email or password' });
            return;
        }

        const user = results[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                res.status(500).json({ success: false, message: 'Error during password comparison' });
                return;
            }

            if (!isMatch) {
                res.status(400).json({ success: false, message: 'Invalid email or password' });
                return;
            }

            // Successful login - redirect to index page
            res.redirect('/index');
        });
    });
});

// Serve index.html (home page)
app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
