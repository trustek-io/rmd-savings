/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'crypto-purple': '#6366f1',
        'crypto-blue': '#3b82f6',
        'crypto-green': '#10b981',
        'neutral-50': '#fafafa',
        'neutral-100': '#f5f5f5',
        'neutral-200': '#e5e5e5',
        'neutral-300': '#d4d4d4',
        'neutral-600': '#525252',
        'neutral-700': '#404040',
        'neutral-900': '#171717'
      },
    },
  },
  plugins: [],
}