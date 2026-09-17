import React, { Component, useState } from "react";
import "./App.css";

/* =========================================================
   ERROR BOUNDARY
   Prevents complete white screen when a React render error
   happens inside the dashboard.
========================================================= */

class ErrorBoundary extends Component {
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
      errorMessage: error?.message || "Unknown application error",
    };
  }

  componentDidCatch(error, info) {
    console.error("FleetPro render error:", error);
    console.error("Component stack:", info?.componentStack);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f8fafc",
            padding: "30px",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <div
            style={{
              maxWidth: "600px",
              width: "100%",
              background: "#ffffff",
              borderRadius: "18px",
              padding: "35px",
              textAlign: "center",
              boxShadow: "0 15px 40px rgba(0,0,0,0.10)",
            }}
          >
            <div style={{ fontSize: "55px" }}>🚛</div>

            <h1 style={{ marginBottom: "10px" }}>
              FleetPro Dashboard Error
            </h1>

            <p style={{ color: "#64748b", lineHeight: 1.6 }}>
              Something went wrong while displaying this page.
              The rest of the application is protected from a
              complete white screen.
            </p>

            <div
              style={{
                marginTop: "20px",
                padding: "12px",
                background: "#fff1f2",
                color: "#be123c",
                borderRadius: "10px",
                fontSize: "14px",
                textAlign: "left",
                wordBreak: "break-word",
              }}
            >
              {this.state.errorMessage}
            </div>

            <button
              onClick={this.handleReload}
              style={{
                marginTop: "20px",
                border: "none",
                background: "#2563eb",
                color: "#fff",
                padding: "12px 22px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: 700,
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
   100 VEHICLES
========================================================= */

const vehicleTypes = ["Truck", "Van", "Bus"];

const vehicleStatuses = [
  "Active",
  "Idle",
  "Maintenance",
];

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

const vehicles = Array.from(
  { length: 100 },
  (_, index) => {
    const number = index + 1;

    const type =
      vehicleTypes[index % vehicleTypes.length];

    const status =
      vehicleStatuses[index % vehicleStatuses.length];

    const fuel =
      30 + ((index * 7) % 71);

    const speed =
      status === "Active"
        ? 40 + ((index * 5) % 41)
        : 0;

    const location =
      vehicleLocations[
        index % vehicleLocations.length
      ];

    return {
      id: `TN-${String(number).padStart(2, "0")}`,
      type,
      status,
      fuel,
      speed,
      location,
    };
  }
);

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

const trips = Array.from(
  { length: 100 },
  (_, index) => ({
    id: `TR-${101 + index}`,
    vehicle: `TN-${String(
      (index % 100) + 1
    ).padStart(2, "0")}`,
    route:
      tripRoutes[
        index % tripRoutes.length
      ],
    distance: `${
      120 + ((index * 23) % 381)
    } km`,
    status:
      tripStatuses[
        index % tripStatuses.length
      ],
  })
);

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

const priorities = [
  "High",
  "Medium",
  "Low",
];

const maintenance = Array.from(
  { length: 100 },
  (_, index) => ({
    vehicle: `TN-${String(
      (index % 100) + 1
    ).padStart(2, "0")}`,

    issue:
      maintenanceIssues[
        index % maintenanceIssues.length
      ],

    date: `${
      15 + (index % 15)
    } Aug 2026`,

    priority:
      priorities[
        index % priorities.length
      ],
  })
);

/* =========================================================
   APP
========================================================= */

function App() {
  const [activeMenu, setActiveMenu] =
    useState("Dashboard");

  const [selectedVehicle, setSelectedVehicle] =
    useState(null);

  const [selectedReport, setSelectedReport] =
    useState(null);

  const totalVehicles = vehicles.length;

  const activeVehicles =
    vehicles.filter(
      (vehicle) =>
        vehicle.status === "Active"
    ).length;

  const idleVehicles =
    vehicles.filter(
      (vehicle) =>
        vehicle.status === "Idle"
    ).length;

  const maintenanceVehicles =
    vehicles.filter(
      (vehicle) =>
        vehicle.status === "Maintenance"
    ).length;

  const averageSpeed =
    Math.round(
      vehicles.reduce(
        (sum, vehicle) =>
          sum + vehicle.speed,
        0
      ) / vehicles.length
    );

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
            Smart Fleet Operations • Vehicle
            Monitoring • Fuel • Maintenance
          </p>
        </div>
      </div>

      <div className="cards">

        <div
          className="card clickable"
          onClick={() =>
            setActiveMenu("Vehicles")
          }
        >
          <div className="card-icon">
            🚛
          </div>

          <div>
            <h3>Total Vehicles</h3>
            <h2>{totalVehicles}</h2>
            <span>
              View all vehicles →
            </span>
          </div>
        </div>

        <div
          className="card clickable"
          onClick={() =>
            setActiveMenu("Live Tracking")
          }
        >
          <div className="card-icon">
            🟢
          </div>

          <div>
            <h3>Active Vehicles</h3>
            <h2>{activeVehicles}</h2>
            <span>
              Live tracking →
            </span>
          </div>
        </div>

        {/* IMPORTANT:
            Idle card now opens a dedicated Idle page.
            No filter page is required.
        */}

        <div
          className="card clickable"
          onClick={() =>
            setActiveMenu("Idle Vehicles")
          }
        >
          <div className="card-icon">
            ⏸️
          </div>

          <div>
            <h3>Idle Vehicles</h3>
            <h2>{idleVehicles}</h2>
            <span>
              View idle vehicles →
            </span>
          </div>
        </div>

        <div
          className="card clickable"
          onClick={() =>
            setActiveMenu("Maintenance")
          }
        >
          <div className="card-icon">
            🔧
          </div>

          <div>
            <h3>Maintenance</h3>
            <h2>{maintenanceVehicles}</h2>
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
              />
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
              />
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
              />
            </div>
          </div>

        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <div>
            <h2>Vehicle Overview</h2>
            <p>
              Sample fleet vehicles
            </p>
          </div>

          <button
            className="panel-button"
            onClick={() =>
              setActiveMenu("Vehicles")
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
              {vehicles.map(
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
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  /* =======================================================
     IDLE VEHICLES
     THIS IS THE MAIN FIX
  ======================================================= */

  const IdleVehicles = () => {
    const idleList =
      vehicles.filter(
        (vehicle) =>
          vehicle.status === "Idle"
      );

    return (
      <>
        <div className="page-title">
          <div>
            <h1>
              Idle Vehicles
            </h1>

            <p>
              Vehicles currently not
              operating
            </p>
          </div>
        </div>

        <div className="cards">

          <div className="card">
            <div className="card-icon">
              ⏸️
            </div>

            <div>
              <h3>
                Total Idle Vehicles
              </h3>

              <h2>
                {idleList.length}
              </h2>

              <span>
                Current idle fleet
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
                Showing all currently
                idle vehicles
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
                        0 km/h
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

          {idleList.length === 0 && (
            <div
              style={{
                padding: "30px",
                textAlign: "center",
                color: "#64748b",
              }}
            >
              No idle vehicles found.
            </div>
          )}

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
          <h1>
            Trip Management
          </h1>

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
              setFuelTab(
                "Consumption"
              )
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
                      />

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
                      <th>Vehicle</th>
                      <th>Fuel Level</th>
                      <th>Status</th>
                      <th>Location</th>
                    </tr>
                  </thead>

                  <tbody>
                    {vehicles.map(
                      (vehicle) => (
                        <tr
                          key={vehicle.id}
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

                  <h2>
                    100
                  </h2>

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
                      <th>Fuel Used</th>
                      <th>
                        Estimated Cost
                      </th>
                      <th>Efficiency</th>
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
                          item.fuel >= 195
                            ? "High"
                            : item.fuel >=
                              175
                            ? "Medium"
                            : "Low";

                        return (
                          <tr
                            key={item.day}
                          >
                            <td>
                              <strong>
                                {item.day}
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
                      <th>Vehicle</th>
                      <th>Type</th>
                      <th>Fuel Level</th>
                      <th>Efficiency</th>
                      <th>Location</th>
                    </tr>
                  </thead>

                  <tbody>
                    {vehicles.map(
                      (vehicle) => (
                        <tr
                          key={vehicle.id}
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

            <h2>
              91%
            </h2>
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

            <h2>
              84%
            </h2>
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

            <h2>
              89%
            </h2>
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
                    />
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

      <div className="tracking-list">

        {vehicles.map(
          (vehicle) => (
            <div
              className="tracking-card"
              key={vehicle.id}
              onClick={() =>
                setSelectedVehicle(
                  vehicle
                )
              }
              style={{
                cursor: "pointer",
              }}
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
                <span
                  className={`status ${vehicle.status.toLowerCase()}`}
                >
                  {vehicle.status}
                </span>
              </div>
            </div>
          )
        )}

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
              {nextMaintenance?.id ||
                "No vehicle"}
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
              {lowestFuel?.id ||
                "No vehicle"}
            </h3>

            <p>
              Fuel level is{" "}
              {lowestFuel?.fuel ?? 0}%.
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
              {highestSpeed?.id ||
                "No vehicle"}
            </h3>

            <p>
              Current speed:{" "}
              {highestSpeed?.speed ??
                0}{" "}
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
                  <span>Total</span>
                  <strong>
                    {totalVehicles}
                  </strong>
                </div>

                <div>
                  <span>Active</span>
                  <strong>
                    {activeVehicles}
                  </strong>
                </div>

                <div>
                  <span>Idle</span>
                  <strong>
                    {idleVehicles}
                  </strong>
                </div>

                <div>
                  <span>
                    Maintenance
                  </span>

                  <strong>
                    {maintenanceVehicles}
                  </strong>
                </div>

              </div>

              <div className="panel">
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
                      {vehicles.map(
                        (vehicle) => (
                          <tr
                            key={vehicle.id}
                          >
                            <td>
                              {vehicle.id}
                            </td>

                            <td>
                              {vehicle.type}
                            </td>

                            <td>
                              {vehicle.status}
                            </td>

                            <td>
                              {vehicle.fuel}%
                            </td>

                            <td>
                              {vehicle.speed}{" "}
                              km/h
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
                        key={vehicle.id}
                      >
                        <span>
                          {vehicle.id}
                        </span>

                        <span>
                          {vehicle.fuel}%
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
                              {item.vehicle}
                            </td>

                            <td>
                              {item.issue}
                            </td>

                            <td>
                              {item.date}
                            </td>

                            <td>
                              {item.priority}
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
                    {totalVehicles}
                  </strong>
                </p>

                <p>
                  Active Vehicles:{" "}
                  <strong>
                    {activeVehicles}
                  </strong>
                </p>

                <p>
                  Idle Vehicles:{" "}
                  <strong>
                    {idleVehicles}
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
                    {averageSpeed} km/h
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
            <h1>
              Reports
            </h1>

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

      case "Dashboard":
        return <Dashboard />;

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
     MAIN UI
  ======================================================= */

  return (
    <div className="app">

      {/* SIDEBAR */}

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
              setActiveMenu(
                "Dashboard"
              )
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
              setActiveMenu(
                "Vehicles"
              )
            }
          >
            🚛 Vehicles
          </button>

          <button
            className={
              activeMenu ===
              "Trips"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveMenu(
                "Trips"
              )
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
              setActiveMenu(
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
              setActiveMenu(
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
              setActiveMenu(
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
              setActiveMenu(
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
              setActiveMenu(
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
              setActiveMenu(
                "Reports"
              )
            }
          >
            📄 Reports
          </button>

        </nav>

        <div className="admin-box">

          <div className="admin-avatar">
            K
          </div>

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

      {/* MAIN */}

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

            <div className="user">

              <div className="user-avatar">
                K
              </div>

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

      {/* =================================================
          VEHICLE MODAL
      ================================================= */}

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
            onClick={(event) =>
              event.stopPropagation()
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
                  {selectedVehicle.id}
                </h2>

                <p>
                  {selectedVehicle.type}
                </p>
              </div>

            </div>

            <div className="modal-details">

              <div>
                <span>
                  Status
                </span>

                <strong>
                  {selectedVehicle.status}
                </strong>
              </div>

              <div>
                <span>
                  Fuel Level
                </span>

                <strong>
                  {selectedVehicle.fuel}%
                </strong>
              </div>

              <div>
                <span>
                  Speed
                </span>

                <strong>
                  {selectedVehicle.speed}{" "}
                  km/h
                </strong>
              </div>

              <div>
                <span>
                  Location
                </span>

                <strong>
                  {selectedVehicle.location}
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
   EXPORT WITH ERROR PROTECTION
========================================================= */

export default function AppWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}