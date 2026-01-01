require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

// IMPORTANT: load models
require("./models");

const userRoutes = require("./routes");
app.use("/api", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
