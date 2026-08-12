/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Tela padrão quando a URL não define ?screen= (ex.: "design-system" num deploy dedicado à vitrine). */
  readonly VITE_DEFAULT_SCREEN?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
