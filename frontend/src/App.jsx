import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";

/* =========================================================
   100 VEHICLES
========================================================= */

const vehicleTypes = ["Truck", "Van", "Bus"];

const vehicleStatuses = ["Active", "Idle", "Maintenance"];

const vehicleLocations = [
  "Chennai",
  "Tambaram",
  "Guindy",
  "T Nagar",
  "Velachery",
  "Adyar",
  "Avadi",
  "Ambattur",
  "Porur",
  "Perungalathur",
  "Chromepet",
  "Pallavaram",
  "Sholinganallur",
  "OMR",
  "Anna Nagar",
  "Mylapore",
  "Egmore",
  "Guindy Industrial Estate",
  "Sriperumbudur",
  "Oragadam",
];

const vehicles = Array.from({ length: 100 }, (_, index) => {
  const number = index + 1;

  const type = vehicleTypes[index % vehicleTypes.length];

  const status =
    vehicleStatuses[index % vehicleStatuses.length];

  const fuel = 30 + ((index * 7) % 71);

  const speed =
    status === "Active"
      ? 40 + ((index * 5) % 41)
      : 0;

  const location =
    vehicleLocations[index % vehicleLocations.length];

  return {
    id: `TN-${String(number).padStart(2, "0")}`,
    type,
    status,
    fuel,
    speed,
    location,
  };
});

/* =========================================================
   100 TRIPS
========================================================= */

const tripRoutes = [
  "Chennai → Bangalore",
  "Chennai → Pondicherry",
  "Chennai → Vellore",
  "Chennai → Salem",
  "Chennai → Coimbatore",
  "Chennai → Madurai",
  "Chennai → Trichy",
  "Chennai → Tirunelveli",
  "Chennai → Kanchipuram",
  "Chennai → Hosur",
];

const tripStatuses = [
  "Completed",
  "Running",
  "Scheduled",
];

const trips = Array.from({ length: 100 }, (_, index) => ({
  id: `TR-${101 + index}`,
  vehicle: `TN-${String((index % 100) + 1).padStart(2, "0")}`,
  route: tripRoutes[index % tripRoutes.length],
  distance: `${120 + ((index * 23) % 381)} km`,
  status: tripStatuses[index % tripStatuses.length],
}));

/* =========================================================
   100 MAINTENANCE RECORDS
========================================================= */

const maintenanceIssues = [
  "Service Overdue",
  "Service Due Soon",
  "Engine Inspection",
  "Oil Change",
  "Brake Inspection",
  "Tyre Check",
  "Battery Check",
  "Maintenance Good",
];

const priorities = ["High", "Medium", "Low"];

const maintenance = Array.from(
  { length: 100 },
  (_, index) => ({
    vehicle: `TN-${String((index % 100) + 1).padStart(2, "0")}`,
    issue:
      maintenanceIssues[
        index % maintenanceIssues.length
      ],
    date: `${15 + (index % 15)} Aug 2026`,
    priority:
      priorities[index % priorities.length],
  })
);

/* =========================================================
   MAP COORDINATES
   Simulated Chennai coordinates for demo
========================================================= */

const vehicleCoordinates = Array.from(
  { length: 100 },
  (_, index) => {
    const row = Math.floor(index / 10);
    const column = index % 10;

    return [
      13.0827 + row * 0.008,
      80.2707 + column * 0.008,
    ];
  }
);

/* =========================================================
   LOGIN + TRUCK TRANSITION
========================================================= */

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();

    setError("");

    if (
      username.trim() === "admin" &&
      password === "1234"
    ) {
      setLoggingIn(true);

      setTimeout(() => {
        onLogin();
      }, 1400);

      return;
    }

    setError("Invalid username or password");
  };

  if (loggingIn) {
    return (
      <div className="login-page">
        <div className="login-transition">
          <div className="truck-road">
            <div className="truck-animation">
              🚛
            </div>
          </div>

          <h1>FleetPro</h1>

          <p>
            Opening Fleet Management Dashboard...
          </p>

          <div className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page">
      <div className="login-background-circle circle-one"></div>
      <div className="login-background-circle circle-two"></div>

      <div className="login-container">
        <div className="login-vehicle">
          🚛
        </div>

        <div className="login-box">
          <div className="login-logo">
            🚛
          </div>

          <h1>FleetPro</h1>

          <p className="login-subtitle">
            Fleet Management Dashboard
          </p>

          <div className="login-line"></div>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Username</label>

              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                autoComplete="username"
              />
            </div>

            <div className="input-group">
              <label>Password</label>

              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="login-error">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="login-btn"
            >
              Login to Dashboard
              <span>→</span>
            </button>
          </form>

          <div className="login-footer">
            🔒 Secure Admin Access
          </div>

          <div className="demo-login">
            Demo Login: admin / 1234
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   ERROR BOUNDARY
========================================================= */

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      errorMessage: "",
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      errorMessage:
        error?.message || "Unknown error",
    };
  }

  componentDidCatch(error, info) {
    console.error("FleetPro Error:", error);
    console.error("Component Info:", info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "30px",
            background: "#f1f5f9",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "35px",
              borderRadius: "18px",
              maxWidth: "600px",
              width: "100%",
              textAlign: "center",
              boxShadow:
                "0 15px 40px rgba(15,23,42,0.12)",
            }}
          >
            <div style={{ fontSize: "50px" }}>
              ⚠️
            </div>

            <h1>FleetPro Error</h1>

            <p>
              Something went wrong while loading
              this page.
            </p>

            <small>
              {this.state.errorMessage}
            </small>

            <br />
            <br />

            <button
              onClick={() =>
                window.location.reload()
              }
              style={{
                padding: "12px 22px",
                border: "none",
                borderRadius: "10px",
                background: "#2563eb",
                color: "#fff",
                cursor: "pointer",
                fontWeight: "700",
              }}
            >
              Reload Dashboard
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/* =========================================================
   MAIN APP
========================================================= */

function App() {
  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  const [activeMenu, setActiveMenu] =
    useState("Dashboard");

  const [selectedVehicle, setSelectedVehicle] =
    useState(null);

  const [selectedReport, setSelectedReport] =
    useState(null);

  const totalVehicles = vehicles.length;

  const activeVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.status === "Active"
  ).length;

  const idleVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.status === "Idle"
  ).length;

  const maintenanceVehicles =
    vehicles.filter(
      (vehicle) =>
        vehicle.status === "Maintenance"
    ).length;

  const averageSpeed = Math.round(
    vehicles.reduce(
      (sum, vehicle) =>
        sum + vehicle.speed,
      0
    ) / vehicles.length
  );

  const goToMenu = (menu) => {
    setActiveMenu(menu);
    setSelectedVehicle(null);
    setSelectedReport(null);
  };

  /* =======================================================
     DASHBOARD
  ======================================================= */

  const Dashboard = () => (
    <>
      <div className="page-title">
        <div>
          <h1>
            Fleet Management Dashboard
          </h1>

          <p>
            Smart Fleet Operations •
            Vehicle Monitoring • Fuel •
            Maintenance
          </p>
        </div>
      </div>

      <div className="cards">
        <div
          className="card clickable"
          onClick={() =>
            goToMenu("Vehicles")
          }
        >
          <div className="card-icon">
            🚛
          </div>

          <div>
            <h3>Total Vehicles</h3>

            <h2>
              {totalVehicles}
            </h2>

            <span>
              View all vehicles →
            </span>
          </div>
        </div>

        <div
          className="card clickable"
          onClick={() =>
            goToMenu("Live Tracking")
          }
        >
          <div className="card-icon">
            🟢
          </div>

          <div>
            <h3>Active Vehicles</h3>

            <h2>
              {activeVehicles}
            </h2>

            <span>
              Live tracking →
            </span>
          </div>
        </div>

        <div
          className="card clickable"
          onClick={() =>
            goToMenu("Idle Vehicles")
          }
        >
          <div className="card-icon">
            ⏸️
          </div>

          <div>
            <h3>Idle Vehicles</h3>

            <h2>
              {idleVehicles}
            </h2>

            <span>
              View idle vehicles →
            </span>
          </div>
        </div>

        <div
          className="card clickable"
          onClick={() =>
            goToMenu("Maintenance")
          }
        >
          <div className="card-icon">
            🔧
          </div>

          <div>
            <h3>Maintenance</h3>

            <h2>
              {maintenanceVehicles}
            </h2>

            <span>
              Maintenance records →
            </span>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <div>
            <h2>Fleet Health</h2>

            <p>
              Overall fleet performance
            </p>
          </div>

          <strong className="health-score">
            87%
          </strong>
        </div>

        <div className="health-bars">
          <div>
            <span>Utilization</span>
            <b>91%</b>

            <div className="progress">
              <div
                style={{
                  width: "91%",
                }}
              ></div>
            </div>
          </div>

          <div>
            <span>Maintenance</span>
            <b>84%</b>

            <div className="progress">
              <div
                style={{
                  width: "84%",
                }}
              ></div>
            </div>
          </div>

          <div>
            <span>Fuel Efficiency</span>
            <b>89%</b>

            <div className="progress">
              <div
                style={{
                  width: "89%",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <div>
            <h2>
              Vehicle Overview
            </h2>

            <p>
              Sample fleet vehicles
            </p>
          </div>

          <button
            className="panel-button"
            onClick={() =>
              goToMenu("Vehicles")
            }
          >
            View All 100
          </button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Vehicle ID</th>
                <th>Type</th>
                <th>Status</th>
                <th>Fuel</th>
                <th>Speed</th>
                <th>Location</th>
              </tr>
            </thead>

            <tbody>
              {vehicles
                .slice(0, 10)
                .map((vehicle) => (
                  <tr
                    key={vehicle.id}
                    onClick={() =>
                      setSelectedVehicle(
                        vehicle
                      )
                    }
                    className="clickable-row"
                  >
                    <td>
                      {vehicle.id}
                    </td>

                    <td>
                      {vehicle.type}
                    </td>

                    <td>
                      <span
                        className={`status ${vehicle.status.toLowerCase()}`}
                      >
                        {vehicle.status}
                      </span>
                    </td>

                    <td>
                      {vehicle.fuel}%
                    </td>

                    <td>
                      {vehicle.speed} km/h
                    </td>

                    <td>
                      {vehicle.location}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  /* =======================================================
     VEHICLES
  ======================================================= */

  const Vehicles = () => (
    <>
      <div className="page-title">
        <div>
          <h1>
            Vehicle Management
          </h1>

          <p>
            Manage and monitor all 100
            vehicles
          </p>
        </div>
      </div>

      <div className="cards">
        <div className="card">
          <div className="card-icon">
            🚛
          </div>

          <div>
            <h3>Total</h3>

            <h2>
              {totalVehicles}
            </h2>
          </div>
        </div>

        <div className="card">
          <div className="card-icon">
            🟢
          </div>

          <div>
            <h3>Active</h3>

            <h2>
              {activeVehicles}
            </h2>
          </div>
        </div>

        <div className="card">
          <div className="card-icon">
            ⏸️
          </div>

          <div>
            <h3>Idle</h3>

            <h2>
              {idleVehicles}
            </h2>
          </div>
        </div>

        <div className="card">
          <div className="card-icon">
            🔧
          </div>

          <div>
            <h3>Maintenance</h3>

            <h2>
              {maintenanceVehicles}
            </h2>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <div>
            <h2>All Vehicles</h2>

            <p>
              100 fleet records
            </p>
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Status</th>
                <th>Fuel</th>
                <th>Speed</th>
                <th>Location</th>
              </tr>
            </thead>

            <tbody>
              {vehicles.map((vehicle) => (
                <tr
                  key={vehicle.id}
                  onClick={() =>
                    setSelectedVehicle(
                      vehicle
                    )
                  }
                  className="clickable-row"
                >
                  <td>
                    <strong>
                      {vehicle.id}
                    </strong>
                  </td>

                  <td>
                    {vehicle.type}
                  </td>

                  <td>
                    <span
                      className={`status ${vehicle.status.toLowerCase()}`}
                    >
                      {vehicle.status}
                    </span>
                  </td>

                  <td>
                    {vehicle.fuel}%
                  </td>

                  <td>
                    {vehicle.speed} km/h
                  </td>

                  <td>
                    {vehicle.location}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  /* =======================================================
     IDLE VEHICLES
     DO NOT CHANGE
  ======================================================= */

  const IdleVehicles = () => {
    const idleList = vehicles.filter(
      (vehicle) =>
        vehicle.status === "Idle"
    );

    return (
      <>
        <div className="page-title">
          <div>
            <h1>Idle Vehicles</h1>

            <p>
              Vehicles currently not in
              operation
            </p>
          </div>
        </div>

        <div className="cards">
          <div className="card">
            <div className="card-icon">
              ⏸️
            </div>

            <div>
              <h3>Idle Vehicles</h3>

              <h2>
                {idleList.length}
              </h2>

              <span>
                Currently idle
              </span>
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <h2>
                Idle Vehicle Details
              </h2>

              <p>
                {idleList.length} vehicles
                are currently idle
              </p>
            </div>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Vehicle ID</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Fuel</th>
                  <th>Speed</th>
                  <th>Location</th>
                </tr>
              </thead>

              <tbody>
                {idleList.map(
                  (vehicle) => (
                    <tr
                      key={vehicle.id}
                      onClick={() =>
                        setSelectedVehicle(
                          vehicle
                        )
                      }
                      className="clickable-row"
                    >
                      <td>
                        <strong>
                          {vehicle.id}
                        </strong>
                      </td>

                      <td>
                        {vehicle.type}
                      </td>

                      <td>
                        <span className="status idle">
                          Idle
                        </span>
                      </td>

                      <td>
                        {vehicle.fuel}%
                      </td>

                      <td>
                        {vehicle.speed} km/h
                      </td>

                      <td>
                        {vehicle.location}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };

  /* =======================================================
     TRIPS
  ======================================================= */

  const Trips = () => (
    <>
      <div className="page-title">
        <div>
          <h1>Trip Management</h1>

          <p>
            100 trip records and route
            information
          </p>
        </div>
      </div>

      <div className="trip-grid">
        {trips.map((trip) => (
          <div
            className="trip-card"
            key={trip.id}
          >
            <div className="trip-top">
              <strong>
                {trip.id}
              </strong>

              <span
                className={`trip-status ${trip.status.toLowerCase()}`}
              >
                {trip.status}
              </span>
            </div>

            <h3>
              {trip.vehicle}
            </h3>

            <p>
              🛣️ {trip.route}
            </p>

            <p>
              📏 {trip.distance}
            </p>
          </div>
        ))}
      </div>
    </>
  );

  /* =======================================================
     FUEL MANAGEMENT
  ======================================================= */

  const FuelManagement = () => {
    const [fuelTab, setFuelTab] =
      useState("Overview");

    const weeklyFuel = [
      {
        day: "Monday",
        fuel: 165,
      },
      {
        day: "Tuesday",
        fuel: 190,
      },
      {
        day: "Wednesday",
        fuel: 145,
      },
      {
        day: "Thursday",
        fuel: 210,
      },
      {
        day: "Friday",
        fuel: 180,
      },
      {
        day: "Saturday",
        fuel: 155,
      },
      {
        day: "Sunday",
        fuel: 203,
      },
    ];

    return (
      <>
        <div className="page-title">
          <div>
            <h1>
              Fuel Management
            </h1>

            <p>
              Monitor fuel consumption
              and efficiency
            </p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() =>
              setFuelTab("Overview")
            }
            style={{
              padding:
                "10px 18px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              background:
                fuelTab === "Overview"
                  ? "#2563eb"
                  : "#e9eef5",
              color:
                fuelTab === "Overview"
                  ? "white"
                  : "#334155",
              fontWeight: 600,
            }}
          >
            📊 Overview
          </button>

          <button
            onClick={() =>
              setFuelTab("Consumption")
            }
            style={{
              padding:
                "10px 18px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              background:
                fuelTab ===
                "Consumption"
                  ? "#2563eb"
                  : "#e9eef5",
              color:
                fuelTab ===
                "Consumption"
                  ? "white"
                  : "#334155",
              fontWeight: 600,
            }}
          >
            ⛽ Consumption
          </button>
        </div>

        {fuelTab === "Overview" ? (
          <>
            <div className="cards">
              <div className="card">
                <div className="card-icon">
                  ⛽
                </div>

                <div>
                  <h3>
                    Total Fuel Used
                  </h3>

                  <h2>
                    1,248 L
                  </h2>
                </div>
              </div>

              <div className="card">
                <div className="card-icon">
                  💰
                </div>

                <div>
                  <h3>
                    Monthly Fuel Cost
                  </h3>

                  <h2>
                    ₹1,12,500
                  </h2>
                </div>
              </div>

              <div className="card">
                <div className="card-icon">
                  📈
                </div>

                <div>
                  <h3>
                    Average Efficiency
                  </h3>

                  <h2>
                    10.8 km/L
                  </h2>
                </div>
              </div>

              <div className="card">
                <div className="card-icon">
                  🏆
                </div>

                <div>
                  <h3>
                    Best Efficiency
                  </h3>

                  <h2>
                    12.4 km/L
                  </h2>
                </div>
              </div>
            </div>

            <div className="panel">
              <h2>
                Weekly Fuel Consumption
              </h2>

              <div className="weekly-bars">
                {weeklyFuel.map(
                  (item) => (
                    <div
                      className="bar-column"
                      key={item.day}
                    >
                      <div
                        className="bar"
                        style={{
                          height: `${item.fuel}px`,
                        }}
                        title={`${item.day}: ${item.fuel} L`}
                      ></div>

                      <span>
                        {item.day.slice(
                          0,
                          3
                        )}
                      </span>

                      <small>
                        {item.fuel} L
                      </small>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="panel">
              <h2>
                Fuel Status by Vehicle
              </h2>

              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>
                        Vehicle
                      </th>

                      <th>
                        Fuel Level
                      </th>

                      <th>
                        Status
                      </th>

                      <th>
                        Location
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {vehicles.map(
                      (vehicle) => (
                        <tr
                          key={
                            vehicle.id
                          }
                        >
                          <td>
                            {vehicle.id}
                          </td>

                          <td>
                            {vehicle.fuel}%
                          </td>

                          <td>
                            {vehicle.fuel <
                            40
                              ? "Low Fuel"
                              : "Normal"}
                          </td>

                          <td>
                            {
                              vehicle.location
                            }
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="cards">
              <div className="card">
                <div className="card-icon">
                  ⛽
                </div>

                <div>
                  <h3>
                    Total Consumption
                  </h3>

                  <h2>
                    1,248 L
                  </h2>

                  <p>
                    Current month
                  </p>
                </div>
              </div>

              <div className="card">
                <div className="card-icon">
                  📅
                </div>

                <div>
                  <h3>
                    Daily Average
                  </h3>

                  <h2>
                    178 L
                  </h2>

                  <p>
                    Average per day
                  </p>
                </div>
              </div>

              <div className="card">
                <div className="card-icon">
                  🚛
                </div>

                <div>
                  <h3>
                    Vehicles Tracked
                  </h3>

                  <h2>100</h2>

                  <p>
                    Fleet vehicles
                  </p>
                </div>
              </div>

              <div className="card">
                <div className="card-icon">
                  📊
                </div>

                <div>
                  <h3>
                    Average Efficiency
                  </h3>

                  <h2>
                    10.8 km/L
                  </h2>

                  <p>
                    Fleet average
                  </p>
                </div>
              </div>
            </div>

            <div className="panel">
              <h2>
                ⛽ Consumption Details
              </h2>

              <p>
                Daily fuel consumption
                and estimated cost
              </p>

              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Day</th>
                      <th>
                        Fuel Used
                      </th>
                      <th>
                        Estimated Cost
                      </th>
                      <th>
                        Efficiency
                      </th>
                      <th>
                        Consumption Level
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {weeklyFuel.map(
                      (item, index) => {
                        const efficiency =
                          (
                            9.8 +
                            (index % 5) *
                              0.3
                          ).toFixed(1);

                        const cost =
                          item.fuel * 90;

                        const level =
                          item.fuel >=
                          195
                            ? "High"
                            : item.fuel >=
                              175
                            ? "Medium"
                            : "Low";

                        return (
                          <tr
                            key={
                              item.day
                            }
                          >
                            <td>
                              <strong>
                                {
                                  item.day
                                }
                              </strong>
                            </td>

                            <td>
                              {item.fuel} L
                            </td>

                            <td>
                              ₹
                              {cost.toLocaleString(
                                "en-IN"
                              )}
                            </td>

                            <td>
                              {efficiency}{" "}
                              km/L
                            </td>

                            <td>
                              <span
                                className={`priority ${level.toLowerCase()}`}
                              >
                                {level}
                              </span>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="panel">
              <h2>
                Vehicle-wise Consumption
              </h2>

              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>
                        Vehicle
                      </th>

                      <th>Type</th>

                      <th>
                        Fuel Level
                      </th>

                      <th>
                        Efficiency
                      </th>

                      <th>
                        Location
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {vehicles.map(
                      (vehicle) => (
                        <tr
                          key={
                            vehicle.id
                          }
                        >
                          <td>
                            <strong>
                              {
                                vehicle.id
                              }
                            </strong>
                          </td>

                          <td>
                            {
                              vehicle.type
                            }
                          </td>

                          <td>
                            {vehicle.fuel}%
                          </td>

                          <td>
                            {(
                              8 +
                              (vehicle.fuel %
                                45) /
                                10
                            ).toFixed(
                              1
                            )}{" "}
                            km/L
                          </td>

                          <td>
                            {
                              vehicle.location
                            }
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </>
    );
  };

  /* =======================================================
     MAINTENANCE
  ======================================================= */

  const Maintenance = () => (
    <>
      <div className="page-title">
        <div>
          <h1>
            Maintenance Management
          </h1>

          <p>
            100 maintenance records
          </p>
        </div>
      </div>

      <div className="panel">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Vehicle</th>
                <th>Issue</th>
                <th>Date</th>
                <th>Priority</th>
              </tr>
            </thead>

            <tbody>
              {maintenance.map(
                (item, index) => (
                  <tr key={index}>
                    <td>
                      <strong>
                        {item.vehicle}
                      </strong>
                    </td>

                    <td>
                      {item.issue}
                    </td>

                    <td>
                      {item.date}
                    </td>

                    <td>
                      <span
                        className={`priority ${item.priority.toLowerCase()}`}
                      >
                        {item.priority}
                      </span>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  /* =======================================================
     ANALYTICS
  ======================================================= */

  const Analytics = () => (
    <>
      <div className="page-title">
        <div>
          <h1>
            Fleet Analytics
          </h1>

          <p>
            Vehicle utilization and
            operational efficiency
          </p>
        </div>
      </div>

      <div className="cards">
        <div className="card">
          <div className="card-icon">
            📊
          </div>

          <div>
            <h3>
              Fleet Utilization
            </h3>

            <h2>91%</h2>
          </div>
        </div>

        <div className="card">
          <div className="card-icon">
            ⚡
          </div>

          <div>
            <h3>
              Average Speed
            </h3>

            <h2>
              {averageSpeed} km/h
            </h2>
          </div>
        </div>

        <div className="card">
          <div className="card-icon">
            🔧
          </div>

          <div>
            <h3>
              Maintenance Score
            </h3>

            <h2>84%</h2>
          </div>
        </div>

        <div className="card">
          <div className="card-icon">
            ⛽
          </div>

          <div>
            <h3>
              Fuel Efficiency
            </h3>

            <h2>89%</h2>
          </div>
        </div>
      </div>

      <div className="panel">
        <h2>
          Vehicle Utilization Analysis
        </h2>

        <div className="analytics-grid">
          {vehicles.map(
            (vehicle) => {
              const utilization =
                vehicle.status ===
                "Active"
                  ? 90
                  : vehicle.status ===
                    "Idle"
                  ? 45
                  : 20;

              return (
                <div
                  className="util-row"
                  key={vehicle.id}
                >
                  <span>
                    {vehicle.id}
                  </span>

                  <div className="util-progress">
                    <div
                      style={{
                        width: `${utilization}%`,
                      }}
                    ></div>
                  </div>

                  <b>
                    {utilization}%
                  </b>
                </div>
              );
            }
          )}
        </div>
      </div>
    </>
  );

  /* =======================================================
     LIVE TRACKING
  ======================================================= */

  const LiveTracking = () => (
    <>
      <div className="page-title">
        <div>
          <h1>
            Live Tracking
          </h1>

          <p>
            Real-time vehicle status
            monitoring
          </p>
        </div>

        <span className="live-badge">
          ● LIVE
        </span>
      </div>

      <div
        className="panel"
        style={{
          padding: "0",
          overflow: "hidden",
          height: "620px",
        }}
      >
        <MapContainer
          center={[
            13.0827,
            80.2707,
          ]}
          zoom={11}
          scrollWheelZoom={true}
          style={{
            width: "100%",
            height: "100%",
            minHeight: "620px",
          }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {vehicles.map(
            (
              vehicle,
              vehicleIndex
            ) => {
              const position =
                vehicleCoordinates[
                  vehicleIndex
                ];

              const markerColor =
                vehicle.status ===
                "Active"
                  ? "#16a34a"
                  : vehicle.status ===
                    "Idle"
                  ? "#f59e0b"
                  : "#dc2626";

              return (
                <CircleMarker
                  key={
                    vehicle.id
                  }
                  center={
                    position
                  }
                  radius={8}
                  pathOptions={{
                    color:
                      markerColor,
                    fillColor:
                      markerColor,
                    fillOpacity: 0.9,
                  }}
                >
                  <Popup>
                    <div
                      style={{
                        minWidth:
                          "180px",
                      }}
                    >
                      <h3
                        style={{
                          margin:
                            "0 0 8px",
                        }}
                      >
                        🚛{" "}
                        {
                          vehicle.id
                        }
                      </h3>

                      <p>
                        <strong>
                          Type:
                        </strong>{" "}
                        {
                          vehicle.type
                        }
                      </p>

                      <p>
                        <strong>
                          Status:
                        </strong>{" "}
                        {
                          vehicle.status
                        }
                      </p>

                      <p>
                        <strong>
                          Fuel:
                        </strong>{" "}
                        {
                          vehicle.fuel
                        }%
                      </p>

                      <p>
                        <strong>
                          Speed:
                        </strong>{" "}
                        {
                          vehicle.speed
                        }{" "}
                        km/h
                      </p>

                      <p>
                        <strong>
                          Location:
                        </strong>{" "}
                        {
                          vehicle.location
                        }
                      </p>
                    </div>
                  </Popup>
                </CircleMarker>
              );
            }
          )}
        </MapContainer>
      </div>

      <div
        className="tracking-list"
        style={{
          marginTop: "20px",
        }}
      >
        {vehicles
          .filter(
            (vehicle) =>
              vehicle.status ===
              "Active"
          )
          .slice(0, 10)
          .map((vehicle) => (
            <div
              className="tracking-card"
              key={vehicle.id}
            >
              <div>
                <h3>
                  {vehicle.id}
                </h3>

                <p>
                  {vehicle.type} •{" "}
                  {vehicle.location}
                </p>
              </div>

              <div>
                <strong>
                  {vehicle.speed} km/h
                </strong>

                <p>
                  {vehicle.status}
                </p>
              </div>

              <div>
                <span className="status active">
                  Active
                </span>
              </div>
            </div>
          ))}
      </div>
    </>
  );

  /* =======================================================
     PREDICTIONS
  ======================================================= */

  const Predictions = () => {
    const lowestFuel =
      [...vehicles].sort(
        (a, b) =>
          a.fuel - b.fuel
      )[0];

    const highestSpeed =
      [...vehicles].sort(
        (a, b) =>
          b.speed - a.speed
      )[0];

    const nextMaintenance =
      vehicles.find(
        (vehicle) =>
          vehicle.status ===
          "Maintenance"
      );

    return (
      <>
        <div className="page-title">
          <div>
            <h1>
              AI Predictions
            </h1>

            <p>
              Predictive fleet insights
            </p>
          </div>
        </div>

        <div className="prediction-grid">
          <div className="prediction-card">
            <div className="prediction-icon">
              🔧
            </div>

            <h2>
              Maintenance Prediction
            </h2>

            <h3>
              {nextMaintenance?.id}
            </h3>

            <p>
              Vehicle requires
              maintenance attention.
            </p>
          </div>

          <div className="prediction-card">
            <div className="prediction-icon">
              ⛽
            </div>

            <h2>
              Fuel Alert
            </h2>

            <h3>
              {lowestFuel.id}
            </h3>

            <p>
              Fuel level is{" "}
              {lowestFuel.fuel}%.
            </p>
          </div>

          <div className="prediction-card">
            <div className="prediction-icon">
              🚀
            </div>

            <h2>
              Speed Monitoring
            </h2>

            <h3>
              {highestSpeed.id}
            </h3>

            <p>
              Current speed:{" "}
              {highestSpeed.speed}{" "}
              km/h.
            </p>
          </div>
        </div>
      </>
    );
  };

  /* =======================================================
     REPORTS
  ======================================================= */

  const Reports = () => {
    if (selectedReport) {
      return (
        <div className="report-details-page">
          <div className="report-top">
            <button
              className="back-button"
              onClick={() =>
                setSelectedReport(
                  null
                )
              }
            >
              ← Back to Reports
            </button>

            <button
              className="print-button"
              onClick={() =>
                window.print()
              }
            >
              🖨 Print / Save PDF
            </button>
          </div>

          {selectedReport ===
            "Vehicle Report" && (
            <>
              <h1 className="report-title">
                Vehicle Report
              </h1>

              <div className="summary-box">
                <div>
                  <span>
                    Total
                  </span>

                  <strong>
                    {
                      totalVehicles
                    }
                  </strong>
                </div>

                <div>
                  <span>
                    Active
                  </span>

                  <strong>
                    {
                      activeVehicles
                    }
                  </strong>
                </div>

                <div>
                  <span>
                    Idle
                  </span>

                  <strong>
                    {
                      idleVehicles
                    }
                  </strong>
                </div>

                <div>
                  <span>
                    Maintenance
                  </span>

                  <strong>
                    {
                      maintenanceVehicles
                    }
                  </strong>
                </div>
              </div>

              <div className="panel">
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>
                          Type
                        </th>
                        <th>
                          Status
                        </th>
                        <th>
                          Fuel
                        </th>
                        <th>
                          Speed
                        </th>
                        <th>
                          Location
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {vehicles.map(
                        (
                          vehicle
                        ) => (
                          <tr
                            key={
                              vehicle.id
                            }
                          >
                            <td>
                              {
                                vehicle.id
                              }
                            </td>

                            <td>
                              {
                                vehicle.type
                              }
                            </td>

                            <td>
                              {
                                vehicle.status
                              }
                            </td>

                            <td>
                              {
                                vehicle.fuel
                              }%
                            </td>

                            <td>
                              {
                                vehicle.speed
                              }{" "}
                              km/h
                            </td>

                            <td>
                              {
                                vehicle.location
                              }
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {selectedReport ===
            "Fuel Report" && (
            <>
              <h1 className="report-title">
                Fuel Consumption Report
              </h1>

              <div className="cards">
                <div className="card">
                  <h3>
                    Total Fuel Used
                  </h3>

                  <h2>
                    1,248 L
                  </h2>
                </div>

                <div className="card">
                  <h3>
                    Monthly Cost
                  </h3>

                  <h2>
                    ₹1,12,500
                  </h2>
                </div>

                <div className="card">
                  <h3>
                    Average Efficiency
                  </h3>

                  <h2>
                    10.8 km/L
                  </h2>
                </div>
              </div>

              <div className="panel">
                <h2>
                  Fuel Levels
                </h2>

                <div className="fuel-report-list">
                  {vehicles.map(
                    (vehicle) => (
                      <div
                        key={
                          vehicle.id
                        }
                      >
                        <span>
                          {
                            vehicle.id
                          }
                        </span>

                        <span>
                          {
                            vehicle.fuel
                          }%
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </>
          )}

          {selectedReport ===
            "Maintenance Report" && (
            <>
              <h1 className="report-title">
                Maintenance Report
              </h1>

              <div className="panel">
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>
                          Vehicle
                        </th>
                        <th>
                          Issue
                        </th>
                        <th>
                          Date
                        </th>
                        <th>
                          Priority
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {maintenance.map(
                        (
                          item,
                          index
                        ) => (
                          <tr
                            key={
                              index
                            }
                          >
                            <td>
                              {
                                item.vehicle
                              }
                            </td>

                            <td>
                              {
                                item.issue
                              }
                            </td>

                            <td>
                              {
                                item.date
                              }
                            </td>

                            <td>
                              {
                                item.priority
                              }
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {selectedReport ===
            "Performance Report" && (
            <>
              <h1 className="report-title">
                Operational Performance
                Report
              </h1>

              <div className="advanced-report-card">
                <h2>
                  Fleet Performance
                </h2>

                <p>
                  Total Vehicles:{" "}
                  <strong>
                    {
                      totalVehicles
                    }
                  </strong>
                </p>

                <p>
                  Active Vehicles:{" "}
                  <strong>
                    {
                      activeVehicles
                    }
                  </strong>
                </p>

                <p>
                  Fleet Utilization:{" "}
                  <strong>
                    91%
                  </strong>
                </p>

                <p>
                  Average Speed:{" "}
                  <strong>
                    {averageSpeed}{" "}
                    km/h
                  </strong>
                </p>

                <p>
                  Fuel Efficiency:{" "}
                  <strong>
                    89%
                  </strong>
                </p>

                <p>
                  Fleet Health Score:{" "}
                  <strong>
                    87%
                  </strong>
                </p>
              </div>
            </>
          )}
        </div>
      );
    }

    return (
      <>
        <div className="page-title">
          <div>
            <h1>Reports</h1>

            <p>
              Generate and view fleet
              reports
            </p>
          </div>
        </div>

        <div className="report-grid">
          <div
            className="advanced-report-card clickable"
            onClick={() =>
              setSelectedReport(
                "Vehicle Report"
              )
            }
          >
            <div className="report-icon">
              🚛
            </div>

            <h2>
              Vehicle Report
            </h2>

            <p>
              View all 100 vehicle
              records.
            </p>

            <button>
              Open Report →
            </button>
          </div>

          <div
            className="advanced-report-card clickable"
            onClick={() =>
              setSelectedReport(
                "Fuel Report"
              )
            }
          >
            <div className="report-icon">
              ⛽
            </div>

            <h2>
              Fuel Report
            </h2>

            <p>
              View fuel usage and
              efficiency.
            </p>

            <button>
              Open Report →
            </button>
          </div>

          <div
            className="advanced-report-card clickable"
            onClick={() =>
              setSelectedReport(
                "Maintenance Report"
              )
            }
          >
            <div className="report-icon">
              🔧
            </div>

            <h2>
              Maintenance Report
            </h2>

            <p>
              View all maintenance
              records.
            </p>

            <button>
              Open Report →
            </button>
          </div>

          <div
            className="advanced-report-card clickable"
            onClick={() =>
              setSelectedReport(
                "Performance Report"
              )
            }
          >
            <div className="report-icon">
              📊
            </div>

            <h2>
              Performance Report
            </h2>

            <p>
              View operational
              performance.
            </p>

            <button>
              Open Report →
            </button>
          </div>
        </div>
      </>
    );
  };

  /* =======================================================
     CONTENT ROUTER
  ======================================================= */

  const renderContent = () => {
    switch (activeMenu) {
      case "Vehicles":
        return <Vehicles />;

      case "Idle Vehicles":
        return <IdleVehicles />;

      case "Trips":
        return <Trips />;

      case "Fuel Management":
        return <FuelManagement />;

      case "Maintenance":
        return <Maintenance />;

      case "Analytics":
        return <Analytics />;

      case "Live Tracking":
        return <LiveTracking />;

      case "Predictions":
        return <Predictions />;

      case "Reports":
        return <Reports />;

      default:
        return <Dashboard />;
    }
  };

  /* =======================================================
     LOGIN
  ======================================================= */

  if (!isLoggedIn) {
    return (
      <LoginPage
        onLogin={() =>
          setIsLoggedIn(true)
        }
      />
    );
  }

  /* =======================================================
     MAIN UI
  ======================================================= */

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">
            🚛
          </div>

          <div>
            <h2>
              FleetPro
            </h2>

            <span>
              Fleet Management
            </span>
          </div>
        </div>

        <nav>
          <button
            className={
              activeMenu ===
              "Dashboard"
                ? "active"
                : ""
            }
            onClick={() =>
              goToMenu("Dashboard")
            }
          >
            🏠 Dashboard
          </button>

          <button
            className={
              activeMenu ===
              "Vehicles"
                ? "active"
                : ""
            }
            onClick={() =>
              goToMenu("Vehicles")
            }
          >
            🚛 Vehicles
          </button>

          <button
            className={
              activeMenu ===
              "Idle Vehicles"
                ? "active"
                : ""
            }
            onClick={() =>
              goToMenu(
                "Idle Vehicles"
              )
            }
          >
            ⏸️ Idle Vehicles
          </button>

          <button
            className={
              activeMenu ===
              "Trips"
                ? "active"
                : ""
            }
            onClick={() =>
              goToMenu("Trips")
            }
          >
            🛣️ Trips
          </button>

          <button
            className={
              activeMenu ===
              "Fuel Management"
                ? "active"
                : ""
            }
            onClick={() =>
              goToMenu(
                "Fuel Management"
              )
            }
          >
            ⛽ Fuel Management
          </button>

          <button
            className={
              activeMenu ===
              "Maintenance"
                ? "active"
                : ""
            }
            onClick={() =>
              goToMenu(
                "Maintenance"
              )
            }
          >
            🔧 Maintenance
          </button>

          <button
            className={
              activeMenu ===
              "Analytics"
                ? "active"
                : ""
            }
            onClick={() =>
              goToMenu(
                "Analytics"
              )
            }
          >
            📊 Analytics
          </button>

          <button
            className={
              activeMenu ===
              "Live Tracking"
                ? "active"
                : ""
            }
            onClick={() =>
              goToMenu(
                "Live Tracking"
              )
            }
          >
            📍 Live Tracking
          </button>

          <button
            className={
              activeMenu ===
              "Predictions"
                ? "active"
                : ""
            }
            onClick={() =>
              goToMenu(
                "Predictions"
              )
            }
          >
            🤖 Predictions
          </button>

          <button
            className={
              activeMenu ===
              "Reports"
                ? "active"
                : ""
            }
            onClick={() =>
              goToMenu("Reports")
            }
          >
            📄 Reports
          </button>
        </nav>

        {/* NO K LETTER */}
        <div className="admin-box">
          <div>
            <strong>
              Kanimozhi
            </strong>

            <span>
              Fleet Manager
            </span>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="header">
          <div>
            <h3>
              {activeMenu}
            </h3>

            <span>
              Smart Fleet Operations
            </span>
          </div>

          <div className="header-right">
            <span className="online">
              ● System Online
            </span>

            {/* NO K LETTER HERE ALSO */}
            <div className="user">
              <span>
                Kanimozhi
              </span>
            </div>
          </div>
        </header>

        <section className="content">
          {renderContent()}
        </section>
      </main>

      {/* ===================================================
          VEHICLE MODAL
      =================================================== */}

      {selectedVehicle && (
        <div
          className="modal-overlay"
          onClick={() =>
            setSelectedVehicle(
              null
            )
          }
        >
          <div
            className="modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <button
              className="modal-close"
              onClick={() =>
                setSelectedVehicle(
                  null
                )
              }
            >
              ×
            </button>

            <div className="modal-header">
              <div className="vehicle-big-icon">
                🚛
              </div>

              <div>
                <h2>
                  {
                    selectedVehicle.id
                  }
                </h2>

                <p>
                  {
                    selectedVehicle.type
                  }
                </p>
              </div>
            </div>

            <div className="modal-details">
              <div>
                <span>
                  Status
                </span>

                <strong>
                  {
                    selectedVehicle.status
                  }
                </strong>
              </div>

              <div>
                <span>
                  Fuel Level
                </span>

                <strong>
                  {
                    selectedVehicle.fuel
                  }%
                </strong>
              </div>

              <div>
                <span>
                  Speed
                </span>

                <strong>
                  {
                    selectedVehicle.speed
                  }{" "}
                  km/h
                </strong>
              </div>

              <div>
                <span>
                  Location
                </span>

                <strong>
                  {
                    selectedVehicle.location
                  }
                </strong>
              </div>
            </div>

            <button
              className="close-modal-button"
              onClick={() =>
                setSelectedVehicle(
                  null
                )
              }
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   EXPORT
========================================================= */

export default function AppWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}
