import { createLazyFileRoute } from '@tanstack/react-router'
import { Dashboard } from '@/dashboard'

export const Route = createLazyFileRoute('/dashboard')({
  component: () => <Dashboard/>
})