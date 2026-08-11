import { chromium } from "playwright"

const captures = [
  {
    name: "Backoffice - Novo Estágio",
    path: "/?role=admin&tab=backoffice&section=Est%C3%A1gios&modal=novo-estagio",
    captureId: process.argv[2],
  },
  {
    name: "Backoffice - Editar Estágio",
    path: "/?role=admin&tab=backoffice&section=Est%C3%A1gios&modal=editar-estagio",
    captureId: process.argv[3],
  },
  {
    name: "Backoffice - Excluir Estágio",
    path: "/?role=admin&tab=backoffice&section=Est%C3%A1gios&modal=excluir-estagio",
    captureId: process.argv[4],
  },
  {
    name: "Backoffice - Mentorias - Editar Usuário",
    path: "/?role=admin&tab=backoffice&section=Mentorias&modal=editar-usuario",
    captureId: process.argv[5],
  },
].filter((item) => item.captureId)

if (captures.length === 0) {
  console.error("Usage: node figma-capture.mjs <captureId1> [captureId2] ...")
  process.exit(1)
}

const baseUrl = "http://localhost:8443"

async function capturePage(browser, { name, path, captureId }) {
  const endpoint = `https://mcp.figma.com/mcp/capture/${captureId}/submit?bindVariables=true`
  const hash = `#figmacapture=${captureId}&figmaendpoint=${encodeURIComponent(endpoint)}&figmadelay=8000`
  const url = `${baseUrl}${path}${hash}`

  const page = await browser.newPage()
  await page.setViewportSize({ width: 1440, height: 900 })

  console.log(`Capturing ${name}...`)
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 })

  await page.waitForSelector('[role="dialog"]', { timeout: 20000 }).catch(() => {
    console.warn(`Dialog not found for ${name}`)
  })

  await page.waitForTimeout(10000)

  const result = await page.evaluate(
    async ({ captureId, endpoint }) => {
      if (window.figma?.captureForDesign) {
        return window.figma.captureForDesign({ captureId, endpoint, selector: "body" })
      }
      return { status: "auto" }
    },
    { captureId, endpoint },
  )

  console.log(`${name}:`, JSON.stringify(result))
  await page.close()
}

const browser = await chromium.launch({ headless: true })

for (const capture of captures) {
  await capturePage(browser, capture)
}

await browser.close()
console.log("Done")
