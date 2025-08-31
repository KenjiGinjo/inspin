import { QueryClient, QueryClientProvider } from '@packages/ts-rest-react-query/tanstack-react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Router } from 'wouter'
import { AppRouter } from './app-router.tsx'
import { ModalProvider } from './components/extend'
import { TailwindIndicator } from './components/tailwind-indicator.tsx'
import { Toaster } from './components/ui/sonner.tsx'
import { UserState } from './hooks/user'
import './style/index.css'

const isDevMode = import.meta.env.DEV

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <Router>
          <AppRouter />
        </Router>
        <Toaster />
        <UserState />
        {isDevMode && <TailwindIndicator />}
      </ModalProvider>
    </QueryClientProvider>
  </StrictMode>,
)
