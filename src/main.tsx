import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { ClerkProvider, useAuth } from '@clerk/clerk-react'
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import { ConvexReactClient } from 'convex/react'
import { RouterProvider, createRouter } from '@tanstack/react-router'

import { routeTree } from './routeTree.gen'
import { ThemeProvider } from './theme-provider.tsx'

import '@xyflow/react/dist/style.css';
import './modified.css'
import './output.css'
import { ErrorBoundary } from 'react-error-boundary'


const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}


const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary fallback={<p>Error</p>}>
      <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY!}>
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          <ThemeProvider defaultTheme='dark' storageKey="vite-ui-theme">
            <RouterProvider router={router} />
          </ThemeProvider>

        </ConvexProviderWithClerk>
      </ClerkProvider>
    </ErrorBoundary>
  </StrictMode>,
)
