import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SidebarStateProvider } from './contexts/SidebarStateContext';
import { ProductListPage } from './pages/ProductListPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CreateNewProductPage } from './pages/ProductForm';

class AppErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  state = { hasError: false, error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        <div
          style={{
            padding: 24,
            fontFamily: 'system-ui, sans-serif',
            maxWidth: 640,
          }}
        >
          <h1 style={{ color: '#c00', marginBottom: 16 }}>Something went wrong</h1>
          <pre style={{ overflow: 'auto', background: '#f5f5f5', padding: 16, borderRadius: 8 }}>
            {this.state.error.message}
          </pre>
          <p style={{ marginTop: 16, color: '#666' }}>
            Check the browser console for the full stack trace.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

const router = createBrowserRouter(
  [
    { path: '/', element: <ProductListPage /> },
    { path: '/product/new', element: <CreateNewProductPage /> },
    { path: '/product/:id', element: <ProductDetailPage /> },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  },
);

function App() {
  return (
    <AppErrorBoundary>
      <SidebarStateProvider>
        <RouterProvider router={router} />
      </SidebarStateProvider>
    </AppErrorBoundary>
  );
}

export default App;
