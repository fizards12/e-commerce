import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['winter'],
          primary: '#1f15ff',
          'primary-content': '#fff',
          'error-content': '#fff',
          // 'error':'#e21c26',
          // "bg-primary" : "#000",
          secondary: '#A25AFF',
          accent: '#0081FE',
          error: '#fa0000',
          success: '#008000',
          warning: '#ff8000',
          "warning-content": '#fff',
          info: '#0000ee',
          "info-content": '#fff',
          // "neutral": "#3d4451",
          // "base": "#f4f4f4f5",
          // "base-100": "#f4f4f4f5",
          // "bg-primary" : '#000',
          '--rounded-btn': '6rem'
        }
      }

      // "dark",
      // "light",
    ],
  }
}

