/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Escanea todos los archivos en src con las extensiones js, jsx, ts y tsx
    "./public/index.html", // Escanea el archivo HTML principal
    "./src/App.tsx", // Asegúrate de incluir App.tsx
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
