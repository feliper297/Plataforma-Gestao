export type UserRole = "mentor" | "mentorado" | "admin"

export const ROLE_BY_EMAIL: Record<string, UserRole> = {
  "mentor@gmail.com": "mentor",
  "mentorado@gmail.com": "mentorado",
  "admin@gmail.com": "admin",
}

export function getRoleByEmail(email: string): UserRole | null {
  return ROLE_BY_EMAIL[email.trim().toLowerCase()] ?? null
}

export const TABS_BY_ROLE: Record<UserRole, string[]> = {
  mentor: ["mentor", "reunioes"],
  mentorado: ["mentorado", "reunioes"],
  admin: ["dashboard", "mentor", "mentorado", "reunioes", "backoffice"],
}

export const DEFAULT_TAB_BY_ROLE: Record<UserRole, string> = {
  mentor: "mentor",
  mentorado: "mentorado",
  admin: "dashboard",
}
