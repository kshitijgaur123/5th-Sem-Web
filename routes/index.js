const express = require('express');
const router = express.Router();
//Home
router.get('/', (req,res)=>{
    res.render("welcome");
})


module.exports = router