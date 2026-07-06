import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import appCss from "~/styles/app.css?url";
import { AuthProvider } from "~/lib/auth-context";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Livity — Preserve your memories, forever" },
      {
        name: "description",
        content:
          "Turn your memories into an AI twin your family can talk to, forever. Upload photos, stories, and voice recordings to create a living digital legacy.",
      },
      { name: "theme-color", content: "#D97706" },
      { property: "og:title", content: "Livity — Digital Legacy Platform" },
      {
        property: "og:description",
        content:
          "Turn your memories into an AI twin your family can talk to, forever.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
      },
    ],
  }),
  notFoundComponent: () => (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6 text-center">
      <span className="text-6xl">🔮</span>
      <h1 className="text-2xl font-bold text-warm-900">Page not found</h1>
      <p className="text-warm-500">The memory you're looking for doesn't exist yet.</p>
      <a className="btn-primary" href="/">Go home</a>
    </div>
  ),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </RootDocument>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}