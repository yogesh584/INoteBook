const express = require("express");
const router = express.Router();

const app = express();
app.use(express.urlencoded());      // For Getting Data form User Form Body

router.get('/',(req,res)=>{
    res.send("/api/auth/");
});


module.exports = router;