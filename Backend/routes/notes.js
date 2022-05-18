const express = require ("express");
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const notesModel = require('../models/Notes');
const {body, validationResult} = require ("express-validator");

// ROUTES

// GET ALL NOTES
router.get("/getallnotes",fetchuser,async (req,res)=>{
    try {
        const userid = req.user.id;
        const notes = await notesModel.find({user : userid});
        res.json(notes);
    } catch (error) {
        console.error(error);
        res.send("Some Error Occured!");
    }
});

// GET ONLY ONE NOTE
router.get("/getanote/:id",fetchuser,async (req,res)=>{
    try {
        let note = await notesModel.findById(req.params.id);
        
        if(!note){ return res.statusCode(404).send("Not Found")};
        if(note.user.toString() !== req.user.id){
            return res.statusCode(401).send("Not Allowed");
        }

        res.json(note);
    } catch (error) {
        console.error(error);
        res.send("Some Error Occured!");
    }
}); 

// CREATE NEW NOTE
router.post("/addnote",[
    body("title","Enter a valid title").isLength({min: 3}),
    body("description","Description must be atleast 10 char").isLength({min: 5})
],fetchuser,async (req,res)=>{
    //  CHECKING ERRORS
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    try {
        const userid = req.user.id;
        const {title,description,tag} = req.body;
        const note = new notesModel({title: title,desc: description,tag: tag,user: userid});
        const savedNote = await note.save();
        res.send(savedNote);
    } catch (error) {
        console.error(error);
        res.send("Some Error Occured!");
    }
});

// UPDATING A NOTE USING PUT REQUEST
router.put("/updatenote/:id",fetchuser,async (req,res)=>{
    const {title,desc,tag} = req.body;
    try {
        let updateNote = {};
        if(title){updateNote.title = title}
        if(desc){updateNote.desc = desc}
        if(tag){updateNote.tag = tag}
    
        let note = await notesModel.findById(req.params.id);
        if(!note){ return res.status(404).send("Not Found")};
    
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }
    
        note = await notesModel.findByIdAndUpdate(req.params.id,{$set: updateNote},{new: true});
        res.send(note);
    } catch (error) {
        console.error(error);
        res.send("Some Error Occured!");
    }
});

// DELETING A NOTE 
router.delete("/deletenote/:id",fetchuser, async (req,res)=>{
    try {
        let note = await notesModel.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")}
        if(note.user.toString() !== req.user.id){
            return res.statusCode(401).send("Not Allowed");
        }
    
        note = await notesModel.findByIdAndDelete(req.params.id);
        res.json({"Success":"Note has been Deleted"});
    } catch (error) {
        console.error(error);
        res.send("Some Error Occured!");
    }
});

module.exports = router; 