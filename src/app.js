const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // اتأكدي من المسار
const noteRoutes = require('./routes/noteRoutes'); // اتأكدي من المسار

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/notes', noteRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(` Server is running on http://localhost:${PORT}`);
});