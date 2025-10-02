import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Join Us - NiftyNode",
  description: "Create your NiftyNode account and start your algorithmic trading journey with our MCP server platform.",
}

export default function JoinLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}