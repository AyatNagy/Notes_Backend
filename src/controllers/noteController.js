const prisma = require('../models/db');

exports.getNotes = async (req, res) => {
    const notes = await prisma.note.findMany({ where: { userId: req.user.id } });
    res.json(notes); 
};

exports.addNote = async (req, res) => {
    const { title, content } = req.body;
    const note = await prisma.note.create({
        data: { title, content, userId: req.user.id }
    });
    res.status(201).json(note);
};

exports.deleteNote = async (req, res) => {
    await prisma.note.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: "Note deleted successfully" });
};
module.exports = exports;