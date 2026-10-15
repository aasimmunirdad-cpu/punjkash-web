import ServicePage from "@/components/ServicePage";
export const metadata = { title: "Holiday packages from Pakistan", description: "Turkey, Dubai, Azerbaijan, Malaysia, Thailand and more. Flights, hotels, transfers and visas in one quotation from PunjKash, Lahore." };
export default function Page() {
  return <ServicePage title="Holidays abroad, flights and hotels in one quotation" intro="Turkey, Dubai, Azerbaijan, Malaysia, Thailand, Maldives and Europe, with flights, hotels, transfers and visa support arranged together." status="Holiday packages open in phase two. Message us now and we build a trip around your dates." points={["Family, honeymoon and group itineraries", "Hotels chosen by location, not by star claims", "Visa checklists and filing included where we offer it", "One written price, with what is and is not included spelled out"]} waText="Assalam o Alaikum, I want a holiday package. Destination: __ Dates: __ Travellers: __" />;
}
