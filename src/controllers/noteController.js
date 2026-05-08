const prisma = require('../models/db');

exports.getNotes = async (req, res) => {
    try {
        const notes = await prisma.note.findMany({ where: { userId: req.user.id } });
        res.json(notes);
    } catch (e) {
        res.status(500).json({ error: "Server error" });
    }
};

exports.addNote = async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content)
        return res.status(400).json({ error: "Title and content are required" });

    try {
        const note = await prisma.note.create({
            data: { title, content, userId: req.user.id }
        });
        res.status(201).json(note);
    } catch (e) {
        res.status(500).json({ error: "Server error" });
    }
};

exports.editNote = async (req, res) => {
    const { title, content } = req.body;
    const noteId = parseInt(req.params.id);

    if (!title && !content)
        return res.status(400).json({ error: "Provide at least title or content to update" });

    try {
        const existing = await prisma.note.findFirst({
            where: { id: noteId, userId: req.user.id }
        });

        if (!existing)
            return res.status(404).json({ error: "Note not found" });

        const updated = await prisma.note.update({
            where: { id: noteId },
            data: {
                ...(title && { title }),
                ...(content && { content })
            }
        });

        res.json(updated);
    } catch (e) {
        res.status(500).json({ error: "Server error" });
    }
};

exports.deleteNote = async (req, res) => {
    const noteId = parseInt(req.params.id);

    try {
        const existing = await prisma.note.findFirst({
            where: { id: noteId, userId: req.user.id }
        });

        if (!existing)
            return res.status(404).json({ error: "Note not found" });

        await prisma.note.delete({ where: { id: noteId } });
        res.json({ message: "Note deleted successfully" });
    } catch (e) {
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = exports;