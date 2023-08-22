const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 5000;

app.use(cors());

app.get("/weather", async (req, res) => {
  try {
    const { location } = req.query;
    const apiKey = "90e9aa3641dd4b31a09190503231208"; // Replace with your API key
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
