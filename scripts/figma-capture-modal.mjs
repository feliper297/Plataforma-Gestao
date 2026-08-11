import { chromium } from "playwright"

const captureId = process.argv[2]
const modal = process.argv[3]

if (!captureId || !modal) {
  console.error("Usage: node figma-capture-modal.mjs <captureId> <modal>")
  console.error("Modals: novo-estagio | editar-estagio | excluir-estagio")
  process.exit(1)
}

const MODAL_ACTIONS = {
  "novo-estagio": {
    label: "Backoffice - Novo Estágio",
    open: async (page) => {
      await page.getByRole("button", { name: "Novo Estágio" }).click()
    },
  },
  "editar-estagio": {
    label: "Backoffice - Editar Estágio",
    open: async (page) => {
      const editButtons = page.getByRole("button", { name: "Editar" })
      await editButtons.first().click()
    },
  },
  "excluir-estagio": {
    label: "Backoffice - Excluir Estágio",
    open: async (page) => {
      const deleteButtons = page.getByRole("button", { name: "Excluir" })
      await deleteButtons.first().click()
    },
  },
}

const action = MODAL_ACTIONS[modal]
if (!action) {
  console.error(`Modal desconhecida: ${modal}`)
  process.exit(1)
}

const endpoint = `https://mcp.figma.com/mcp/capture/${captureId}/submit?bindVariables=true`
const section = encodeURIComponent("Estágios")
const pageUrl = `http://localhost:8443/?tab=backoffice&section=${section}&modal=${modal}`

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage()

await page.addInitScript(() => {
  localStorage.setItem("isAuthenticated", "true")
  localStorage.setItem("userRole", "admin")
})

await page.setViewportSize({ width: 1920, height: 1080 })

console.log(`Capturando ${action.label}...`)
await page.goto(pageUrl, { waitUntil: "networkidle", timeout: 60000 })

const dialog = page.locator('[role="dialog"]')
const opened = await dialog
  .waitFor({ state: "visible", timeout: 12000 })
  .then(() => true)
  .catch(async () => {
    console.log("Abrindo modal pelo botão...")
    await action.open(page)
    await dialog.waitFor({ state: "visible", timeout: 10000 })
    return true
  })
  .catch(() => false)

if (!opened) {
  console.error("Modal não encontrada")
  await page.screenshot({ path: "capture-debug.png", fullPage: true })
  await browser.close()
  process.exit(1)
}

await page.waitForTimeout(1500)

const captureScript = await page.context().request.get("https://mcp.figma.com/mcp/html-to-design/capture.js")
await page.evaluate((script) => {
  const el = document.createElement("script")
  el.textContent = script
  document.head.appendChild(el)
}, await captureScript.text())

await page.waitForTimeout(1000)

console.log("Enviando captura...")
const result = await page.evaluate(
  async ({ captureId, endpoint }) => window.figma.captureForDesign({ captureId, endpoint, selector: "body" }),
  { captureId, endpoint },
)

console.log("Resultado:", JSON.stringify(result))
await page.waitForTimeout(4000)
await browser.close()
console.log("Concluído:", action.label)
