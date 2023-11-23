// server.js
import express from "express";
const multer = require('multer');
import mongoose from "mongoose"
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 3004; // Choose a port number

// Multer setup for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// MongoDB connection URL
const mongoURL = 'mongodb+srv://mehulkumar:mehulkumar@cluster0.c7du0wu.mongodb.net/';

// Connect to MongoDB
MongoClient.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) throw err;

    const db = client.db('voting'); // Replace with your database name

    // API endpoint for handling file uploads
    app.post('/api/upload', upload.single('file'), (req, res) => {
        const file = req.file;

        // Do something with the file, e.g., save its information in MongoDB
        db.collection('voting').insertOne({ name: file.originalname, data: file.buffer }, (err, result) => {
            if (err) throw err;

            console.log('File uploaded to MongoDB');
            const fileId = result.insertedId;
            res.json({ success: true, fileId: fileId });
        });
    });

    app.get('/api/files/:id', (req, res) => {
        const fileId = req.params.id;

        // Retrieve the file data from MongoDB
        db.collection('voting').findOne({ _id: new ObjectId(fileId) }, (err, result) => {
            if (err) throw err;

            // Serve the file
            res.contentType('image/jpeg'); // Adjust the content type based on your file type
            res.send(result.data);
        });
    });

    // Start the Express server
    mongoose
        .connect(connectionString)
        .then(() => {
            console.log("Mongoose Connected");
            app.listen(port, () => {
                console.log("Server Up and running on port: " + port);
                routes(app);
            });
        })
        .catch((e) => {
            console.log(e);
        });
});
