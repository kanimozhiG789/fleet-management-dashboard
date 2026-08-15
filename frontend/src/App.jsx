import { useState } from "react";
import "./App.css";

const vehicles = [
  {
    id: "TN-01",
    type: "Truck",
    status: "Active",
    fuel: 82,
    speed: 64,
    location: "Chennai",
  },
  {
    id: "TN-02",
    type: "Van",
    status: "Idle",
    fuel: 54,
    speed: 0,
    location: "Tambaram",
  },
  {
    id: "TN-03",
    type: "Bus",
    status: "Maintenance",
    fuel: 35,
    speed: 0,
    location: "Guindy",
  },
  {
    id: "TN-04",
    type: "Truck",
    status: "Active",
    fuel: 91,
    speed: 72,
    location: "T Nagar",
  },
  {
    id: "TN-05",
    type: "Van",
    status: "Active",
    fuel: 65,
    speed: 55,
    location: "Velachery",
  },
  {
    id: "TN-06",
    type: "Bus",
    status: "Idle",
    fuel: 48,
    speed: 0,
    location: "Adyar",
  },
];

const trips = [
  {
    id: "TR-101",
    vehicle: "TN-01",
    route: "Chennai → Bangalore",
    distance: "346 km",
    status: "Completed",
  },
  {
    id: "TR-102",
    vehicle: "TN-04",
    route: "Chennai → Pondicherry",
    distance: "160 km",
    status: "Running",
  },
  {
    id: "TR-103",
    vehicle: "TN-05",
    route: "Chennai → Vellore",
    distance: "140 km",
    status: "Scheduled",
  },
];

const maintenance = [
  {
    vehicle: "TN-03",
    issue: "Service Overdue",
    date: "15 Aug 2026",
    priority: "High",
  },
  {
    vehicle: "TN-07",
    issue: "Service in 3 days",
    date: "18 Aug 2026",
    priority: "Medium",
  },
  {
    vehicle: "TN-12",
    issue: "Maintenance Good",
    date: "25 Aug 2026",
    priority: "Low",
  },
];

function App() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);

  const totalVehicles = vehicles.length;
  const activeVehicles = vehicles.filter(
    (vehicle) => vehicle.status === "Active"
  ).length;
  const idleVehicles = vehicles.filter(
    (vehicle) => vehicle.status === "Idle"
  ).length;
  const maintenanceVehicles = vehicles.filter(
    (vehicle) => vehicle.status === "Maintenance"
  ).length;

  const goToMenu = (menu) => {
    setActiveMenu(menu);
    setSelectedVehicle(null);
    setSelectedReport(null);
  };

  const openReport = (report) => {
    setSelectedReport(report);
  };

  const renderDashboard = () => (
    <>
      <section className="cards">
        <button
          className="card clickable"
          onClick={() => goToMenu("Vehicles")}
        >
          <span>🚗 Total Vehicles</span>
          <strong>{totalVehicles}</strong>
          <small>View all vehicles →</small>
        </button>

        <button
          className="card clickable"
          onClick={() => goToMenu("Vehicles")}
        >
          <span>🟢 Active</span>
          <strong>{activeVehicles}</strong>
          <small>64% of fleet</small>
        </button>

        <button
          className="card clickable"
          onClick={() => goToMenu("Vehicles")}
        >
          <span>🟡 Idle</span>
          <strong>{idleVehicles}</strong>
          <small>Fleet currently idle</small>
        </button>

        <button
          className="card clickable"
          onClick={() => goToMenu("Maintenance")}
        >
          <span>🔴 Maintenance</span>
          <strong>{maintenanceVehicles}</strong>
          <small>Requires attention</small>
        </button>
      </section>

      <section className="dashboard-grid">
        <div className="panel health">
          <h3>Fleet Health Score</h3>

          <div className="score">87</div>

          <p>Excellent Fleet Health</p>

          <div className="progress">
            <div style={{ width: "87%" }}></div>
          </div>

          <div className="health-items">
            <span>
              Utilization <b>91%</b>
            </span>
            <span>
              Maintenance <b>84%</b>
            </span>
            <span>
              Fuel Efficiency <b>89%</b>
            </span>
          </div>
        </div>

        <button
          className="panel panel-button"
          onClick={() => goToMenu("Analytics")}
        >
          <h3>📊 Vehicle Utilization</h3>

          <div className="bars">
            {vehicles.slice(0, 5).map((vehicle) => (
              <div key={vehicle.id}>
                <span>{vehicle.id}</span>
                <i
                  style={{
                    height: `${
                      vehicle.status === "Active"
                        ? vehicle.speed
                        : vehicle.status === "Idle"
                        ? 30
                        : 20
                    }%`,
                  }}
                ></i>
              </div>
            ))}
          </div>

          <p className="click-hint">Click to view analytics →</p>
        </button>

        <button
          className="panel panel-button"
          onClick={() => goToMenu("Fuel Management")}
        >
          <h3>⛽ Fuel Analytics</h3>

          <div className="fuel-number">
            10.8 <small>km/L</small>
          </div>

          <p>Average Fuel Efficiency</p>

          <div className="fuel-line">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
          </div>

          <div className="fuel-chart">╱╲___╱╲____╱╲</div>

          <p className="click-hint">Click for fuel details →</p>
        </button>

        <button
          className="panel panel-button"
          onClick={() => goToMenu("Maintenance")}
        >
          <h3>🔧 Maintenance Alerts</h3>

          <div className="alert danger">
            <b>TN-03</b>
            <span>Service Overdue</span>
            🔴
          </div>

          <div className="alert warning">
            <b>TN-07</b>
            <span>Service in 3 days</span>
            🟡
          </div>

          <div className="alert good">
            <b>TN-12</b>
            <span>Maintenance Good</span>
            🟢
          </div>

          <p className="click-hint">Click for maintenance details →</p>
        </button>
      </section>

      <VehicleTable
        vehicles={vehicles}
        onSelect={setSelectedVehicle}
        onReport={() => goToMenu("Reports")}
      />

      {selectedVehicle && (
        <VehicleDetails
          vehicle={selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
        />
      )}
    </>
  );

  const renderVehicles = () => (
    <section className="panel">
      <div className="section-heading">
        <div>
          <h3>🚗 Vehicle Management</h3>
          <p>Click any vehicle to view complete details.</p>
        </div>
      </div>

      <VehicleTable
        vehicles={vehicles}
        onSelect={setSelectedVehicle}
        onReport={() => goToMenu("Reports")}
      />

      {selectedVehicle && (
        <VehicleDetails
          vehicle={selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
        />
      )}
    </section>
  );

  const renderTrips = () => (
    <section className="panel">
      <h3>🛣️ Trip Management</h3>

      <div className="trip-grid">
        {trips.map((trip) => (
          <div className="trip-card" key={trip.id}>
            <b>{trip.id}</b>
            <h4>{trip.route}</h4>
            <p>Vehicle: {trip.vehicle}</p>
            <p>Distance: {trip.distance}</p>
            <span
              className={`trip-status ${trip.status.toLowerCase()}`}
            >
              {trip.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  );

  const renderFuel = () => (
    <section className="analytics-grid">
      <div className="panel">
        <h3>⛽ Fuel Consumption</h3>

        <div className="big-value">
          10.8 <small>km/L</small>
        </div>

        <p>Average fuel efficiency</p>

        <div className="fuel-stat">
          <span>Best Efficiency</span>
          <b>12.4 km/L</b>
        </div>

        <div className="fuel-stat">
          <span>Total Fuel Used</span>
          <b>1,248 L</b>
        </div>

        <div className="fuel-stat">
          <span>Monthly Fuel Cost</span>
          <b>₹1,12,500</b>
        </div>
      </div>

      <div className="panel">
        <h3>📊 Weekly Fuel Performance</h3>

        <div className="weekly-bars">
          {[72, 85, 62, 90, 78, 88, 66].map((value, index) => (
            <div key={index}>
              <i style={{ height: `${value}%` }}></i>
              <span>
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderMaintenance = () => (
    <section className="panel">
      <h3>🔧 Maintenance Management</h3>

      {maintenance.map((item) => (
        <div className="maintenance-row" key={item.vehicle}>
          <div>
            <b>{item.vehicle}</b>
            <p>{item.issue}</p>
          </div>

          <span>{item.date}</span>

          <strong className={`priority ${item.priority.toLowerCase()}`}>
            {item.priority}
          </strong>
        </div>
      ))}
    </section>
  );

  const renderAnalytics = () => (
    <section className="analytics-grid">
      <div className="panel">
        <h3>📊 Vehicle Utilization</h3>

        {vehicles.map((vehicle) => {
          const utilization =
            vehicle.status === "Active"
              ? 85
              : vehicle.status === "Idle"
              ? 35
              : 20;

          return (
            <div className="util-row" key={vehicle.id}>
              <span>{vehicle.id}</span>

              <div className="util-bar">
                <div style={{ width: `${utilization}%` }}></div>
              </div>

              <b>{utilization}%</b>
            </div>
          );
        })}
      </div>

      <div className="panel">
        <h3>⚡ Performance Summary</h3>

        <div className="summary-box">
          <span>Fleet Efficiency</span>
          <b>89%</b>
        </div>

        <div className="summary-box">
          <span>Vehicle Availability</span>
          <b>92%</b>
        </div>

        <div className="summary-box">
          <span>Average Speed</span>
          <b>58 km/h</b>
        </div>
      </div>
    </section>
  );

  const renderTracking = () => (
    <section className="panel">
      <h3>📍 Live Vehicle Tracking</h3>

      <div className="tracking-list">
        {vehicles.map((vehicle) => (
          <div className="tracking-card" key={vehicle.id}>
            <div className="tracking-icon">🚛</div>

            <div>
              <b>{vehicle.id}</b>
              <p>📍 {vehicle.location}</p>
            </div>

            <span className={`status ${vehicle.status.toLowerCase()}`}>
              {vehicle.status}
            </span>

            <strong>{vehicle.speed} km/h</strong>
          </div>
        ))}
      </div>
    </section>
  );

  const renderPredictions = () => (
    <section className="panel">
      <h3>🔮 Fleet Predictions</h3>

      <div className="prediction-grid">
        <div className="prediction-card">
          <span>🔧 Next Maintenance</span>
          <b>TN-03</b>
          <p>Service recommended immediately</p>
        </div>

        <div className="prediction-card">
          <span>⛽ Fuel Warning</span>
          <b>TN-02</b>
          <p>Fuel level may reach critical level soon</p>
        </div>

        <div className="prediction-card">
          <span>📈 Utilization</span>
          <b>TN-04</b>
          <p>High utilization expected this week</p>
        </div>
      </div>
    </section>
  );

  const renderReports = () => (
    <section className="panel reports-page">
      <div className="section-heading">
        <div>
          <h3>📊 Fleet Reports</h3>
          <p>Generate and view detailed fleet management reports.</p>
        </div>
      </div>

      <div className="report-grid">
        <button
          className="advanced-report-card"
          onClick={() => openReport("Vehicle")}
        >
          <span>🚗</span>
          <h4>Vehicle Report</h4>
          <p>
            View vehicle status, fuel, speed, location and type details.
          </p>
          <b>Open Vehicle Report →</b>
        </button>

        <button
          className="advanced-report-card"
          onClick={() => openReport("Fuel")}
        >
          <span>⛽</span>
          <h4>Fuel Report</h4>
          <p>
            Analyze fuel consumption, efficiency and monthly fuel costs.
          </p>
          <b>Open Fuel Report →</b>
        </button>

        <button
          className="advanced-report-card"
          onClick={() => openReport("Maintenance")}
        >
          <span>🔧</span>
          <h4>Maintenance Report</h4>
          <p>
            Check overdue services, upcoming maintenance and priorities.
          </p>
          <b>Open Maintenance Report →</b>
        </button>

        <button
          className="advanced-report-card"
          onClick={() => openReport("Performance")}
        >
          <span>📈</span>
          <h4>Performance Report</h4>
          <p>
            Analyze fleet health, utilization, availability and speed.
          </p>
          <b>Open Performance Report →</b>
        </button>
      </div>
    </section>
  );

  const renderContent = () => {
    if (selectedReport) {
      return (
        <ReportDetails
          type={selectedReport}
          onBack={() => setSelectedReport(null)}
        />
      );
    }

    switch (activeMenu) {
      case "Vehicles":
        return renderVehicles();

      case "Trips":
        return renderTrips();

      case "Fuel Management":
        return renderFuel();

      case "Maintenance":
        return renderMaintenance();

      case "Analytics":
        return renderAnalytics();

      case "Live Tracking":
        return renderTracking();

      case "Predictions":
        return renderPredictions();

      case "Reports":
        return renderReports();

      default:
        return renderDashboard();
    }
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <h1>🚛 FleetPro</h1>

        <nav>
          {[
            "Dashboard",
            "Vehicles",
            "Trips",
            "Fuel Management",
            "Maintenance",
            "Analytics",
            "Live Tracking",
            "Predictions",
            "Reports",
          ].map((item) => (
            <button
              key={item}
              className={activeMenu === item ? "active" : ""}
              onClick={() => goToMenu(item)}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="admin">
          👤 Kanimozhi
          <small>Fleet Manager</small>
        </div>
      </aside>

      <main className="main">
        <header className="header">
          <div>
            <p className="small-title">FLEET MANAGEMENT</p>
            <h2>{selectedReport ? `${selectedReport} Report` : activeMenu}</h2>
          </div>

          <div className="header-right">
            🔔
            <span>Today</span>
          </div>
        </header>

        {renderContent()}

        <footer>
          FleetPro • Advanced Fleet Management Dashboard
        </footer>
      </main>
    </div>
  );
}

function VehicleTable({ vehicles, onSelect, onReport }) {
  return (
    <section className="panel table-panel">
      <div className="table-header">
        <h3>🚗 Vehicle Status</h3>

        <button className="report-btn" onClick={onReport}>
          View Reports
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Vehicle</th>
            <th>Type</th>
            <th>Status</th>
            <th>Fuel Level</th>
          </tr>
        </thead>

        <tbody>
          {vehicles.map((vehicle) => (
            <tr
              key={vehicle.id}
              className="vehicle-row"
              onClick={() => onSelect(vehicle)}
            >
              <td>
                <b>{vehicle.id}</b>
              </td>

              <td>{vehicle.type}</td>

              <td>
                <span
                  className={`status ${vehicle.status.toLowerCase()}`}
                >
                  {vehicle.status}
                </span>
              </td>

              <td>
                <div className="fuel-bar">
                  <div style={{ width: `${vehicle.fuel}%` }}></div>
                </div>
                {vehicle.fuel}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="click-hint">
        Click a vehicle row to view details
      </p>
    </section>
  );
}

function VehicleDetails({ vehicle, onClose }) {
  return (
    <div className="details-panel">
      <div className="details-header">
        <div>
          <h3>🚛 {vehicle.id} Details</h3>
          <p>Complete vehicle information</p>
        </div>

        <button onClick={onClose}>✕</button>
      </div>

      <div className="details-grid">
        <div>
          <span>Vehicle Type</span>
          <b>{vehicle.type}</b>
        </div>

        <div>
          <span>Status</span>
          <b>{vehicle.status}</b>
        </div>

        <div>
          <span>Fuel Level</span>
          <b>{vehicle.fuel}%</b>
        </div>

        <div>
          <span>Current Speed</span>
          <b>{vehicle.speed} km/h</b>
        </div>

        <div>
          <span>Location</span>
          <b>{vehicle.location}</b>
        </div>
      </div>
    </div>
  );
}

function ReportDetails({ type, onBack }) {
  const reportData = {
    Vehicle: {
      icon: "🚗",
      title: "Vehicle Report",
      description: "Complete vehicle fleet status report.",
    },
    Fuel: {
      icon: "⛽",
      title: "Fuel Report",
      description: "Fuel consumption and efficiency analysis.",
    },
    Maintenance: {
      icon: "🔧",
      title: "Maintenance Report",
      description: "Maintenance schedules and service alerts.",
    },
    Performance: {
      icon: "📈",
      title: "Performance Report",
      description: "Fleet performance and utilization analysis.",
    },
  };

  const data = reportData[type];

  return (
    <section className="panel report-details-page">
      <div className="report-top">
        <button className="back-button" onClick={onBack}>
          ← Back to Reports
        </button>

        <button
          className="print-button"
          onClick={() => window.print()}
        >
          🖨️ Print / Save PDF
        </button>
      </div>

      <div className="report-title">
        <span>{data.icon}</span>

        <div>
          <h3>{data.title}</h3>
          <p>{data.description}</p>
        </div>
      </div>

      {type === "Vehicle" && <VehicleReport />}

      {type === "Fuel" && <FuelReport />}

      {type === "Maintenance" && <MaintenanceReport />}

      {type === "Performance" && <PerformanceReport />}
    </section>
  );
}

function VehicleReport() {
  return (
    <>
      <div className="report-summary">
        <div>
          <span>Total Vehicles</span>
          <b>6</b>
        </div>

        <div>
          <span>Active</span>
          <b>3</b>
        </div>

        <div>
          <span>Idle</span>
          <b>2</b>
        </div>

        <div>
          <span>Maintenance</span>
          <b>1</b>
        </div>
      </div>

      <h4 className="report-section-title">
        Vehicle Details
      </h4>

      <table>
        <thead>
          <tr>
            <th>Vehicle</th>
            <th>Type</th>
            <th>Status</th>
            <th>Fuel</th>
            <th>Speed</th>
            <th>Location</th>
          </tr>
        </thead>

        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id}>
              <td>
                <b>{vehicle.id}</b>
              </td>
              <td>{vehicle.type}</td>
              <td>{vehicle.status}</td>
              <td>{vehicle.fuel}%</td>
              <td>{vehicle.speed} km/h</td>
              <td>{vehicle.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function FuelReport() {
  return (
    <>
      <div className="report-summary">
        <div>
          <span>Average Efficiency</span>
          <b>10.8 km/L</b>
        </div>

        <div>
          <span>Best Efficiency</span>
          <b>12.4 km/L</b>
        </div>

        <div>
          <span>Total Fuel Used</span>
          <b>1,248 L</b>
        </div>

        <div>
          <span>Monthly Cost</span>
          <b>₹1,12,500</b>
        </div>
      </div>

      <h4 className="report-section-title">
        Fuel Performance
      </h4>

      <div className="fuel-report-list">
        <div>
          <span>Monday</span>
          <b>72%</b>
        </div>

        <div>
          <span>Tuesday</span>
          <b>85%</b>
        </div>

        <div>
          <span>Wednesday</span>
          <b>62%</b>
        </div>

        <div>
          <span>Thursday</span>
          <b>90%</b>
        </div>

        <div>
          <span>Friday</span>
          <b>78%</b>
        </div>
      </div>
    </>
  );
}

function MaintenanceReport() {
  return (
    <>
      <div className="report-summary">
        <div>
          <span>High Priority</span>
          <b>1</b>
        </div>

        <div>
          <span>Medium Priority</span>
          <b>1</b>
        </div>

        <div>
          <span>Low Priority</span>
          <b>1</b>
        </div>

        <div>
          <span>Overdue</span>
          <b>1</b>
        </div>
      </div>

      <h4 className="report-section-title">
        Maintenance Schedule
      </h4>

      <table>
        <thead>
          <tr>
            <th>Vehicle</th>
            <th>Issue</th>
            <th>Service Date</th>
            <th>Priority</th>
          </tr>
        </thead>

        <tbody>
          {maintenance.map((item) => (
            <tr key={item.vehicle}>
              <td>
                <b>{item.vehicle}</b>
              </td>
              <td>{item.issue}</td>
              <td>{item.date}</td>
              <td>{item.priority}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function PerformanceReport() {
  return (
    <>
      <div className="report-summary">
        <div>
          <span>Fleet Health</span>
          <b>87%</b>
        </div>

        <div>
          <span>Fleet Efficiency</span>
          <b>89%</b>
        </div>

        <div>
          <span>Availability</span>
          <b>92%</b>
        </div>

        <div>
          <span>Average Speed</span>
          <b>58 km/h</b>
        </div>
      </div>

      <h4 className="report-section-title">
        Performance Indicators
      </h4>

      <div className="performance-list">
        <div>
          <span>Vehicle Utilization</span>
          <div className="util-bar">
            <div style={{ width: "91%" }}></div>
          </div>
          <b>91%</b>
        </div>

        <div>
          <span>Maintenance Efficiency</span>
          <div className="util-bar">
            <div style={{ width: "84%" }}></div>
          </div>
          <b>84%</b>
        </div>

        <div>
          <span>Fuel Efficiency</span>
          <div className="util-bar">
            <div style={{ width: "89%" }}></div>
          </div>
          <b>89%</b>
        </div>
      </div>
    </>
  );
}

export default App;