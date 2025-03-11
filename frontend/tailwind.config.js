import daisyui from 'daisyui';
import { winter } from 'daisyui/src/theming/themes';

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
          ...winter,
          primary: '#00677d',
          'primary-content': '#fff',
          'error-content': '#fff',
          secondary: '#A25AFF',
          'secondary-content': '#fff',
          accent: '#0081FE',
          'accent-content': '#fff',
          error: '#fa0000',
          success: '#008000',
          warning: '#ff8000',
          "warning-content": '#fff',
          info: '#0000ee',
          "info-content": '#fff',
          // "neutral": "#3d4451",
          '--rounded-btn': '6rem'
        }
      }
    ],
  }
}

