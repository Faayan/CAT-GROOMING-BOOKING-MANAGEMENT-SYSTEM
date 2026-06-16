const { defineConfig } = require('vite');
const path = require('path');
const tailwindcss = require('@tailwindcss/vite');
const react = require('@vitejs/plugin-react');

module.exports = defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/app'),
    },
  },
});
