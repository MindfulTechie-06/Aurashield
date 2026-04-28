import React, { useEffect } from 'react';
import DashboardLayout from '../components/Dashboard/DashboardLayout';
import AlertFeed from '../components/Dashboard/AlertFeed';
import FacilityMap from '../components/Dashboard/FacilityMap';
import ActionPanel from '../components/Dashboard/ActionPanel';
import BackgroundGrid from '../components/3D/BackgroundGrid';
import { Shield } from 'lucide-react';

const Dashboard = ({ alerts, selectedAlertId, setSelectedAlertId }) => {
  // Automatically select the newest critical alert on load if none selected
  useEffect(() => {
    if (!selectedAlertId && alerts.length > 0) {
      setSelectedAlertId(alerts[0].id);
    }
  }, [alerts, selectedAlertId, setSelectedAlertId]);

  const selectedAlert = alerts.find(a => a.id === selectedAlertId) || null;

  return (
    <div className="min-h-screen h-screen bg-background relative overflow-hidden text-white flex flex-col">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
        <BackgroundGrid />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 bg-white/5 backdrop-blur-xl px-8 py-4 flex items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-critical/20 rounded-xl border border-critical/30 shadow-glow-red">
            <Shield className="w-6 h-6 text-critical drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
              AURA<span className="font-light">SHIELD</span>
            </h1>
            <p className="text-[10px] text-white/50 uppercase tracking-[0.3em] mt-0.5">Mission Control System</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 glass-panel px-4 py-2 rounded-full border border-white/10">
          <div className="flex items-center space-x-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-safe opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-safe shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
            </span>
            <span className="text-xs font-medium text-white/80 tracking-wider">SYSTEM ONLINE</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 p-4 lg:p-6 lg:h-[calc(100vh-80px)] h-auto overflow-y-auto overflow-x-hidden">
        <DashboardLayout>
          {/* Left Column: Alert Feed */}
          <AlertFeed 
            alerts={alerts} 
            selectedAlertId={selectedAlertId} 
            onSelectAlert={setSelectedAlertId} 
          />

          {/* Center Column: Map Area */}
          <FacilityMap 
            alerts={alerts} 
            selectedAlertId={selectedAlertId} 
          />

          {/* Right Column: Action Panel */}
          <ActionPanel 
            selectedAlert={selectedAlert} 
          />
        </DashboardLayout>
      </main>
    </div>
  );
};

export default Dashboard;
