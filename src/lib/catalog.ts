/* Sample inventory for every non-Umrah service. Every price here is a SAMPLE for layout and
   demonstration until a supplier feed replaces it. The Umrah packages come from the database. */

export const SAMPLE = true;

export type Fare = { from: string; fromIata: string; to: string; toIata: string; airline: string; stops: "Direct" | "1 stop"; fare: number; cabin: "Economy" | "Business"; note?: string };

export const flightRoutes: Fare[] = [
  { from: "Lahore", fromIata: "LHE", to: "Jeddah", toIata: "JED", airline: "Saudia", stops: "Direct", fare: 112500, cabin: "Economy" },
  { from: "Islamabad", fromIata: "ISB", to: "Jeddah", toIata: "JED", airline: "Airblue", stops: "Direct", fare: 104900, cabin: "Economy" },
  { from: "Karachi", fromIata: "KHI", to: "Jeddah", toIata: "JED", airline: "Air Sial", stops: "Direct", fare: 98500, cabin: "Economy" },
  { from: "Lahore", fromIata: "LHE", to: "Madinah", toIata: "MED", airline: "PIA", stops: "Direct", fare: 118000, cabin: "Economy" },
  { from: "Lahore", fromIata: "LHE", to: "Dubai", toIata: "DXB", airline: "Emirates", stops: "Direct", fare: 89900, cabin: "Economy" },
  { from: "Islamabad", fromIata: "ISB", to: "Dubai", toIata: "DXB", airline: "flydubai", stops: "Direct", fare: 76500, cabin: "Economy" },
  { from: "Karachi", fromIata: "KHI", to: "Dubai", toIata: "DXB", airline: "Emirates", stops: "Direct", fare: 72900, cabin: "Economy" },
  { from: "Lahore", fromIata: "LHE", to: "Istanbul", toIata: "IST", airline: "Turkish Airlines", stops: "Direct", fare: 168000, cabin: "Economy" },
  { from: "Islamabad", fromIata: "ISB", to: "Istanbul", toIata: "IST", airline: "Turkish Airlines", stops: "Direct", fare: 164500, cabin: "Economy" },
  { from: "Lahore", fromIata: "LHE", to: "Baku", toIata: "GYD", airline: "AZAL", stops: "Direct", fare: 139000, cabin: "Economy" },
  { from: "Lahore", fromIata: "LHE", to: "Kuala Lumpur", toIata: "KUL", airline: "Malaysia Airlines", stops: "Direct", fare: 148000, cabin: "Economy" },
  { from: "Karachi", fromIata: "KHI", to: "Bangkok", toIata: "BKK", airline: "Thai Airways", stops: "Direct", fare: 132000, cabin: "Economy" },
  { from: "Lahore", fromIata: "LHE", to: "London", toIata: "LHR", airline: "Qatar Airways", stops: "1 stop", fare: 265000, cabin: "Economy" },
  { from: "Islamabad", fromIata: "ISB", to: "Manchester", toIata: "MAN", airline: "Etihad", stops: "1 stop", fare: 248000, cabin: "Economy", note: "Bumper fare, limited dates" },
  { from: "Lahore", fromIata: "LHE", to: "Toronto", toIata: "YYZ", airline: "Qatar Airways", stops: "1 stop", fare: 345000, cabin: "Economy" },
  { from: "Islamabad", fromIata: "ISB", to: "New York", toIata: "JFK", airline: "Emirates", stops: "1 stop", fare: 372000, cabin: "Economy" },
  { from: "Karachi", fromIata: "KHI", to: "Doha", toIata: "DOH", airline: "Qatar Airways", stops: "Direct", fare: 84000, cabin: "Economy" },
  { from: "Lahore", fromIata: "LHE", to: "Riyadh", toIata: "RUH", airline: "Saudia", stops: "Direct", fare: 109000, cabin: "Economy" },
  { from: "Islamabad", fromIata: "ISB", to: "Muscat", toIata: "MCT", airline: "Oman Air", stops: "Direct", fare: 79500, cabin: "Economy" },
  { from: "Lahore", fromIata: "LHE", to: "Dubai", toIata: "DXB", airline: "Emirates", stops: "Direct", fare: 298000, cabin: "Business" },
  { from: "Karachi", fromIata: "KHI", to: "Islamabad", toIata: "ISB", airline: "PIA", stops: "Direct", fare: 28500, cabin: "Economy" },
  { from: "Lahore", fromIata: "LHE", to: "Karachi", toIata: "KHI", airline: "Airblue", stops: "Direct", fare: 26900, cabin: "Economy" },
  { from: "Islamabad", fromIata: "ISB", to: "Skardu", toIata: "KDU", airline: "PIA", stops: "Direct", fare: 24000, cabin: "Economy" },
  { from: "Lahore", fromIata: "LHE", to: "Gilgit", toIata: "GIL", airline: "PIA", stops: "Direct", fare: 23500, cabin: "Economy" },
];

export const airlines = ["Saudia", "Emirates", "Qatar Airways", "Turkish Airlines", "Etihad", "flydubai", "Oman Air", "AZAL", "Malaysia Airlines", "Thai Airways", "PIA", "Airblue", "Air Sial", "FlyJinnah"];

export type Holiday = { slug: string; title: string; country: string; city: string; nights: number; from: number; hotel: string; stars: string; includes: string[]; departures: string[]; highlight: string; region: "Middle East" | "Europe and Caucasus" | "Far East" | "Islands" };

export const holidays: Holiday[] = [
  { slug: "dubai-4-nights", title: "Dubai City Break", country: "UAE", city: "Dubai", nights: 4, from: 189000, hotel: "Rove Downtown", stars: "3-star", includes: ["Return flights from Lahore", "4 nights with breakfast", "Airport transfers", "Desert safari with dinner", "Dubai visa"], departures: ["Every Friday"], highlight: "Burj Khalifa and Dubai Mall at your door", region: "Middle East" },
  { slug: "dubai-abu-dhabi-6-nights", title: "Dubai and Abu Dhabi", country: "UAE", city: "Dubai, Abu Dhabi", nights: 6, from: 268000, hotel: "Hilton Garden Inn Mall of the Emirates", stars: "4-star", includes: ["Return flights", "6 nights with breakfast", "Abu Dhabi city tour and Grand Mosque", "Marina dhow cruise", "Dubai visa"], departures: ["Fridays and Mondays"], highlight: "Two emirates, one trip", region: "Middle East" },
  { slug: "istanbul-5-nights", title: "Istanbul Classic", country: "Turkey", city: "Istanbul", nights: 5, from: 245000, hotel: "Ramada by Wyndham Old City", stars: "4-star", includes: ["Return flights on Turkish Airlines", "5 nights with breakfast", "Bosphorus cruise", "Old City walking tour", "Turkey e-visa support"], departures: ["Weekly"], highlight: "Sultanahmet, Grand Bazaar, Bosphorus", region: "Europe and Caucasus" },
  { slug: "turkey-grand-8-nights", title: "Turkey Grand Tour", country: "Turkey", city: "Istanbul, Cappadocia, Antalya", nights: 8, from: 398000, hotel: "4-star hotels throughout", stars: "4-star", includes: ["Return flights", "Domestic flights Istanbul to Cappadocia", "8 nights with breakfast", "Hot air balloon option", "Guided tours in each city"], departures: ["Twice monthly"], highlight: "Three faces of Turkey in one itinerary", region: "Europe and Caucasus" },
  { slug: "baku-5-nights", title: "Baku and Gabala", country: "Azerbaijan", city: "Baku, Gabala", nights: 5, from: 215000, hotel: "Sapphire Inn Baku", stars: "4-star", includes: ["Return flights on AZAL", "5 nights with breakfast", "Gabala day trip with cable car", "Old City and Flame Towers tour", "Azerbaijan e-visa support"], departures: ["Weekly"], highlight: "Visa on arrival ease, European feel", region: "Europe and Caucasus" },
  { slug: "kuala-lumpur-langkawi-6-nights", title: "Kuala Lumpur and Langkawi", country: "Malaysia", city: "Kuala Lumpur, Langkawi", nights: 6, from: 258000, hotel: "Swiss Garden KL, Bayview Langkawi", stars: "4-star", includes: ["Return flights", "Domestic flight KL to Langkawi", "6 nights with breakfast", "Genting Highlands day trip", "Island hopping in Langkawi"], departures: ["Weekly"], highlight: "City lights then island calm", region: "Far East" },
  { slug: "bangkok-phuket-7-nights", title: "Bangkok and Phuket", country: "Thailand", city: "Bangkok, Phuket", nights: 7, from: 262000, hotel: "4-star hotels", stars: "4-star", includes: ["Return flights", "Domestic flight", "7 nights with breakfast", "Phi Phi Islands tour", "Thailand visa support"], departures: ["Weekly"], highlight: "Temples, markets and beaches", region: "Far East" },
  { slug: "maldives-4-nights", title: "Maldives Escape", country: "Maldives", city: "Male atolls", nights: 4, from: 385000, hotel: "Beach villa, 4-star resort", stars: "4-star", includes: ["Return flights", "4 nights half board", "Speedboat transfers", "Sunset cruise"], departures: ["On request"], highlight: "Honeymoon favourite, visa free", region: "Islands" },
  { slug: "sri-lanka-6-nights", title: "Sri Lanka Round Trip", country: "Sri Lanka", city: "Colombo, Kandy, Bentota", nights: 6, from: 198000, hotel: "3 and 4-star hotels", stars: "4-star", includes: ["Return flights", "6 nights with breakfast", "Private car throughout", "Kandy and tea country", "ETA visa support"], departures: ["Weekly"], highlight: "Hills, tea and beach in one week", region: "Islands" },
  { slug: "egypt-7-nights", title: "Cairo and the Nile", country: "Egypt", city: "Cairo, Luxor, Aswan", nights: 7, from: 425000, hotel: "4-star hotels and Nile cruise", stars: "4-star", includes: ["Return flights", "3 nights Cairo, 3 nights Nile cruise, 1 night Luxor", "Pyramids and Egyptian Museum", "Full board on the cruise", "Egypt visa support"], departures: ["Monthly"], highlight: "Pyramids to Abu Simbel", region: "Middle East" },
  { slug: "georgia-5-nights", title: "Tbilisi and Kazbegi", country: "Georgia", city: "Tbilisi, Kazbegi", nights: 5, from: 232000, hotel: "4-star Tbilisi", stars: "4-star", includes: ["Return flights", "5 nights with breakfast", "Kazbegi mountain day trip", "Old Tbilisi and sulphur baths", "Georgia e-visa support"], departures: ["Weekly"], highlight: "Caucasus mountains on a budget", region: "Europe and Caucasus" },
  { slug: "london-6-nights", title: "London Family Week", country: "United Kingdom", city: "London", nights: 6, from: 595000, hotel: "3-star central London", stars: "3-star", includes: ["Return flights", "6 nights room only", "London Pass", "Airport transfers", "UK visa guidance (visa fee separate)"], departures: ["On request"], highlight: "For families with UK visas", region: "Europe and Caucasus" },
];

export type Tour = { slug: string; title: string; region: string; days: number; from: number; type: "Private" | "Group"; highlights: string[]; season: string };

export const tours: Tour[] = [
  { slug: "lahore-heritage-2-days", title: "Lahore Heritage Weekend", region: "Punjab", days: 2, from: 28000, type: "Private", highlights: ["Badshahi Mosque and Lahore Fort", "Walled City food walk", "Wagah border ceremony", "Shalimar Gardens"], season: "October to March" },
  { slug: "neelum-valley-5-days", title: "Neelum Valley", region: "Azad Kashmir", days: 5, from: 68000, type: "Group", highlights: ["Keran and Sharda", "Arang Kel by chairlift", "Ratti Gali Lake (summer)", "Riverside stays"], season: "April to October" },
  { slug: "hunza-7-days", title: "Hunza and Attabad", region: "Gilgit-Baltistan", days: 7, from: 98000, type: "Group", highlights: ["Karimabad and Baltit Fort", "Attabad Lake boating", "Khunjerab Pass", "Eagle's Nest sunset"], season: "April to November" },
  { slug: "skardu-6-days", title: "Skardu and Shangrila", region: "Gilgit-Baltistan", days: 6, from: 112000, type: "Private", highlights: ["Flight to Skardu", "Shangrila and Upper Kachura", "Deosai Plains", "Cold Desert"], season: "May to October" },
  { slug: "swat-kalam-4-days", title: "Swat and Kalam", region: "Khyber Pakhtunkhwa", days: 4, from: 48000, type: "Group", highlights: ["Malam Jabba", "Kalam and Ushu forest", "Mahodand Lake", "Mingora bazaar"], season: "April to October" },
  { slug: "naran-kaghan-4-days", title: "Naran, Kaghan and Babusar", region: "Khyber Pakhtunkhwa", days: 4, from: 45000, type: "Group", highlights: ["Saif ul Malook Lake", "Lulusar Lake", "Babusar Top", "Shogran and Siri Paye"], season: "May to September" },
  { slug: "murree-nathiagali-3-days", title: "Murree and Nathiagali", region: "Punjab hills", days: 3, from: 32000, type: "Private", highlights: ["Mall Road", "Pipeline Track walk", "Ayubia chairlift", "Snow in winter"], season: "All year" },
  { slug: "south-punjab-3-days", title: "Multan and Bahawalpur", region: "South Punjab", days: 3, from: 38000, type: "Private", highlights: ["Multan shrines", "Noor Mahal and Derawar Fort", "Cholistan desert jeep ride", "Lal Suhanra"], season: "October to March" },
];

export type HotelOffer = { name: string; city: string; distance: string; type: string; perNight: number; board: string };

export const hotelOffers: HotelOffer[] = [
  { name: "Rou Taiba", city: "Madinah", distance: "200 m from the Haram", type: "Quad room", perNight: 14500, board: "Room only" },
  { name: "Blora Moazan", city: "Makkah", distance: "350 m from the Haram", type: "Quad room", perNight: 16800, board: "Room only" },
  { name: "Swissotel Makkah", city: "Makkah", distance: "Clock Tower, facing the Haram", type: "Double room", perNight: 68000, board: "Breakfast" },
  { name: "Anwar Al Madinah Movenpick", city: "Madinah", distance: "Steps from the Haram", type: "Double room", perNight: 52000, board: "Breakfast" },
  { name: "Maidan Al Bait 2", city: "Makkah", distance: "Shuttle, Old Areek", type: "Sharing bed", perNight: 6200, board: "Room only" },
  { name: "Rove Downtown", city: "Dubai", distance: "Near Dubai Mall", type: "Double room", perNight: 24000, board: "Breakfast" },
  { name: "Ramada Old City", city: "Istanbul", distance: "Sultanahmet", type: "Double room", perNight: 27500, board: "Breakfast" },
  { name: "Sapphire Inn", city: "Baku", distance: "City centre", type: "Double room", perNight: 21000, board: "Breakfast" },
  { name: "Serena Hotel", city: "Gilgit", distance: "Town centre", type: "Double room", perNight: 32000, board: "Breakfast" },
  { name: "Shangrila Resort", city: "Skardu", distance: "Lower Kachura Lake", type: "Lake-view cottage", perNight: 38000, board: "Breakfast" },
];

export type Visa = { country: string; type: string; days: string; fee: number; service: number; docs: string[] };

export const visas: Visa[] = [
  { country: "Saudi Arabia (Umrah)", type: "Umrah visa", days: "3 to 7 working days", fee: 42000, service: 0, docs: ["Passport valid 6 months", "Photo white background", "Vaccination certificate", "Return ticket"] },
  { country: "UAE", type: "30-day tourist", days: "3 to 5 working days", fee: 32000, service: 5000, docs: ["Passport copy", "Photo", "Return ticket", "Hotel booking"] },
  { country: "Turkey", type: "e-Visa", days: "1 to 3 working days", fee: 18500, service: 4000, docs: ["Valid US, UK or Schengen visa, or sticker visa route", "Passport copy", "Photo"] },
  { country: "Azerbaijan", type: "e-Visa", days: "3 working days", fee: 9500, service: 3000, docs: ["Passport copy", "Photo"] },
  { country: "Malaysia", type: "eVisa 30 days", days: "3 to 5 working days", fee: 12000, service: 4000, docs: ["Passport copy", "Photo", "Return ticket", "Hotel booking", "Bank statement"] },
  { country: "Thailand", type: "Tourist visa", days: "5 to 7 working days", fee: 14000, service: 5000, docs: ["Passport", "Photo", "Bank statement 6 months", "Return ticket", "Hotel booking"] },
  { country: "Sri Lanka", type: "ETA", days: "1 to 2 working days", fee: 9000, service: 3000, docs: ["Passport copy", "Photo"] },
  { country: "Egypt", type: "Sticker visa", days: "10 to 15 working days", fee: 16000, service: 6000, docs: ["Passport", "Photos", "Bank statement", "Employment letter", "Hotel booking"] },
  { country: "United Kingdom", type: "Standard visitor", days: "15 to 30 working days", fee: 48000, service: 15000, docs: ["Passport", "Bank statements 6 months", "Employment or business proof", "Invitation if any", "Travel history"] },
  { country: "Schengen (Italy, France, Spain)", type: "Short stay", days: "15 to 45 working days", fee: 28000, service: 15000, docs: ["Passport", "Bank statements", "Itinerary and hotel bookings", "Travel insurance", "Employment proof"] },
];

export const destinations = [
  { name: "Makkah and Madinah", tag: "Umrah and Hajj", href: "/umrah", img: "makkah" },
  { name: "Dubai", tag: "From PKR 189,000", href: "/holidays/dubai-4-nights", img: "dubai" },
  { name: "Istanbul", tag: "From PKR 245,000", href: "/holidays/istanbul-5-nights", img: "istanbul" },
  { name: "Baku", tag: "From PKR 215,000", href: "/holidays/baku-5-nights", img: "baku" },
  { name: "Hunza", tag: "7 days from PKR 98,000", href: "/tours/hunza-7-days", img: "hunza" },
  { name: "Maldives", tag: "From PKR 385,000", href: "/holidays/maldives-4-nights", img: "maldives" },
  { name: "Kuala Lumpur", tag: "From PKR 258,000", href: "/holidays/kuala-lumpur-langkawi-6-nights", img: "kl" },
  { name: "Neelum Valley", tag: "5 days from PKR 68,000", href: "/tours/neelum-valley-5-days", img: "neelum" },
];
