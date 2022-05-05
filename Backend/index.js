const express = require ("express");
const connection = require ("./db");
connection();

// EXPRESS SPECIFIC STUFF
const app = express();

// ROUTES
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

// LISTEN
app.listen(3000,()=>{
    console.log("Website Listening at Port : http://localhost:3000");
});