const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

var fetchuser = require("../middleware/fetchuser");

//api/noes/fetchalluser
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("internal server some error occured");
  }
});
//add new notes api/auth/addnote
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "enter valid title").isLength({ min: 3 }),
    body("description", "enter valid desc").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNote = await note.save();

      res.json(saveNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("internal server some error occured");
    }
  }
);

//api/notes/updatenote

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    const newNote = {};

    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    var note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("not allowed");
    }
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("internal server some error occured");
  }
});

//api/notes/deletenote

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
//   const { title, description, tag } = req.body;
  try {
    const newNote = {};

    // if(title){newNote.title=title};
    // if(description){newNote.description=description};
    // if(tag){newNote.tag=tag};

    var note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("not allowed");
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ sucess: "note has been deleted", note: note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("internal server some error occured");
  }
});
module.exports = router;
