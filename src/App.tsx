import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './sections/Navbar';
import Footer from './sections/Footer';
import { ErrorBoundary } from './components/ErrorBoundary';

// Lazy load route components for code splitting
const HomePage = lazy(() => import('./sections/HomePage'));
const PlatformPage = lazy(() => import('./sections/PlatformPage'));
const SolutionsPage = lazy(() => import('./sections/SolutionsPage'));
const ResourcesPage = lazy(() => import('./sections/ResourcesPage'));
const CompanyPage = lazy(() => import('./sections/CompanyPage'));
const NotFound = lazy(() => import('./sections/NotFound'));

// Loading fallback component
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green mb-4"></div>
        <p className="text-gray-600">加载中...</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="min-h-screen bg-white">
          <Navbar />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/platform" element={<PlatformPage />} />
              <Route path="/solutions" element={<SolutionsPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/company" element={<CompanyPage />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </Suspense>
          <Footer />
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
