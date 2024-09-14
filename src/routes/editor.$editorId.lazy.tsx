import { createLazyFileRoute, useParams } from '@tanstack/react-router'
import Editor from '@/Editor'
import { ErrorBoundary } from 'react-error-boundary'




export const Route = createLazyFileRoute('/editor/$editorId')({
  component: () => <ErrorBoundary fallback={<p>Error</p>}><Editor /></ErrorBoundary>
})