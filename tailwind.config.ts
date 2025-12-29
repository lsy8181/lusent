import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#cfe8ff',
          DEFAULT: '#7dc3ff',
          dark: '#1f6fb2',
        },
      },
    },
  },
  plugins: [],
};

export default config;
