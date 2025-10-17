import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Help & Support - NiftyNode",
  description: "Get help with NiftyNode's MCP server platform. Find answers, contact support, and access our comprehensive documentation.",
}

export default function HelpLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}