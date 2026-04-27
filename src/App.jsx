import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';
import Home from './pages/Home';
import GuestDashboard from './pages/GuestDashboard';
import GuestSOS from './pages/GuestSOS';
import StaffDashboard from './pages/StaffDashboard';
import { mockAlerts as initialAlerts } from './mockData';

function App() {
  const [alerts, setAlerts] = useState([]);
  const [selectedAlertId, setSelectedAlertId] = useState(null);

  useEffect(() => {
    if (db.isMock) {
      console.log('Using Mock Data for Alerts');
      setAlerts(initialAlerts);
      
      const interval = setInterval(() => {
        setAlerts(prev => [...prev]);
      }, 60000);
      return () => clearInterval(interval);
    } else {
      const alertsRef = collection(db, 'alerts');
      const q = query(alertsRef, orderBy('timestamp', 'desc'));
      
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedAlerts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setAlerts(fetchedAlerts);
      }, (error) => {
        console.error("Firestore onSnapshot error:", error);
      });

      return () => unsubscribe();
    }
  }, []);

  // Sort alerts: CRITICAL first, then warning, then safe, then by timestamp/ID
  const sortedAlerts = [...alerts].sort((a, b) => {
    const severityScore = { critical: 3, warning: 2, safe: 1 };
    const scoreA = severityScore[a.type] || 0;
    const scoreB = severityScore[b.type] || 0;
    
    if (scoreA !== scoreB) {
      return scoreB - scoreA; // descending score
    }
    // Secondary sort by priorityScore if available
    if (a.priorityScore !== b.priorityScore) {
       return (b.priorityScore || 0) - (a.priorityScore || 0);
    }
    // Fallback sort by timestamp or id
    if (a.timestamp && b.timestamp) {
       return new Date(b.timestamp) - new Date(a.timestamp);
    }
    return b.id > a.id ? 1 : -1;
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
