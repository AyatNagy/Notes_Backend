const prisma = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword }
        });
        const token = jwt.sign({ id: user.id }, 'YOUR_SECRET_KEY');
        res.json({ id: user.id, name: user.name, email: user.email, token });
    } catch (e) { res.status(400).json({ error: "Email already exists" }); }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user.id }, 'YOUR_SECRET_KEY');
        res.json({ id: user.id, name: user.name, email: user.email, token });
    } else { res.status(401).json({ error: "Invalid credentials" }); }
};
module.exports = exports;