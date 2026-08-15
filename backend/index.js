 const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Home
app.get("/", (req, res) => {
    res.json({
        message: "Fleet Management Dashboard API is running!"
    });
});

// Vehicle data
app.get("/api/vehicles", (req, res) => {
    res.json([
        {
            id: 1,
            vehicleNumber: "TN01AB1234",
            type: "Truck",
            status: "Active",
            fuel: 75,
            maintenance: "Good"
        },
        {
            id: 2,
            vehicleNumber: "TN02CD5678",
            type: "Van",
            status: "Maintenance",
            fuel: 40,
            maintenance: "Due"
        },
        {
            id: 3,
            vehicleNumber: "TN03EF9012",
            type: "Bus",
            status: "Active",
            fuel: 90,
            maintenance: "Good"
        }
    ]);
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Fleet Server running on http://localhost:${PORT}`);
});