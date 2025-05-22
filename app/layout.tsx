import { jsx as _jsx } from "react/jsx-runtime"
import { Toaster } from "sonner"
import { ThemeProvider } from "../components/theme-provider"
import "./globals.css"

export const metadata = {
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return _jsx("html", {
    lang: "en",
    suppressHydrationWarning: true,
    children: [
      _jsx("head", {}),
      _jsx("body", {
        children: _jsx(ThemeProvider, {
          defaultTheme: "dark",
          storageKey: "theme-preference",
          children: [
            children,
            _jsx(Toaster, { position: "bottom-right" })
          ]
        })
      })
    ]
  })
}
