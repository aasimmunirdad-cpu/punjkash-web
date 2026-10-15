import ServicePage from "@/components/ServicePage";
export const metadata = { title: "Hotels in Makkah, Madinah and abroad", description: "Hotel-only bookings in Makkah and Madinah by distance from the Haram, and hotels abroad, from PunjKash." };
export default function Page() {
  return <ServicePage title="Hotels, by distance, not by star claims" intro="Makkah and Madinah hotels booked on their own, with the walking distance to the Haram stated in metres, and hotels abroad for holidays and business." status="Hotel-only search opens with the Umrah builder. Send your dates and city for a price today." points={["Makkah and Madinah, shuttle to 200 metres from the Haram", "Room types and nights priced per person or per room", "Dubai, Istanbul, Baku, Kuala Lumpur and more", "Rates confirmed in writing before any payment"]} waText="Assalam o Alaikum, I need a hotel booking. City: __ Dates: __ Rooms: __" />;
}
