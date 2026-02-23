import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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

const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

const router = createBrowserRouter(
  [
    { path: '/', element: <OnboardingPage /> },
    { path: '/menu', element: <ProductListPage /> },
    { path: '/product/new', element: <CreateNewProductPage /> },
    { path: '/product/:id', element: <ProductDetailPage /> },
    { path: '/settings/verification', element: <SettingsVerificationPage /> },
    { path: '/settings/store', element: <StoreSettingsPage /> },
  ],
  {
    basename,
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
