const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const authRoutes = require("./routers/authRoutes");
const uploadRoutes = require("./routers/uploadRoutes");

dotenv.config();
console.log("OPENAI_API_KEY loaded:", process.env.OPENAI_API_KEY);
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/users", require("./routers/userRoutes"));
const insightRoutes = require("./routers/insightRoutes");
app.use("/api", insightRoutes);
app.use("/api/admin", require("./routers/adminRoutes"));


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB connected");
        app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
    })
    .catch(err => console.error(err));