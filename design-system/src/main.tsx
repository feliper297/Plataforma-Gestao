import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import DesignSystemPage from "../../src/pages/DesignSystem"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DesignSystemPage />
  </StrictMode>,
)
