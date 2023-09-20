const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
let Applicants = require('./models/Applicants')
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://ieeeasb-db:5o3frxOKAMJvd1D7@ieee-db.lla0cvb.mongodb.net/CodeStorm?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

app.use(cors());
app.use(express.json());

// Define your MongoDB Schema and Models here using mongoose

// Define your API routes for fetching data from MongoDB
app.post('/sendUsers',(req,res )=>{
    let rec = req.body
    Applicants.insertMany(rec)
})
app.post('/getUsers',(req,res )=>{
    Applicants.find().then(e=>req.json(e))
    .catch(err=>res.json(err))
})
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
