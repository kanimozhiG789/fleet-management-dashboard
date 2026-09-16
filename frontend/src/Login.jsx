import { useState } from "react";

function Login({ onLogin }) {
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [crashing, setCrashing] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (username === "admin" && password === "1234") {
      // Start truck animation
      setCrashing(true);

      // Open dashboard after animation
      setTimeout(() => {
        onLogin();
      }, 1300);
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-page">

      {/* Animated background roads */}
      <div className="road-line road-line-one"></div>
      <div className="road-line road-line-two"></div>

      {!showLogin ? (
        /* ================= OPENING SCREEN ================= */
        <div className="fleet-opening">

          <div className="opening-badge">
            ● SMART FLEET SYSTEM
          </div>

          <div className="vehicle-scene">
            <div className="city-light light-one"></div>
            <div className="city-light light-two"></div>
            <div className="city-light light-three"></div>

            <div className="moving-truck">🚛</div>
          </div>

          <h1>Fleet Management</h1>

          <p>
            Smart Vehicle Monitoring &amp; Fleet Operations
          </p>

          <button
            className="start-fleet-btn"
            onClick={() => setShowLogin(true)}
          >
            Enter Fleet Dashboard
            <span>→</span>
          </button>

          <div className="opening-features">
            <span>🚛 Vehicles</span>
            <span>⛽ Fuel</span>
            <span>🔧 Maintenance</span>
            <span>📍 Live Tracking</span>
          </div>
        </div>
      ) : (
        /* ================= LOGIN SCREEN ================= */
        <div className={`login-container ${crashing ? "login-crash" : ""}`}>

          <div className="login-vehicle">
            🚛
          </div>

          <div className="login-box">

            <div className="login-logo">
              🚛
            </div>

            <div className="login-title">
              <h1>FleetPro</h1>
              <p>Fleet Management Dashboard</p>
            </div>

            <form onSubmit={handleLogin}>

              <div className="input-group">
                <label>Username</label>

                <input
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label>Password</label>

                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              <span>🔒 Secure Admin Access</span>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default Login;