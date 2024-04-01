const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 5001;

app.use(bodyParser.json());
app.use(cors());

// MongoDB connection string
const uri = "mongodb+srv://akshayarekhas:KRfsm3QjJk6HoJo7@creds.vmeznli.mongodb.net/";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function main() {
    try {
        await client.connect();
        const database = client.db("logincreds");
        const collection = database.collection("creds");

        app.post('/login', async (req, res) => {
            const { username, password } = req.body;
            const user = await collection.findOne({ email: username, password: password });

            if (user) {
                res.json({ success: true, message: "Login successful" });
            } else {
                res.status(401).json({ success: false, message: "Invalid credentials" });
            }
        });

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (e) {
        console.error(e);
    }
}

main().catch(console.error);
