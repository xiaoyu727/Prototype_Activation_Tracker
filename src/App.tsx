import React from 'react';
import { createHashRouter, RouterProvider, useRouteError } from 'react-router-dom';
import { SidebarStateProvider } from './contexts/SidebarStateContext';
import { OnboardingPage } from './pages/OnboardingPage';
import { ProductListPage } from './pages/ProductListPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CreateNewProductPage } from './pages/ProductForm';
import { SettingsVerificationPage } from './pages/SettingsVerificationPage';
import { StoreSettingsPage } from './pages/StoreSettingsPage';

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

function RouteError() {
  const err = useRouteError() as any;
  return (
    <div style={{ padding: 24, fontFamily: 'system-ui, sans-serif', maxWidth: 640 }}>
      <h1 style={{ color: '#c00' }}>Route Error</h1>
      <pre style={{ overflow: 'auto', background: '#f5f5f5', padding: 16, borderRadius: 8, whiteSpace: 'pre-wrap' }}>
        {err instanceof Error ? err.stack || err.message : JSON.stringify(err, null, 2)}
      </pre>
      <p style={{ color: '#666', marginTop: 12 }}>URL: {window.location.href}</p>
    </div>
  );
}

const routes = [
  { path: '/', element: <OnboardingPage />, errorElement: <RouteError /> },
  { path: '/menu', element: <ProductListPage />, errorElement: <RouteError /> },
  { path: '/product/new', element: <CreateNewProductPage />, errorElement: <RouteError /> },
  { path: '/product/:id', element: <ProductDetailPage />, errorElement: <RouteError /> },
  { path: '/settings/verification', element: <SettingsVerificationPage />, errorElement: <RouteError /> },
  { path: '/settings/store', element: <StoreSettingsPage />, errorElement: <RouteError /> },
];

const router = createHashRouter(routes);

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
