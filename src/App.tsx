import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { JudgeTourBanner } from './components/JudgeTourBanner';
import { StorylinePipeline } from './components/StorylinePipeline';
import { LandingPage } from './components/LandingPage';
import { MainDashboard } from './components/MainDashboard';
import { DonorDashboard } from './components/DonorDashboard';
import { NgoDashboard } from './components/NgoDashboard';
import { SmartMatchView } from './components/SmartMatchView';
import { VolunteerMobileView } from './components/VolunteerMobileView';
import { LiveTrackingView } from './components/LiveTrackingView';
import { AnalyticsView } from './components/AnalyticsView';
import { AddDonationModal } from './components/AddDonationModal';
import { CreateRequestModal } from './components/CreateRequestModal';
import { NotificationsCenter } from './components/NotificationsCenter';
import { Toast } from './components/Toast';

const AppContent: React.FC = () => {
  const { activeScreen } = useApp();

  const [isAddDonationOpen, setIsAddDonationOpen] = useState(false);
  const [isCreateRequestOpen, setIsCreateRequestOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* 1. Hackathon Judge Pitch Banner */}
      <JudgeTourBanner />

      {/* 2. Global Top Navbar */}
      <Navbar 
        onOpenAddModal={() => setIsAddDonationOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
      />

      {/* 3. 9-Stage Storyline Pipeline Bar (Rule 13) */}
      {activeScreen !== 'landing' && <StorylinePipeline />}

      {/* 4. Active Screen Router */}
      <main className="flex-1 flex flex-col">
        {activeScreen === 'landing' && (
          <LandingPage 
            onOpenAddModal={() => setIsAddDonationOpen(true)}
            onOpenCreateRequestModal={() => setIsCreateRequestOpen(true)}
          />
        )}

        {activeScreen === 'dashboard' && (
          <MainDashboard 
            onOpenAddDonationModal={() => setIsAddDonationOpen(true)}
            onOpenCreateRequestModal={() => setIsCreateRequestOpen(true)}
            onOpenNotifications={() => setIsNotificationsOpen(true)}
          />
        )}

        {activeScreen === 'donations' && (
          <DonorDashboard 
            onOpenAddModal={() => setIsAddDonationOpen(true)}
          />
        )}

        {activeScreen === 'requests' && (
          <NgoDashboard 
            onOpenCreateRequestModal={() => setIsCreateRequestOpen(true)}
          />
        )}

        {activeScreen === 'smart-match' && (
          <SmartMatchView />
        )}

        {activeScreen === 'volunteer-mobile' && (
          <VolunteerMobileView />
        )}

        {activeScreen === 'live-tracking' && (
          <LiveTrackingView />
        )}

        {activeScreen === 'analytics' && (
          <AnalyticsView />
        )}
      </main>

      {/* 5. Modals & Drawers */}
      <AddDonationModal 
        isOpen={isAddDonationOpen}
        onClose={() => setIsAddDonationOpen(false)}
      />

      <CreateRequestModal 
        isOpen={isCreateRequestOpen}
        onClose={() => setIsCreateRequestOpen(false)}
      />

      <NotificationsCenter 
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      {/* 6. Reactive System Toast */}
      <Toast />

    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
