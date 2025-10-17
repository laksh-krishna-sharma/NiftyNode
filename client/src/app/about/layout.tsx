import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us - NiftyNode",
  description: "Learn about NiftyNode's mission to revolutionize algorithmic trading through cutting-edge MCP server technology.",
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}