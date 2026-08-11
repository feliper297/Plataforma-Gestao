import { chromium } from "playwright"

const captureId = process.argv[2]
if (!captureId) {
  console.error("Usage: node figma-capture-single.mjs <captureId>")
  process.exit(1)
}

const endpoint = `https://mcp.figma.com/mcp/capture/${captureId}/submit?bindVariables=true`
const section = encodeURIComponent("Estágios")
const pageUrl = `http://localhost:8443/?tab=backoffice&section=${section}`

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage()

await page.addInitScript(() => {
  localStorage.setItem("isAuthenticated", "true")
  localStorage.setItem("userRole", "admin")
})

await page.setViewportSize({ width: 1440, height: 900 })

console.log("Carregando página...")
await page.goto(pageUrl, { waitUntil: "networkidle", timeout: 60000 })

const dialog = page.locator('[role="dialog"]')
await page.getByRole("button", { name: "Novo Estágio" }).click()
await dialog.waitFor({ state: "visible", timeout: 15000 })
await page.waitForTimeout(1500)

console.log("Modal aberta — injetando script Figma...")
const captureScript = await page.context().request.get("https://mcp.figma.com/mcp/html-to-design/capture.js")
await page.evaluate((script) => {
  const el = document.createElement("script")
  el.textContent = script
  document.head.appendChild(el)
}, await captureScript.text())

await page.waitForTimeout(1000)

console.log("Enviando captura...")
const result = await page.evaluate(
  async ({ captureId, endpoint }) => {
    return window.figma.captureForDesign({ captureId, endpoint, selector: "body" })
  },
  { captureId, endpoint },
)

console.log("Resultado:", JSON.stringify(result))
await page.waitForTimeout(3000)
await browser.close()
console.log("Concluído.")
