import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import BrandStudio from './pages/ContentForge';
import AutomationHub from './pages/AutomationHub';
import ConfidenceZone from './pages/ConfidenceZone';
import Academy from './pages/Academy';
import CollabHub from './pages/CollabHub';
import { PageRoute } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'brand':
        return <BrandStudio />;
      case 'automation':
        return <AutomationHub />;
      case 'confidence':
        return <ConfidenceZone />;
      case 'academy':
        return <Academy />;
      case 'collab':
        return <CollabHub />;
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <Layout activePage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}