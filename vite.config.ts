import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({tsDecorators:true})],
  server:{proxy:{"/api":"http://localhost:3002"},
  //hmr: { overlay: false },
}
})
