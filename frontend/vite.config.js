import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// Vite configuration file
export default defineConfig({
  // Enables React support: JSX transformation and Fast Refresh (hot reload) during development
  plugins: [react()],
  resolve: {
    // Sets up the "@" path alias to point to the src/ directory, enabling imports like
    // "@/components/...", "@/redux/...", "@/utils/constant", "@/lib/utils" seen throughout
    // this codebase, instead of relative paths like "../../components/..."
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
