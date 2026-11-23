import React, { useState } from 'react';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { SeoHead } from './components/layout/SeoHead';
import { BookCallModal } from './components/modals/BookCallModal';
import { ToastProvider } from './components/ui/Toast';
import { RouterProvider, useRouter } from './lib/router';
import { AboutPage } from './pages/AboutPage';
import { ExecutiveCoachingPage } from './pages/ExecutiveCoachingPage';
import { HomePage } from './pages/HomePage';
import { InsightPostPage } from './pages/InsightPostPage';
import { InsightsIndexPage } from './pages/InsightsIndexPage';
import { MastermindGroupsPage } from './pages/MastermindGroupsPage';

const SiteShell: React.FC = () => {
  const { pathname } = useRouter();
  const [bookModalOpen, setBookModalOpen] = useState(false);

  const openBookModal = () => setBookModalOpen(true);
  const closeBookModal = () => setBookModalOpen(false);

  const renderRoute = () => {
    if (pathname === '/') {
      return <HomePage onBookCall={openBookModal} />;
    }
    if (pathname === '/executive-coaching') {
      return <ExecutiveCoachingPage onBookCall={openBookModal} />;
    }
    if (pathname === '/mastermind-groups') {
      return <MastermindGroupsPage onBookCall={openBookModal} />;
    }
    if (pathname === '/about') {
      return <AboutPage onBookCall={openBookModal} />;
    }
    if (pathname === '/insights') {
      return <InsightsIndexPage onBookCall={openBookModal} />;
    }
    if (pathname.startsWith('/insights/')) {
      const slug = pathname.replace('/insights/', '');
      return <InsightPostPage slug={slug} onBookCall={openBookModal} />;
    }
    return <HomePage onBookCall={openBookModal} />;
  };

  return (
    <div className="flex min-h-screen flex-col bg-white text-[#475569]">
      <SeoHead pathname={pathname} />
      <Header onBookCall={openBookModal} />
      <main id="main-content" className="flex-1 focus:outline-none">
        {renderRoute()}
      </main>
      <Footer onBookCall={openBookModal} />
      <BookCallModal isOpen={bookModalOpen} onClose={closeBookModal} />
    </div>
  );
};

export default function App() {
  return (
    <RouterProvider>
      <ToastProvider>
        <SiteShell />
      </ToastProvider>
    </RouterProvider>
  );
}
