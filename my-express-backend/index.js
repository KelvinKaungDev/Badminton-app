const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config(); // load .env

// connect MongoDB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const courtRoutes = require("./routes/courtRoutes");
// const bookingRoutes = require("./routes/bookingRoutes");

app.use("/api/courts", courtRoutes);
// app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
