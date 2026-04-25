/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0F19',
        card: 'rgba(255, 255, 255, 0.05)',
        critical: '#EF4444', // Red-500
        warning: '#EAB308',  // Yellow-500
        safe: '#22C55E',     // Green-500
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 10px rgba(255, 255, 255, 0.2), 0 0 20px rgba(255, 255, 255, 0.1)',
        'glow-red': '0 0 15px rgba(239, 68, 68, 0.5)',
      }
    },
  },
  plugins: [],
}
