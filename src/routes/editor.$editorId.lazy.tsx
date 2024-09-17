import { createLazyFileRoute, useParams } from '@tanstack/react-router'
import Editor from '@/Editor'
import { ErrorBoundary } from 'react-error-boundary'


function fallbackRender({ error }: { error: Error }) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}

export const Route = createLazyFileRoute('/editor/$editorId')({
  component: () => <ErrorBoundary fallbackRender={fallbackRender}><Editor /></ErrorBoundary>
})