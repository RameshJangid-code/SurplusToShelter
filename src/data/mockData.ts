import { 
  FoodDonation, 
  ShelterRequest, 
  Volunteer, 
  RescueMission, 
  AppNotification 
} from '../types';

export const INITIAL_DONATIONS: FoodDonation[] = [
  {
    id: 'don-1024',
    donorName: 'Clarks Amer Banquets',
    donorType: 'Hotel',
    donorContact: '+91 98290 11420',
    foodName: 'Fresh Veg Paneer, Dal Makhani & Roti Thali',
    category: 'Cooked Meals',
    dietary: 'Vegetarian',
    quantityMeals: 80,
    weightKg: 38,
    preparedTime: '5:30 PM today',
    pickupWindowStart: '6:15 PM',
    pickupDeadline: '8:30 PM',
    location: {
      lat: 26.8580,
      lng: 75.8050,
      address: 'JLN Marg, Near Jawahar Circle',
      area: 'C-Scheme / Malviya Nagar Corridor',
      landmark: 'Gate #2 Banquet Loading Bay'
    },
    status: 'In Transit',
    matchedShelterId: 'she-24',
    matchedShelterName: 'Shelter #24 — Apna Ghar Sansthan',
    assignedVolunteerId: 'vol-01',
    assignedVolunteerName: 'Rahul Sharma',
    packaging: 'Stainless steel sealed containers & foil food crates',
    storageTemp: 'Hot (>60°C)',
    notes: 'Surplus from wedding reception. Food packed fresh in clean thermal insulated crates.',
    createdAt: '6:15 PM'
  },
  {
    id: 'don-1025',
    donorName: 'Jaipur Marriott Hotel',
    donorType: 'Hotel',
    donorContact: '+91 98291 55670',
    foodName: 'Steamed Rice, Mixed Vegetable Gravy & Poori',
    category: 'Cooked Meals',
    dietary: 'Vegetarian',
    quantityMeals: 120,
    weightKg: 55,
    preparedTime: '6:00 PM today',
    pickupWindowStart: '7:00 PM',
    pickupDeadline: '9:15 PM',
    location: {
      lat: 26.8520,
      lng: 75.8020,
      address: 'Near Ashram Marg, Tonk Road',
      area: 'Tonk Road',
      landmark: 'Service Entrance Gate B'
    },
    status: 'Pending Match',
    packaging: '15 kg insulated thermo-boxes',
    storageTemp: 'Hot (>60°C)',
    notes: 'Corporate conference surplus. High nutritional value, packed in hot holding bins.',
    createdAt: '6:45 PM'
  },
  {
    id: 'don-1026',
    donorName: 'Kanha Sweets & Restaurant',
    donorType: 'Restaurant',
    donorContact: '+91 94140 22319',
    foodName: 'Fresh Kulcha, Chole & Vegetable Pulao',
    category: 'Cooked Meals',
    dietary: 'Vegetarian',
    quantityMeals: 45,
    weightKg: 20,
    preparedTime: '5:45 PM today',
    pickupWindowStart: '6:45 PM',
    pickupDeadline: '9:00 PM',
    location: {
      lat: 26.9080,
      lng: 75.8030,
      address: 'Mirza Ismail Road / Subhash Marg',
      area: 'C-Scheme',
      landmark: 'Opposite Central Park Gate 3'
    },
    status: 'Matched',
    matchedShelterId: 'she-26',
    matchedShelterName: 'Robin Hood Kitchen — Raja Park',
    assignedVolunteerId: 'vol-02',
    assignedVolunteerName: 'Priya Verma',
    packaging: 'Eco-friendly sugarcane bagasse trays',
    storageTemp: 'Hot (>60°C)',
    notes: 'Ready for immediate pickup. Parking space available in front.',
    createdAt: '6:30 PM'
  },
  {
    id: 'don-1027',
    donorName: 'The French Baker Artisan Cafe',
    donorType: 'Restaurant',
    donorContact: '+91 97840 88210',
    foodName: 'Whole Wheat Sourdough, Baguettes & Buns',
    category: 'Bakery & Bread',
    dietary: 'Vegetarian',
    quantityMeals: 60,
    weightKg: 18,
    preparedTime: '3:00 PM today',
    pickupWindowStart: '6:00 PM',
    pickupDeadline: '10:00 PM',
    location: {
      lat: 26.9070,
      lng: 75.7420,
      address: 'Amrapali Plaza, Vaishali Nagar',
      area: 'Vaishali Nagar',
      landmark: 'Behind National Handloom'
    },
    status: 'Pending Match',
    packaging: 'Paper bread loaves sacks',
    storageTemp: 'Room Temp (20-25°C)',
    notes: 'Freshly baked today, zero additives, pristine condition.',
    createdAt: '6:20 PM'
  },
  {
    id: 'don-1028',
    donorName: 'Rajasthan University Central Mess',
    donorType: 'Hostel',
    donorContact: '+91 98285 44102',
    foodName: 'Yellow Dal Tadka, Jeera Rice & Chapati',
    category: 'Cooked Meals',
    dietary: 'Vegetarian',
    quantityMeals: 150,
    weightKg: 65,
    preparedTime: '6:30 PM today',
    pickupWindowStart: '7:15 PM',
    pickupDeadline: '9:30 PM',
    location: {
      lat: 26.8900,
      lng: 75.8150,
      address: 'University Campus, JLN Marg',
      area: 'JLN Marg / Bapu Nagar',
      landmark: 'Hostel No. 4 Kitchen Wing'
    },
    status: 'Volunteer Assigned',
    matchedShelterId: 'she-25',
    matchedShelterName: 'Bal Seva Shelter — Malviya Nagar',
    assignedVolunteerId: 'vol-04',
    assignedVolunteerName: 'Vikram Rathore',
    packaging: 'Large kitchen cauldrons with transport lids',
    storageTemp: 'Hot (>60°C)',
    notes: 'Surplus after student dinner hour. Verified hygienic standards.',
    createdAt: '6:50 PM'
  },
  {
    id: 'don-1029',
    donorName: 'Taj Jai Mahal Palace',
    donorType: 'Hotel',
    donorContact: '+91 98292 99011',
    foodName: 'Assorted Gourmet Rice, Dal, Seasonal Subzi',
    category: 'Cooked Meals',
    dietary: 'Vegetarian',
    quantityMeals: 90,
    weightKg: 42,
    preparedTime: '7:00 PM today',
    pickupWindowStart: '7:45 PM',
    pickupDeadline: '10:15 PM',
    location: {
      lat: 26.9140,
      lng: 75.7780,
      address: 'Jacob Road, Civil Lines',
      area: 'Civil Lines',
      landmark: 'Security Gate 2 (Staff Corridor)'
    },
    status: 'Pending Match',
    packaging: 'Commercial stainless hot cases',
    storageTemp: 'Hot (>60°C)',
    notes: 'Executive banquet catering surplus. High protein items.',
    createdAt: '7:10 PM'
  }
];

export const INITIAL_REQUESTS: ShelterRequest[] = [
  {
    id: 'she-24',
    shelterName: 'Shelter #24 — Apna Ghar Sansthan',
    shelterCode: 'SH-JAIPUR-024',
    contactPerson: 'Sunita Sharma (Superintendent)',
    phone: '+91 98290 87341',
    location: {
      lat: 26.9150,
      lng: 75.8230,
      address: 'Near Sanganer Gate, Ghat Gate Road',
      area: 'Pink City / Sanganer Gate',
      landmark: 'Opposite Community Dispensary'
    },
    requiredMeals: 60,
    receivedMeals: 60,
    dietaryPreference: 'Vegetarian',
    urgency: 'High',
    deadlineTime: '9:00 PM',
    status: 'Fully Fulfilled',
    notes: 'Night shelter housing elderly and disabled residents. Fresh hot meals preferred.',
    beneficiaryCount: 75
  },
  {
    id: 'she-25',
    shelterName: 'Bal Seva Shelter Home',
    shelterCode: 'SH-JAIPUR-025',
    contactPerson: 'Mahesh Meena',
    phone: '+91 94140 76221',
    location: {
      lat: 26.8525,
      lng: 75.8210,
      address: 'Sector 3, Malviya Nagar',
      area: 'Malviya Nagar',
      landmark: 'Behind World Trade Park'
    },
    requiredMeals: 85,
    receivedMeals: 40,
    dietaryPreference: 'Vegetarian',
    urgency: 'Critical',
    deadlineTime: '9:15 PM',
    status: 'Partially Fulfilled',
    notes: 'Children and youth shelter home. High requirement for dal, vegetables and breads.',
    beneficiaryCount: 95
  },
  {
    id: 'she-26',
    shelterName: 'Robin Hood Community Kitchen',
    shelterCode: 'SH-JAIPUR-026',
    contactPerson: 'Arun Joshi',
    phone: '+91 98280 12908',
    location: {
      lat: 26.8990,
      lng: 75.8270,
      address: 'Gali No. 4, Raja Park',
      area: 'Raja Park',
      landmark: 'Near Gurudwara Sahib'
    },
    requiredMeals: 50,
    receivedMeals: 45,
    dietaryPreference: 'Vegetarian',
    urgency: 'Medium',
    deadlineTime: '9:30 PM',
    status: 'Partially Fulfilled',
    notes: 'Daily community food bank for daily-wage migrant laborers.',
    beneficiaryCount: 60
  },
  {
    id: 'she-27',
    shelterName: 'Rain Basera Sindhi Camp',
    shelterCode: 'SH-JAIPUR-027',
    contactPerson: 'Kailash Choudhary',
    phone: '+91 99281 65432',
    location: {
      lat: 26.9230,
      lng: 75.7970,
      address: 'Station Road, Sindhi Camp Bus Terminal',
      area: 'Sindhi Camp / Railway Station',
      landmark: 'Platform 1 Night Shelter Annex'
    },
    requiredMeals: 110,
    receivedMeals: 0,
    dietaryPreference: 'Vegetarian',
    urgency: 'High',
    deadlineTime: '9:45 PM',
    status: 'Open',
    notes: 'Transit homeless citizens and intercity bus terminal stranded travelers.',
    beneficiaryCount: 130
  },
  {
    id: 'she-28',
    shelterName: 'Mother Teresa Home of Hope',
    shelterCode: 'SH-JAIPUR-028',
    contactPerson: 'Sister Mary Teresa',
    phone: '+91 98290 33451',
    location: {
      lat: 26.9020,
      lng: 75.8010,
      address: 'Near Statue Circle, C-Scheme',
      area: 'C-Scheme',
      landmark: 'Beside Catholic Church Compound'
    },
    requiredMeals: 40,
    receivedMeals: 0,
    dietaryPreference: 'Vegetarian',
    urgency: 'Medium',
    deadlineTime: '10:00 PM',
    status: 'Open',
    notes: 'Care center for destitute patients and recovering women.',
    beneficiaryCount: 45
  },
  {
    id: 'she-29',
    shelterName: 'Mansarovar Urban Slum Community Center',
    shelterCode: 'SH-JAIPUR-029',
    contactPerson: 'Devendra Rathore',
    phone: '+91 94142 88902',
    location: {
      lat: 26.8620,
      lng: 75.7650,
      address: 'Varun Path, Sector 6 Mansarovar',
      area: 'Mansarovar',
      landmark: 'Opposite Community Hall'
    },
    requiredMeals: 140,
    receivedMeals: 30,
    dietaryPreference: 'Vegetarian',
    urgency: 'Critical',
    deadlineTime: '9:30 PM',
    status: 'Partially Fulfilled',
    notes: 'Serving 180 low-income families and children living near railway spur.',
    beneficiaryCount: 160
  }
];

export const INITIAL_VOLUNTEERS: Volunteer[] = [
  {
    id: 'vol-01',
    name: 'Rahul Sharma',
    phone: '+91 98293 88124',
    vehicleType: 'Electric Two-Wheeler',
    vehicleNumber: 'RJ 14 EV 4402',
    rating: 4.9,
    completedRescues: 48,
    status: 'On Active Rescue',
    currentLocation: {
      lat: 26.8850,
      lng: 75.8140,
      area: 'Tonk Road / SMS Stadium Overpass'
    },
    activeRescueId: 'res-1024'
  },
  {
    id: 'vol-02',
    name: 'Priya Verma',
    phone: '+91 97841 00239',
    vehicleType: 'Motorcycle',
    vehicleNumber: 'RJ 14 MH 8891',
    rating: 4.8,
    completedRescues: 32,
    status: 'On Active Rescue',
    currentLocation: {
      lat: 26.9040,
      lng: 75.8110,
      area: 'C-Scheme'
    },
    activeRescueId: 'res-1026'
  },
  {
    id: 'vol-03',
    name: 'Amit Singh',
    phone: '+91 98280 55147',
    vehicleType: 'Electric Two-Wheeler',
    vehicleNumber: 'RJ 14 EV 9123',
    rating: 5.0,
    completedRescues: 64,
    status: 'Available',
    currentLocation: {
      lat: 26.9110,
      lng: 75.7980,
      area: 'Statue Circle / Civil Lines'
    }
  },
  {
    id: 'vol-04',
    name: 'Vikram Rathore',
    phone: '+91 94140 33281',
    vehicleType: 'Cargo Van',
    vehicleNumber: 'RJ 14 GB 2199',
    rating: 4.9,
    completedRescues: 89,
    status: 'On Active Rescue',
    currentLocation: {
      lat: 26.8720,
      lng: 75.8170,
      area: 'JLN Marg / Gandhinagar Station'
    },
    activeRescueId: 'res-1028'
  },
  {
    id: 'vol-05',
    name: 'Ananya Saxena',
    phone: '+91 99285 41209',
    vehicleType: 'Car',
    vehicleNumber: 'RJ 14 CA 7014',
    rating: 4.7,
    completedRescues: 19,
    status: 'Available',
    currentLocation: {
      lat: 26.9070,
      lng: 75.7480,
      area: 'Vaishali Nagar'
    }
  }
];

export const INITIAL_ACTIVE_MISSION: RescueMission = {
  id: 'res-1024',
  rescueCode: 'RESCUE-1024',
  donationId: 'don-1024',
  shelterRequestId: 'she-24',
  donorName: 'Clarks Amer Banquets',
  donorLocation: {
    lat: 26.8580,
    lng: 75.8050,
    address: 'JLN Marg, Near Jawahar Circle',
    area: 'C-Scheme / Malviya Nagar Corridor',
    landmark: 'Gate #2 Banquet Loading Bay'
  },
  shelterName: 'Shelter #24 — Apna Ghar Sansthan',
  shelterLocation: {
    lat: 26.9150,
    lng: 75.8230,
    address: 'Near Sanganer Gate, Ghat Gate Road',
    area: 'Pink City / Sanganer Gate',
    landmark: 'Opposite Community Dispensary'
  },
  volunteerId: 'vol-01',
  volunteerName: 'Rahul Sharma',
  volunteerPhone: '+91 98293 88124',
  volunteerVehicle: 'Electric Two-Wheeler (RJ 14 EV 4402)',
  volunteerRating: 4.9,
  mealsCount: 80,
  foodName: 'Fresh Veg Paneer, Dal Makhani & Roti Thali',
  category: 'Cooked Meals',
  dietary: 'Vegetarian',
  status: 'In Transit',
  etaMinutes: 14,
  totalDistanceKm: 6.8,
  pickupCompletedTime: '6:51 PM',
  verificationOtp: '7492',
  routeCoordinates: [
    [26.8580, 75.8050], // Donor: Clarks Amer
    [26.8710, 75.8110], // JLN Marg Gandhi Circle
    [26.8850, 75.8140], // Current Volunteer position (near SMS Stadium)
    [26.8990, 75.8180], // Rambagh Circle
    [26.9090, 75.8210], // Ajmeri Gate corridor
    [26.9150, 75.8230]  // Shelter #24
  ],
  currentVolunteerCoord: [26.8850, 75.8140],
  timeline: [
    {
      time: '6:32 PM',
      title: 'Donation Posted & Match Confirmed',
      description: 'Clarks Amer logged 80 fresh meals. Matched with Shelter #24 with 94% compatibility.',
      status: 'completed'
    },
    {
      time: '6:40 PM',
      title: 'Volunteer Rahul Assigned',
      description: 'Nearest verified volunteer accepted dispatch. Route generated via Tonk Road.',
      status: 'completed'
    },
    {
      time: '6:51 PM',
      title: 'Food Picked Up & Quality Verified',
      description: 'Rahul inspected seal integrity, thermal insulation checked at 64°C, OTP 7492 verified.',
      status: 'completed'
    },
    {
      time: '7:05 PM',
      title: 'In Transit to Shelter #24',
      description: 'Cruising along JLN Marg towards Sanganer Gate. Live GPS tracking broadcast.',
      status: 'current'
    },
    {
      time: '7:19 PM (ETA)',
      title: 'Shelter Delivery & Handover',
      description: 'Shelter Superintendent Sunita Sharma awaiting delivery for 75 residents.',
      status: 'pending'
    }
  ]
};

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Surplus Match Detected',
    message: 'New 80-meal donation from Clarks Amer matched with Shelter #24 (2.4 km away, 94% match score).',
    timestamp: '2 mins ago',
    type: 'match',
    read: false
  },
  {
    id: 'notif-2',
    title: 'Pickup Confirmed',
    message: 'Volunteer Rahul Sharma picked up 80 meals from Clarks Amer. Thermal check verified.',
    timestamp: '14 mins ago',
    type: 'pickup',
    read: false
  },
  {
    id: 'notif-3',
    title: 'Urgent Expiry Window Alert',
    message: 'Tonk Road Banquet food pickup deadline approaching in 35 minutes. Priority routing triggered.',
    timestamp: '25 mins ago',
    type: 'urgent',
    read: true
  },
  {
    id: 'notif-4',
    title: 'Delivery Completed Successfully',
    message: 'Rescue #1022: 45 hot meals handed over to Robin Hood Raja Park. Zero spoilage recorded.',
    timestamp: '1 hour ago',
    type: 'delivery',
    read: true
  },
  {
    id: 'notif-5',
    title: 'Volunteer Dispatch Accepted',
    message: 'Volunteer Priya Verma accepted pickup request at Kanha Sweets (C-Scheme).',
    timestamp: '1.5 hours ago',
    type: 'dispatch',
    read: true
  }
];

export const OVERALL_KPIS = {
  mealsRescued: 12450,
  activeDonations: 34,
  activeDeliveries: 18,
  partnerNgos: 42,
  activeVolunteers: 76,
  successfulDeliveries: 187,
  co2SavedKg: 4280,
  foodValueRescuedInr: 1420000,
  avgDeliveryTimeMinutes: 24.8,
  avgRouteDistanceKm: 3.8,
  successfulMatchRate: 98.2,
  failedRescueRate: 1.8
};
