export const mockAlerts = [
  {
    id: 1,
    type: 'critical', // critical, warning, safe
    category: 'Fire',
    room: 'Room 302',
    timestamp: new Date(Date.now() - 12000).toISOString(), // 12 sec ago
    message: 'Smoke detector activated. High temperature detected.',
    coordinates: { top: '30%', left: '30%' }
  },
  {
    id: 2,
    type: 'warning',
    category: 'Medical',
    room: 'Lobby',
    timestamp: new Date(Date.now() - 120000).toISOString(), // 2 min ago
    message: 'Guest requested medical assistance.',
    coordinates: { top: '60%', left: '70%' }
  },
  {
    id: 3,
    type: 'safe',
    category: 'Security',
    room: 'Main Entrance',
    timestamp: new Date(Date.now() - 900000).toISOString(), // 15 min ago
    message: 'Routine patrol completed. All clear.',
    coordinates: { top: '80%', left: '50%' }
  },
  {
    id: 4,
    type: 'critical',
    category: 'Security',
    room: 'Parking Level 2',
    timestamp: new Date(Date.now() - 1200000).toISOString(), // 20 min ago
    message: 'Unauthorized access detected at Sector C.',
    coordinates: { top: '20%', left: '80%' }
  },
];
