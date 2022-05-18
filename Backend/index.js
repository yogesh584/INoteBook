const express = require ("express");
const connection = require ("./db");
const cors = require("cors");
connection();

// EXPRESS SPECIFIC STUFF
const app = express();
app.use(express.json());             // For Getting Json data form User
app.use(cors());


// ROUTES
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

// LISTEN
app.listen(4000,()=>{
    console.log("Website Listening at Port : http://localhost:4000");
});