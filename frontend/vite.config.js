import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], 
  server: {
    host: true,
    port: 5173, // Añade esta línea para establecer el puerto
  },
  preview: {
    port: 5173, // Añade esta línea para el comando preview
  },
  assetsInclude:['**/*.glb']
})
