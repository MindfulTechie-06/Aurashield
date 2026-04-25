import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import GuestDashboard from './pages/GuestDashboard';
import GuestSOS from './pages/GuestSOS';
import StaffDashboard from './pages/StaffDashboard';
import { mockAlerts as initialAlerts } from './mockData';

function App() {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [selectedAlertId, setSelectedAlertId] = useState(null);

  // Time ago logic updater
  useEffect(() => {
    const interval = setInterval(() => {
      setAlerts(prev => [...prev]);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Sort alerts: CRITICAL first, then warning, then safe, then by ID (newest)
  const sortedAlerts = [...alerts].sort((a, b) => {
    const severityScore = { critical: 3, warning: 2, safe: 1 };
    if (severityScore[a.type] !== severityScore[b.type]) {
      return severityScore[b.type] - severityScore[a.type];
    }
    return b.id - a.id;
  });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Guest Routes */}
        <Route path="/guest" element={<GuestDashboard alerts={sortedAlerts} />} />
        <Route path="/guest/sos" element={<GuestSOS />} />

        {/* Staff Routes */}
        <Route 
          path="/staff" 
          element={
            <StaffDashboard 
              alerts={sortedAlerts} 
              selectedAlertId={selectedAlertId}
              setSelectedAlertId={setSelectedAlertId}
            />
          } 
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
