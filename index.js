const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Example route
app.get("/", (req, res) => {
  res.send("Backend is live!");
});

// Start the server using Render’s expected port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

