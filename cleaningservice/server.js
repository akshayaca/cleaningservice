const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5001; // Make sure this port is different from your React app's port

app.use(bodyParser.json());
app.use(cors());

// Helper function to read the database file
const readDB = () => {
    const dbPath = path.join(__dirname, 'src', 'backend', 'db.json');
    const dbFile = fs.readFileSync(dbPath);
    return JSON.parse(dbFile.toString());
  };

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const db = readDB();
  const user = db.employees.find(u => u.email === username && u.password === password);
  
  if (user) {
    res.json({ success: true, message: "Login successful" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
