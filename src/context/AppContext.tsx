import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  FoodDonation, 
  ShelterRequest, 
  Volunteer, 
  RescueMission, 
  AppNotification, 
  ActiveScreen,
  RescueStatus
} from '../types';
import { 
  INITIAL_DONATIONS, 
  INITIAL_REQUESTS, 
  INITIAL_VOLUNTEERS, 
  INITIAL_ACTIVE_MISSION, 
  INITIAL_NOTIFICATIONS, 
  OVERALL_KPIS 
} from '../data/mockData';

interface AppContextType {
  activeScreen: ActiveScreen;
  setActiveScreen: (screen: ActiveScreen) => void;
  userRole: 'admin' | 'donor' | 'ngo' | 'volunteer';
  setUserRole: (role: 'admin' | 'donor' | 'ngo' | 'volunteer') => void;
  donations: FoodDonation[];
  requests: ShelterRequest[];
  volunteers: Volunteer[];
  activeMission: RescueMission;
  notifications: AppNotification[];
  kpis: typeof OVERALL_KPIS;
  selectedDonationForMatch: FoodDonation | null;
  setSelectedDonationForMatch: (donation: FoodDonation | null) => void;
  selectedLocationFilter: string;
  setSelectedLocationFilter: (loc: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isJudgeMode: boolean;
  setIsJudgeMode: (val: boolean) => void;
  isSimulatingGps: boolean;
  setIsSimulatingGps: (val: boolean) => void;
  // Actions
  addDonation: (newDonation: Omit<FoodDonation, 'id' | 'createdAt' | 'status'>) => void;
  addRequest: (newRequest: Omit<ShelterRequest, 'id' | 'receivedMeals' | 'status'>) => void;
  dispatchMatch: (donationId: string, shelterId: string, volunteerId?: string) => void;
  updateMissionStatus: (status: RescueStatus) => void;
  advanceVolunteerStep: () => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  triggerJudgeDemo: (type: 'banquet_surplus' | 'urgent_request' | 'instant_rescue') => void;
  toastMessage: { title: string; desc: string; type: 'success' | 'info' | 'warning' } | null;
  setToastMessage: (msg: { title: string; desc: string; type: 'success' | 'info' | 'warning' } | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('dashboard');
  const [userRole, setUserRole] = useState<'admin' | 'donor' | 'ngo' | 'volunteer'>('admin');
  const [donations, setDonations] = useState<FoodDonation[]>(INITIAL_DONATIONS);
  const [requests, setRequests] = useState<ShelterRequest[]>(INITIAL_REQUESTS);
  const [volunteers, setVolunteers] = useState<Volunteer[]>(INITIAL_VOLUNTEERS);
  const [activeMission, setActiveMission] = useState<RescueMission>(INITIAL_ACTIVE_MISSION);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [kpis, setKpis] = useState(OVERALL_KPIS);
  const [selectedDonationForMatch, setSelectedDonationForMatch] = useState<FoodDonation | null>(INITIAL_DONATIONS[1]); // Jaipur Marriott by default
  const [selectedLocationFilter, setSelectedLocationFilter] = useState<string>('All Jaipur');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isJudgeMode, setIsJudgeMode] = useState<boolean>(true);
  const [isSimulatingGps, setIsSimulatingGps] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ title: string; desc: string; type: 'success' | 'info' | 'warning' } | null>(null);

  // Auto clear toast after 4s
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // GPS Simulation interval
  useEffect(() => {
    if (!isSimulatingGps) return;
    const interval = setInterval(() => {
      setActiveMission(prev => {
        const coords = prev.routeCoordinates;
        if (!coords || coords.length < 2) return prev;
        
        // Find next step in coords
        const currentCoord = prev.currentVolunteerCoord;
        const currentIndex = coords.findIndex(c => c[0] === currentCoord[0] && c[1] === currentCoord[1]);
        const nextIndex = currentIndex >= 0 && currentIndex < coords.length - 1 ? currentIndex + 1 : 0;
        const nextCoord = coords[nextIndex];
        
        const newEta = Math.max(1, prev.etaMinutes - 2);

        // If reached end
        if (nextIndex === coords.length - 1) {
          setIsSimulatingGps(false);
          confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
          setToastMessage({
            title: 'Rescue Arrived at Destination',
            desc: `Volunteer arrived at ${prev.shelterName}. Ready for confirmation!`,
            type: 'success'
          });
        }

        return {
          ...prev,
          currentVolunteerCoord: nextCoord,
          etaMinutes: newEta
        };
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [isSimulatingGps]);

  const addDonation = (newDon: Omit<FoodDonation, 'id' | 'createdAt' | 'status'>) => {
    const id = `don-${Math.floor(1000 + Math.random() * 9000)}`;
    const created: FoodDonation = {
      ...newDon,
      id,
      status: 'Pending Match',
      createdAt: 'Just now'
    };

    setDonations(prev => [created, ...prev]);
    setKpis(prev => ({
      ...prev,
      activeDonations: prev.activeDonations + 1,
      mealsRescued: prev.mealsRescued + newDon.quantityMeals
    }));

    // Trigger notification
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'New Surplus Food Available',
      message: `${created.donorName} posted ${created.quantityMeals} meals of "${created.foodName}" in ${created.location.area}.`,
      timestamp: 'Just now',
      type: 'match',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);

    setToastMessage({
      title: 'Surplus Food Posted Successfully!',
      desc: `${created.quantityMeals} meals entered the smart matching queue.`,
      type: 'success'
    });
  };

  const addRequest = (newReq: Omit<ShelterRequest, 'id' | 'receivedMeals' | 'status'>) => {
    const id = `she-${Math.floor(10 + Math.random() * 90)}`;
    const created: ShelterRequest = {
      ...newReq,
      id,
      receivedMeals: 0,
      status: 'Open'
    };

    setRequests(prev => [created, ...prev]);

    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'New Food Demand Registered',
      message: `${created.shelterName} in ${created.location.area} requested ${created.requiredMeals} meals.`,
      timestamp: 'Just now',
      type: 'urgent',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);

    setToastMessage({
      title: 'Food Request Created',
      desc: `Request for ${created.requiredMeals} meals broadcasted to nearby food donors.`,
      type: 'info'
    });
  };

  const dispatchMatch = (donationId: string, shelterId: string, volunteerId?: string) => {
    const don = donations.find(d => d.id === donationId);
    const she = requests.find(s => s.id === shelterId);
    const vol = volunteers.find(v => volunteerId ? v.id === volunteerId : v.status === 'Available') || volunteers[0];

    if (!don || !she) return;

    // Update donation
    setDonations(prev => prev.map(d => {
      if (d.id === donationId) {
        return {
          ...d,
          status: 'Volunteer Assigned',
          matchedShelterId: she.id,
          matchedShelterName: she.shelterName,
          assignedVolunteerId: vol.id,
          assignedVolunteerName: vol.name
        };
      }
      return d;
    }));

    // Update shelter request
    setRequests(prev => prev.map(s => {
      if (s.id === shelterId) {
        const newReceived = Math.min(s.requiredMeals, s.receivedMeals + don.quantityMeals);
        return {
          ...s,
          receivedMeals: newReceived,
          status: newReceived >= s.requiredMeals ? 'Fully Fulfilled' : 'Partially Fulfilled'
        };
      }
      return s;
    }));

    // Update volunteer
    setVolunteers(prev => prev.map(v => {
      if (v.id === vol.id) {
        return {
          ...v,
          status: 'On Active Rescue',
          activeRescueId: `res-${don.id}`
        };
      }
      return v;
    }));

    // Create new active mission
    const newMission: RescueMission = {
      id: `res-${don.id}`,
      rescueCode: `RESCUE-${don.id.replace('don-', '')}`,
      donationId: don.id,
      shelterRequestId: she.id,
      donorName: don.donorName,
      donorLocation: don.location,
      shelterName: she.shelterName,
      shelterLocation: she.location,
      volunteerId: vol.id,
      volunteerName: vol.name,
      volunteerPhone: vol.phone,
      volunteerVehicle: `${vol.vehicleType} (${vol.vehicleNumber})`,
      volunteerRating: vol.rating,
      mealsCount: don.quantityMeals,
      foodName: don.foodName,
      category: don.category,
      dietary: don.dietary,
      status: 'Volunteer Assigned',
      etaMinutes: 18,
      totalDistanceKm: 4.6,
      verificationOtp: `${Math.floor(1000 + Math.random() * 9000)}`,
      routeCoordinates: [
        [don.location.lat, don.location.lng],
        [(don.location.lat + she.location.lat) / 2, (don.location.lng + she.location.lng) / 2],
        [she.location.lat, she.location.lng]
      ],
      currentVolunteerCoord: [vol.currentLocation.lat, vol.currentLocation.lng],
      timeline: [
        {
          time: 'Just now',
          title: 'Smart Match Dispatched',
          description: `Algorithm paired ${don.donorName} with ${she.shelterName}.`,
          status: 'completed'
        },
        {
          time: 'In 3 mins',
          title: 'Volunteer En Route to Pickup',
          description: `${vol.name} assigned. Heading to ${don.location.area}.`,
          status: 'current'
        },
        {
          time: 'Est. 12 mins',
          title: 'Food Quality Inspection & Pickup',
          description: 'Thermal inspection & verification OTP handover.',
          status: 'pending'
        },
        {
          time: 'Est. 20 mins',
          title: 'Direct Transit to Shelter',
          description: `Rapid delivery to ${she.shelterName}.`,
          status: 'pending'
        },
        {
          time: 'Est. 25 mins',
          title: 'Shelter Acceptance & Impact Logged',
          description: 'Recipient signature and meal distribution.',
          status: 'pending'
        }
      ]
    };

    setActiveMission(newMission);
    setKpis(prev => ({
      ...prev,
      activeDeliveries: prev.activeDeliveries + 1
    }));

    const matchNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'Smart Match Executed & Dispatched',
      message: `${don.quantityMeals} meals from ${don.donorName} dispatched to ${she.shelterName} via ${vol.name}.`,
      timestamp: 'Just now',
      type: 'dispatch',
      read: false
    };
    setNotifications(prev => [matchNotif, ...prev]);

    setToastMessage({
      title: 'Dispatch Confirmed!',
      desc: `Volunteer ${vol.name} notified for immediate pickup.`,
      type: 'success'
    });
  };

  const updateMissionStatus = (newStatus: RescueStatus) => {
    setActiveMission(prev => {
      const updated = { ...prev, status: newStatus };
      if (newStatus === 'Food Picked Up') {
        updated.pickupCompletedTime = 'Just now';
        updated.status = 'In Transit';
      }
      return updated;
    });

    if (newStatus === 'Delivered') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setKpis(prev => ({
        ...prev,
        successfulDeliveries: prev.successfulDeliveries + 1,
        activeDeliveries: Math.max(0, prev.activeDeliveries - 1)
      }));
      setToastMessage({
        title: 'Mission Accomplished! 🎉',
        desc: `${activeMission.mealsCount} meals delivered to ${activeMission.shelterName}. Impact updated!`,
        type: 'success'
      });
    }
  };

  const advanceVolunteerStep = () => {
    if (activeMission.status === 'Volunteer Assigned' || activeMission.status === 'En Route to Pickup') {
      updateMissionStatus('In Transit');
      setToastMessage({
        title: 'Pickup Confirmed! 🚚',
        desc: `Food collected from ${activeMission.donorName}. In transit to shelter.`,
        type: 'success'
      });
    } else if (activeMission.status === 'In Transit' || activeMission.status === 'Food Picked Up') {
      updateMissionStatus('Delivered');
    }
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const triggerJudgeDemo = (type: 'banquet_surplus' | 'urgent_request' | 'instant_rescue') => {
    if (type === 'banquet_surplus') {
      addDonation({
        donorName: 'Maharani Palace Grand Banquet',
        donorType: 'Event Banquet',
        donorContact: '+91 98299 87654',
        foodName: 'Wedding Feast: Shahi Paneer, Biryani, Naan & Gulab Jamun',
        category: 'Cooked Meals',
        dietary: 'Vegetarian',
        quantityMeals: 180,
        weightKg: 75,
        preparedTime: '8:00 PM today',
        pickupWindowStart: '8:30 PM',
        pickupDeadline: '10:30 PM',
        location: {
          lat: 26.8920,
          lng: 75.8080,
          address: 'Ashok Marg, Near Statue Circle',
          area: 'C-Scheme',
          landmark: 'Banquet Gate 1'
        },
        packaging: 'Industrial warmers & thermal catering bins',
        storageTemp: 'Hot (>60°C)',
        notes: 'High volume luxury wedding surplus. Ready for bulk distribution.'
      });
      setActiveScreen('smart-match');
    } else if (type === 'urgent_request') {
      addRequest({
        shelterName: 'Jaipur Railway Station Night Transit Shelter',
        shelterCode: 'SH-JAIPUR-031',
        contactPerson: 'Rameshwar Lal',
        phone: '+91 94140 11928',
        location: {
          lat: 26.9200,
          lng: 75.7870,
          address: 'Station Road, Jaipur Junction Entrance',
          area: 'Railway Station / Sindhi Camp',
          landmark: 'Behind Platform 1 Waiting Hall'
        },
        requiredMeals: 100,
        dietaryPreference: 'Vegetarian',
        urgency: 'Critical',
        deadlineTime: '9:30 PM',
        notes: 'Sudden influx of 90+ stranded passengers and workers due to severe night chill.',
        beneficiaryCount: 110
      });
      setActiveScreen('requests');
    } else if (type === 'instant_rescue') {
      // Execute 1-click rescue demo
      dispatchMatch('don-1025', 'she-27');
      setActiveScreen('live-tracking');
      setIsSimulatingGps(true);
    }
  };

  return (
    <AppContext.Provider
      value={{
        activeScreen,
        setActiveScreen,
        userRole,
        setUserRole,
        donations,
        requests,
        volunteers,
        activeMission,
        notifications,
        kpis,
        selectedDonationForMatch,
        setSelectedDonationForMatch,
        selectedLocationFilter,
        setSelectedLocationFilter,
        searchQuery,
        setSearchQuery,
        isJudgeMode,
        setIsJudgeMode,
        isSimulatingGps,
        setIsSimulatingGps,
        addDonation,
        addRequest,
        dispatchMatch,
        updateMissionStatus,
        advanceVolunteerStep,
        markNotificationRead,
        markAllNotificationsRead,
        triggerJudgeDemo,
        toastMessage,
        setToastMessage
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
